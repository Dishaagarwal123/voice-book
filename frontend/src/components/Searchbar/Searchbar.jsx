import React, { useState } from 'react';

const Searchbar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);

  const genres = ['Horror', 'Comedy', 'Fiction', 'Fantasy', 'Non-Fiction', 'Mystery'];
  const authors = ['Author1', 'Author2', 'Author3', 'Author4', 'Author5', 'Author6', 'Author7', 'Author8', 'Author9', 'Author10'];

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterOptionClick = (filter) => {
    setSelectedFilter(filter);
    switch (filter) {
      case 'Genre':
        setFilterOptions(genres);
        break;
      case 'Author':
        setFilterOptions(authors);
        break;
      case 'Rating':
        setFilterOptions(['Top Rated', 'Least Rated']);
        break;
      default:
        setFilterOptions([]);
    }
  };

  return (
    <div>
      <div className="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
        <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input className="bg-gray-100 outline-none" type="text" placeholder="Article name or keyword..." />
        </div>
        <div className="relative">
          <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer" onClick={handleFilterClick}>
            <span>Filter</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {isFilterOpen && (
            <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
              <ul>
                {['Genre', 'Author', 'Rating'].map((filter) => (
                  <li key={filter} className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleFilterOptionClick(filter)}>
                    {filter}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {selectedFilter && (
          <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
            <ul>
              {filterOptions.map((option) => (
                <li key={option} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="bg-yellow-400 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-300 cursor-pointer">
          <span>Search</span>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
