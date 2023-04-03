import React from "react";
import "./Settings.scss";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { useState } from "react";
const Settings = () => {
  const [avatar, setAvatar] = useState("");
  const token = sessionStorage.getItem("token");
  const userData = sessionStorage.getItem("userData");


  const updateAvatar = async () => {
    const id = JSON.parse(userData)._id;
    const newAvatar = avatar.image;
    const response = await axios.put("/api/users/update", {
      id,
      token,
      newAvatar,
    });


    if (response.data.success) {
      setAvatar({});
    } else {
      console.log("error");
    }
  };



  return (
    <div className="settings">
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
          <input type="text" placeholder="new nickname" />
        </div>
        <div className="new-password">
          <p>Change password</p>
          <input type="text" placeholder="current password" />
          <input type="text" placeholder="new password" />
        </div>
        <div className="update-user">
          <button className="update-user" onClick={updateAvatar}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
