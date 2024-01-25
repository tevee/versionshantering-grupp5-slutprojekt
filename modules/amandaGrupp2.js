// Amanda Andersson grupp 2
// Feature that shows an alert popup when you log in or
//register that says "welcome (your username)"

export function alertWhenLogIn(alertText) {
  const outerPopUpDiv = document.createElement('div');
  outerPopUpDiv.className = 'popUpFormContainer popUpForm';
  outerPopUpDiv.style.display = 'flex';
  outerPopUpDiv.id = 'alertPopUpContainer'
  const alertPopUpDiv = document.createElement("div");
  alertPopUpDiv.className = "alertPopUp";

  const alertPopUpTitle = document.createElement("h3");
  const alertPopUpText = document.createElement("p");
  const alertPopUpButton = document.createElement("button");
  alertPopUpButton.className = "alertBtn popUpFormBtn"
  alertPopUpButton.setAttribute('data-modal', 'alertPopUpContainer')

  alertPopUpTitle.innerText = "Welcome!!";
  alertPopUpText.innerText = alertText;
  alertPopUpButton.innerText = "X";
  alertPopUpButton.classList.add("closePopUp");

  document.body.append(outerPopUpDiv);
  outerPopUpDiv.append(alertPopUpDiv);
  alertPopUpDiv.append(alertPopUpTitle, alertPopUpText, alertPopUpButton);
  
  setTimeout(() => { outerPopUpDiv.remove() }, 3000)

  return alertPopUpDiv;
}

//Amanda Grupp 2
//Function that makes anything written with "www." in a message to a link

 export function createLinkInMessage(messageText, messageContent) {

  const userInput = messageText.textContent;

const textLinkPattern = /^(.*\S)\s+(www\.[^\s]+)$/;
const linkTextPattern = /^(www\.[^\s]+)\s+(.*\S)$/;

const textLinkMatch = userInput.match(textLinkPattern);
const linkTextMatch = userInput.match(linkTextPattern);

if (textLinkMatch) {
  const textBeforeLink = textLinkMatch[1];
  const linkUrl = textLinkMatch[2];

  const textElement = document.createElement('span');
  textElement.innerText = textBeforeLink;

  const spaceElement = document.createElement('span');
  spaceElement.innerText = ' ';

  const linkElement = document.createElement('a');
  linkElement.href = 'http://' + linkUrl;
  linkElement.innerText = linkUrl;

  messageContent.appendChild(textElement);
  messageContent.appendChild(spaceElement);
  messageContent.appendChild(linkElement);
  messageContent.removeChild(messageText);
} 
else if (linkTextMatch) {
  const linkUrl = linkTextMatch[1];
  const textAfterLink = linkTextMatch[2];

  const linkElement = document.createElement('a');
  linkElement.href = 'http://' + linkUrl;
  linkElement.innerText = linkUrl;

  const spaceElement = document.createElement('span');
  spaceElement.innerText = ' ';

  const textElement = document.createElement('span');
  textElement.innerText = textAfterLink;

  messageContent.appendChild(linkElement);
  messageContent.appendChild(spaceElement);
  messageContent.appendChild(textElement);
  messageContent.removeChild(messageText);
} 
else if (messageText.textContent.includes("www.")) {
  const linkElement = document.createElement('a');
  linkElement.href = 'http://' + messageText.textContent;
  linkElement.innerText = messageText.textContent;

  messageContent.replaceChild(linkElement, messageText);
}


messageContent.addEventListener('click', function(event) {
  const targetElement = event.target;

  const isLink = targetElement.tagName === 'A' || targetElement.closest('a');

  if (isLink) {
      event.preventDefault();
      window.open(targetElement.href, '_blank');
  }
});
}
