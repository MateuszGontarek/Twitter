import React from "react";
import "./Twits.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const Twits = () => {
  const token = sessionStorage.getItem("token");
  const [twits, setTwits] = useState([]);
  const getTwits = async () => {
    const response = await axios.get("/api/twits", {
      headers: { token },
    });
    if (response.data.success) {
      setTwits(response.data.twits);
    } else {
      console.log("error");
    }
  };

  const autoHeight = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  const deleteTwit = async (id) => {
    const response = await axios.delete("/api/twits", {
      headers: { id, token },
    });
    if (response.data.success) {
      getTwits();
    } else {
      console.log("error");
    }
  };
  useEffect(() => {
    getTwits();
  }, []);
  return (
    <div className="twits-container">
      <h2>Get Twits</h2>
      <div className="twits">
        {twits.map((twit) => {
          return (
            <div className="twit" key={twit._id}>
              <div className="twit-header">
                {/* <p className="twit-description">{twit.description}</p> */}
                <textarea
                  readOnly
                  value={twit.description}
                  className="twit-description"
                />
                <button
                  onClick={() => deleteTwit(twit._id)}
                  className="twit-delete"
                >
                  usuń
                </button>
              </div>
              <div
                className="twit-content"
                style={{
                  backgroundImage: `url(${twit.content})`,
                }}
              ></div>
              <form className="add-comment">
                <textarea
                  className="comment-input"
                  placeholder="Dodaj komentarz..."
                  onChange={(element) => {
                    autoHeight(element.target);
                  }}
                ></textarea>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Twits;
