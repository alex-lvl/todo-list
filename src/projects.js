import { removeContent, storeTodos, submitProject, db, auth, localStore } from './index';
import { myTodos } from './todo';
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore/lite';
export { activateProjectTabListeners, myProjects, getProjects, initLocalProjects };

const sideBar = document.querySelector('aside');
const projectHeader = document.querySelector('header');
const projectFormTab = document.querySelector('.side-projects-form-tab');
const projectTabs = document.querySelector('.side-projects');
let myProjects = [];

function activateProjectTabListeners() {
  projectFormTab.addEventListener('click', () => {
    if (sideBar.classList.contains('side-bar-expanded')) {
      createProjectForm();
    }
  });

  projectTabs.addEventListener('click', (e) => {
    let project = e.target.closest('.project');
    let lis = [...projectTabs.children];
    let index = lis.indexOf(project);

    if (e.target.classList.contains('cancel-project-icon')) {
      myProjects.splice(lis.indexOf(e.target.parentElement), 1);
      e.target.parentElement.remove();
      console.log(myProjects);
      console.log('deleted project form');
    } else if (project) {
      removeContent();
      updateProjectHeader(index);
      createDeleteBtn(index, project);
      displayProjectsTodos(myProjects[index]);
    }
  });
}

class Project {
  static idCount = 0;

  static incrementIdCount() {
    this.idCount += 1;
  }

  static idNum() {
    return this.idCount;
  }

  constructor(title, id) {
    this.title = title;
    this.id = id;
  }

  createProject(container) {
    container.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-circle list-vector" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        </svg> `;

    const projectTitle = document.createElement('span');
    projectTitle.className = 'link-text';
    projectTitle.textContent = this.title;

    container.appendChild(projectTitle);
  }

  createProjectOption(selectMenu) {
    const option = document.createElement('option');
    option.textContent = this.title;
    selectMenu.appendChild(option);
  }
}

function createDeleteBtn(index, projectElement) {
  let deleteProjectBtn = document.createElement('button');
  deleteProjectBtn.className = 'btn btn-outline-danger';
  deleteProjectBtn.textContent = 'delete';
  projectHeader.appendChild(deleteProjectBtn);

  deleteProjectBtn.addEventListener('click', (e) => {
    if (e) {
      let indexes = [];
      for (let todo of myTodos) {
        if (myProjects[index].title === todo.project) {
          indexes.push(myTodos.indexOf(todo));
        }
      }
      for (let i of indexes.reverse()) {
        console.log(myTodos.splice(i, 1));
      }
      deleteProjectBtn.remove();
      projectElement.remove();
      if (localStore) {
        myProjects.splice(index, 1);
        storeProjects();
        storeTodos();
      } else {
        deleteProjectTodos(myProjects[index].title);
        deleteProject(index);
        myProjects.splice(index, 1);
      }
      removeContent();
      console.log('deleted project');
    }
  });
}

function createProjectForm() {
  //project is initialized and pushed immediately in order to adjust for multiple forms and place elements in the proper index of the array.
  const project = new Project(undefined, undefined);
  myProjects.push(project);

  const projectContainer = createProjectContainer();

  const titleInput = document.createElement('input');
  titleInput.className = 'project-form';
  titleInput.maxLength = 19;
  titleInput.type = 'text';
  titleInput.placeholder = 'name';
  titleInput.name = 'title';

  projectContainer.li.appendChild(titleInput);
  projectTabs.appendChild(projectContainer.li);

  titleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      let projectId = Project.idNum();
      project.title = titleInput.value;
      project.id = projectId;
      project.createProject(projectContainer.li);
      projectContainer.li.className = 'project';
      if (localStore) {
        storeProjects();
      } else {
        submitProject(titleInput.value, projectId);
      }
      Project.incrementIdCount();
      console.log(myProjects, 'submit project');
    }
  });
}

function updateProjectHeader(i) {
  projectHeader.innerHTML = `
    <h1>
        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-box project-icon" viewBox="0 0 16 16">
            <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
        </svg>
        <span class="text-capitalize">${myProjects[i].title}</span>
    </h1>`;
}

function createProjectContainer() {
  const li = document.createElement('li');
  li.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-circle cancel-project-icon" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>`;

  return { li };
}

function displayProjectsTodos(project) {
  for (let todo of myTodos) {
    if (project.title === todo.project) {
      todo.createTodo();
    }
  }
}

function storeProjects() {
  localStorage.setItem('myProjects', JSON.stringify(myProjects));
}

function getProjectData() {
  const storedProjects = localStorage.getItem('myProjects');
  const parsedProjects = JSON.parse(storedProjects);

  for (let project of parsedProjects) {
    if (project.title !== undefined) {
      const storedProject = new Project(project.title, project.todos);
      const projectContainer = createProjectContainer();
      projectContainer.li.className = 'project';
      //we push locally stored projects back to the array because project elements lose prototype when parsed
      storedProject.createProject(projectContainer.li);
      projectTabs.appendChild(projectContainer.li);
      myProjects.push(storedProject);
    }
  }
}

async function getProjects(db, uid) {
  let projectQuery = query(
    collection(db, 'project'),
    where('uid', '==', auth.currentUser.uid)
  );
  const querySnapshot = await getDocs(projectQuery);
  const projectList = querySnapshot.docs.map((doc) => doc.data());
  projectList.sort((a, b) => a.id - b.id);
  projectList.forEach((e, i) => {
    //CHANGE KEY NAME TO 'TITLE' NOT 'PROJECTS' IN FIRESTORE
    const storedProject = new Project(e.projects, e.id);
    const projectContainer = createProjectContainer();
    projectContainer.li.className = 'project';
    //we push locally stored projects back to the array because project elements lose prototype when parsed
    storedProject.createProject(projectContainer.li);
    projectTabs.appendChild(projectContainer.li);
    myProjects.push(storedProject);
    Project.idCount = e.id + 1;
  });
  console.log(myProjects, 'projects');
}

async function deleteProject(index) {
  console.log(index);
  let projectId = parseInt(myProjects[index].id);
  let projectQuery = query(
    collection(db, 'project'),
    where('uid', '==', auth.currentUser.uid)
  );
  let projectSnapshot = await getDocs(projectQuery);
  let projectList = projectSnapshot.docs.map((doc) => {
    if (doc.data().id === projectId) {
      console.log(doc.data().id, 'doc id');
      console.log(projectId);
      deleteDoc(doc.ref);
    }
  });
}

async function deleteProjectTodos(projectTitle) {
  let todosQuery = query(
    collection(db, 'todo'),
    where('uid', '==', auth.currentUser.uid),
    where('project', '==', projectTitle)
  );
  let todosSnapshot = await getDocs(todosQuery);
  let todosList = todosSnapshot.docs.map((doc) => {
    if (doc.data().project === projectTitle) {
      deleteDoc(doc.ref);
    }
  });
}

function initLocalProjects() {
  if (!localStorage.getItem('myProjects')) {
    storeProjects();
  } else {
    getProjectData();
  }
}
