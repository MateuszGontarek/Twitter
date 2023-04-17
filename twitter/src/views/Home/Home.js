import React from "react";
import "./Home.scss";
import Header from "../../components/Header";
import AddTwit from "../../components/AddTwit";
import Twits from "../../components/Twits";
const Home = () => {
  if (!sessionStorage.getItem("token")) {
    window.location.href = "/login";
    return;
  }

  return (
    <div className="home-page">
      <Header />
      <div className="home-container">
        <div className="twits-functionality">
          <AddTwit />
          <Twits />
        </div>
      </div>
    </div>
  );
};

export default Home;
