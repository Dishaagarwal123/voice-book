import React from "react";
import { Link } from "react-router-dom";

const Audiobookcard = ({ data }) => {
  return (
    <Link to={`/audiobook/${data._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ 
        border: '1px solid #ccc', 
        borderRadius: '5px', 
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
        overflow: 'hidden', 
        margin: '10px', 
        cursor: 'pointer', 
        transition: 'transform 0.2s' 
      }} 
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img 
          src={data.coverImage} 
          alt={data.title} 
          style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
        />
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '10px 0' }}>{data.title}</h3>
          <p style={{ fontSize: '14px', color: '#555' }}>{data.author}</p>
        </div>
      </div>
    </Link>
  );
};

export default Audiobookcard;
