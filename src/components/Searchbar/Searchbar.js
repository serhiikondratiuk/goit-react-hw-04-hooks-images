import PropTypes from "prop-types";
import s from "./Searchbar.module.css";
import { Component } from "react";
import { toast } from "react-toastify";

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: "",
  };

  handleQueryChange = (e) => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    const { searchQuery } = this.state;
    e.preventDefault();

    if (searchQuery.trim() === "") {
      return toast.warning("Enter something new...");
    }
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: "" });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s["SearchForm-button"]}>
            <span className={s["SearchForm-button-label"]}>Search</span>
          </button>

          <input
            onChange={this.handleQueryChange}
            className={s["SearchForm-input"]}
            value={this.state.searchQuery}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
