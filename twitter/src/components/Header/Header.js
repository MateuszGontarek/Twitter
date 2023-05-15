import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { Link } from "react-router-dom";
import {
  BoxArrowLeft,
  House,
  Twitter,
  Heart,
  Gear,
  QuestionCircle,
  Person,
} from "react-bootstrap-icons";

const Header = () => {
  const path = window.location.pathname.split("/");
  const actualPage = path[path.length - 1];

  const navigate = useNavigate();
  const menuIconSize = 20;
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  // document.addEventListener("DOMContentLoaded", function () {
  //   const elements = document.querySelectorAll(".menu-element");
  //   elements.forEach((element) => {
  //     const li = element.querySelector("li");
  //     if (li.innerText.toLowerCase() === actualPage) {
  //       element.classList.add("chosen-element");
  //       return;
  //     }
  //   });
  // });

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
          <Link
            onClick={() => {
              sessionStorage.clear();
            }}
            to="/login"
            className="menu-element"
          >
            <BoxArrowLeft className="menuIcon" size={menuIconSize} />
            <li>Log out</li>
          </Link>
          <Link
            to="/home"
            className={
              actualPage !== "home"
                ? "menu-element"
                : "menu-element chosen-element"
            }
          >
            <House className="menuIcon" size={menuIconSize} />
            <li>Home</li>
          </Link>
          <Link
            to="/home/your"
            className={
              actualPage !== "your"
                ? "menu-element"
                : "menu-element chosen-element"
            }
          >
            <Twitter className="menuIcon" size={menuIconSize} />
            <li>Your</li>
          </Link>
          <Link
            to="/home/liked"
            className={
              actualPage !== "liked"
                ? "menu-element"
                : "menu-element chosen-element"
            }
          >
            <Heart className="menuIcon" size={menuIconSize} />
            <li>Liked</li>
          </Link>
          <Link
            to="/home/settings"
            className={
              actualPage !== "settings"
                ? "menu-element settings-point"
                : "menu-element chosen-element settings-point"
            }
          >
            <Gear className="menuIcon settings-icon" size={menuIconSize} />
            <li>Settings</li>
          </Link>
          {/* <a target="_blank" href="support">
            <QuestionCircle className="menuIcon" size={menuIconSize} />
            <li>Support</li>
          </a> */}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
