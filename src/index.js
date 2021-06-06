import 'bootstrap'
import {expandTodo,expandSideBar} from './expand';
import {displayForm} from './form';
import {displayInbox} from './inbox'
import {displayPresentTodos} from './today'
import {displayWeekTodos} from './week'
import {displayProjectForm} from './projects'
export {submitTodo}

const linkTabs = document.querySelectorAll('.link');
const projectTabs = document.querySelector('.side-projects');
const todoContent = document.querySelector('.content');
const projectFormTab = document.querySelector('.new-project-tab');
const myTodos = [];

expandTodo()
expandSideBar()

class Todo {
    constructor(title,project,date,note,checklist) {
        this.title = title
        this.project = project
        this.date = date
        this.note = note
        this.checklist = checklist;
    }

    createTodo() {
        const todoContainer = document.createElement('div');
        todoContainer.className = 'todo-container';

        const todo = document.createElement('div');
        todo.className = 'd-flex';

        const todoCheckbox = document.createElement('input');
        todoCheckbox.type = 'checkbox';
        const todoHeaderContainer = document.createElement('div');
        todoHeaderContainer.className = 'todo-header-container';

        const todoTitle = document.createElement('p');
        todoTitle.textContent = this.title;
        const todoProject = document.createElement('p');
        todoProject.className = 'text-muted';
        todoProject.textContent = this.project;

        todoHeaderContainer.appendChild(todoTitle);
        todoHeaderContainer.appendChild(todoProject);

        const date = document.createElement('time');
        date.className = 'ms-auto'
        date.textContent = this.date;

        todo.appendChild(todoCheckbox);
        todo.appendChild(todoHeaderContainer);
        todo.appendChild(date);
        todoContainer.appendChild(todo);
        todoContent.appendChild(todoContainer);
    }
}

function submitTodo(title,project,date,notes,checklist) {
    const todo = new Todo(title,project,date,notes,checklist);
    todo.createTodo()
    myTodos.push(todo);
    console.log(todo);
}

const vacation =  new Todo('borrow sarahs travel guide','vacation at rome','today')
vacation.createTodo();

linkTabs.forEach((e) => {
    e.addEventListener('click', () => {
        removeContent();
        switch(e) {
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
})

projectTabs.addEventListener('click', e => {
    let project = e.target.closest('li')
    console.log(project);
    
    switch(project) {
        case projectFormTab:
            displayProjectForm();
            break;
    }
    
    if(e.target.classList.contains('cancel-project-icon')) {
        console.log('deleted project form');
        e.target.parentElement.remove();
    }
})

function removeContent() {
    while (todoContent.firstChild) {
        todoContent.removeChild(todoContent.firstChild);
      }
}