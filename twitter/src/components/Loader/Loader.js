import "./Loader.scss";
import { useState } from "react";
const Loader = () => {
  const [loadingDots, setLoadingDots] = useState(".");
  setInterval(() => {
    if (loadingDots.length === 3) {
      setLoadingDots(".");
    } else {
      setLoadingDots(loadingDots + ".");
    }
  }, 500);
  return (
    <div className="loader">
      <div className="loader-container">
        <div className="pyramid-loader">
          <div className="wrapper">
            <span className="side side1"></span>
            <span className="side side2"></span>
            <span className="side side3"></span>
            <span className="side side4"></span>
            <span className="shadow"></span>
          </div>
        </div>
      </div>
      <h2>Loading{loadingDots}</h2>
    </div>
  );
};

export default Loader;
