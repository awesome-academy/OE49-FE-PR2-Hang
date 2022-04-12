import "./style.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { sortProducts } from "../../../store/Slice/productSlice";
import { useTranslation } from "react-i18next";

function Sort() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const options = ["best match", "price low to high", "price high to low"];

  const selectItem = options.map((option, index) => (
    <option value={option} key={index} className="p-3">
      {t(option)}
    </option>
  ));

  const result = {
    "best match": { sort: "", order: "" },
    "price low to high": { sort: "price", order: "asc" },
    "price high to low": { sort: "price", order: "desc" },
  };

  function handleChange(value) {
    dispatch(sortProducts(result[value]));
  }

  return (
    <form className="form-sort">
      <label className="input-group align-items-center">
        {t("order by")}:
        <select
          className="form-select ms-3"
          onChange={(e) => handleChange(e.target.value)}
        >
          {selectItem}
        </select>
      </label>
    </form>
  );
}

export default Sort;
