import React from "react";
import "./Searcher.scss";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { useState } from "react";

const Searcher = () => {
  const token = sessionStorage.getItem("token");
  const [twits, setTwits] = useState([]);
  const hashtagRef = React.createRef();
  const ifEmpty = (e) => {
    if (e.target.classList.contains("warning")) {
      e.target.classList.remove("warning");
    }
  };
  const autoHeight = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };
  const findTwits = async (e) => {
    e.preventDefault();
    const hashtag = hashtagRef.current.value;
    if (hashtag.length === 0) {
      hashtagRef.current.classList.add("warning");
      return;
    }
    const response = await axios.get("/api/twits/find", {
      headers: { hashtag },
    });
    if (response.data.success) {
      // setTwits(response.data.twitsByHashtag);
      const twitsByHashtag = response.data.twitsByHashtag;
    } else {
      console.log("error");
    }
  };
  return (
    <div className="searcher">
      <form>
        <textarea
          maxLength={200}
          onChange={(e) => {
            ifEmpty(e);
            autoHeight(e.target);
          }}
          ref={hashtagRef}
          type="text"
          placeholder="wpisz hasztag"
        />
        <div className="twit-content">
          <button onClick={(e) => findTwits(e)} type="submit">
            szukaj
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searcher;
