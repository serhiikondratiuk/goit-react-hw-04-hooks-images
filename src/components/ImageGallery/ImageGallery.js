// import PropTypes from "prop-types";
import s from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem";
import { toast } from "react-toastify";
import { Component } from "react";
import NewLoader from "../Loader";
import API from "../../services/imageFinderApi";
import LoadMoreButton from "../Button";
import Modal from "../Modal";
import Searchbar from "../Searchbar";

class ImageGallery extends Component {
  state = {
    gallery: [],
    page: 1,
    error: null,
    status: "idle",
    showModal: false,
    modalUrl: "",
    modalAlt: "",
    searchQuery: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ status: "pending" });
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    API.fetchImage(searchQuery, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          toast.warning(`There is no ${searchQuery} found`);
        }
        if (hits.length > 0) {
          toast.success(`New ${searchQuery} found!`);
        }
        this.setState(({ gallery, page }) => ({
          gallery: [...gallery, ...hits],
          status: "resolved",
          page: page + 1,
        }));
      })
      .catch((error) => this.setState({ error, status: "rejected" }))
      .finally(() => {
        this.handleLoadMoreButton();
      });
  };

  handleLoadMoreButton = () => {
    const { page } = this.state;
    if (page > 2) {
      const options = {
        top: null,
        behavior: "smooth",
      };
      options.top =
        window.pageYOffset + document.documentElement.clientHeight - 150;
      setTimeout(() => {
        window.scrollTo(options);
      }, 1000);
    }
  };

  onImageClick = (e) => {
    e.preventDefault();
    const imageModal = e.target.getAttribute("data-src");
    const altModal = e.target.getAttribute("alt");

    if (e.target.nodeName !== "IMG") {
      return;
    }

    this.setState({
      showModal: true,
      modalUrl: imageModal,
      modalAlt: altModal,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery, page: 1, gallery: [] });
  };

  render() {
    const { gallery, error, status, showModal, modalUrl, modalAlt } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === "idle" && <h1>Enter anything you are looking for</h1>}
        {status === "pending" && <NewLoader />}
        {status === "rejected" && toast.error(`${error.message}`)}
        {status === "resolved" && (
          <>
            <ul className={s.ImageGallery} onClick={this.onImageClick}>
              {gallery.map((elem) => (
                <ImageGalleryItem key={elem.id} item={elem} />
              ))}
            </ul>
            {showModal && (
              <Modal
                modalUrl={modalUrl}
                modalAlt={modalAlt}
                onToggle={this.toggleModal}
              />
            )}
            {gallery.length >= 12 && (
              <LoadMoreButton onClick={this.fetchImages} />
            )}
          </>
        )}
      </>
    );
  }
}

export default ImageGallery;
