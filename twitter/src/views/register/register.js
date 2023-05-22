import React from "react";
// import "./register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
const Register = () => {
  const navigate = useNavigate();
  const emailRef = React.createRef();
  const nicknameRef = React.createRef();
  const passwordRef = React.createRef();

  const Register = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const nickname = nicknameRef.current.value;
    const password = passwordRef.current.value;

    const data = { email, nickname, password };
    const response = await axios.post("/api/users", { data });

    if (response.data.success) {
      NotificationManager.success("Registered");
      navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <form>
        <h2>Sign up</h2>
        <label>Email</label>
        <input
          type="email"
          ref={emailRef}
          // placeholder="Email"
          // defaultValue={"admin@technischools.com"}
        />
        <label>Nickname</label>
        <input
          type="text"
          ref={nicknameRef}
          // placeholder="Nickname"
          // defaultValue={"admin"}
        />
        <label>Password</label>
        <input
          type="password"
          ref={passwordRef}
          // placeholder="Password"
          // defaultValue={"admin4123"}
        />
        {/* <label>Repeat password</label>
        <input
          type="password"
          ref={repeatPasswordRef}
          // placeholder="Repeat password"
          // defaultValue={"admin4123"}
        /> */}
        <button onClick={(e) => Register(e)}>Sign up</button>
        <p className="no-acc">
          Do you have an account?{" "}
          <b
            onClick={() => (window.location = "login")}
            className="no-acc-button"
          >
            Sign in
          </b>
        </p>
      </form>
    </div>
  );
};

export default Register;
