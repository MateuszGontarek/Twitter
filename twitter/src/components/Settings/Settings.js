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
    const response = await axios.post("/api/users/update", {
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
          <FileBase64
            multiple={false}
            onDone={({ base64 }) => setAvatar({ image: base64 })}
          />
          <button onClick={updateAvatar}>Update</button>
        </div>
        {/* <div className="set-nickname">
          <input type="text" placeholder="new nickname" />
        </div> */}
      </div>
    </div>
  );
};

export default Settings;
