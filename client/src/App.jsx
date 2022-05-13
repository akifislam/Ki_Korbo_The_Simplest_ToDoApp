import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
