import PropTypes from "prop-types";
import s from "./Searchbar.module.css";
import { useState } from "react";
import { toast } from "react-toastify";

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleQueryChange = (e) => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      return toast.warning("Enter something new...");
    }
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s["SearchForm-button"]}>
          <span className={s["SearchForm-button-label"]}>Search</span>
        </button>

        <input
          onChange={handleQueryChange}
          className={s["SearchForm-input"]}
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
