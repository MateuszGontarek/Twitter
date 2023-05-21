import React from "react";
import "./Twits.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import {
  Trash3 as Trash3Fill,
  HeartFill,
  Search,
  SearchHeart,
  PersonCircle,
} from "react-bootstrap-icons";
import Loader from "../Loader";
import TwitNotFound from "../TwitNotFound";
import NoTwitsYet from "../NoTwitsYet";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

const Twits = (props) => {
  const notLoginUser = props.notLoginUser;
  const hashtagRef = React.createRef();
  const token = sessionStorage.getItem("token");
  const { filter } = props;
  let { email } = "";
  if (!notLoginUser) {
    email = JSON.parse(sessionStorage.getItem("userData"));
  }
  const [twits, setTwits] = useState([]);
  const [ifNoTwits, setIfNoTwits] = useState(false);
  const [isTwitsByHashtag, setIsTwitsByHashtag] = useState(true);
  const [showMore, setShowMore] = useState([]);
  const [actualHashtag, setActualHashtag] = useState("");
  const findTwits = async (e) => {
    setActualHashtag(hashtagRef.current.value);

    if (actualHashtag.length === 0) {
      getTwits();
    }
    e.preventDefault();
    let hashtag = "";
    if (actualHashtag[0] === "#") {
      hashtag = actualHashtag.substring(1);
    } else {
      hashtag = actualHashtag;
    }
    getTwitsByHashtag(hashtag);
  };
  const ifEmpty = (e) => {
    NotificationManager.warning("Twitt can't be empty");
  };

  const getTwits = async () => {
    let headers = {};
    if (email) {
      const { _id } = JSON.parse(sessionStorage.getItem("userData"));
      headers = {
        filterOption: filter,
        id: _id,
        email: email.email,
      };
    } else {
      headers = {
        filterOption: "all",
      };
    }
    const response = await axios.get("/api/twits", {
      headers,
    });

    response.data.twitsWithHeaders.forEach((element) => {
      if (element.parents) {
        setShowMore([...showMore, false]);
      }
    });

    if (response.data.success) {
      const twits = response.data.twitsWithHeaders;
      if (twits.length > 0) {
        setTwits(twits);
      } else {
        setIfNoTwits(true);
      }
    } else {
      NotificationManager.error("Something went wrong");
    }
  };
  const showMoreCommentsHandler = (index) => {
    const newShowMore = [...showMore];
    newShowMore[index] = !newShowMore[index];
    setShowMore(newShowMore);
  };

  const addLike = async (id) => {
    if (notLoginUser) {
      return;
    }
    const response = await axios.post(
      "/api/twits-like",
      { id, email: email.email },
      {
        headers: { token },
      }
    );
    if (response.data.success) {
      getTwits();
      if (response.data.isLiked) {
        NotificationManager.info("Like added");
      } else {
        NotificationManager.info("Like removed");
      }
    } else {
      NotificationManager.error("Something went wrong");
    }
  };

  const addComment = async (e, id) => {
    if (notLoginUser) {
      console.log("Log in");
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
    NotificationManager.success("Comment added");
    e.target[0].value = "";
  };

  const autoHeight = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  const deleteTwit = async (id) => {
    if (notLoginUser) {
      NotificationManager.warning("Log in");
      return;
    }
    const response = await axios.delete("/api/twits", {
      headers: { id, token },
    });
    if (response.data.success) {
      getTwits();
      NotificationManager.success("Twitt deleted");
    } else {
      NotificationManager.error("Something went wrong");
    }
  };
  const getTwitsByHashtag = async (hashtag) => {
    setTwits([]);
    setIsTwitsByHashtag(true);
    const response = await axios.get("/api/twits/find", {
      headers: { hashtag, filter, email: email.email, id: email._id },
    });
    if (response.data.success) {
      const twitsWithHeaders = response.data.twitsWithHeaders;
      if (twitsWithHeaders.length > 0) {
        setTwits(twitsWithHeaders);
      } else {
        setIsTwitsByHashtag(false);
      }
    } else {
      NotificationManager.error("Something went wrong");
    }
  };

  useEffect(() => {
    window.getTwitsByHashtagAfterClick = (event) => {
      const hashtag = event.target.innerText.substring(1);
      getTwitsByHashtag(hashtag, true);
    };
    getTwits();
  }, []);
  return (
    <div className="">
      <h1 className="filtered-title">
        {filter === "liked" ? "Liked" : filter === "user" ? "Your" : null}
      </h1>
      <div className="searcher">
        <form>
          <div className="searcher-content">
            {filter != "liked" ? (
              <Search className="loop" size={25} />
            ) : (
              <SearchHeart className="loop" size={25} />
            )}
            <input
              maxLength={200}
              onChange={(e) => {
                ifEmpty(e);
                findTwits(e);
                autoHeight(e.target);
              }}
              ref={hashtagRef}
              type="text"
              placeholder="search by hashtag"
            />
          </div>
        </form>
      </div>
      <div className="twits">
        {twits.length > 0 ? (
          twits.map((twit, index) => {
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
                          : null,
                      }}
                    >
                      {!twit.avatar && (
                        <PersonCircle size={55} className="default-avatar" />
                      )}
                    </div>
                    <p className="date">{moment(twit.date).fromNow()}</p>
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
                    {email ? (
                      <HeartFill
                        size={30}
                        className={
                          twit.likes.includes(email["email"])
                            ? "twit-heart-active"
                            : "twit-heart"
                        }
                        onClick={(e) => addLike(twit._id)}
                      />
                    ) : (
                      <HeartFill
                        size={30}
                        className="twit-heart"
                        onClick={() => (window.location = "/login")}
                      />
                    )}

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
                      .slice(0, showMore[index] ? 100 : 2)
                      .map((comment) => {
                        return (
                          <div className="twit-comment" key={comment._id}>
                            <div
                              className={
                                comment.avatar
                                  ? "twit-avatar"
                                  : "twit-avatar-default twit-avatar"
                              }
                              style={{
                                backgroundImage: comment.avatar
                                  ? `url(${comment.avatar})`
                                  : null,
                              }}
                            >
                              {!comment.avatar && (
                                <PersonCircle
                                  size={45}
                                  className="default-avatar"
                                />
                              )}
                            </div>
                            <div className="comment-content">
                              <div className="comment-header">
                                <p className="nickname">{comment.nickname}</p>
                                <p className="date">
                                  {moment(comment.date).fromNow()}
                                </p>
                              </div>
                              <p className="twit-comment-description">
                                {comment.description}
                              </p>
                            </div>
                            {email && comment.userId === email._id && (
                              <Trash3Fill
                                onClick={() => deleteTwit(comment._id)}
                                size={22}
                                className="twit-delete"
                              />
                            )}
                          </div>
                        );
                      })}
                    {twits.filter((comment) => comment.parents === twit._id)
                      .length > 2 ? (
                      <button onClick={() => showMoreCommentsHandler(index)}>
                        Pokaż {showMore[index] ? "Mniej" : "Więcej"}
                      </button>
                    ) : null}
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
                      placeholder="Add comment..."
                      onChange={(element) => {
                        autoHeight(element.target);
                      }}
                    ></textarea>
                    <button className="comment-button">Add</button>
                  </form>
                </div>
              );
            }
          })
        ) : !ifNoTwits ? (
          !isTwitsByHashtag ? (
            <TwitNotFound hashtag={actualHashtag} />
          ) : (
            <Loader />
          )
        ) : (
          <NoTwitsYet />
        )}
      </div>
    </div>
  );
};

export default Twits;
