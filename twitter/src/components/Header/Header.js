import { useNavigate } from "react-router-dom";
import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
import "./Header.scss";

const Header = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userNickname = userData.nickname;
  const userEmail = userData.email;
  const navigate = useNavigate();
  return (
    <div className="panel-container container">
      <div className="top">
        <div className="top-left">
          <img
            src="https://cdn3d.iconscout.com/3d/free/thumb/twitter-5630533-4687626.png?f=webp"
            alt="logo"
          />
          <h1>
            <span>{userNickname}</span>
          </h1>
        </div>
        <div className="email">
          <img alt="img" src="email.svg" />
          <p>{userEmail}</p>
        </div>
        <button
          className="logout"
          onClick={() => {
            sessionStorage.clear();
            navigate("/login");
          }}
        >
          Wyloguj
        </button>
      </div>
    </div>
  );
};

export default Header;
