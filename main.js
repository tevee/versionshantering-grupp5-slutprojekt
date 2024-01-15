import { getUserData, postUserData, deleteUserData } from "./modules/api.js";
import { displayLoggedInUser, displayGuest, getAndDisplayExistingMessages, displayMessage } from "./modules/display.js";

const hamburgerMenu = document.querySelector('.hamburger-menu');
const createAccountFormEl = document.querySelector('#createAccount')
const logInFormEl = document.querySelector('#logIn')
const logOutBtn = document.querySelector('#logOut')
const publishMessageFormEl = document.querySelector('#publishMessageForm')

displayLoggedInUser();
console.log(document.cookie);

// Se alla existerande användare
getUserData('users', '')
.then(users => console.log(users))
.catch(error => console.log(error))

getUserData('messages', '')
.then(messages => getAndDisplayExistingMessages(messages))
.catch(error => console.log(error))

hamburgerMenu.addEventListener('click', (event)=>{
    event.preventDefault();
    const offScreenMenu = document.querySelector('.off-screen-menu');
    hamburgerMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
})

createAccountFormEl.addEventListener('submit', event => {
    event.preventDefault()
    const userNameInputValue = document.querySelector('#createUsername').value
    const passwordInputValue = document.querySelector('#createPassword').value
    const createUser = {
        username: '',
        password: ''
    }

    getUserData('users', '')
    .then(users => {
        for(const user in users) {
            if(users[user].username === userNameInputValue) {
                createUser.username = ''
                createUser.password = ''
                break;
            }
            else {
                createUser.username = userNameInputValue
                createUser.password = passwordInputValue
            }
        }

        if(createUser.username !== '' && createUser.password !== '') {
            postUserData('users', createUser)
            .then(result => console.log(result))
            .catch(error => console.log(error))
            console.log('Account created!');
        }
    })
    .catch(error => console.log(error))

    createAccountFormEl.reset()
})

logInFormEl.addEventListener('submit', event => {
    event.preventDefault()
    const userNameInputValue = document.querySelector('#logInUsername').value
    const passwordInputValue = document.querySelector('#logInPassword').value
    const signInBtn = document.querySelector('.sign-in-btn')
    

    getUserData('users', '')
    .then(users => {
        for(const user in users) {
            if(userNameInputValue === users[user].username && passwordInputValue === users[user].password) {
                document.cookie = `username=${userNameInputValue};`
                console.log(document.cookie);
                console.log(userNameInputValue, 'logged in');
                signInBtn.classList.add('hide')
                signInBtn.classList.remove('show')
                displayLoggedInUser();
            }
        }
    })
    .catch(error => console.log(error))

    logInFormEl.reset()
})

logOutBtn.addEventListener('click', event => {
    event.preventDefault()
    displayGuest()
    // Remove cookie
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

})

publishMessageFormEl.addEventListener('submit', event => {
    event.preventDefault()
    const messageElValue = document.querySelector('#message').value
    const cookieValue = document.cookie.split("username=").slice(1)[0]
    const messageDate = new Date().toLocaleString();
    const uniqueMessage = {
        message: messageElValue,
        username: cookieValue,
        date: messageDate
    }

    postUserData('messages', uniqueMessage)
    .then(key => getUserData('messages', key.name))
    .then(displayMessage)
    .catch(error => console.log(error))

    publishMessageFormEl.reset()
})