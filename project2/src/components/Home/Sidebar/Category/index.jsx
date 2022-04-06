import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories, setCategory } from "../../../../store/Slice/productSlice";
import "./style.scss";

function Category() {
  const { categories } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryItem = (category) => (
    <li className="py-1">
      <Link to="/" onClick={() => dispatch(setCategory(category))}>
        {category}
      </Link>
    </li>
  );

  return (
    <div className="category">
      <h1 className="sidebar__title">Danh mục</h1>
      {categories &&
        categories.map((category, index) => {
          return (
            <ul key={index} className="category__list">
              {categoryItem(category)}
            </ul>
          );
        })}
    </div>
  );
}

export default Category;
