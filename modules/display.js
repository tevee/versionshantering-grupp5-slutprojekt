export function displayLoggedInUser() {

    const cookieValue = document.cookie.split("username=").slice(1)
    const displayLoggedInUserEl = document.querySelector('#loggedInUsername')
    displayLoggedInUserEl.innerText = cookieValue

    if(document.cookie !== '') {
        const signInBtn = document.querySelector('.sign-in-btn')
        signInBtn.classList.add('hide')
        signInBtn.classList.remove('show')
    }

}

export function displayGuest() {
    const displayLoggedInUserEl = document.querySelector('#loggedInUsername')
    const signInBtn = document.querySelector('.sign-in-btn')
    
    displayLoggedInUserEl.innerText = ''
    signInBtn.classList.add('show')
    signInBtn.classList.remove('hide')
}

export function getAndDisplayExistingMessages(messagesObj) {
    const messageBoardEl = document.querySelector('#messageBoard')

    for(const message in messagesObj) {
        const uniqueMessage = messagesObj[message]

        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const p = document.createElement('p')
        h2.innerText = uniqueMessage.username
        p.innerText = uniqueMessage.message
        messageBoardEl.append(div)
        div.append(h2,p)
    }
}

// Temporär tills createAndAppend skapas
export function displayMessage(uniqueMessage) {
    const messageBoardEl = document.querySelector('#messageBoard')
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const p = document.createElement('p')
    const secondP = document.createElement('p')
    h2.innerText = uniqueMessage.username
    p.innerText = uniqueMessage.date
    secondP.innerText = uniqueMessage.message
    messageBoardEl.append(div)
    div.append(h2,p,secondP)
}