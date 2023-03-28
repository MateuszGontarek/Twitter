import React from "react";
import "./Settings.scss";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { useState } from "react";
const Settings = () => {
  // const [avatar, setAvatar] = useState("");
  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="settings-container">
        <div className="set-avatar">
          <FileBase64
            multiple={false}
            // onDone={({ base64 }) => setAvatar({ image: base64 })}
          />
        </div>
        <div className="set-nickname">
          <input type="text" placeholder="new nickname" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
