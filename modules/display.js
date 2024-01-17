import { createAndAppendElement } from "./createElement.js"
import { timePostedDifference } from "./date.js"

export function displayLoggedInUser() {
    const cookieValue = document.cookie.split("username=").slice(1)
    const displayLoggedInUserEl = document.querySelector('#loggedInUsername')
    displayLoggedInUserEl.innerText = cookieValue
    

    displayDeletBtnForUser()

    if(document.cookie !== '') {
        const signInBtn = document.querySelector('.sign-in-btn')
        const logOutButton = document.querySelector('#logOut')
        const logInContainerEl = document.querySelector('#logIn')
        signInBtn.classList.toggle('hide')
        logOutButton.classList.toggle('hide')
        logInContainerEl.style.display = 'none'
    }
}

export function displayGuest() {
    const displayLoggedInUserEl = document.querySelector('#loggedInUsername')
    const signInBtn = document.querySelector('.sign-in-btn')
    const logOutButton = document.querySelector('#logOut');
    const allMessageDeleteBtns = document.querySelectorAll('.delete-message-btn')
    allMessageDeleteBtns.forEach(deleteBtn => deleteBtn.remove())
    
    if(document.cookie !== '') {
        displayLoggedInUserEl.innerText = ''
        signInBtn.classList.toggle('hide')
        logOutButton.classList.toggle('hide');
    }
}

export function getAndDisplayExistingMessages(messagesObj) {
    const messageBoardEl = document.querySelector('#messageBoard')
    const cookieValue = document.cookie.split("username=").slice(1)[0]

    for(const key in messagesObj) {
        const uniqueMessage = messagesObj[key]
        const div = createAndAppendElement('div', "", messageBoardEl)
        div.classList.add('message-box')
        div.id = key

        const messageHeader = createAndAppendElement('div', '', div)
        messageHeader.classList.add('contentMessageHeader')

        const messageHeaderLeft = createAndAppendElement('div', '', messageHeader)
        messageHeaderLeft.classList.add('contentMessageHeader-left')

        createAndAppendElement('h3', uniqueMessage.username, messageHeaderLeft)
        createAndAppendElement('p', timePostedDifference(uniqueMessage.date), messageHeaderLeft)

        if(uniqueMessage.username === cookieValue) {
            const deleteMessageBtn = createAndAppendElement('a', '×', messageHeader)
            deleteMessageBtn.classList.add('delete-message-btn')
        }

        const messageContent = createAndAppendElement('div', '', div)
        messageContent.classList.add('inner-msg-container')
        createAndAppendElement('p', uniqueMessage.message, messageContent)
    }
}

export function displayMessage(uniqueMessage, uniqueKey) {
    const messageBoardEl = document.querySelector('#messageBoard')
    const cookieValue = document.cookie.split("username=").slice(1)[0]

    const div = createAndAppendElement('div', "", messageBoardEl)
    div.classList.add('message-box')
    div.id = uniqueKey

    const messageHeader = createAndAppendElement('div', '', div)
    messageHeader.classList.add('contentMessageHeader')

    const messageHeaderLeft = createAndAppendElement('div', '', messageHeader)
    messageHeaderLeft.classList.add('contentMessageHeader-left')

    createAndAppendElement('h3', uniqueMessage.username, messageHeaderLeft)
    createAndAppendElement('p', timePostedDifference(uniqueMessage.date), messageHeaderLeft)

    if(uniqueMessage.username === cookieValue) {
        const deleteMessageBtn = createAndAppendElement('a', '×', messageHeader)
        deleteMessageBtn.classList.add('delete-message-btn')
    }

    const messageContent = createAndAppendElement('div', '', div)
    messageContent.classList.add('inner-msg-container')
    createAndAppendElement('p', uniqueMessage.message, messageContent)
}

function displayDeletBtnForUser() {
    const allMessageHeader = document.querySelectorAll('.contentMessageHeader')
    const cookieValue = document.cookie.split("username=").slice(1)[0]

    allMessageHeader.forEach(messageHeader => {
        const username = messageHeader.querySelector('h3').innerText
        if(username === cookieValue) {
            const deleteMessageBtn = createAndAppendElement('a', '×', messageHeader)
            deleteMessageBtn.classList.add('delete-message-btn')
        }
    })
}