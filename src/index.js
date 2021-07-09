import 'bootstrap'
import {expandTodo,expandSideBar} from './expand';
import {displayForm} from './form';
import {displayInbox} from './inbox'
import {displayPresentTodos} from './today'
import {displayWeekTodos} from './week'
import {activateProjectTabListeners} from './projects'
import { getDay,isThisWeek } from 'date-fns'
export {submitTodo,newChecklistItem}

const linkTabs = document.querySelectorAll('.link');
const todoContent = document.querySelector('.content');
const myTodos = [];
export {myTodos}

(function activateEventListeners() {
    expandTodo();
    expandSideBar();
    activateProjectTabListeners();
})();

class Todo {
    static idCount = 0;

    static incrementIdCount() {
        this.idCount += 1;
    }

    static idNum() {
        return this.idCount;
    }
    constructor(title,project,date,note,checklist,isDone,id) {
        this.title = title
        this.project = project
        this.date = date
        this.note = note
        this.checklist = checklist
        this.isDone = isDone
        this.id = id
    }

    addToArray(arr) {
        arr.push(this);
    }

    createTodo() {
        const todoContainer = document.createElement('div');
        todoContainer.className = 'todo-container';
        todoContainer.setAttribute('data-index', this.id);

        const todo = document.createElement('div');
        todo.className = 'd-flex';

        const todoCheckbox = document.createElement('input');
        todoCheckbox.type = 'checkbox';
        todoCheckbox.name = 'todoCheckBox';
        todoCheckbox.checked = this.isDone;
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
        date.dateTime = this.date;
        date.textContent = this.date;

        todo.appendChild(todoCheckbox);
        todo.appendChild(todoHeaderContainer);
        todo.appendChild(date);
        todoContainer.appendChild(todo);
        todoContainer.appendChild(this.createExpandedTodo())
        todoContent.appendChild(todoContainer);
    }

    createExpandedTodo() {
        const expandedTodoContainer = document.createElement('div');
        expandedTodoContainer.className = 'todo-container-expanded hide-element';

        const notes = document.createElement('p');
        notes.className = 'todo-notes';
        notes.textContent = this.note;

        const checklistContainer = document.createElement('div');
        this.checklist.forEach(e => {
            e.createChecklistItem(checklistContainer);
        });

        const iconsContainer = document.createElement('div');
        iconsContainer.className = 'todo-icons-container d-flex justify-content-end'
        iconsContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-pencil-square todo-edit" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-trash-fill todo-delete" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg> `;

        expandedTodoContainer.appendChild(notes);
        expandedTodoContainer.appendChild(checklistContainer);
        expandedTodoContainer.appendChild(iconsContainer);
        return expandedTodoContainer;
    }

    isTodoToday() {
        const today = new Date();
        //this code converts the dash (-) mark into forward slash (/) to fix date format
        let date = new Date(this.date.replace(/-/g, '\/'));
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    isTodoThisWeek() {
        const today = new Date();
        let date = new Date(this.date.replace(/-/g, '\/'));
        let dayIndex = getDay(today);
        return isThisWeek(date, { weekStartsOn : dayIndex });
    }
}

class Checklist  {
    constructor(title,isDone) {
        this.title = title;
        this.isDone = isDone;
    }

    createChecklistItem(container) {
        const checklistItem = document.createElement('div');
        checklistItem.className = 'checklist-item d-flex'

        const checklistInput = document.createElement('input');
        checklistInput.type = 'checkbox';
        checklistInput.checked = this.isDone;

        const checklistTitle = document.createElement('p');
        checklistTitle.className = 'checklist-desc';
        checklistTitle.textContent = this.title;

        checklistItem.appendChild(checklistInput);
        checklistItem.appendChild(checklistTitle);

        container.appendChild(checklistItem);
    }
}

function newChecklistItem(title,isDone) {
    let item = new Checklist(title,isDone)
    return item
}

function submitTodo(title,project,date,notes,checklist,isDone) {
    const todo = new Todo(title,project,date,notes,checklist,isDone,Todo.idNum());
    todo.addToArray(myTodos);
    Todo.incrementIdCount();
    console.log(myTodos);
}

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

function removeContent() {
    while (todoContent.firstChild) {
        todoContent.removeChild(todoContent.firstChild);
      }
}

(function defaultTodos() {
    let checklist = [
        new Checklist('eat',false),
        new Checklist('code',false),
        new Checklist('sleep',false),
    ]
    myTodos.push(new Todo('learn to code','personal','2021-07-10','lorem ipsum',checklist,false,Todo.idNum()));
    myTodos[0].createTodo();
    Todo.incrementIdCount();
})();