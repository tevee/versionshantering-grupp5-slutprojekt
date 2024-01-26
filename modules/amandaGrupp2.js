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

  export function convertStringToLink(messageText, color) {

    const pattern = /(https?\:\/\/)?(www\.)?[^\s]+\.[^\s]+/g;
      return messageText.replace(pattern, (matched) => {
          let withProtocol = matched
  
          if (!withProtocol.startsWith("https")) {
              withProtocol = "https://" + matched
          }
  
          const newString = `<a href="${withProtocol}" class="color-${color.substring(1)}" target="_blank">${matched}</a>`
  
          return newString;
      });
  }