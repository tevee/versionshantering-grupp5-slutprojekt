/*
    Contribution: Update the "Hours/Minutes/Seconds ago" timestamp on displayed messages continually.
    By Kristoffer Bengtsson (group 4)
*/


import { timePostedDifference } from "./date.js"

let intervalHandle;


// Update the time stamps on the displayed messages every updateFrequency seconds
export function startTimeUpdate(updateFrequency = 10) {
    if (intervalHandle === undefined) {
        intervalHandle = setInterval(updateTimestamps, updateFrequency * 1000);
    }
}

// Stop the time update (for whatever reason?)
export function stopTimeUpdate() {
    if (intervalHandle !== undefined) {
        clearInterval(intervalHandle);
        intervalHandle = undefined;
    }
}

// Function run at regular intervals to update the time on shown messages
function updateTimestamps() {
    const messageBoxes = document.querySelectorAll(".message-box");

    messageBoxes.forEach((messageBox) => {
        const messageTimeField = messageBox.querySelector(".contentMessageHeader-left p");
        const messageTimestamp = messageBox.getAttribute("timestamp");

        messageTimeField.innerText = timePostedDifference(messageTimestamp);
    });
}
