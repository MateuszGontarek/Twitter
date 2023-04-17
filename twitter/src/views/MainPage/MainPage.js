import React from "react";
import "./MainPage.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/Header";
import AddTwit from "../../components/AddTwit";
import Twits from "../../components/Twits";
import Settings from "../../components/Settings";
const MainPage = () => {
  // if (!sessionStorage.getItem("token")) {
  //   window.location.href = "/login";
  //   return;
  // }
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="twits-functionality">
          <Twits notLoginUser={true} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
