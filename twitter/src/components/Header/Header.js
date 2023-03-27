import { useNavigate } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Header.scss";

const Header = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userNickname = userData.nickname;
  const userEmail = userData.email;
  const navigate = useNavigate();
  const [receivedMessages, setReceivedMessages] = useState([]);
  const token = sessionStorage.getItem("token");

  const ifEmpty = (e) => {
    if (e.target.classList.contains("error")) {
      e.target.classList.remove("error");
    }
  };

  let backspace = false;
  let actualAdress = "";

  // const addMessagesHandler = async () => {
  //   const receiver = adressRef.current.value,
  //     content = messageRef.current.value,
  //     title = titleRef.current.value,
  //     sender = userEmail;
  //   const data = { receiver, content, sender, title };
  //   const response = await axios.post("/api/messages/sent", { data, token });
  //   if (response.data.success) {
  //     const inputs = [adressRef, messageRef, titleRef];
  //     inputs.forEach((input) => (input.current.value = ""));
  //     comunicatorHandler("success");
  //     getSentMessages();
  //   } else {
  //     comunicatorHandler(false);
  //   }
  // };
  // const getReceivedMessages = async () => {
  //   const response = await axios.get("/api/messages/received", {
  //     headers: {
  //       useremail: userEmail,
  //     },
  //   });
  //   if (response.data.success) {
  //     const messages = response.data.filteredMessages;
  //     setReceivedMessages(messages);
  //   }
  // };
  // const deleteMessageHandler = async (id) => {
  //   const response = await axios.delete("/api/messages/sent", {
  //     headers: {
  //       id: id,
  //       token: token,
  //     },
  //   });
  //   if (response.data.success) {
  //     getReceivedMessages();
  //   }
  // };

  // const refreshReceivedMessages = () => {
  //   const refreshButton = document.querySelector(".refresh-button");
  //   refreshButton.classList.add("refreshed");
  //   setTimeout(() => {
  //     refreshButton.classList.remove("refreshed");
  //   }, 500);
  //   getReceivedMessages();
  // };
  return (
    <div className="panel-container container">
      <div className="top">
        <div className="top-left">
          <img
            src="https://cdn3d.iconscout.com/3d/free/thumb/twitter-5630533-4687626.png?f=webp"
            alt="logo"
          />
          <h1>
            <span>{userNickname}</span>
          </h1>
        </div>
        {/* <div className="email">
          <img alt="img" src="email.svg" />
          <p>{userEmail}</p>
        </div> */}
        <button
          className="logout"
          onClick={() => {
            sessionStorage.clear();
            navigate("/login");
          }}
        >
          Wyloguj
        </button>
      </div>
    </div>
  );
};

export default Header;
