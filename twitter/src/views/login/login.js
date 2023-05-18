import React from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Google } from "react-bootstrap-icons";
const Login = () => {
  const navigate = useNavigate();
  const loginRef = React.createRef();
  const passwordRef = React.createRef();
  const loginFn = async (e) => {
    e.preventDefault();
    const login = loginRef.current.value;
    const password = passwordRef.current.value;
    const response = await axios.post("/api/login/user", { login, password });

    if (response.data.success) {
      sessionStorage.setItem("token", response.data.token);
      const userData = JSON.stringify(response.data.user);
      sessionStorage.setItem("userData", userData);
      navigate("/home");
    } else {
      console.log(response);
    }
  };

  return (
    <div className="login-container">
      <form>
        <h2>Login</h2>
        <label>Emal</label>
        <input
          ref={loginRef}
          type="text"
          // placeholder="Email"
          // defaultValue={"test@technischools.com"}
        />
        <label>Password</label>
        <input
          ref={passwordRef}
          type="password"
          // placeholder="Password"
          // defaultValue={"test"}
        />
        <button onClick={(e) => loginFn(e)}>Sign in</button>
        <p className="no-acc">
          Don't have an account?{" "}
          <b
            onClick={() => (window.location = "register")}
            className="no-acc-button"
          >
            Sign up
          </b>
        </p>
        <div className="google-login">
          <Google size={25} className="google-icon" />
          <p className="google-login-text">Sign in with Google</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
