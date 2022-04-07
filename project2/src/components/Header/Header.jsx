import "./style.scss";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import Search from "../Filter/Search";

function Header() {
  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="header__logo">
          <img src={logo} alt="logo" />
        </Link>
        <Search />
        <div className="header__icon">
          <Link to="/">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
