import 'bootstrap';
import './style.scss';
import logoImage from './images/todo-list-logo3.png';
import { Todo, Checklist, myTodos } from './todo';
import { expandTodo, expandSideBar } from './expand';
import { displayForm } from './form';
import { displayInbox } from './inbox';
import { displayPresentTodos } from './today';
import { displayWeekTodos } from './week';
import {
  activateProjectTabListeners,
  getProjects,
  initLocalProjects,
  getProjectData,
  myProjects,
} from './projects';
import { clickDropdown } from 'dropdown-menu-basic';
export {
  submitTodo,
  submitEdit,
  submitProject,
  newChecklistItem,
  removeContent,
  storeTodos,
  db,
  auth,
  localStore,
};

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore/lite';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBcUStv_zwi7w_z2KG0FH-zfM6AEqmszVA',
  authDomain: 'todo-list-c28c1.firebaseapp.com',
  projectId: 'todo-list-c28c1',
  storageBucket: 'todo-list-c28c1.appspot.com',
  messagingSenderId: '367471287582',
  appId: '1:367471287582:web:b90b8374dda033410b3d0f',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const linkTabs = document.querySelectorAll('.link');
const todoContent = document.querySelector('.content');
const logo = document.querySelector('.logo');
const projectContainer = document.querySelector('#projects-container');
const localStorageBtn = document.getElementById('local-btn');
let localStore = false;
var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');
signOutButtonElement.addEventListener('click', signOutUser);
signInButtonElement.addEventListener('click', signIn);
localStorageBtn.addEventListener('click', initLocalStore);
logo.src = logoImage;

(function activateEventListeners() {
  expandTodo();
  expandSideBar();
  activateProjectTabListeners();
  initFirebaseAuth();
  clickDropdown();
})();

function newChecklistItem(title, isDone, id) {
  return new Checklist(title, isDone, id);
}

function submitEdit(title, project, date, note, checklist, index) {
  const existingTodo = myTodos[index];
  existingTodo.title = title;
  existingTodo.project = project;
  existingTodo.date = date;
  existingTodo.note = note;
  existingTodo.checklist = checklist;
  if (localStore) {
    storeTodos();
  } else {
    updateTodo(title, project, date, note, checklist, index);
  }
}

linkTabs.forEach((e) => {
  e.addEventListener('click', () => {
    removeContent();
    switch (e) {
      case linkTabs[0]:
        displayForm();
        break;
      case linkTabs[1]:
        displayInbox();
        break;
      case linkTabs[2]:
        displayPresentTodos();
        break;
      case linkTabs[3]:
        displayWeekTodos();
        break;
    }
  });
});

todoContent.addEventListener('click', (e) => {
  if (e.target.name === 'todoCheckBox' && e.target.checked === false) {
    const todoIndex = myTodos.findIndex(
      (element) =>
        element.id === parseInt(e.target.parentNode.parentNode.dataset.index)
    );
    myTodos[todoIndex].isDone = false;
    if (localStore) {
      storeTodos();
    } else {
      updateTodoCompletion(todoIndex, false);
    }
  } else if (e.target.name === 'todoCheckBox' && e.target.checked === true) {
    const todoIndex = myTodos.findIndex(
      (element) =>
        element.id === parseInt(e.target.parentNode.parentNode.dataset.index)
    );
    myTodos[todoIndex].isDone = true;
    if (localStore) {
      storeTodos();
    } else {
      updateTodoCompletion(todoIndex, true);
    }
  }

  if (e.target.name === 'checklistCheckbox' && e.target.checked === false) {
    const checklistTodoIndex = myTodos.findIndex(
      (element) =>
        element.id ===
        parseInt(
          e.target.parentNode.parentNode.parentNode.parentNode.dataset.index
        )
    );
    const checklistItemIndex = myTodos[checklistTodoIndex].checklist.findIndex(
      (el) => el.id === parseInt(e.target.parentNode.dataset.index)
    );
    myTodos[checklistTodoIndex].checklist[checklistItemIndex].isDone = false;
    if (localStore) {
      storeTodos();
    } else {
      updateChecklist(checklistTodoIndex, checklistItemIndex, false);
    }
  } else if (
    e.target.name === 'checklistCheckbox' &&
    e.target.checked === true
  ) {
    const checklistTodoIndex = myTodos.findIndex(
      (element) =>
        element.id ===
        parseInt(
          e.target.parentNode.parentNode.parentNode.parentNode.dataset.index
        )
    );
    const checklistItemIndex = myTodos[checklistTodoIndex].checklist.findIndex(
      (el) => el.id === parseInt(e.target.parentNode.dataset.index)
    );
    myTodos[checklistTodoIndex].checklist[checklistItemIndex].isDone = true;
    if (localStore) {
      storeTodos();
    } else {
      updateChecklist(checklistTodoIndex, checklistItemIndex, true);
    }
  }

  const deleteBtn = e.target.closest('.todo-delete');
  const editBtn = e.target.closest('.todo-edit');
  if (deleteBtn) {
    const index = myTodos.findIndex(
      (element) =>
        element.id ===
        parseInt(deleteBtn.parentNode.parentNode.parentNode.dataset.index)
    );
    deleteBtn.parentElement.parentElement.parentElement.remove();
    myTodos.splice(index, 1);
    if (localStore) {
      storeTodos();
    } else {
      deleteTodo(index);
    }
  } else if (editBtn) {
    const index = myTodos.findIndex(
      (element) =>
        element.id ===
        parseInt(editBtn.parentNode.parentNode.parentNode.dataset.index)
    );
    myTodos[index].editTodo();
  }
});

function removeContent() {
  while (todoContent.firstChild) {
    todoContent.removeChild(todoContent.firstChild);
  }
}

function removeProjects() {
  while (projectContainer.firstChild) {
    projectContainer.removeChild(projectContainer.firstChild);
  }
}

function storeTodos() {
  localStorage.setItem(`myTodos`, JSON.stringify(myTodos));
}

function getData() {
  const storedTodos = localStorage.getItem('myTodos');
  const parsedTodos = JSON.parse(storedTodos);

  parsedTodos.forEach((e, i) => {
    const storedChecklist = [];
    e.checklist.forEach((el, ind) => {
      const storedChecklistItem = new Checklist(el.title, el.isDone, ind);
      storedChecklist.push(storedChecklistItem);
    });

    const storedTodo = new Todo(
      e.title,
      e.project,
      e.date,
      e.note,
      storedChecklist,
      e.isDone,
      i
    );
    //we push locally stored todos back to the array because todo elements lose prototype when parsed
    storedTodo.addToArray(myTodos);
    storedTodo.createTodo();
    Todo.incrementIdCount();
  });
  console.log(myTodos, 'local storage mytodos');
}

async function submitProject(projects, id) {
  try {
    const docRef = await addDoc(collection(db, 'project'), {
      projects: projects,
      id: parseInt(id),
      uid: getAuth().currentUser.uid,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

async function submitTodo(title, project, date, notes, checklist, isDone) {
  let todoId = Todo.idNum();
  const todo = new Todo(title, project, date, notes, checklist, isDone, todoId);
  todo.addToArray(myTodos);
  if (localStore) {
    storeTodos();
  } else {
    const checklists = checklist.map((obj) => {
      return Object.assign({}, obj);
    });
    try {
      const docRef = await addDoc(collection(db, 'todo'), {
        title: title,
        project: project,
        date: date,
        note: notes,
        checklist: checklists,
        id: parseInt(todoId),
        uid: getAuth().currentUser.uid,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  Todo.incrementIdCount();
  console.log(myTodos);
}

async function updateTodo(title, project, date, note, checklist, index) {
  let todoId = myTodos[index].id;
  const checklists = checklist.map((obj) => {
    return Object.assign({}, obj);
  });
  console.log(checklists);
  let todoQuery = query(
    collection(db, 'todo'),
    where('id', '==', todoId),
    where('uid', '==', auth.currentUser.uid)
  );
  const todoSnapshop = await getDocs(todoQuery);
  let todoList = todoSnapshop.docs.map((doc) => {
    if (doc.data().id === todoId) {
      updateDoc(doc.ref, {
        title: title,
        project: project,
        date: date,
        note: note,
        checklist: checklists,
      });
    }
  });
}

async function updateChecklist(todoIndex, checklistIndex, isChecked) {
  let todoId = myTodos[todoIndex].id;
  let checklistId = myTodos[todoIndex].checklist[checklistIndex].id;
  const checklists = myTodos[todoIndex].checklist.map((obj) => {
    return Object.assign({}, obj);
  });
  let todoQuery = query(
    collection(db, 'todo'),
    where('id', '==', todoId),
    where('uid', '==', auth.currentUser.uid)
  );
  const todoSnapshop = await getDocs(todoQuery);
  let todoList = todoSnapshop.docs.map((doc) => {
    if (
      doc.data().id === todoId &&
      doc.data().checklist[checklistIndex].id === checklistId
    ) {
      console.log(doc.data().checklist[checklistIndex]);
      console.log(isChecked);
      updateDoc(doc.ref, {
        checklist: checklists,
      });
    }
  });
}

async function updateTodoCompletion(todoIndex, isChecked) {
  let todoId = myTodos[todoIndex].id;
  let todoQuery = query(
    collection(db, 'todo'),
    where('id', '==', todoId),
    where('uid', '==', auth.currentUser.uid)
  );
  const todoSnapshop = await getDocs(todoQuery);
  let todoList = todoSnapshop.docs.map((doc) => {
    if (doc.data().id === todoId) {
      updateDoc(doc.ref, {
        isDone: isChecked,
      });
    }
  });
}

async function deleteTodo(index) {
  let todoId = parseInt(myTodos[index].id);
  let parsedTodos = collection(db, 'todo');
  let todosSnapshot = await getDocs(parsedTodos);
  let todosList = todosSnapshot.docs.map((doc) => {
    if (doc.data().id === todoId) {
      console.log(doc.data().id, 'doc id');
      console.log(todoId);
      deleteDoc(doc.ref);
    }
  });
}

// Get a list of cities from your database
async function getTodos(db, uid) {
  let todoQuery = query(collection(db, 'todo'), where('uid', '==', uid));
  const querySnapshot = await getDocs(todoQuery);
  const todosList = querySnapshot.docs.map((doc) => doc.data());
  todosList.sort((a, b) => a.id - b.id);
  todosList.forEach((e, i) => {
    const storedChecklist = [];
    e.checklist.forEach((el, ind) => {
      const storedChecklistItem = new Checklist(el.title, el.isDone, ind);
      storedChecklist.push(storedChecklistItem);
    });
    const storedTodo = new Todo(
      e.title,
      e.project,
      e.date,
      e.note,
      storedChecklist,
      e.isDone,
      e.id
    );
    //we push locally stored todos back to the array because todo elements lose prototype when parsed
    storedTodo.addToArray(myTodos);
    storedTodo.createTodo();
    // Todo.incrementIdCount();
    Todo.idCount = e.id + 1;
  });
  console.log(todosList, 'firestore todos');
  console.log(myTodos, 'mytodos array');
  return todosList;
}

async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
  window.location.reload();
}

function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!getAuth().currentUser;
}

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.style.backgroundImage =
      'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = userName;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    // Hide sign-in button.
    signInButtonElement.setAttribute('hidden', 'true');
    localStorageBtn.setAttribute('hidden', 'true');

    // We save the Firebase Messaging Device token and enable notifications.
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');

    // Show sign-in button.
    signInButtonElement.removeAttribute('hidden');
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    removeProjects();
    removeContent();
    localStore = false;
    const uid = user.uid;
    getTodos(db, uid);
    getProjects(db, uid);
    console.log('signed in');
    // ...
  } else {
    removeContent();
    removeProjects();
    console.log('sign in');
    // User is signed out
    // ...
  }
});

function initLocalStore() {
  removeProjects();
  removeContent();
  signInButtonElement.setAttribute('hidden', 'true');
  localStorageBtn.setAttribute('hidden', 'true');
  localStore = true;
  initLocalProjects();
  if (!localStorage.getItem('myTodos')) {
    storeTodos();
  } else {
    getData();
  }
}
