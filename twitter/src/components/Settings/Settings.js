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
      // window.location.reload();
    } else {
      console.log("error");
    }
  };
  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="settings-container">
        <div className="set-avatar">
          <p>Chanhe avatar</p>
          <FileBase64
            multiple={false}
            onDone={({ base64 }) => setAvatar({ image: base64 })}
          />
        </div>
        <div className="set-nickname">
          <input type="text" placeholder="new nickname" />
        </div>
        <div className="new-password">
          <input type="text" placeholder="new password" />
        </div>
        <button className="update-user" onClick={updateAvatar}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Settings;
