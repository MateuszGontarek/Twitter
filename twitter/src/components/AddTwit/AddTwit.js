import React from "react";
import "./AddTwit.scss";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import { Image } from "react-bootstrap-icons";

const AddTwit = () => {
  const token = sessionStorage.getItem("token");

  const userData = sessionStorage.getItem("userData");
  const userId = JSON.parse(userData)._id;
  const twitTextRef = React.createRef();
  const [twitContent, setTwitContent] = useState({});
  const ifEmpty = (e) => {
    if (e.target.classList.contains("warning")) {
      e.target.classList.remove("warning");
    }
  };

  const autoHeight = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  const addTwit = async (e) => {
    e.preventDefault();
    if (twitTextRef.current.value === "") {
      twitTextRef.current.classList.add("warning");
      twitTextRef.current.placeholder = "wpisz wiadomość";
      twitTextRef.current.focus();
      return;
    }
    const twitText = twitTextRef.current.value;
    const data = { twitContent, twitText, userId };
    const response = await axios.post("/api/twits", { data, token });
    if (response.data.success) {
      // twitTextRef.current.value = "";
      setTwitContent({});
    } else {
      console.log("error");
    }
  };
  const clickFileInput = () => {
    const fileInputDiv = document.querySelector(".fileBase64");
    const fileInput = fileInputDiv.querySelector("input");
    fileInput.click();
  };
  return (
    <div className="add-twits-container">
      <form>
        <div className="content-main">
          {" "}
          <textarea
            maxLength={200}
            onChange={(e) => {
              ifEmpty(e);
              autoHeight(e.target);
            }}
            ref={twitTextRef}
            type="text"
            placeholder="co nowego?"
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
