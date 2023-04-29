import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/login";
import MainPage from "./views/MainPage";
import Register from "./views/register";
import Home from "./views/Home";
import Settings from "./views/Settings";
import UserTwits from "./views/UserTwits";
import LikedTwits from "./views/LikedTwits";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/home/settings" element={<Settings />} />
          <Route path="/home/your" element={<UserTwits />} />
          <Route path="/home/liked" element={<LikedTwits />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
