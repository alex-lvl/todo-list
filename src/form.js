export {displayForm};
import {submitTodo} from './index'

const formHeader = document.querySelector('header');
const content = document.querySelector('.content');

function displayForm() {
    updateHeader();
    createFormElements();
}

function updateHeader() {
    formHeader.innerHTML = `
    <h1>
        <svg xmlns="http://www.w3.org/2000/svg" id="pencil-icon" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
        </svg>
        <span class="text-capitalize">New Todo</span>
    </h1>`;
}

function createFormElements() {
    const todoForm = document.createElement('form');
    todoForm.className = 'todo-form'

    const titleInputContainer = document.createElement('p');
    const titleLabel =document.createElement('label');
    const titleInput = document.createElement('input');
    titleLabel.for = 'title';
    titleLabel.textContent = 'title';
    titleInput.className = 'form-control';
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInputContainer.appendChild(titleLabel);
    titleInputContainer.appendChild(titleInput);

    const projectMenuContainer = document.createElement('p');
    const projectLabel = document.createElement('label');
    const projectMenu = document.createElement('select');
    const projectOption =document.createElement('option');
    projectLabel.innerText = 'select a project';
    projectOption.selected = true;
    projectOption.textContent = 'choose a project';
    projectMenu.className = 'form-select';
    projectMenu.name = 'project';
    projectMenu.appendChild(projectOption)
    projectMenuContainer.appendChild(projectLabel);
    projectMenuContainer.appendChild(projectMenu);

    const dateContainer = document.createElement('p');
    const dateLabel =document.createElement('label');
    const dateInput = document.createElement('input');
    dateLabel.innerText = 'date'
    dateInput.type = 'date';
    dateInput.name = 'date';
    dateContainer.appendChild(dateLabel);
    dateContainer.appendChild(dateInput);

    const notesContainer = document.createElement('p');
    const notesLabel =document.createElement('label');
    const notesInput = document.createElement('textarea');
    notesLabel.innerText = 'notes'
    notesInput.className = 'form-control'
    notesInput.name = 'notes';
    notesInput.cols = 30;
    notesInput.rows = 3;
    notesInput.maxLength = 60;
    notesContainer.appendChild(notesLabel);
    notesContainer.appendChild(notesInput);

    const checklistContainer = document.createElement('div');

    const checklistBtnContainer = document.createElement('p');
    const checklistBtn = document.createElement('button');
    checklistBtn.type = 'button';
    checklistBtn.className = 'btn btn-primary btn-sm checklist-btn';
    checklistBtn.innerText = 'add checklist';
    checklistBtnContainer.appendChild(checklistBtn);
    checklistBtn.addEventListener('click', () => {
        createChecklist(checklistContainer);
    });

    const submitBtnContainer = document.createElement('div');
    const submitBtn = document.createElement('button');
    submitBtnContainer.className = 'd-grid gap-2';
    submitBtn.className = 'btn btn-success';
    submitBtn.type = 'button';
    submitBtn.textContent = 'submit';
    submitBtnContainer.appendChild(submitBtn);

    submitBtn.addEventListener('click', () => {
        const checklistInputs = document.querySelectorAll('.checklist-input');
        let checklist = [];
        checklistInputs.forEach(e => {
            checklist.push(e.value);
        });
        submitTodo(titleInput.value,projectOption.text,dateInput.value,notesInput.value,checklist);
    });

    todoForm.appendChild(titleInputContainer);
    todoForm.appendChild(projectMenuContainer);
    todoForm.appendChild(dateContainer);
    todoForm.appendChild(notesContainer);
    todoForm.appendChild(checklistContainer);
    todoForm.appendChild(checklistBtnContainer);
    todoForm.appendChild(submitBtnContainer);

    content.appendChild(todoForm);
}

function createChecklist(container) {
    const checklistItem = document.createElement('div');

    const checklistTitle = document.createElement('label');
    checklistTitle.textContent = 'Checklist Item';
    const checklistInput = document.createElement('input');
    checklistInput.className = 'form-group checklist-input'
    checklistInput.type = 'text';
    checklistInput.placeholder = 'name';

    checklistItem.appendChild(checklistTitle);
    checklistItem.appendChild(checklistInput);
    container.appendChild(checklistItem);
}