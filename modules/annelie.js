let isSoundMuted = false;  
export function setupMuteButton(submitSound) {
    
    const muteBtn = document.querySelector("#muteBtn");
    console.log(isSoundMuted);
    if( isSoundMuted === false) submitSound.play()

    muteBtn.addEventListener("click", () => {
    isSoundMuted = !isSoundMuted;
            console.log(isSoundMuted);
    muteBtn.innerHTML = isSoundMuted
    ? '<i class="fa-solid fa-volume-xmark"></i>'
    : '<i class="fa-solid fa-volume-high"></i>';
    
    });

}
