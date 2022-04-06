import "./style.scss";
import React from "react";
import { formatMoney } from "../../../../utils";
import Rating from "../../../Rating";
import { Link } from "react-router-dom";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductItem(props) {
  return (
    <div className="col">
      <div className="product__item">
        <Link to="/">
          <img src={props.thumbnail} alt="product" className="product__image" />
        </Link>
        <div className="product__content p-3">
          <Link to="/" className="product__title py-1">
            {props.title}
          </Link>
          <div className="product__price py-2">{formatMoney(props.price)}</div>
          {Rating(props.rating)}
          
          <div className="product__action d-none">
            <button className="btn action__wishlist d-block">
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className="btn action__cart d-block">
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
