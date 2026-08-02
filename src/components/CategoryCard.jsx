import React from 'react';
import { Icon } from './ui';

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
        <Icon name="arrow-right" size={14} color="#212121" className="tactile-btn-arrow" />
      </button>
    </div>
  );
}
