import { createAndAppendElement } from "./createElement.js"

export function displayLoggedInUser() {

    const cookieValue = document.cookie.split("username=").slice(1)
    const displayLoggedInUserEl = document.querySelector('#loggedInUsername')
    displayLoggedInUserEl.innerText = cookieValue

    if(document.cookie !== '') {
        const signInBtn = document.querySelector('.sign-in-btn')
        signInBtn.classList.toggle('hide')
    }

}

export function displayGuest() {
    const displayLoggedInUserEl = document.querySelector('#loggedInUsername')
    const signInBtn = document.querySelector('.sign-in-btn')
    
    displayLoggedInUserEl.innerText = ''
    signInBtn.classList.toggle('hide')
}

export function getAndDisplayExistingMessages(messagesObj) {
    const messageBoardEl = document.querySelector('#messageBoard')

    for(const message in messagesObj) {
        const uniqueMessage = messagesObj[message]
       const div = createAndAppendElement('div', "", messageBoardEl)
       div.classList.add('message-box')
        createAndAppendElement('h3', uniqueMessage.username, div)
        createAndAppendElement('p', uniqueMessage.message, div)
    }
}

export function displayMessage(uniqueMessage) {
    const messageBoardEl = document.querySelector('#messageBoard')

   const div = createAndAppendElement('div', "", messageBoardEl)
   div.classList.add('message-box')
   createAndAppendElement('h3', uniqueMessage.username, div)
   createAndAppendElement('p', uniqueMessage.date, div)
   createAndAppendElement('p', uniqueMessage.message, div)
}