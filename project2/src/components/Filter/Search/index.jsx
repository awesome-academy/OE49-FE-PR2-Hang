import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useDebouncedCallback } from "use-debounce";
import { useDispatch } from "react-redux";
import { searchProducts } from "../../../store/Slice/productSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Search({ link = "/" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const debounced = useDebouncedCallback((value) => {
    dispatch(searchProducts(value.trim()));
    navigate(link);
  }, 300);

  return (
    <form
      className="header__form float-end pe-3 w-50"
      onSubmit={(event) => event.preventDefault()}
    >
      <InputGroup className="header__search">
        <FormControl
          type="text"
          placeholder={t("search")}
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
