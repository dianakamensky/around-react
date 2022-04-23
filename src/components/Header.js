function Header(props) {
  return (
    <header className="header">
      <img className="header__title" src={props.img} alt={props.alt} />
    </header>
  );
}

export default Header;
