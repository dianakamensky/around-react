import React from "react";
import AddIcon from "../images/addicon.svg";
import EditIcon from "../images/editicon.svg";
import Card from "./Card";
import api from "../utils/api";

function Main(props) {
  function updateLikes(setLikes, cardId, isLiked) {
    api
      .updateCardLike(cardId, isLiked)
      .then((data) => {
        setLikes(data.likes);
      })
      .catch((err) => console.log(`Error liking card: ${err}`));
  }

  function deleteCard(cardId) {
    api.deleteCard(cardId).then(() => {
      props.setCards(props.cards.filter((c) => c._id !== cardId));
    });
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
            userId={props.userId}
            key={card._id}
            updateLikes={updateLikes}
            deleteCard={deleteCard}
          ></Card>
        ))}
      </section>
    </main>
  );
}

export default Main;
