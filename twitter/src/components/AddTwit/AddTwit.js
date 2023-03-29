import React from "react";
import "./AddTwit.scss";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { useState } from "react";

const AddTwit = () => {
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
    const token = sessionStorage.getItem("token");
    const data = { twitContent, twitText };
    const response = await axios.post("/api/twits", { data, token });
    if (response.data.success) {
      // twitTextRef.current.value = "";
      setTwitContent({});
      window.location.reload();
    } else {
      console.log("error");
    }
  };
  return (
    <div className="add-twits-container">
      <form>
        {/* <img src="img-icon.png" /> */}
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
        <div className="twit-content">
          <FileBase64
            multiple={false}
            onDone={({ base64 }) => setTwitContent({ image: base64 })}
          />
          <button onClick={(e) => addTwit(e)} type="submit">
            twitnij
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTwit;
