import React from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Search from "../../components/Search";
import Header from "../../components/Header";
import AddTwit from "../../components/AddTwit";
import Twits from "../../components/Twits";
import Settings from "../../components/Settings";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <div className="home-page">
      <Header />
      <div className="search">
        <Search />
      </div>
      <div className="twits-functionality">
        <AddTwit />
        <Twits />
      </div>
      <Settings />
    </div>
  );
};

export default Home;
