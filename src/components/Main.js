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
            setCards([...cards]);
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

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={userAvatar}
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
            <h1 className="profile__name">{userName}</h1>
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
          <p className="profile__job">{userDescription}</p>
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
        {cards.map((card) => (
          <Card
            card={card}
            userId={userId}
            key={card._id}
            updateLikes={updateLikes}
            deleteCard={deleteCard}
            setSelectedCard={props.setSelectedCard}
          ></Card>
        ))}
      </section>
    </main>
  );
}

export default Main;
