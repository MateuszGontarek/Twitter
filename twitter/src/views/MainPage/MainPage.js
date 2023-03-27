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
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <div className="main-page">
      <Header />
      <div className="twits-functionality">
        <AddTwit />
        <Twits />
      </div>
      <Settings />
    </div>
  );
};

export default MainPage;
