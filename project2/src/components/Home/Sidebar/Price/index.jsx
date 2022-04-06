import "./style.scss";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPrice } from "../../../../store/Slice/productSlice";

function Price() {
  const dispatch = useDispatch();
  const [inputMin, setInputMin] = useState(0);
  const [inputMax, setInputMax] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(setPrice({ inputMin, inputMax }));
  }

  return (
    <div className="price">
      <h1 className="sidebar__title">Giá</h1>
      <form className="input-group" onSubmit={(event) => handleSubmit(event)}>
        <input
          name="min-price"
          className="price__input form-control"
          placeholder="Tối thiểu"
          type="number"
          min="0"
          onChange={(event) => setInputMin(event.target.value)}
        />
        <span className="d-flex align-items-center mx-1">-</span>
        <input
          name="max-price"
          className="price__input form-control"
          placeholder="Tối đa"
          type="number"
          min="0"
          onChange={(event) => setInputMax(event.target.value)}
        />
        <button className="btn price__btn mx-1" type="submit">
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </form>
    </div>
  );
}

export default Price;
