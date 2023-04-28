import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/login";
import MainPage from "./views/MainPage";
import Register from "./views/register";
import Home from "./views/Home";
import Settings from "./components/Settings";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />}>
            <Route path="/home/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
