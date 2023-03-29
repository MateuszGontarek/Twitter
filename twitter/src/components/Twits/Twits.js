import React from "react";
import "./Twits.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { Trash3Fill } from "react-bootstrap-icons";
const Twits = () => {
  const token = sessionStorage.getItem("token");
  const userData = sessionStorage.getItem("userData");
  const avatar = JSON.parse(userData).avatar;
  const nickname = JSON.parse(userData).nickname;
  console.log(avatar);
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

  const addComment = async (e, id) => {
    e.preventDefault();

    const comment = e.target[0].value;
    const response = await axios.post(
      "/api/twits-comment",
      { comment, id },
      {
        headers: { token },
      }
    );
    getTwits();
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
      <div className="twits">
        {twits.map((twit) => {
          if (twit.parents === null) {
            return (
              <div className="twit" key={twit._id}>
                <div className="twit-header">
                  <div
                    className={avatar ? "avatar" : "avatar-none"}
                    style={{
                      backgroundImage: `url(${avatar})`,
                    }}
                  ></div>
                  <p className="nickname">{nickname}</p>
                  <div className="twit-header-info"></div>
                  <Trash3Fill
                    onClick={() => deleteTwit(twit._id)}
                    size={30}
                    className="twit-delete"
                  />
                </div>
                <textarea
                  readOnly
                  value={twit.description}
                  className="twit-description"
                />
                <div
                  className={
                    twit.content ? "twit-content" : "twit-content-none"
                  }
                  style={{
                    backgroundImage: `url(${twit.content})`,
                  }}
                ></div>
                <div className="twit-comments">
                  {twits
                    .filter((comment) => comment.parents === twit._id)
                    .map((comment) => {
                      return (
                        <div className="twit-comment" key={comment._id}>
                          <textarea
                            readOnly
                            value={comment.description}
                            className="twit-comment-description"
                          />
                        </div>
                      );
                    })}
                </div>
                <form
                  className="add-comment"
                  onSubmit={(e, _id) => {
                    addComment(e, twit._id);
                  }}
                >
                  <textarea
                    maxLength={200}
                    className="comment-input"
                    placeholder="Dodaj komentarz..."
                    onChange={(element) => {
                      autoHeight(element.target);
                    }}
                  ></textarea>
                  <button className="comment-button">Dodaj</button>
                </form>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Twits;
