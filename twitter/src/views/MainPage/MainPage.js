import React from "react";
import "./MainPage.scss";
import { useNavigate } from "react-router-dom";
import Twits from "../../components/Twits";
const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="main-page home-page">
      <div className="home-container">
        <div className="twits-functionality">
          <Twits notLoginUser={true} />
        </div>
      </div>
      <div className="fixed-login-register">
        <div className="text-content">
          <h2 className="updated">Bądź na bieżąco</h2>
          <p className="updated-p">
            Użytkownicy Twittera dowiadują się pierwsi.
          </p>
        </div>
        <div className="buttons">
          <button onClick={() => navigate("/login")} className="login-button">
            Zaloguj się
          </button>
          <button
            onClick={() => navigate("/register")}
            className="register-button"
          >
            Zarejestruj się
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
