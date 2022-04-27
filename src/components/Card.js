import React from "react";

function Card(props) {
  const card = props.card;

  function updateLikes() {
    props.updateLikes(card._id, isLiked());
  }

  function isLiked() {
    return card.likes.some((user) => {
      return user._id === props.userId;
    });
  }

  function deleteCard() {
    props.deleteCard(card._id);
  }

  function openPopup() {
    props.setSelectedCard(card);
  }

  return (
    <article className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={openPopup}
      />
      {card.owner._id === props.userId && (
        <button
          type="button"
          className="card__delete-btn"
          onClick={deleteCard}
        ></button>
      )}
      <div className="card__caption-container">
        <h2 className="card__caption">{card.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={`card__like-btn ${
              isLiked() ? "card__like-btn_active" : ""
            }`}
            onClick={updateLikes}
          ></button>
          <div className="card__likes">{card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;
