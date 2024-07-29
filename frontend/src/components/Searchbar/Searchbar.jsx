import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      axios.get(`http://localhost:5500/search/searchbar?q=${query}`)
        .then(res => {
          console.log(res.data);
          setResult(res.data.audiobooks || []); // Ensure `result` is an array
        })
        .catch(err => { 
          console.log(err); 
          setResult([]); // Clear results on error
        });
    } else {
      setResult([]);
    }
  }, [query]);

  const handleSearchClick = () => {
    if (query) {
      navigate(`/search-results?q=${query}`);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type='text' 
          placeholder='Search here...' 
          value={query} 
          onChange={e => setQuery(e.target.value)}
          style={{ 
            color: 'black', 
            padding: '10px', 
            borderRadius: '5px', 
            border: '1px solid #ccc', 
            width: 'calc(100% - 90px)', /* Increased width */
            marginRight: '10px'
          }}
        />
        <button 
          onClick={handleSearchClick} 
          style={{ 
            padding: '10px 15px', 
            borderRadius: '5px', 
            background: '#FFB347', /* Orange color */
            color: '#fff', 
            border: 'none',
            fontWeight: 'bold'
          }}
        >
          Search
        </button>
      </div>

      {result.length > 0 && (
        <div style={{ 
          position: 'absolute', 
          top: '60px', 
          left: '0', 
          width: 'calc(100% - 10px)', /* Adjust width to match the input width */
          backgroundColor: '#fff', 
          border: '1px solid #ccc', 
          borderRadius: '5px', 
          padding: '10px', 
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
          zIndex: 10 
        }}>
          {result.slice(0, 10).map(item => (
            <div 
              key={item._id} 
              onClick={() => navigate(`/audiobook/${item._id}`)} 
              style={{ 
                display: 'flex', 
                padding: '10px', 
                cursor: 'pointer', 
                borderBottom: '1px solid #ddd' 
              }}
            >
              <img src={item.coverImage} alt={item.title} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
              <div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>{item.title}</div>
                <div style={{ fontSize: '14px' }}>{item.genre}</div>
              </div>
            </div>
          ))}
          {result.length > 10 && (
            <div 
              onClick={() => navigate(`/search-results?q=${query}`)} 
              style={{ cursor: 'pointer', color: '#007bff', textAlign: 'center', marginTop: '10px' }}
            >
              See All
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
