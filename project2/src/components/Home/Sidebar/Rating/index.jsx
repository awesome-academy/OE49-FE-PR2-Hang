import "./style.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { setRating } from "../../../../store/Slice/productSlice";
import Rating from "../../../Rating";
import { useTranslation } from "react-i18next";

function Rate() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const ratingItem = [...Array(5)].map((_, index) => (
    <li key={index}>
      <button
        className="btn p-0"
        onClick={() => dispatch(setRating(5 - index))}
      >
        {Rating(5 - index)}
        {index !== 0 && t("and up")}
      </button>
    </li>
  ));

  return (
    <div className="sidebar__rating">
      <h1 className="sidebar__title">{t("rating")}</h1>
      <ul>{ratingItem}</ul>
    </div>
  );
}

export default Rate;
