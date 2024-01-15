/* Hamburger menu */
const hamburgerMenu = document.querySelector('.hamburger-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

hamburgerMenu.addEventListener('click', (event)=>{
    event.preventDefault();
    hamburgerMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
})