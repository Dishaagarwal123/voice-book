import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Popularbooks = () => {
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    fetchPopularBooks();
  }, []);

  const fetchPopularBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5500/audiobook?minRating=3.5");
      console.log(response.data);  // Log the response data to check its structure
      setPopularBooks(response.data);
    } catch (error) {
      console.error("Error fetching popular books:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mb-8 w-full">
      <div className="w-full max-w-screen-2xl px-4">
        <h3 className="text-xl mt-5">Popular Audiobooks</h3>
        <div className="scrollbar-container flex overflow-x-auto">
          {popularBooks.map((book) => (
            <Link to={`/audiobook/${book._id}`} key={book._id} className="book-item">
              <div className="flex flex-col items-center">
                <img src={book.coverImage} alt={book.title} className="h-55 w-45 object-cover mb-2" />
                <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                <p className="text-gray-600 text-sm">by {book.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popularbooks;
