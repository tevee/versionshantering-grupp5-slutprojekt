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

  alertPopUpButton.addEventListener("click", () => {
    alertPopUpDiv.remove();
  });
  outerPopUpDiv.delay(3000).hide(1);

  return alertPopUpDiv;


}