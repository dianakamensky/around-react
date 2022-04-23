function ImagePopup(props) {
  return (
    <div className={`popup location-popup ${props.isOpen ? "popup_open" : ""}`}>
      <div className="location-popup__main">
        <button className="popup__close-btn" onClick={props.onClose}></button>
        <img className="location-popup__img" src={props.image} />
        <h3 className="location-popup__caption">{props.caption}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
