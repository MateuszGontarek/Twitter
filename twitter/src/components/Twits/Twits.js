import React from "react";
import "./Twits.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Trash3Fill, HeartFill, Search } from "react-bootstrap-icons";
const Twits = (props) => {
  const nickname = JSON.parse(sessionStorage.getItem("userData")).nickname;
  const notLoginUser = props.notLoginUser;
  const hashtagRef = React.createRef();
  const token = sessionStorage.getItem("token");
  const { filter } = props;

  let { email } = "";
  if (!notLoginUser) {
    email = JSON.parse(sessionStorage.getItem("userData"));
  }
  const [twits, setTwits] = useState([]);
  const findTwits = async (e) => {
    const hashtagContent = hashtagRef.current.value;
    if (hashtagContent.length === 0) {
      getTwits();
    }
    e.preventDefault();
    let hashtag = "";
    if (hashtagContent[0] === "#") {
      hashtag = hashtagContent.substring(1);
    } else {
      hashtag = hashtagContent;
    }

    getTwitsByHashtag(hashtag);
  };
  const ifEmpty = (e) => {
    if (e.target.classList.contains("warning")) {
      e.target.classList.remove("warning");
    }
  };

  const getTwits = async () => {
    const { _id } = JSON.parse(sessionStorage.getItem("userData"));

    const response = await axios.get("/api/twits", {
      headers: { 
        filterOption: filter,
        id: _id, 
        email: email.email,
      },
    });
    if (response.data.success) {
      setTwits(response.data.twitsWithHeaders);
    } else {
      console.log("error");
    }
  };

  const addLike = async (id) => {
    if (notLoginUser) {
      return;
    }
    const response = await axios.post(
      "/api/twits-like",
      { id, email },
      {
        headers: { token },
      }
    );
    if (response.data.success) {
      getTwits();
    } else {
      console.log("error");
    }
  };

  const addComment = async (e, id) => {
    if (notLoginUser) {
      console.log("zaloguj się");
      return;
    }
    e.preventDefault();
    const comment = e.target[0].value;
    const response = await axios.post(
      "/api/twits-comment",
      { comment, id, userId: email._id },
      {
        headers: { token },
      }
    );
    getTwits();
    e.target[0].value = "";
  };

  const autoHeight = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  const deleteTwit = async (id) => {
    if (notLoginUser) {
      console.log("zaloguj się");
      return;
    }
    const response = await axios.delete("/api/twits", {
      headers: { id, token },
    });
    if (response.data.success) {
      getTwits();
    } else {
      console.log("error");
    }
  };
  const getTwitsByHashtag = async (hashtag) => {
    const response = await axios.get("/api/twits/find", {
      headers: { hashtag },
    });
    if (response.data.success) {
      const twitsWithHeaders = response.data.twitsWithHeaders;
      setTwits(twitsWithHeaders);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    window.getTwitsByHashtagAfterClick = (event) => {
      const hashtag = event.target.innerText.substring(1);
      getTwitsByHashtag(hashtag, true);
    };
    getTwits();
    console.log(10, filter)
  }, []);
  return (
    <div className="container">
      <div className="searcher">
        <form>
          <div className="searcher-content">
            <img className="hashtag-symbol" src="hashtag-symbol.webp" />
            <input
              maxLength={200}
              onChange={(e) => {
                ifEmpty(e);
                findTwits(e);
                autoHeight(e.target);
              }}
              ref={hashtagRef}
              type="text"
              placeholder="wpisz hasztag"
            />
          </div>
          <Search className="loop" size={30} />
        </form>
      </div>
      <div className="twits">
        {twits.map((twit) => {
          if (twit.parents === null) {
            return (
              <div className="twit" key={twit._id}>
                <div className="twit-header">
                  <div
                    className={
                      twit.avatar
                        ? "twit-avatar"
                        : "twit-avatar-default twit-avatar"
                    }
                    style={{
                      backgroundImage: twit.avatar
                        ? `url(${twit.avatar})`
                        : 'url("AccountCircle.svg")',
                    }}
                  ></div>
                  <p className="nickname">{twit.nickname}</p>
                </div>
                <div className="twit-info">
                  <div
                    className="twit-description"
                    dangerouslySetInnerHTML={{
                      __html: twit.hashtags
                        ? twit.description.replace(
                            /#(\w+)/g,
                            '<span onclick="getTwitsByHashtagAfterClick(event)" class="hashtag">#$1</span>'
                          )
                        : twit.description,
                    }}
                  ></div>

                  <p className="twit-heart-counter">{twit.likes.length}</p>
                  <HeartFill
                    size={30}
                    className={
                      twit.likes.includes(email['email'])
                        ? "twit-heart-active"
                        : "twit-heart"
                    }
                    onClick={(e) => addLike(twit._id)}
                  />

                  {email && twit.userId === email._id && (
                    <Trash3Fill
                      onClick={() => deleteTwit(twit._id)}
                      size={30}
                      className="twit-delete"
                    />
                  )}
                </div>
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
                          {email && comment.userId === email._id && (
                            <Trash3Fill
                              onClick={() => deleteTwit(twit._id)}
                              size={30}
                              className="twit-delete"
                            />
                          )}
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
