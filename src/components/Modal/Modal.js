import PropTypes from "prop-types";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

function Modal({ onToggle, modalAlt, modalUrl }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onToggle();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onToggle();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img className={s.Img} src={modalUrl} alt={modalAlt} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  modalUrl: PropTypes.string.isRequired,
  modalAlt: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Modal;
