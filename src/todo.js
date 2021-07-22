import { getDay, isThisWeek } from 'date-fns'
import { createFormElements, createChecklistInput } from './form'
import { removeContent } from './index';
export { Todo, Checklist, myTodos }

const header = document.querySelector('header');
const todoContent = document.querySelector('.content');
let myTodos = [];

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

    createTodoContainer() {
        const todoContainer = document.createElement('div');
        todoContainer.className = 'todo-container';
        todoContainer.setAttribute('data-index', this.id);

        return { todoContainer }
    }

    createTodoCheckbox() {
        const todoCheckbox = document.createElement('input');
        todoCheckbox.type = 'checkbox';
        todoCheckbox.name = 'todoCheckBox';
        todoCheckbox.checked = this.isDone;

        return { todoCheckbox }
    }

    createTodoHeader() {
        const todoHeaderContainer = document.createElement('div');
        todoHeaderContainer.className = 'todo-header-container';

        const todoTitle = document.createElement('p');
        todoTitle.className = 'todo-title'
        todoTitle.textContent = this.title;

        const todoProject = document.createElement('p');
        todoProject.className = 'todo-project text-muted';
        todoProject.textContent = this.project;

        todoHeaderContainer.appendChild(todoTitle);
        todoHeaderContainer.appendChild(todoProject);

        return { todoHeaderContainer } 
    }

    createTodoDate() {
        const date = document.createElement('time');
        date.className = 'todo-date ms-auto'
        date.dateTime = this.date;
        date.textContent = this.date;

        return { date }
    }

    createTodo() {
        const { todoCheckbox } = this.createTodoCheckbox();
        const { todoHeaderContainer } = this.createTodoHeader();
        const { date } = this.createTodoDate();

        const todo = document.createElement('div');
        todo.className = 'd-flex';
        todo.appendChild(todoCheckbox);
        todo.appendChild(todoHeaderContainer);
        todo.appendChild(date);

        const { todoContainer } = this.createTodoContainer();
        todoContainer.appendChild(todo);
        todoContainer.appendChild(this.createExpandedTodo())
        todoContent.appendChild(todoContainer);
    }

    createTodoNotes() {
        const notes = document.createElement('p');
        notes.className = 'todo-notes';
        notes.textContent = this.note;

        return { notes }
    }
    
    createTodoChecklist() {
        const checklistContainer = document.createElement('div');
        this.checklist.forEach((e) => {
            e.createChecklistItem(checklistContainer);
        });

        return { checklistContainer }
    }

    createTodoIcons() {
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

        return { iconsContainer }
    }

    createExpandedTodo() {
        const expandedTodoContainer = document.createElement('div');
        expandedTodoContainer.className = 'todo-container-expanded hide-element';

        const { notes } = this.createTodoNotes();
        const { checklistContainer } = this.createTodoChecklist();
        const { iconsContainer } = this.createTodoIcons();

        expandedTodoContainer.appendChild(notes);
        expandedTodoContainer.appendChild(checklistContainer);
        expandedTodoContainer.appendChild(iconsContainer);

        return expandedTodoContainer;
    }

    isTodoToday() {
        const today = new Date();
        //this code converts the dash mark (-) into forward slash (/) to fix the date's odd format
        const date = new Date(this.date.replace(/-/g, '\/'));
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    isTodoThisWeek() {
        const today = new Date();
        const date = new Date(this.date.replace(/-/g, '\/'));
        const dayIndex = getDay(today);
        return isThisWeek(date, { weekStartsOn : dayIndex });
    }

    editTodo() {
        removeContent();
        header.innerHTML = `
        <h1>
            <svg xmlns="http://www.w3.org/2000/svg" height=1em width=1em class="bi bi-pencil-square todo-edit" viewBox="0 0 16 16" fill="rgba(252, 195, 90, 0.856)">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
            <span class="text-capitalize">edit todo</span>
        </h1>`;
        let form = createFormElements(true,this.id);
        form.titleInput.value = this.title;
        Array.from(form.projectMenu.children).forEach((option) => {
            option.value === this.project ? option.selected = true : undefined;
        });
        form.dateInput.value = this.date;
        form.notesInput.value = this.note;
        this.checklist.forEach((e) => {
            // let input = createChecklistInput(form.checklistContainer);
            const { checklistInputContainer, checklistInput } = createChecklistInput();
            form.checklistContainer.appendChild(checklistInputContainer)
            checklistInput.value = e.title;
        });
    }
}

class Checklist  {
    constructor(title,isDone,id) {
        this.title = title;
        this.isDone = isDone;
        this.id = id;
    }

    createChecklistItem(container) {
        const checklistItem = document.createElement('div');
        checklistItem.className = 'checklist-item d-flex'
        checklistItem.setAttribute('data-index', this.id);

        const checklistInput = document.createElement('input');
        checklistInput.type = 'checkbox';
        checklistInput.name = 'checklistCheckbox'
        checklistInput.checked = this.isDone;

        const checklistTitle = document.createElement('p');
        checklistTitle.className = 'checklist-title';
        checklistTitle.textContent = this.title;

        checklistItem.appendChild(checklistInput);
        checklistItem.appendChild(checklistTitle);
        container.appendChild(checklistItem);
    }
}
