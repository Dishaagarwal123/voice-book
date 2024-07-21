import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Popularbooks from "../components/Popularbooks/Popularbooks";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <Popularbooks />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
