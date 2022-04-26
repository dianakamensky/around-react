import React from "react";
import AddIcon from "../images/addicon.svg";
import EditIcon from "../images/editicon.svg";
import Card from "./Card";
import api from "../utils/api";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [userId, setUserId] = React.useState("");

  React.useEffect(getCards, []);
  React.useEffect(getUserInfo, []);

  function updateLikes(cardId, isLiked) {
    api
      .updateCardLike(cardId, isLiked)
      .then((data) => {
        cards.forEach(function (card) {
          if (card._id === data._id) {
            card.likes = data.likes;
          }
        });
      })
      .catch((err) => console.log(`Error liking card: ${err}`));
  }

  function getCards() {
    api
      .getInitialCards()
      .then(setCards)
      .catch((err) => window.alert(`Error loading initial cards: ${err}`));
  }

  function deleteCard(cardId) {
    api.deleteCard(cardId).then(() => {
      props.setCards(props.cards.filter((c) => c._id !== cardId));
    });
  }

  function getUserInfo() {
    api
      .getUserInfo()
      .then((user) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setUserId(user._id);
      })
      .catch((err) => window.alert(`Error fetching user info: ${err}`));
  }

  function saveProfile(data) {
    setProfileSubmit("Saving...");
    api
      .saveProfile(data)
      .then((user) => {
        setUserName(user.name);
        setUserDescription(user.about);
        closeAllPopups();
      })
      .catch((err) => window.alert(`Error saving profile: ${err}`))
      .finally(() => setProfileSubmit("Save"));
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={props.userAvatar}
            alt="Profile picture"
          />
          <div
            className="profile__edit-avatar-container"
            onClick={props.onEditAvatarClick}
          >
            <img
              className="profile__edit-avatar"
              src={EditIcon}
              alt="Edit avatar"
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{props.userName}</h1>
            <button
              type="button"
              className="profile__edit-btn"
              aria-label="Edit profile"
              onClick={props.onEditProfileClick}
            >
              <img
                className="profile__edit-icon"
                src={EditIcon}
                alt="Edit profile"
              />
            </button>
          </div>
          <p className="profile__job">{props.userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          aria-label="Add location"
          onClick={props.onAddPlaceClick}
        >
          <img className="profile__add-icon" src={AddIcon} alt="Add" />
        </button>
      </section>
      <section className="locations">
        {props.cards.map((card) => (
          <Card
            card={card}
            userId={userId}
            key={card._id}
            updateLikes={updateLikes}
            deleteCard={deleteCard}
            setSelectedCard={props.setSelectedCard}
            setImagePopupState={props.setImagePopupState}
          ></Card>
        ))}
      </section>
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
    </main>
  );
}

export default Main;
