import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Logo from "../images/Vector.svg";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import FormValidator from "../utils/FormValidator";
import api from "../utils/api";

function App() {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isEditProfilePopupOpen, setEditProfilePopupState] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] =
    React.useState(false);
  const [isImagePopupOpen, setImagePopupState] = React.useState(false);
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

  function handleImageClick() {
    setImagePopupState(true);
  }

  function closeAllPopups() {
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setEditAvatarPopupState(false);
    setImagePopupState(false);
    setSelectedCard(null);
  }

  React.useEffect(
    function () {
      const formValidator = new FormValidator(
        validationConfig,
        document.querySelector('form[name="editProfile"]')
      );
      formValidator.enableValidation();
    },
    [validationConfig]
  );

  React.useEffect(
    function () {
      const formValidator = new FormValidator(
        validationConfig,
        document.querySelector('form[name="addLocation"]')
      );
      formValidator.enableValidation();
    },
    [validationConfig]
  );

  React.useEffect(
    function () {
      const formValidator = new FormValidator(
        validationConfig,
        document.querySelector('form[name="changeAvatar"]')
      );
      formValidator.enableValidation();
    },
    [validationConfig]
  );

  function saveLocation(data) {
    setCardSubmit("Creating...");
    api
      .saveLocation(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => window.alert(`Error creating card: ${err}`))
      .finally(() => setCardSubmit("Create"));
  }

  function saveAvatar(data) {
    setCardSubmit("Saving...");
    api
      .saveAvatar(data)
      .then((user) => {
        setUserAvatar(user.avatar);
        closeAllPopups();
      })
      .catch((err) => window.alert(`Error saving avatar: ${err}`))
      .finally(() => setAvatarSubmit("Save"));
  }

  return (
    <>
      <Header img={Logo} alt="Around the U.S" />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddLocationClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleImageClick}
        userAvatar={userAvatar}
        userName={userName}
        userDescription={userDescription}
        cards={cards}
        setCards={setCards}
        setSelectedCard={setSelectedCard}
        setImagePopupState={setImagePopupState}
      />
      <Footer footerCR="&copy; 2021 Around The U.S" />
      <PopupWithForm
        title="Edit Profile"
        name="editProfile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onSubmit={saveProfile}
        submitText={profileSubmit}
      >
        <input
          className="popup__input popup__input_info_name"
          type="text"
          placeholder="Name"
          name="name"
          value={userName}
          minLength="2"
          maxLength="40"
          required
        />
        <p className="popup__input-error"></p>
        <input
          className="popup__input popup__input_info_job"
          type="text"
          placeholder="About me"
          name="about"
          value={userDescription}
          minLength="2"
          maxLength="200"
          required
        />
        <p className="popup__input-error"></p>
      </PopupWithForm>
      <PopupWithForm
        title="Add Location"
        name="addLocation"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onSubmit={saveLocation}
        submitText={cardSubmit}
      >
        <input
          className="popup__input popup__input_info_title"
          type="text"
          placeholder="Title"
          name="name"
          minLength="1"
          maxLength="30"
          required
        />
        <p className="popup__input-error"></p>
        <input
          className="popup__input popup__input_info_link"
          type="url"
          placeholder="Image link"
          name="link"
          required
        />
        <p className="popup__input-error"></p>
      </PopupWithForm>
      <PopupWithForm
        title="Change Profile Picture"
        name="changeAvatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onSubmit={saveAvatar}
        submitText={avatarSubmit}
      >
        <input
          className="popup__input popup__input_info_link"
          type="url"
          placeholder="Image link"
          name="avatar"
          required
        />
        <p className="popup__input-error"></p>
      </PopupWithForm>
      <ImagePopup
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
        image={selectedCard.link}
        caption={selectedCard.name}
      />
    </>
  );
}

export default App;
