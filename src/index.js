import 'bootstrap'

const expandButton = document.querySelector('.navbar-brand');
const sideBar = document.querySelector('aside');
const logoContainer = document.querySelector('.logo-container');
const sideBarText = document.querySelectorAll('.side-bar-text');
const logoName = document.querySelectorAll('.logo-name');
const mainContent = document.querySelector('main');
const navBar = document.querySelector('nav');
const sideLinks = document.querySelector('.side-links')
const sideProjects = document.querySelector('.side-projects');

expandButton.addEventListener('click', function() {
    sideBar.classList.toggle('side-bar-expanded');
    sideLinks.classList.toggle('side-links-expanded');
    sideProjects.classList.toggle('side-projects-expanded');
    logoContainer.classList.toggle('logo-container-expanded');
    mainContent.classList.toggle('main-content-expanded');
    navBar.classList.toggle('nav-expanded');
    sideBarText.forEach((e) => {
        e.classList.toggle('hide-text');
    })
    logoName.forEach((e) => {
        e.classList.toggle('hide-text');
    })
});

