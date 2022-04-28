import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Logo from "../images/Vector.svg";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isEditProfilePopupOpen, setEditProfilePopupState] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] =
    React.useState(false);

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
      <PopupWithForm
        title="Edit Profile"
        name="editProfile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        submitText="Save"
      >
        <input
          className="popup__input popup__input_info_name"
          type="text"
          placeholder="Name"
          name="name"
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
        submitText="Create"
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
        submitText="Save"
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
    </>
  );
}

export default App;
