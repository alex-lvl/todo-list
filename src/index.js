import 'bootstrap'
import { Todo, Checklist, myTodos } from './todo'
import { expandTodo,expandSideBar } from './expand'
import { displayForm} from './form'
import { displayInbox } from './inbox'
import { displayPresentTodos } from './today'
import { displayWeekTodos } from './week'
import { activateProjectTabListeners } from './projects'
export { submitTodo, submitEdit, newChecklistItem, removeContent, storeTodos }

const linkTabs = document.querySelectorAll('.link');
const todoContent = document.querySelector('.content');

(function activateEventListeners() {
    expandTodo();
    expandSideBar();
    activateProjectTabListeners();
})();

function newChecklistItem(title,isDone,id) {
    return new Checklist(title,isDone,id)
}

function submitTodo(title,project,date,notes,checklist,isDone) {
    const todo = new Todo(title,project,date,notes,checklist,isDone,Todo.idNum());
    todo.addToArray(myTodos);
    Todo.incrementIdCount();
    storeTodos();
    console.log(myTodos);
}

function submitEdit(title,project,date,note,checklist,index) {
    const existingTodo = myTodos[index]
    existingTodo.title = title;
    existingTodo.project = project;
    existingTodo.date = date;
    existingTodo.note = note;
    existingTodo.checklist = checklist;
    storeTodos();
    console.log(myTodos);
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
})

todoContent.addEventListener('click', (e) => {
    if (e.target.name === 'todoCheckBox' && e.target.checked === false) {
        const todoIndex = myTodos.findIndex(element => element.id === parseInt(e.target.parentNode.parentNode.dataset.index));
        myTodos[todoIndex].isDone = false;
        storeTodos();
    } 
    else if (e.target.name === 'todoCheckBox' && e.target.checked === true) {
        const todoIndex = myTodos.findIndex(element => element.id === parseInt(e.target.parentNode.parentNode.dataset.index));
        myTodos[todoIndex].isDone = true;
        storeTodos();
    }

    if (e.target.name === 'checklistCheckbox' && e.target.checked === false) {
        const checklistTodoIndex = myTodos.findIndex(element => element.id === parseInt(e.target.parentNode.parentNode.parentNode.parentNode.dataset.index));
        const checklistItemIndex = myTodos[checklistTodoIndex].checklist.findIndex(el => el.id === parseInt(e.target.parentNode.dataset.index))
        myTodos[checklistTodoIndex].checklist[checklistItemIndex].isDone = false;
        storeTodos();
    } 
    else if (e.target.name === 'checklistCheckbox' && e.target.checked === true) {
        const checklistTodoIndex = myTodos.findIndex(element => element.id === parseInt(e.target.parentNode.parentNode.parentNode.parentNode.dataset.index));
        const checklistItemIndex = myTodos[checklistTodoIndex].checklist.findIndex(el => el.id === parseInt(e.target.parentNode.dataset.index));
        myTodos[checklistTodoIndex].checklist[checklistItemIndex].isDone = true;
        storeTodos();
    }

    const deleteBtn = e.target.closest('.todo-delete');
    const editBtn = e.target.closest('.todo-edit');

    if (deleteBtn) {
        const index = myTodos.findIndex(element => element.id === parseInt(deleteBtn.parentNode.parentNode.parentNode.dataset.index));
        deleteBtn.parentElement.parentElement.parentElement.remove();
        myTodos.splice(index,1);
        storeTodos();
        console.log('deleted todo');
    } 
    else if (editBtn) {
        const index = myTodos.findIndex(element => element.id === parseInt(editBtn.parentNode.parentNode.parentNode.dataset.index));
        myTodos[index].editTodo();
        console.log('edited todo');
    }
});

function removeContent() {
    while (todoContent.firstChild) {
        todoContent.removeChild(todoContent.firstChild);
      }
}

// (function defaultTodos() {
//     let checklist = [
//         new Checklist('eat',false),
//         new Checklist('code',false),
//         new Checklist('sleep',false),
//     ]
//     myTodos.push(new Todo('learn to code','personal','2021-07-10','lorem ipsum',checklist,false,Todo.idNum()));
//     myTodos[Todo.idNum()].createTodo();
//     Todo.incrementIdCount();
// })();

function storeTodos() {
    localStorage.setItem(`myTodos`, JSON.stringify(myTodos));
}

function getData() {
    const storedTodos = localStorage.getItem('myTodos');
    const parsedTodos = JSON.parse(storedTodos);

    parsedTodos.forEach((e,i) => {
        const storedChecklist = []
        e.checklist.forEach((el,ind) => {
            const storedChecklistItem = new Checklist(el.title,el.isDone,ind);
            storedChecklist.push(storedChecklistItem);
        });

        const storedTodo = new Todo(e.title,e.project,e.date,e.note,storedChecklist,e.isDone,i);
        //we push locally stored todos back to the array because todo elements lose prototype when parsed
        storedTodo.addToArray(myTodos);
        storedTodo.createTodo();
        Todo.incrementIdCount();
    });
}

if(!localStorage.getItem('myTodos')) {
    storeTodos()
} else {
    getData();
}