import s from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import NewLoader from "../Loader";
import API from "../../services/imageFinderApi";
import LoadMoreButton from "../Button";
import Modal from "../Modal";
import Searchbar from "../Searchbar";

function ImageGallery() {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      setStatus("pending");
      fetchImages();
    }
  }, [searchQuery]);

  const fetchImages = () => {
    API.fetchImage(searchQuery, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          toast.warning(`There is no ${searchQuery} found`);
        }
        if (hits.length > 0) {
          toast.success(`New ${searchQuery} found!`);
        }
        setGallery([...gallery, ...hits]);
        setStatus("resolved");
        setPage(page + 1);
      })
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      })
      .finally(() => {
        handleLoadMoreButton();
      });
  };

  const handleLoadMoreButton = () => {
    if (page > 1) {
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

  const onImageClick = (e) => {
    e.preventDefault();
    const imageModal = e.target.getAttribute("data-src");
    const altModal = e.target.getAttribute("alt");

    if (e.target.nodeName !== "IMG") {
      return;
    }
    setShowModal(true);
    setModalUrl(imageModal);
    setModalAlt(altModal);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFormSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
    setPage(1);
    setGallery([]);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === "idle" && <h1>Enter anything you are looking for</h1>}
      {status === "pending" && <NewLoader />}
      {status === "rejected" && toast.error(`${error.message}`)}
      {status === "resolved" && (
        <>
          <ul className={s.ImageGallery} onClick={onImageClick}>
            {gallery.map((elem) => (
              <ImageGalleryItem key={elem.id} item={elem} />
            ))}
          </ul>
          {showModal && (
            <Modal
              modalUrl={modalUrl}
              modalAlt={modalAlt}
              onToggle={toggleModal}
            />
          )}
          {gallery.length >= 12 && <LoadMoreButton onClick={fetchImages} />}
        </>
      )}
    </>
  );
}

export default ImageGallery;
