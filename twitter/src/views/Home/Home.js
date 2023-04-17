import React from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Search from "../../components/Search";
import Header from "../../components/Header";
import AddTwit from "../../components/AddTwit";
import Twits from "../../components/Twits";
import Settings from "../../components/Settings";
import Searcher from "../../components/Searcher";
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
<<<<<<< HEAD
      <div className="home-container">
=======
      <div className="search">
        <Search />
      </div>
      <div className="twits-functionality">
>>>>>>> d699c8e4b4c4710d66c9a6e78ae1cd57cc69f573
        <AddTwit />
        {/* <Searcher /> */}
        <Twits />
        {/* <Settings /> */}
      </div>
    </div>
  );
};

export default Home;
