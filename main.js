import { getUserData, postUserData, deleteUserData } from "./modules/api.js";
import { displayLoggedInUser, displayGuest, getAndDisplayExistingMessages, displayMessage } from "./modules/display.js";

const hamburgerMenu = document.querySelector('.hamburger-menu');
const createAccountFormEl = document.querySelector('#createAccount')
const logInFormEl = document.querySelector('#logIn')
const logOutBtn = document.querySelector('#logOut')
const publishMessageFormEl = document.querySelector('#publishMessageForm')
const popUpModalBtns =  [... document.querySelectorAll('.popUpFormBtn')]
const closePopUpModalBtns = [... document.querySelectorAll('.closePopUp')]
const signInBtn = document.querySelector('.sign-in-btn');
const messageBoardEl = document.querySelector('#messageBoard')


displayLoggedInUser();
console.log(document.cookie);

// Se alla existerande användare
getUserData('users', '')
.then(users => console.log(users))
.catch(error => console.log(error))

getUserData('messages', '')
.then(messages => getAndDisplayExistingMessages(messages))
.catch(error => console.log(error))

popUpModalBtns.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        let modal = button.getAttribute('data-modal');
        
        if (modal === 'logIn') {
            const logInForm = document.querySelector('#createAccount');
            logInForm.style.display = 'none';
        } else if (modal === 'createAccount') {
            const createAccountForm = document.querySelector('#logIn');
            createAccountForm.style.display = 'none';
        }
        
        document.getElementById(modal).style.display = 'flex';
    });
});


closePopUpModalBtns.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault()
        let modal = button.closest('.popUpForm')
        modal.style.display = 'none';
        
        
    })
})


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
    
    
    
    getUserData('users', '')
    .then(users => {
        for(const user in users) {
            if(userNameInputValue === users[user].username && passwordInputValue === users[user].password) {
                document.cookie = `username=${userNameInputValue};`
                console.log(userNameInputValue, 'logged in');
                displayLoggedInUser();

                break;

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
    const messageDate = new Date()
    const uniqueMessage = {
        message: messageElValue,
        username: cookieValue,
        date: messageDate
    }
    const displayGuestMessage = document.querySelector('#publishMessageForm > h3')
    displayGuestMessage.innerText = ''
    let uniqueKey;

    if(cookieValue !== undefined) {
        postUserData('messages', uniqueMessage)
        .then(key => {
            uniqueKey = key.name;
            return getUserData('messages', key.name);
        })
        .then(message => displayMessage(message, uniqueKey))
        .catch(error => console.log(error))
    }
    else displayGuestMessage.innerText = 'Log in to publish a message'

    publishMessageFormEl.reset()
})

messageBoardEl.addEventListener('click', event => {
    event.preventDefault()

    if(event.target.getAttribute('class') === 'delete-message-btn') {
        const parentContainer = event.target.closest('.message-box');
        parentContainer.remove();

        getUserData('messages', '')
            .then(messages => {
                for(const key in messages) {
                    if(key === parentContainer.id) deleteUserData('messages', key)
                }
            })
            .catch(error => console.log(error))
    }
})