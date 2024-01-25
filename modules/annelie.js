/* 
    Anne-Lie Grupp 2
    Feature:
    Knapp som tar bort message ljud när man klickar på knappen.
    Knappen byter ikon beroende på om den är på eller av.
*/

let isSoundMuted = false;  

export function setupMuteButton() {
    const muteBtn = document.querySelector("#muteBtn");
    
    muteBtn.addEventListener("click", () => {
        isSoundMuted = !isSoundMuted;
        muteBtn.value = isSoundMuted;
        muteBtn.innerHTML = isSoundMuted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
    });
}

export function playMessageSound(submitSound) {
    const muteBtn = document.querySelector("#muteBtn");
    if( muteBtn.value === 'false') submitSound.play()
}