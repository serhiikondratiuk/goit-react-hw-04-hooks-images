import PropTypes from "prop-types";
import s from "./Button.module.css";

const LoadMoreButton = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={s.Button} type="button">
        Load more
      </button>
    </div>
  );
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreButton;
