import React from "react";
import "./MainPage.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/Header";
import AddTwit from "../../components/AddTwit";
import Twits from "../../components/Twits";
import Settings from "../../components/Settings";
const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <h1>Tu będzie main page bez logowania</h1>
    </div>
  );
};

export default MainPage;
