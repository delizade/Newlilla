import React from 'react';

export default function CategoryCard({ title, image, onClick }) {
  return (
    <div className="tactile-category-circle" onClick={onClick}>
      {/* Background Image */}
      <div className="tactile-circle-img-container">
        <img src={image} alt={title} className="tactile-circle-image" />
      </div>

      {/* Inner dashed lines vector */}
      <svg className="tactile-dashed-lines" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="49.5" fill="none" stroke="#FFFFFF" strokeWidth="0.35" strokeDasharray="1.5 2" />
      </svg>

      {/* Title dark blur shadow backing */}
      <div className="tactile-title-bg" />

      {/* Frame 10: Title container with top/bottom thin borders */}
      <div className="tactile-title-frame">
        <span className="tactile-title-text">{title}</span>
      </div>

      {/* Interactive Action Button */}
      <button className="tactile-action-btn" aria-label={`${title} kategorisini keşfet`}>
        <svg 
          width="14" 
          height="10" 
          viewBox="0 0 14 10" 
          fill="none" 
          stroke="#212121" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="tactile-btn-arrow"
        >
          <line x1="1" y1="5" x2="13" y2="5" />
          <polyline points="9 1 13 5 9 9" />
        </svg>
      </button>
    </div>
  );
}
