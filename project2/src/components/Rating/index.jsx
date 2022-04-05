import "./style.scss";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Rating(rating) {
  const rate = [...Array(5)].map((_, index) =>
    index < rating ? (
      <FontAwesomeIcon key={index} icon={faStar} />
    ) : (
      <FontAwesomeIcon key={index} icon={farStar} />
    )
  );
  return <div className="rating">{rate}</div>;
}

export default Rating;
