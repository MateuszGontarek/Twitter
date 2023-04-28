import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import {
  BoxArrowLeft,
  Twitter,
  Heart,
  Gear,
  QuestionCircle,
  Person,
} from "react-bootstrap-icons";
const Header = () => {
  // 1.Avatar + Nick
  // 2.Log out
  // 3.My twits
  // 4.Liked twits
  // 5.Settings
  // 6.Support*
  const navigate = useNavigate();
  const menuIconSize = 20;
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  return (
    <nav role="navigation">
      <div id="menuToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
          <div className="user-info">
            <div
              style={{
                backgroundImage: userData.avatar
                  ? `url(${userData.avatar})`
                  : 'url("AccountCircle.svg")',
              }}
              className={
                userData.avatar ? "menuIcon avatar" : "menuIcon default-avatar"
              }
            />
            <li className="nickname">{userData.nickname}</li>
          </div>
          <a href="#">
            <BoxArrowLeft className="menuIcon" size={menuIconSize} />
            <li
              onClick={() => {
                sessionStorage.clear();
                navigate("/login");
              }}
            >
              Log out
            </li>
          </a>
          <a href="#">
            <Twitter className="menuIcon" size={menuIconSize} />
            <li>My twits</li>
          </a>
          <a href="#">
            <Heart className="menuIcon" size={menuIconSize} />
            <li>Liked twits</li>
          </a>
          <a href="settings">
            <Gear className="menuIcon" size={menuIconSize} />
            <li>Settings</li>
          </a>
          <a href="#">
            <QuestionCircle className="menuIcon" size={menuIconSize} />
            <li>Support</li>
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
