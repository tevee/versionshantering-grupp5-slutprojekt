// Amanda Andersson grupp 2
// Feature that shows an alert popup when you log in or
//register that says "welcome (your username)"

export function alertWhenLogIn(alertText) {
  const loggedInUser = document.cookie.split("username=").slice(1)[0];

  const alertPopUpDiv = document.createElement("div");
  alertPopUpDiv.className = "alertPopUp popUpForm";

  const alertPopUpTitle = document.createElement("h3");
  const alertPopUpText = document.createElement("p");
  const alertPopUpButton = document.createElement("button");
  alertPopUpButton.classList.add("alertBtn");

  alertPopUpTitle.innerText = "Welcome!!";
  alertPopUpText.innerText = alertText;
  alertPopUpButton.innerText = "X";
  alertPopUpButton.classList.add("closePopUp");

  document.body.append(alertPopUpDiv);
  alertPopUpDiv.append(alertPopUpTitle, alertPopUpText, alertPopUpButton);

  alertPopUpButton.addEventListener("click", () => {
    alertPopUpDiv.remove();
  });

  return alertPopUpDiv;
}
