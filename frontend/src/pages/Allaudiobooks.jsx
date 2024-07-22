import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import Audiobookcard from "../components/Audiobookcard/Audiobookcard";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Allaudiobooks = () => {
  const [Data, setData] = useState();
  
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:5500/audiobook");
      console.log(response.data);
      setData(response.data);
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow p-4">
        <div className="flex flex-wrap justify-center gap-4">
          {!Data && (
            <div className="flex items-center justify-center my-8">
              <Loader />
            </div>
          )}
          {Data && Data.map((items, i) => (
            <div key={i} className="w-1/6 p-2">
              <Audiobookcard data={items} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Allaudiobooks;
