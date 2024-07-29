import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Loader from '../Loader/Loader';
import Audiobookcard from '../Audiobookcard/Audiobookcard';
import Footer from '../Footer/Footer';

const SearchResults = () => {
    const [Data, setData] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const navigate = useNavigate();
  
    useEffect(() => {
      if (query) {
        axios.get(`http://localhost:5500/search/searchbar?q=${query}`)
          .then(response => {
            console.log(response.data);
            setData(response.data.audiobooks || []); // Ensure Data is an array
          })
          .catch(error => {
            console.log(error);
            setData([]); // Set Data to an empty array on error
          });
      } else {
        setData([]);
      }
    }, [query]);
  
    const handleCardClick = (id) => {
      navigate(`/audiobook/${id}`);
    };
  
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow p-4">
          <div className="flex flex-wrap justify-center gap-4">
            {Data.length === 0 && (
              <div className="flex items-center justify-center my-8">
                <Loader />
              </div>
            )}
            {Data.length > 0 && Data.map((items) => (
              <div key={items._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" onClick={() => handleCardClick(items._id)}>
                <div className="flex bg-white border rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105">
                  <img src={items.coverImage} alt={items.title} className="w-24 h-32 object-cover rounded-l-lg" />
                  <div className="p-4 flex flex-col justify-between">
                    <h2 className="text-lg font-semibold text-black">{items.title}</h2>
                    <p className="text-gray-600">{items.genre}</p>
                  </div>
                </div>
              </div>
            ))}
            {Data.length > 10 && (
              <div className="w-full flex justify-center mt-4">
                <button
                  onClick={() => navigate('/all-results')} // Change this URL as needed
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  See All
                </button>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default SearchResults;
