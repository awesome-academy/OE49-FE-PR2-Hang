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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalProducts } from "../../utils";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { logout } from "../../store/Slice/userSlice";
import { auth } from "../../firebase";
import { ADMIN_ROLE } from "../../constants";

function Header() {
  const { products } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.userReducer);
  const total = totalProducts(products);
  const [isLogin, setIsLogin] = useState(false);
  const [language, setLanguage] = useState("en");
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const userLink = isLogin
    ? user.role === ADMIN_ROLE
      ? "/admin"
      : "/profile"
    : "/login";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    language === "vi" ? setLanguage("en") : setLanguage("vi");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setIsLogin(true) : setIsLogin(false);
    });
  }, []);

  const handleLogout = () => {
    signOut(auth);
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("payment-info");
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
            <FontAwesomeIcon icon={faGlobe} className="mx-2" />
            {language}
          </Link>
          <Link to="/cart" className="header__cart" data-total-cart={total}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          <Link to={userLink}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
          {isLogin ? (
            <Link to="/" variant="outline" onClick={handleLogout}>
              Log out
            </Link>
          ) : (
            <Link to="/login" variant="outline">
              Log in
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
