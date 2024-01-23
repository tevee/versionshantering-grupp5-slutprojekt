import { createAndAppendElement } from "./createElement.js";
import { timePostedDifference } from "./date.js";

function displayLikedIcons(messages) {
	const loggedInUser = document.cookie.split("username=").slice(1)[0];

	for (const key in messages) {
		const uniqueMessage = messages[key];
		for (const users of uniqueMessage.likes.users) {
			if (loggedInUser === users) {
				const likeIcon = document.querySelector(
					`#${key} > .message-footer > .like-btn > i`
				);
				likeIcon.classList.add("active");
			}
		}
	}
}

export function displayLoggedInUser(messages) {
	const loggedInUser = document.cookie.split("username=").slice(1);
	const displayLoggedInUserEl = document.querySelector("#loggedInUsername");
	displayLoggedInUserEl.innerText = loggedInUser;
	displayLikedIcons(messages);

	if (document.cookie !== "") {
		const signInBtn = document.querySelector(".sign-in-btn");
		const logOutButton = document.querySelector("#logOut");
		const logInContainerEl = document.querySelector("#logIn");
		const dropDownMenu = document.querySelector(".hover-container");
		signInBtn.classList.toggle("hide");
		logOutButton.classList.toggle("hide");
		dropDownMenu.classList.toggle("hide");
		logInContainerEl.style.display = "none";
	}
}

export function displayGuest() {
	const displayLoggedInUserEl = document.querySelector("#loggedInUsername");
	const signInBtn = document.querySelector(".sign-in-btn");
	const logOutButton = document.querySelector("#logOut");
	const allMessageDeleteBtns = document.querySelectorAll(".delete-message-btn");
	allMessageDeleteBtns.forEach((deleteBtn) => deleteBtn.remove());
	const dropDownMenu = document.querySelector(".hover-container");
	const allLikeIcons = document.querySelectorAll(".like-icon");
	allLikeIcons.forEach((likeIcon) => likeIcon.classList.remove("active"));

	if (document.cookie !== "") {
		displayLoggedInUserEl.innerText = "";
		signInBtn.classList.toggle("hide");
		logOutButton.classList.toggle("hide");
		dropDownMenu.classList.toggle("hide");
	}
}

export function getAndDisplayExistingMessages(messagesObj) {
	const messageBoardEl = document.querySelector("#messageBoard");
	const cookieValue = document.cookie.split("username=").slice(1)[0];

	for (const key in messagesObj) {
		const uniqueMessage = messagesObj[key];
		const div = createAndAppendElement("div", "", messageBoardEl);
		div.classList.add("message-box");
		div.id = key;

		const messageHeader = createAndAppendElement("div", "", div);
		messageHeader.classList.add("contentMessageHeader");

		const messageHeaderLeft = createAndAppendElement("div", "", messageHeader);
		messageHeaderLeft.classList.add("contentMessageHeader-left");

		createAndAppendElement("h3", uniqueMessage.username, messageHeaderLeft);
		createAndAppendElement(
			"p",
			timePostedDifference(uniqueMessage.date),
			messageHeaderLeft
		);

		if (uniqueMessage.username === cookieValue) {
			const deleteMessageBtn = createAndAppendElement("a", "×", messageHeader);
			deleteMessageBtn.classList.add("delete-message-btn");
		}

		const messageContent = createAndAppendElement("div", "", div);
		messageContent.classList.add("inner-msg-container");
		createAndAppendElement("p", uniqueMessage.message, messageContent);
		const messa = uniqueMessage.fontStyle;
		if (messa.includes("italic") && messa.includes("bold")) {
			messageContent.classList.add("italic", "bold");
		} else if (messa.includes("italic")) {
			messageContent.classList.add("italic");
		} else if (messa.includes("bold")) {
			messageContent.classList.add("bold");
		}
		const messageFooter = createAndAppendElement("div", "", div);
		const likeBtn = createAndAppendElement("button", "", messageFooter);
		const likeIcon = createAndAppendElement("i", "", likeBtn);
		const likesEl = createAndAppendElement(
			"span",
			uniqueMessage.likes.likesCount,
			messageFooter
		);
		messageFooter.classList.add("message-footer");
		likeBtn.classList.add("like-btn");
		likeIcon.className = "fa-solid fa-thumbs-up like-icon";
		likesEl.classList.add("amount-of-likes");
	}
}

export function displayMessage(uniqueMessage, uniqueKey) {
	const messageBoardEl = document.querySelector("#messageBoard");
	const cookieValue = document.cookie.split("username=").slice(1)[0];

	const div = createAndAppendElement("div", "", messageBoardEl);
	div.classList.add("message-box");
	div.classList.add("messageBorder");
	div.id = uniqueKey;

	const elements = document.querySelectorAll(".messageBorder");

	if (elements.length > 0) elements[0].classList.add("messageBorder");
	if (elements.length > 1) elements[0].classList.remove("messageBorder");

	const messageHeader = createAndAppendElement("div", "", div);
	messageHeader.classList.add("contentMessageHeader");

	const messageHeaderLeft = createAndAppendElement("div", "", messageHeader);
	messageHeaderLeft.classList.add("contentMessageHeader-left");

	createAndAppendElement("h3", uniqueMessage.username, messageHeaderLeft);
	createAndAppendElement(
		"p",
		timePostedDifference(uniqueMessage.date),
		messageHeaderLeft
	);

	if (uniqueMessage.username === cookieValue) {
		const deleteMessageBtn = createAndAppendElement("a", "×", messageHeader);
		deleteMessageBtn.classList.add("delete-message-btn");
	}

	const messageContent = createAndAppendElement("div", "", div);
	messageContent.classList.add("inner-msg-container");
	const messa = uniqueMessage.fontStyle;

	const textColorPicker = createAndAppendElement(
		"input",
		"",
		messageHeaderLeft,
		"color"
	);
	textColorPicker.classList.add("color-picker");
	textColorPicker.addEventListener("input", (event) => {
		messageContent.style.color = event.target.value;
	});

	if (messa.includes("italic") && messa.includes("bold") && messa !== "") {
		messageContent.classList.add("italic", "bold");
	} else if (messa.includes("italic")) {
		messageContent.classList.add("italic");
	} else if (messa.includes("bold")) {
		messageContent.classList.add("bold");
	}
	createAndAppendElement("p", uniqueMessage.message, messageContent);

	const messageFooter = createAndAppendElement("div", "", div);
	const likeBtn = createAndAppendElement("button", "", messageFooter);
	const likeIcon = createAndAppendElement("i", "", likeBtn);
	const likesEl = createAndAppendElement(
		"span",
		uniqueMessage.likes.likesCount,
		messageFooter
	);
	messageFooter.classList.add("message-footer");
	likeBtn.classList.add("like-btn");
	likeIcon.className = "fa-solid fa-thumbs-up like-icon";
	likesEl.classList.add("amount-of-likes");
}

export function displayDeleteBtnForUser() {
	const allMessageHeader = document.querySelectorAll(".contentMessageHeader");
	const cookieValue = document.cookie.split("username=").slice(1)[0];

	allMessageHeader.forEach((messageHeader) => {
		const username = messageHeader.querySelector("h3").innerText;
		if (username === cookieValue) {
			const deleteMessageBtn = createAndAppendElement("a", "×", messageHeader);
			deleteMessageBtn.classList.add("delete-message-btn");
		}
	});
}
