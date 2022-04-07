import Price from "./Price";
import Brand from "./Brand";
import Category from "./Category";
import Rate from "./Rating";
import "./style.scss";

function Sidebar() {
  return (
    <aside className="sidebar">
      <Category />
      <Brand />
      <Price />
      <Rate />
    </aside>
  );
}

export default Sidebar;
