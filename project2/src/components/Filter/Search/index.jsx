import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useDebouncedCallback } from "use-debounce";
import { useDispatch } from "react-redux";
import { searchProducts } from "../../../store/Slice/productSlice";

function Search() {
  const dispatch = useDispatch();
  const debounced = useDebouncedCallback((value) => {
    dispatch(searchProducts(value.trim()));
  }, 300);

  return (
    <form
      className="header__form w-50"
      onSubmit={(event) => event.preventDefault()}
    >
      <InputGroup className="header__search">
        <FormControl
          type="text"
          placeholder="Tìm kiếm"
          onChange={(event) => debounced(event.target.value)}
        />
        <Button variant="btn header__submit" type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </InputGroup>
    </form>
  );
}

export default Search;
