export {displayInbox} 
import {myTodos} from './index'

const inboxHeader = document.querySelector('header');
const todoContent = document.querySelector('.content');

function displayInbox() {
    updateInboxHeader();
    appendTodos();
}

function updateInboxHeader() {
    inboxHeader.innerHTML = `
    <h1>
        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-inbox-fill inbox-icon" viewBox="0 0 16 16">
            <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"/>
        </svg>
        <span class="text-capitalize">inbox</span>
    </h1>
    <p class="m-0 text-muted text-capitalize">greetings!</p>`;
}

function appendTodos() {
    myTodos.forEach((e) => {
        e.createTodo();
    });
}

todoContent.addEventListener('click', (e) => {
    let todoIndex = e.target.parentNode.parentNode.dataset.index;
    let deleteBtn = e.target.closest('.todo-delete');
    let editBtn = e.target.closest('.todo-edit');

    if(e.target.name === 'todoCheckBox' && e.target.checked === false) {
        myTodos[todoIndex].isDone = false;
    } else if(e.target.name === 'todoCheckBox' && e.target.checked === true) {
        myTodos[todoIndex].isDone = true;
    }

    if(deleteBtn) {
        deleteBtn.parentElement.parentElement.parentElement.remove();
        console.log(deleteBtn.parentNode.parentNode.parentNode.dataset.index);
        myTodos.splice(deleteBtn.parentNode.parentNode.parentNode.dataset.index,1);
        updateIndex();
        console.log(myTodos);
        console.log('deleted todos');
    } else if (editBtn) {
        console.log('edit');
    }
});

//bug - index doesnt properly update when deleted from a project interface
function updateIndex() {
    for(let i = 0; i < myTodos.length; i++) {
        todoContent.children[i].dataset.index = i;
    }
}