import PropTypes from "prop-types";
import { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  static propTypes = {
    modalUrl: PropTypes.string.isRequired,
    modalAlt: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onToggle();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onToggle();
    }
  };

  render() {
    const { modalAlt, modalUrl } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <img className={s.Img} src={modalUrl} alt={modalAlt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
