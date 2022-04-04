import "./style.scss";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="header__logo">
          <img src={logo} alt="logo" />
        </Link>
        <form className="header__form w-50">
          <InputGroup className="header__search">
            <FormControl id="search" placeholder="Tìm kiếm" />
            <Button variant="btn header__submit" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
        </form>
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
