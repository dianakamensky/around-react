function ImagePopup() {
  return (
    <div className="popup location-popup">
      <div className="location-popup__main">
        <button className="popup__close-btn"></button>
        <img className="location-popup__img" />
        <h3 className="location-popup__caption"></h3>
      </div>
    </div>
  );
}

export default ImagePopup;
