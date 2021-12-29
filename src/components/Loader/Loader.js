import s from "./Loader.module.css";
import Loader from "react-loader-spinner";
const NewLoader = () => {
  return (
    <div className={s.wrapper}>
      <Loader type="ThreeDots" color="#3f51b5" height={100} width={100} />
    </div>
  );
};

export default NewLoader;
