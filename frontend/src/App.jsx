import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Allaudiobooks from "./pages/Allaudiobooks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AudiobookDetails from "./components/AudiobookDetails/AudiobookDetails";
import './App.css';  // Import the CSS file

const App = () => {
  return (
    <div className="app-container">
      <Router>
        {/* <Navbar /> */}
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/all-audiobooks" element={<Allaudiobooks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/audiobook/:id" element={<AudiobookDetails />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
    </div>
  );
};

export default App;
