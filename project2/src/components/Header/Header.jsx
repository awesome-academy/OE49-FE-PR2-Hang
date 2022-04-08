import "./style.scss";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Search from "../Filter/Search";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function Header() {
  const [language, setLanguage] = useState("vi");
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    language === "vi" ? setLanguage("en") : setLanguage("vi");
  };

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="header__logo">
          <img src={logo} alt="logo" />
        </Link>
        <Search />
        <div className="header__icon">
          <Link to="#" onClick={() => changeLanguage(language)}>
            <FontAwesomeIcon icon={faGlobe} className="mx-2"/>
            {language}
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          <Link to="/signup">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
