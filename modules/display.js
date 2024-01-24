import { createAndAppendElement } from "./createElement.js"
import { timePostedDifference } from "./date.js"
import { setContrast } from "./colorContrast.js";

// Stoffe: Added module
import { startTimeUpdate } from "./timeupdate.js";

// Stoffe: Added this line. Update the "X hours/minutes/seconds ago" timestamp on all displayed messages every 10 seconds
startTimeUpdate(10);

function displayLikedIcons(messages) {
    const loggedInUser = document.cookie.split("username=").slice(1)[0]

    for (const key in messages) {
        const uniqueMessage = messages[key]
        for (const users of uniqueMessage.likes.users) {
            if (loggedInUser === users) {
                const likeIcon = document.querySelector(`#${key} > .message-footer > .like-btn > i`)
                likeIcon.classList.add('active')
            }
        }
    }
}

export function displayLoggedInUser(messages) {
    const loggedInUser = document.cookie.split("username=").slice(1)
    const displayLoggedInUserEl = document.querySelector('#loggedInUsername')
    displayLoggedInUserEl.innerText = loggedInUser
    displayLikedIcons(messages)

    if (document.cookie !== '') {
        const signInBtn = document.querySelector('.sign-in-btn')
        const logOutButton = document.querySelector('#logOut')
        const logInContainerEl = document.querySelector('#logIn')
        const dropDownMenu = document.querySelector('.hover-container');
        signInBtn.classList.toggle('hide')
        logOutButton.classList.toggle('hide')
        dropDownMenu.classList.toggle('hide');
        logInContainerEl.style.display = 'none'
    }
}

export function displayGuest() {
    const displayLoggedInUserEl = document.querySelector('#loggedInUsername')
    const signInBtn = document.querySelector('.sign-in-btn')
    const logOutButton = document.querySelector('#logOut');
    const allMessageDeleteBtns = document.querySelectorAll('.delete-message-btn')
    allMessageDeleteBtns.forEach(deleteBtn => deleteBtn.remove())
    const dropDownMenu = document.querySelector('.hover-container');
    const allLikeIcons = document.querySelectorAll('.like-icon')
    allLikeIcons.forEach(likeIcon => likeIcon.classList.remove('active'))

    if (document.cookie !== '') {
        displayLoggedInUserEl.innerText = ''
        signInBtn.classList.toggle('hide')
        logOutButton.classList.toggle('hide');
        dropDownMenu.classList.toggle('hide');
    }
}

export function getAndDisplayExistingMessages(messagesObj) {
    const messageBoardEl = document.querySelector('#messageBoard')
    const cookieValue = document.cookie.split("username=").slice(1)[0]

    for (const key in messagesObj) {
        const uniqueMessage = messagesObj[key]
        const div = createAndAppendElement('div', "", messageBoardEl)
        div.classList.add('message-box')
        div.style.backgroundColor = uniqueMessage.backgroundColor
        div.id = key

        const messageHeader = createAndAppendElement('div', '', div)
        messageHeader.classList.add('contentMessageHeader')

        const messageHeaderLeft = createAndAppendElement('div', '', messageHeader)
        messageHeaderLeft.classList.add('contentMessageHeader-left')

        const usernameEl = createAndAppendElement('h3', uniqueMessage.username, messageHeaderLeft)
        const timeDiffEl = createAndAppendElement('p', timePostedDifference(uniqueMessage.date), messageHeaderLeft)
        usernameEl.style.color = setContrast(uniqueMessage.backgroundColor)
        timeDiffEl.style.color = setContrast(uniqueMessage.backgroundColor)

        // Stoffe: Added line - set timestamp on attribute on message box
        div.setAttribute("timestamp", uniqueMessage.date);

        if (uniqueMessage.username === cookieValue) {
            const deleteMessageBtn = createAndAppendElement('a', '×', messageHeader)
            deleteMessageBtn.classList.add('delete-message-btn')
            deleteMessageBtn.style.color = setContrast(uniqueMessage.backgroundColor)
        }

        const messageContent = createAndAppendElement('div', '', div)
        messageContent.classList.add('inner-msg-container')
        const messageText = createAndAppendElement('p', uniqueMessage.message, messageContent)
        messageText.style.color = setContrast(uniqueMessage.backgroundColor)

        const messa = uniqueMessage.fontStyle;
        if (messa.includes("italic") && messa.includes("bold")) {
            messageContent.classList.add("italic", "bold");
        } else if (messa.includes("italic")) {
            messageContent.classList.add("italic");
        } else if (messa.includes("bold")) {
            messageContent.classList.add("bold");
        }
        const messageFooter = createAndAppendElement('div', '', div)
        const likeBtn = createAndAppendElement('button', '', messageFooter)
        const likeIcon = createAndAppendElement('i', '', likeBtn)
        const likesEl = createAndAppendElement('span', uniqueMessage.likes.likesCount, messageFooter)
        messageFooter.classList.add('message-footer')
        likeBtn.classList.add('like-btn')
        likeIcon.className = 'fa-solid fa-thumbs-up like-icon'
        likeIcon.style['-webkit-text-stroke'] = `1px ${setContrast(uniqueMessage.backgroundColor)}`
        likesEl.classList.add('amount-of-likes')
        likesEl.style.color = setContrast(uniqueMessage.backgroundColor)
    }
}

export function displayMessage(uniqueMessage, uniqueKey) {
    const messageBoardEl = document.querySelector('#messageBoard')
    const cookieValue = document.cookie.split("username=").slice(1)[0]

    const div = createAndAppendElement('div', "", messageBoardEl)
    div.classList.add('message-box')
    div.classList.add('messageBorder');
    div.style.backgroundColor = uniqueMessage.backgroundColor
    div.id = uniqueKey

    const elements = document.querySelectorAll('.messageBorder');

    if (elements.length > 0) elements[0].classList.add('messageBorder');
    if (elements.length > 1) elements[0].classList.remove('messageBorder');

    const messageHeader = createAndAppendElement('div', '', div)
    messageHeader.classList.add('contentMessageHeader')

    const messageHeaderLeft = createAndAppendElement('div', '', messageHeader)
    messageHeaderLeft.classList.add('contentMessageHeader-left')

    const usernameEl = createAndAppendElement('h3', uniqueMessage.username, messageHeaderLeft)
    const timeDiffEl = createAndAppendElement('p', timePostedDifference(uniqueMessage.date), messageHeaderLeft)
    usernameEl.style.color = setContrast(uniqueMessage.backgroundColor)
    timeDiffEl.style.color = setContrast(uniqueMessage.backgroundColor)

    // Stoffe: Added line - set timestamp on attribute on message box
    div.setAttribute("timestamp", uniqueMessage.date);

    if (uniqueMessage.username === cookieValue) {
        const deleteMessageBtn = createAndAppendElement('a', '×', messageHeader)
        deleteMessageBtn.classList.add('delete-message-btn')
        deleteMessageBtn.style.color = setContrast(uniqueMessage.backgroundColor)
    }

    const messageContent = createAndAppendElement('div', '', div)
    messageContent.classList.add('inner-msg-container')
    const messa = uniqueMessage.fontStyle;

    if (messa.includes("italic") && messa.includes("bold") && messa !== "") {
        messageContent.classList.add("italic", "bold");
    } else if (messa.includes("italic")) {
        messageContent.classList.add("italic");
    } else if (messa.includes("bold")) {
        messageContent.classList.add("bold");
    }

    const messageText = createAndAppendElement('p', uniqueMessage.message, messageContent)
    messageText.style.color = setContrast(uniqueMessage.backgroundColor)

    const messageFooter = createAndAppendElement('div', '', div)
    const likeBtn = createAndAppendElement('button', '', messageFooter)
    const likeIcon = createAndAppendElement('i', '', likeBtn)
    const likesEl = createAndAppendElement('span', uniqueMessage.likes.likesCount, messageFooter)
    messageFooter.classList.add('message-footer')
    likeBtn.classList.add('like-btn')
    likeIcon.className = 'fa-solid fa-thumbs-up like-icon'
    likeIcon.style.color = setContrast(uniqueMessage.backgroundColor)
    likesEl.classList.add('amount-of-likes')
    likesEl.style.color = setContrast(uniqueMessage.backgroundColor)
}

export function displayDeleteBtnForUser() {
    const allMessageHeader = document.querySelectorAll('.contentMessageHeader')
    const cookieValue = document.cookie.split("username=").slice(1)[0]

    allMessageHeader.forEach(messageHeader => {
        const username = messageHeader.querySelector('h3').innerText
        
        if (username === cookieValue) {
            const deleteMessageBtn = createAndAppendElement('a', '×', messageHeader)
            deleteMessageBtn.classList.add('delete-message-btn')
        }
    })
}