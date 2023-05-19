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
} from "react-bootstrap-icons";

const Header = () => {
  const path = window.location.pathname.split("/");
  const actualPage = path[path.length - 1];

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
          <Link
            onClick="location.reload();"
            to="/home"
            className={
              actualPage !== "home"
                ? "menu-element home-point"
                : "menu-element chosen-element home-point"
            }
          >
            <House className="menuIcon" size={menuIconSize} />
            <li>Home</li>
          </Link>
          <Link
            onClick="location.reload();"
            to="/home/your"
            className={
              actualPage !== "your"
                ? "menu-element your-point"
                : "menu-element chosen-element your-point"
            }
          >
            <Twitter className="menuIcon" size={menuIconSize} />
            <li>Your</li>
          </Link>
          <Link
            onClick="location.reload();"
            to="/home/liked"
            className={
              actualPage !== "liked"
                ? "menu-element liked-point"
                : "menu-element chosen-element liked-point"
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
          <Link
            onClick={() => {
              sessionStorage.clear();
            }}
            to="/login"
            className="menu-element logout-point"
          >
            <BoxArrowLeft className="menuIcon" size={menuIconSize} />
            <li>Log out</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
