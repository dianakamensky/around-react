import React from "react";

function PopupWithForm({
  isOpen,
  onClose,
  title,
  formName,
  onSubmit,
  children,
  submitText,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__message">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={formName} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit-btn">
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
