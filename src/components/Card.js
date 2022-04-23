import React from "react";

function Card(props) {
  const card = props.card;

  const [likes, setLikes] = React.useState(card.likes);

  function updateLikes() {
    props.updateLikes(setLikes, card._id, isLiked());
  }

  function isLiked() {
    return likes.some((user) => {
      return user._id === props.userId;
    });
  }

  return (
    <article className="card">
      <img className="card__image" src={card.link} alt={card.name} />
      {card.owner._id === props.userId && (
        <button type="button" className="card__delete-btn"></button>
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
          <div className="card__likes">{likes.length}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;
