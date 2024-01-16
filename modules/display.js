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
        createAndAppendElement('h2', uniqueMessage.username, div)
        createAndAppendElement('p', uniqueMessage.message, div)

        /* Struktur innan createAndAppend lades till */
        /* const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const p = document.createElement('p')
        h2.innerText = uniqueMessage.username
        p.innerText = uniqueMessage.message
        messageBoardEl.append(div)
        div.append(h2,p) */
    }
}

// Temporär tills createAndAppend skapas
export function displayMessage(uniqueMessage) {
    const messageBoardEl = document.querySelector('#messageBoard')

   const div = createAndAppendElement('div', "", messageBoardEl)
   createAndAppendElement('h2', uniqueMessage.username, div)
   createAndAppendElement('p', uniqueMessage.date, div)
   createAndAppendElement('p', uniqueMessage.message, div)
   
   /* Struktur innan createAndAppend lades till */
    /* const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const p = document.createElement('p')
    const secondP = document.createElement('p')
    h2.innerText = uniqueMessage.username
    p.innerText = uniqueMessage.date
    secondP.innerText = uniqueMessage.message
    messageBoardEl.append(div)
    div.append(h2,p,secondP) */
}