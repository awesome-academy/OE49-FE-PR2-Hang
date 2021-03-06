import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  unsetBrand,
  fetchBrands,
  setBrand,
} from "../../../../store/Slice/productSlice";
import { useTranslation } from "react-i18next";

function Brand() {
  const [open, setOpen] = useState(false);
  const { brands } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const brandItem = (brand) => (
    <label>
      <input
        className="form-check-input"
        type="checkbox"
        value={brand}
        onChange={(e) => {
          e.target.checked
            ? dispatch(setBrand(brand))
            : dispatch(unsetBrand(brand));
        }}
      />
      {brand}
    </label>
  );

  return (
    <div className="brand">
      <h1 className="sidebar__title">{t("brand")}</h1>
      {brands &&
        brands.map(
          (brand, index) =>
            (index < 8 || open) && (
              <div key={index} className="form-check">
                {brandItem(brand)}
              </div>
            )
        )}
      <Link to="/" onClick={() => setOpen(!open)}>
        {open ? t("view less") : t("view more")}
      </Link>
    </div>
  );
}

export default Brand;
