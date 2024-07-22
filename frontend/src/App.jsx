import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Allaudiobooks from "./pages/Allaudiobooks";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Footer from "./components/Footer/Footer";
import {  Routes, Route } from "react-router-dom";
import AudiobookDetails from "./components/AudiobookDetails/AudiobookDetails";
import './App.css';  // Import the CSS file
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if(
      localStorage.getItem("id")&&
      localStorage.getItem("token")
    ){
      dispatch(authActions.login());
      
    }
  },[]);
  return (
    <div className="app-container">
      
        {/* <Navbar /> */}
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/all-audiobooks" element={<Allaudiobooks />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/audiobook/:id" element={<AudiobookDetails />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      
    </div>
  );
};

export default App;
