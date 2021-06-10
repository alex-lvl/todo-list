export {expandSideBar, expandTodo}

const expandButton = document.querySelector('.navbar-brand');
const sideBar = document.querySelector('aside');
const logoContainer = document.querySelector('.logo-container');
const logoName = document.querySelectorAll('.logo-name');
const mainContent = document.querySelector('main');
const navBar = document.querySelector('nav');
const sideLinks = document.querySelector('.side-links');
const sideProjects = document.querySelector('.side-projects');
const sideProjectsHeader= document.querySelector('.side-projects-header');
const todoContent = document.querySelector('.content')
const expandedTodo = document.querySelector('.todo-container-expanded');

function expandSideBar() {
    expandButton.addEventListener('click', function() {
        const sideBarText = document.querySelectorAll('.link-text');
        
        sideBar.classList.toggle('side-bar-expanded');
        sideLinks.classList.toggle('side-links-expanded');
        sideProjects.classList.toggle('side-projects-expanded');
        sideProjectsHeader.classList.toggle('side-projects-expanded');
        logoContainer.classList.toggle('logo-container-expanded');
        mainContent.classList.toggle('main-content-expanded');
        navBar.classList.toggle('nav-expanded');
        sideBarText.forEach((e) => {
            e.classList.toggle('hide-text');
        });
        logoName.forEach((e) => {
            e.classList.toggle('hide-text');
        });
    });
}

function expandTodo() {
    todoContent.addEventListener('click', function(e) {
        if (e.target.className == 'todo-container') {
            e.target.children[1].classList.toggle('hide-element');
        }
    });
};
