import React from "react";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const emailRef = React.createRef();
  const nicknameRef = React.createRef();
  const passwordRef = React.createRef();
  const repeatPasswordRef = React.createRef();

  const Register = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const nickname = nicknameRef.current.value;
    const password = passwordRef.current.value;

    const data = { email, nickname, password };
    const response = await axios.post("/api/users", { data });

    if (response.data.success) {
      navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <form>
        <h2>Sign up</h2>
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          defaultValue={"admin@technischools.com"}
        />
        <input
          type="text"
          placeholder="Nickname"
          ref={nicknameRef}
          defaultValue={"admin"}
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          defaultValue={"admin4123"}
        />
        <input
          type="password"
          placeholder="Repeat password"
          ref={repeatPasswordRef}
          defaultValue={"admin4123"}
        />
        <button onClick={(e) => Register(e)}>Login</button>
      </form>
    </div>
  );
};

export default Register;
