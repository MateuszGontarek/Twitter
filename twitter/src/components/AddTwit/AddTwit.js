import React from "react";
import "./AddTwit.scss";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import { Image } from "react-bootstrap-icons";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useEffect } from "react";
const AddTwit = (props) => {
  const token = sessionStorage.getItem("token");
  const onTwitsUpdates = props.onTwitsUpdates;
  const userData = sessionStorage.getItem("userData");
  const userId = JSON.parse(userData)._id;
  const twitTextRef = React.createRef();
  const [twitContent, setTwitContent] = useState({});
  const ifEmpty = (e) => {
    NotificationManager.warning("Twitt can't be empty");
  };

  const autoHeight = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  const addTwit = async (e) => {
    e.preventDefault();
    if (twitTextRef.current.value === "") {
      twitTextRef.current.classList.add("warning");
      twitTextRef.current.placeholder = "enter a message";
      twitTextRef.current.focus();
      return;
    }
    const twitText = twitTextRef.current.value;
    const data = { twitContent, twitText, userId };
    const response = await axios.post("/api/twits", { data, token });
    if (response.data.success) {
      setTwitContent({});
      twitTextRef.current.value = "";
      NotificationManager.success("Twitt added");
      onTwitsUpdates(true);
    } else {
      NotificationManager.error(
        "Something went wrong, try again later",
        "Błąd!",
        2000
      );
    }
  };
  const clickFileInput = () => {
    const fileInputDiv = document.querySelector(".fileBase64");
    const fileInput = fileInputDiv.querySelector("input");
    fileInput.click();
  };
  useEffect(() => {
    const adderContent = document.querySelector(".content-main");
    const adderInput = document.querySelector(".adder-input");
    adderInput.addEventListener("focus", function () {
      adderContent.classList.add("adder-form-active");
    });
    adderInput.addEventListener("blur", function () {
      adderContent.classList.remove("adder-form-active");
    });
  }, []);
  return (
    <div className="add-twits-container">
      <form className="adder-form">
        <div className="content-main">
          {" "}
          <textarea
            maxLength={200}
            onChange={(e) => {
              ifEmpty(e);
              autoHeight(e.target);
            }}
            className="adder-input"
            ref={twitTextRef}
            type="text"
            placeholder="what's new?"
          />
          <Image
            size={30}
            className="add-twit-icon"
            onClick={() => {
              clickFileInput();
            }}
          />
        </div>
        <div className="twit-content">
          <div className="fileBase64">
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setTwitContent({ image: base64 })}
            />
          </div>
          <button onClick={(e) => addTwit(e)} type="submit">
            twitnij
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTwit;
