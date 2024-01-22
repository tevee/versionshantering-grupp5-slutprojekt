/*
    Feature from Ton Group 3:
    This particular feature will become visible when attempting to commit a message without being logged in."
*/  
alert('Please, log in to send message');

/*
    Feature from Ton Group 3:
    Scroll to Top with when click entities symbol"
*/
export function scrollToTop(event){
    event.preventDefault();
    window.scrollTo({top:0,behavior:"smooth"});
}   

