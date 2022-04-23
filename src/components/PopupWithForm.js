import React from "react";

function PopupWithForm(props) {
  function submitForm() {
    const form = document.querySelector(`[name="${props.name}"]`);
    const inputs = form.querySelectorAll("input");
    const formData = {};
    inputs.forEach(function (input) {
      formData[input.name] = input.value;
    });
    props.onSubmit(formData);
  }

  return (
    <div className={`popup ${props.isOpen ? "popup_open" : ""}`}>
      <div className="popup__message">
        <button
          type="button"
          className="popup__close-btn"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} onSubmit={submitForm}>
          {props.children}
          <button type="submit" className="popup__submit-btn">
            {props.submitText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
