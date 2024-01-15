import { getUserData, postUserData, deleteUserData } from "./modules/api.js";

const createAccountFormEl = document.querySelector('#createAccount')
const logInFormEl = document.querySelector('#logIn')

createAccountFormEl.addEventListener('submit', event => {
    event.preventDefault()
    const userNameInputValue = document.querySelector('#createUsername').value
    const passwordInputValue = document.querySelector('#createPassword').value
    const user = {
        username: userNameInputValue,
        password: passwordInputValue
    }

    postUserData('users', user)
    .then(result => console.log(result))
    .catch(error => console.log(error))

    console.log('Account created!');
    createAccountFormEl.reset()
})

logInFormEl.addEventListener('submit', event => {
    event.preventDefault()
    const userNameInputValue = document.querySelector('#logInUsername').value
    const passwordInputValue = document.querySelector('#logInPassword').value
    const h2El = document.querySelector('#loggedIn')

    getUserData('users')
    .then(users => {
        for(const user in users) {
            if(userNameInputValue === users[user].username && passwordInputValue === users[user].password) {
                console.log(userNameInputValue, 'logged in');
                h2El.innerText = `Logged in: ${userNameInputValue}`
            }
            else {
                console.log('User does not exist');
                h2El.innerText = '';
            }
        }
    })
    .catch(error => console.log(error))
})

/* Hamburger menu */
const hamburgerMenu = document.querySelector('.hamburger-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

hamburgerMenu.addEventListener('click', (event)=>{
    event.preventDefault();
    hamburgerMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
})