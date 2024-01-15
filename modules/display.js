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