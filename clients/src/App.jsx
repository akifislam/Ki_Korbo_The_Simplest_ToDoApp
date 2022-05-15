import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
