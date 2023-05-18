import React from "react";
import "./Settings.scss";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import { BoxArrowInUpLeft, PersonCircle, CheckLg } from "react-bootstrap-icons";
import Header from "../../components/Header";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Settings = () => {
  const newNicknameRef = React.createRef();
  const [avatar, setAvatar] = useState("");
  const [newNickName, setNewNickName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const token = sessionStorage.getItem("token");
  const [userData, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );
  const update = async () => {
    const id = userData._id;
    if (!avatar && !newNickName && !currentPassword && !newPassword) return;
    const data = {
      newAvatar: avatar.image,
      newNickName,
      currentPassword,
      newPassword,
      token,
      id,
    };
    const response = await axios.put("/api/users/update", data);
    if (response.data.success) {
      newNicknameRef.current.value = "";
      const updateButton = document.querySelector(".update-button");
      const updateButtonText = updateButton.querySelector(
        ".update-button-text"
      );
      const updateIcon = document.querySelector(".updated-icon-default");

      updateButtonText.innerHTML = "Updated";
      updateIcon.classList.add("updated-icon");
      updateButton.classList.add("success");
      setTimeout(() => {
        updateButtonText.innerText = "Update";
        updateIcon.classList.remove("updated-icon");
        updateButton.classList.remove("success");
      }, 2000);
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      if (newNickName) {
        userData["nickname"] = newNickName;
      }
      if (avatar) {
        userData["avatar"] = avatar.image;
      }
      sessionStorage.setItem("userData", JSON.stringify(userData));
      setUserData(userData);
    } else {
      console.log("error");
    }
  };
  const chooseNewAvatar = () => {
    const setAvatar = document.querySelector(".set-avatar-button");
    const fileBase64 = setAvatar.querySelector("input");
    fileBase64.click();
  };
  return (
    <div className="container">
      <Header />
      <div className="settings">
        {/* <div>
          <img
            src="../icon.svg"
            className="icon"
            data-aos="flip-up"
            data-aos-duration="2000"
          />
        </div> */}
        <div className="title-button">
          <h2>Settings</h2>
          <button className="update-button" onClick={update}>
            <span className="update-button-text">Update</span>
            <CheckLg className="updated-icon-default" />
          </button>
        </div>
        <div className="settings-container">
          <div className="set-avatar">
            <p>Change avatar</p>
            <div className="set-avatar-content">
              <div
                style={{
                  backgroundImage: userData.avatar
                    ? `url(${userData.avatar})`
                    : 'url("")',
                }}
                className={userData.avatar ? "avatar" : "avatar default-avatar"}
              >
                {!userData.avatar && (
                  <PersonCircle className="default-avatar" size="100%" />
                )}
              </div>
              <div onClick={chooseNewAvatar} className="set-avatar-button">
                <div className="file-base64-avatar">
                  <FileBase64
                    className="file-base64"
                    multiple={false}
                    accept="image/*"
                    onDone={({ base64 }) => setAvatar({ image: base64 })}
                  />
                </div>
                <BoxArrowInUpLeft size={30} />
                <span>
                  choose <br />
                  image
                </span>
              </div>
            </div>
          </div>
          <div className="set-nickname">
            <p>Change nickname</p>
            <div className="current-nickname-container">
              <label className="current-nickname-label">current nickname</label>
              <input
                type="text"
                value={userData.nickname}
                className="current-nickname"
                placeholder="current nickname"
                disabled
              />
            </div>
            <input
              type="text"
              ref={newNicknameRef}
              placeholder="new nickname"
              onChange={(e) => setNewNickName(e.target.value)}
            />
          </div>
          <div className="new-password">
            <p>Change password</p>
            <input
              type="password"
              placeholder="current password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="new password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
