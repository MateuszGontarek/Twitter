import React from "react";
import "./AddTwit.scss";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { useState, useEffect } from "react";

const AddTwit = () => {
  const twitTextRef = React.createRef();
  const [twitContent, setTwitContent] = useState({});
  const addTwit = async (e) => {
    e.preventDefault();
    if (twitTextRef.current.value === "") {
      twitTextRef.current.placeholder = "wpisz wiadomość";
      return;
    }
    const twitText = twitTextRef.current.value;
    const token = sessionStorage.getItem("token");
    const data = { twitContent, twitText };
    const response = await axios.post("/api/twits", { data, token });
    if (response.data.success) {
      // twitTextRef.current.value = "";
      setTwitContent({});
      // window.location.reload();
    } else {
      console.log("error");
    }
  };
  return (
    <div className="">
      <h2>Add Twit</h2>
      <form>
        <FileBase64
          multiple={false}
          onDone={({ base64 }) => setTwitContent({ image: base64 })}
        />
        <input ref={twitTextRef} type="text" placeholder="co nowego?" />
        <button onClick={(e) => addTwit(e)} type="submit">
          twitnij
        </button>
      </form>
    </div>
  );
};

export default AddTwit;
