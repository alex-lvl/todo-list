export {expandSideBar, expandTodo}
import {myProjects} from './projects'

const expandButton = document.querySelector('.navbar-brand');
const sideBar = document.querySelector('aside');
const logoContainer = document.querySelector('.logo-container');
const logoName = document.querySelectorAll('.logo-name');
const mainContent = document.querySelector('main');
const navBar = document.querySelector('nav');
const sideLinks = document.querySelector('.side-links');
const projectTabs = document.querySelector('.side-projects');
const sideProjectsHeader= document.querySelector('.side-projects-header');
const newProjectBtn = document.querySelector('.side-projects-form-tab');
const todoContent = document.querySelector('.content')

function expandSideBar() {
    expandButton.addEventListener('click', function() {
        const sideBarText = document.querySelectorAll('.link-text');
        
        sideBar.classList.toggle('side-bar-expanded');
        sideLinks.classList.toggle('side-links-expanded');
        projectTabs.classList.toggle('side-projects-expanded');
        sideProjectsHeader.classList.toggle('side-projects-expanded');
        newProjectBtn.classList.toggle('side-projects-expanded')
        logoContainer.classList.toggle('logo-container-expanded');
        mainContent.classList.toggle('main-content-expanded');
        navBar.classList.toggle('nav-expanded');
        sideBarText.forEach((e) => {
            e.classList.toggle('hide-text');
        });
        logoName.forEach((e) => {
            e.classList.toggle('hide-text');
        });

        if(sideBar.classList.contains('side-bar-expanded')) {
            expandButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" id="btn-expand" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"/>
            </svg> `;
        } else {
            expandButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" id="btn-expand" fill="currentColor" class="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
            </svg> `;
        }
        removeExistingProjectForms();
    });
}

function expandTodo() {
    todoContent.addEventListener('click', function(e) {
        if (e.target.className == 'todo-container') {
            e.target.children[1].classList.toggle('hide-element');
        }
    });
};

function removeExistingProjectForms() {
    let isSideBarExpanded = sideBar.classList.contains('side-bar-expanded');
    let projectList = [...projectTabs.children];

    if(!isSideBarExpanded) {
        for(let i = 0; i < myProjects.length; i++) {
            if(!projectList[i].classList.contains('project')) {
                projectList[i].remove()
                myProjects.splice(i,1);
                console.log(myProjects);
            } 
            projectList = [...projectTabs.children];
        }
    }
}
