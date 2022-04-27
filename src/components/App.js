import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Logo from "../images/Vector.svg";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";

function App() {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isEditProfilePopupOpen, setEditProfilePopupState] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] =
    React.useState(false);
  const [profileSubmit, setProfileSubmit] = React.useState("Save");
  const [cardSubmit, setCardSubmit] = React.useState("Create");
  const [avatarSubmit, setAvatarSubmit] = React.useState("Save");

  const validationConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-btn",
    activeButtonClass: "popup__submit-btn_active",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_visible",
  };

  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }

  function handleAddLocationClick() {
    setAddPlacePopupState(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  function closeAllPopups() {
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setEditAvatarPopupState(false);
    setSelectedCard(null);
  }

  return (
    <>
      <Header img={Logo} alt="Around the U.S" />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddLocationClick}
        onEditAvatarClick={handleEditAvatarClick}
        setSelectedCard={setSelectedCard}
      />
      <Footer footerCR="&copy; 2021 Around The U.S" />
      {selectedCard && (
        <ImagePopup
          onClose={closeAllPopups}
          image={selectedCard.link}
          caption={selectedCard.name}
        />
      )}
    </>
  );
}

export default App;
