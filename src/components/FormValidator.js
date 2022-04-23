export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._formButton = form.querySelector(settings.submitButtonSelector);
    this._inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;
    errorElement.classList.add(this._settings.errorClass);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    errorElement.classList.remove(this._settings.errorClass);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = "";
  }

  _updateButtonState() {
    if (this._hasInvalidInput()) {
      this._formButton.classList.remove(this._settings.activeButtonClass);
      this._formButton.setAttribute("disabled", "");
    } else {
      this._formButton.classList.add(this._settings.activeButtonClass);
      this._formButton.removeAttribute("disabled", "");
    }
  }

  _hasInvalidInput() {
    return this._inputs.some(function (input) {
      return !input.validity.valid;
    });
  }

  resetValidation() {
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });
    this._updateButtonState();
  }

  enableValidation() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._updateButtonState();
        this._checkInputValidity(input);
      });
    });
  }
}
