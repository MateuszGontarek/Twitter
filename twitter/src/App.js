import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/login";
import MainPage from "./views/MainPage";
import Register from "./views/register";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
