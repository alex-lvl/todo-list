import 'bootstrap'
import {expandTodo,expandSideBar} from './expand';
import {displayForm} from './form';

const linkTabs = document.querySelectorAll('.link');
const todoContent = document.querySelector('.content');
const checklistBtn = document.querySelector('.checklist-btn');
const checklistContainer = document.querySelector('.checklist-container')
const myTodos = [];

expandTodo()
expandSideBar()

class Todo {
    constructor(title,project,date,note,...checklist) {
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

checklistBtn.addEventListener('click', () => {
    createChecklist();
});

function createChecklist() {
    const checklistItem = document.createElement('div');

    const checklistTitle = document.createElement('label');
    checklistTitle.textContent = 'Checklist Item';
    const checklistInput = document.createElement('input');
    checklistInput.className = 'form-control-sm'
    checklistInput.type = 'text';
    checklistInput.placeholder = 'name';

    checklistItem.appendChild(checklistTitle);
    checklistItem.appendChild(checklistInput);
    checklistContainer.appendChild(checklistItem);
}

const vacation =  new Todo('borrow sarahs travel guide','vacation at rome','today')
vacation.createTodo();

linkTabs.forEach((e) => {
    e.addEventListener('click', () => {
        removeContent();
        switch(e) {
            case linkTabs[0]:
                displayForm();
        }
    });
})

function removeContent() {
    while (todoContent.firstChild) {
        todoContent.removeChild(todoContent.firstChild);
      }
}