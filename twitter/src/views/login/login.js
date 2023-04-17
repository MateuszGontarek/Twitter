import React from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
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
    }
    else 
    {
      console.log(response)
    }
  };

  return (
    <div className="login-container">
      <form>
        <h2>User login</h2>
        <input
          ref={loginRef}
          type="text"
          placeholder="Email"
          defaultValue={"admin@technischools.com"}
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          defaultValue={"admin4123"}
        />
        <button onClick={(e) => loginFn(e)}>Login</button>
      </form>
    </div>
  );
};

export default Login;
