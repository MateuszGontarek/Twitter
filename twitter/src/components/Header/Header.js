import React, { useState } from "react";
import "./Header.scss";

const Header = () => {
  return (
    <nav role="navigation">
      <div id="menuToggle">
        {/* <!--
    A fake / hidden checkbox is used as click reciever,
    so you can use the :checked selector on it.
    --> */}
        <input type="checkbox" />

        {/* <!--
    Some spans to act as a hamburger.
    
    They are acting like a real hamburger,
    not that McDonalds stuff.
    --> */}
        <span></span>
        <span></span>
        <span></span>

        {/* <!--
    Too bad the menu has to be inside of the button
    but hey, it's pure CSS magic.
    --> */}
        <ul id="menu">
          <a href="#">
            <li>Home</li>
          </a>
          <a href="#">
            <li>About</li>
          </a>
          <a href="#">
            <li>Info</li>
          </a>
          <a href="#">
            <li>Contact</li>
          </a>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

{
  /* <div className="panel-container container">
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
    </div> */
}
