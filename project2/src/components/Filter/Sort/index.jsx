import "./style.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { sortProducts } from "../../../store/Slice/productSlice";

function Sort() {
  const dispatch = useDispatch();
  const options = ["Phù hợp nhất", "Giá tăng dần", "Giá giảm dần"];

  const selectItem = options.map((option, index) => (
    <option value={option} key={index} className="p-3">
      {option}
    </option>
  ));

  const result = {
    "Phù hợp nhất": { sort: "", order: "" },
    "Giá tăng dần": { sort: "price", order: "asc" },
    "Giá giảm dần": { sort: "price", order: "desc" },
  };

  function handleChange(value) {
    dispatch(sortProducts(result[value]));
  }

  return (
    <form className="form-sort">
      <label className="input-group align-items-center">
        Sắp xếp theo:
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
