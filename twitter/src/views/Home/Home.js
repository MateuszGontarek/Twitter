import React from "react";
import "./Home.scss";
import Header from "../../components/Header";
import AddTwit from "../../components/AddTwit";
import Twits from "../../components/Twits";
import { useState } from "react";
const Home = (props) => {
  const [updateTwits, setUpdatetwits] = useState(false);
  if (!sessionStorage.getItem("token")) {
    window.location.href = "/login";
    return;
  }
  const { filter } = props;

  const handleTwitUpdates = (info) => {
    setUpdatetwits(info);
  };
  return (
    <div className="home-page">
      <Header />
      <div className="home-container">
        <div className="twits-functionality">
          <AddTwit onTwitsUpdates={handleTwitUpdates} />
          <Twits
            onTwitsUpdates={handleTwitUpdates}
            updateTwits={updateTwits}
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
