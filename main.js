const ErrorMessage = Object.freeze({
  Required: "Required",
  EmailInvalid: "Invalid email",
  PasswordMismatch: "Passwords do not match",
  None: "",
});

const formElm = document.querySelector("form");
formElm.addEventListener("submit", (evt) => {
  evt.preventDefault();
});

const email = getInputById("email");
email.inputElm.addEventListener("input", (evt) => {
  if (email.inputElm.validity.valueMissing) {
    email.formFeedbackElm.textContent = ErrorMessage.Required;
  } else if (evt.target.validity.typeMismatch) {
    email.formFeedbackElm.textContent = ErrorMessage.EmailInvalid;
  } else {
    email.formFeedbackElm.textContent = ErrorMessage.None;
  }
});

const confirmPassword = getInputById("confirm-password");
const password = getInputById("password");
password.inputElm.addEventListener("input", (evt) => {
  evt.preventDefault();
  evt.target.value = evt.target.value.trim();

  if (password.inputElm.validity.valueMissing) {
    password.formFeedbackElm.textContent = ErrorMessage.Required;
  } else if (
    confirmPassword.inputElm.value &&
    evt.target.value !== confirmPassword.inputElm.value
  ) {
    confirmPassword.inputElm.setCustomValidity(ErrorMessage.PasswordMismatch);
    confirmPassword.formFeedbackElm.textContent = ErrorMessage.PasswordMismatch;
  } else {
    confirmPassword.inputElm.setCustomValidity(ErrorMessage.None);
    confirmPassword.formFeedbackElm.textContent = ErrorMessage.None;
  }
});
confirmPassword.inputElm.addEventListener("input", (evt) => {
  evt.preventDefault();
  evt.target.value = evt.target.value.trim();

  if (confirmPassword.inputElm.validity.valueMissing) {
    confirmPassword.formFeedbackElm.textContent = ErrorMessage.Required;
  } else if (evt.target.value !== password.inputElm.value) {
    confirmPassword.formFeedbackElm.textContent = ErrorMessage.PasswordMismatch;
    confirmPassword.inputElm.setCustomValidity(ErrorMessage.PasswordMismatch);
  } else {
    confirmPassword.inputElm.setCustomValidity(ErrorMessage.None);
    confirmPassword.formFeedbackElm.textContent = ErrorMessage.None;
  }
});

function getInputById(id, feedbackElmSelector = ".form-feedback") {
  const inputElm = document.getElementById(id);
  return {
    inputElm,
    formFeedbackElm: inputElm.parentElement.querySelector(feedbackElmSelector),
  };
}
