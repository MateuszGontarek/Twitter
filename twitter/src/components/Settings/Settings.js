import React from "react";
import "./Settings.scss";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import Header from "./../Header/Header";
const Settings = () => {
  const [avatar, setAvatar] = useState("");
  const [newNickName, setNewNickName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const token = sessionStorage.getItem("token");
  const userData = sessionStorage.getItem("userData");

  const update = async () => {
    const id = JSON.parse(userData)._id;
    if (!avatar && !newNickName && !currentPassword && !newPassword) return;
    const data = {
      avatar: avatar.image,
      newNickName,
      currentPassword,
      newPassword,
      token,
      id,
    };
    if (!data) return;
    const response = await axios.put("/api/users/update", data);
    if (response.data.success) {
      console.log("success");
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      userData["nickname"] = newNickName;
      sessionStorage.setItem("userData", JSON.stringify(userData));
      window.location.reload();
    } else {
      console.log("error");
    }
  };

  return (
    <div className="settings">
      <Header />
      <h2>Settings</h2>
      <div className="settings-container">
        <div className="set-avatar">
          <p>Change avatar</p>
          <FileBase64
            className="file-base64"
            multiple={false}
            onDone={({ base64 }) => setAvatar({ image: base64 })}
          />
        </div>
        <div className="set-nickname">
          <p>Change nickname</p>
          <input
            type="text"
            placeholder="new nickname"
            onChange={(e) => setNewNickName(e.target.value)}
          />
        </div>
        <div className="new-password">
          <p>Change password</p>
          <input
            type="text"
            placeholder="current password"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            type="text"
            placeholder="new password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="update-user">
          <button className="update-user" onClick={update}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
