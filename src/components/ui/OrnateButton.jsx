import React, { useState } from 'react';
import Icon from './IconLibrary';

/**
 * OrnateBorderA - Inward Corner Frame SVG (Template A)
 * Precision SVG fill and strokes aligned exactly to prevent outer corner spill.
 */
export function OrnateBorderA({ id = 'default', strokeColor, fillColor }) {
  const activeFill = fillColor || "#E3C5CD";
  const activeStroke = strokeColor || "currentColor";

  return (
    <svg 
      className="button-border-overlay"
      width="100%" 
      height="100%" 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 1
      }}
    >
      <g className="button-border-inner">
        {/* Left margin fill body */}
        <rect 
          x="3.5" 
          y="11" 
          width="7.5" 
          height="28" 
          className="button-bg-rect"
          fill={activeFill}
          style={{ transition: 'fill 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
        {/* Right margin fill body */}
        <svg x="100%" y="0" width="16" height="50" style={{ overflow: 'visible' }}>
          <rect 
            x="-11.0" 
            y="11" 
            width="7.5" 
            height="28" 
            className="button-bg-rect"
            fill={activeFill}
            style={{ transition: 'fill 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </svg>
        {/* Center main body fill */}
        <rect 
          x="11" 
          y="3.5" 
          width="calc(100% - 22px)" 
          height="43" 
          className="button-bg-rect"
          fill={activeFill}
          style={{ transition: 'fill 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />

        {/* Top-Left Corner */}
        <svg x="0" y="0" width="16" height="16" viewBox="0 0 16 16" className="corner-tl" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <path 
            d="M 3.5 11 A 7.5 7.5 0 0 0 11 3.5 L 11 11 Z" 
            className="button-bg-rect"
            fill={activeFill}
            style={{ transition: 'fill 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
          <path d="M 3.5 11 A 7.5 7.5 0 0 0 11 3.5" fill="none" stroke={activeStroke} strokeWidth="1" />
          <path d="M 16 3.5 L 11 3.5 C 9 3.5, 8 1.5, 9 1 C 10 0.5, 11.5 1.5, 11 2.5 C 10.5 3.5, 9.5 2.5, 10 2" fill="none" stroke={activeStroke} strokeWidth="1" />
          <path d="M 3.5 16 L 3.5 11 C 3.5 9, 1.5 8, 1 9 C 0.5 10, 1.5 11.5, 2.5 11 C 3.5 10.5, 2.5 9.5, 2 10" fill="none" stroke={activeStroke} strokeWidth="1" />
        </svg>

        {/* Top-Right Corner */}
        <svg x="100%" y="0" width="16" height="16" viewBox="0 0 16 16" className="corner-tr" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <g transform="translate(-16, 0)">
            <path 
              d="M 12.5 11 A 7.5 7.5 0 0 1 5 3.5 L 5 11 Z" 
              className="button-bg-rect"
              fill={activeFill}
              style={{ transition: 'fill 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
            <path d="M 12.5 11 A 7.5 7.5 0 0 1 5 3.5" fill="none" stroke={activeStroke} strokeWidth="1" />
            <path d="M 0 3.5 L 5 3.5 C 7 3.5, 8 1.5, 7 1 C 6 0.5, 4.5 1.5, 5 2.5 C 5.5 3.5, 6.5 2.5, 6 2" fill="none" stroke={activeStroke} strokeWidth="1" />
            <path d="M 12.5 16 L 12.5 11 C 12.5 9, 14.5 8, 15 9 C 15.5 10, 14.5 11.5, 13.5 11 C 12.5 10.5, 13.5 9.5, 14 10" fill="none" stroke={activeStroke} strokeWidth="1" />
          </g>
        </svg>

        {/* Bottom-Left Corner */}
        <svg x="0" y="100%" width="16" height="16" viewBox="0 0 16 16" className="corner-bl" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <g transform="translate(0, -16)">
            <path 
              d="M 3.5 5 A 7.5 7.5 0 0 1 11 12.5 L 11 5 Z" 
              className="button-bg-rect"
              fill={activeFill}
              style={{ transition: 'fill 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
            <path d="M 3.5 5 A 7.5 7.5 0 0 1 11 12.5" fill="none" stroke={activeStroke} strokeWidth="1" />
            <path d="M 16 12.5 L 11 12.5 C 9 12.5, 8 14.5, 9 15 C 10 15.5, 11.5 14.5, 11 13.5 C 10.5 12.5, 9.5 13.5, 10 13" fill="none" stroke={activeStroke} strokeWidth="1" />
            <path d="M 3.5 0 L 3.5 5 C 3.5 7, 1.5 8, 1 7 C 0.5 6, 1.5 4.5, 2.5 5 C 3.5 5.5, 2.5 6.5, 2 6" fill="none" stroke={activeStroke} strokeWidth="1" />
          </g>
        </svg>

        {/* Bottom-Right Corner */}
        <svg x="100%" y="100%" width="16" height="16" viewBox="0 0 16 16" className="corner-br" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <g transform="translate(-16, -16)">
            <path 
              d="M 12.5 5 A 7.5 7.5 0 0 0 5 12.5 L 5 5 Z" 
              className="button-bg-rect"
              fill={activeFill}
              style={{ transition: 'fill 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
            <path d="M 12.5 5 A 7.5 7.5 0 0 0 5 12.5" fill="none" stroke={activeStroke} strokeWidth="1" />
            <path d="M 0 12.5 L 5 12.5 C 7 12.5, 8 14.5, 7 15 C 6 15.5, 4.5 14.5, 5 13.5 C 5.5 12.5, 6.5 13.5, 6 13" fill="none" stroke={activeStroke} strokeWidth="1" />
            <path d="M 12.5 0 L 12.5 5 C 12.5 7, 14.5 8, 15 7 C 15.5 6, 14.5 4.5, 13.5 5 C 12.5 5.5, 13.5 6.5, 14 6" fill="none" stroke={activeStroke} strokeWidth="1" />
          </g>
        </svg>

        {/* Frame Lines */}
        <line x1="11" y1="3.5" x2="calc(100% - 11px)" y2="3.5" stroke={activeStroke} strokeWidth="1" />
        <line x1="11" y1="46.5" x2="calc(100% - 11px)" y2="46.5" stroke={activeStroke} strokeWidth="1" />
        <line x1="3.5" y1="11" x2="3.5" y2="39" stroke={activeStroke} strokeWidth="1" fill="none" />
        <svg x="100%" y="0" width="16" height="50" style={{ overflow: 'visible' }}>
          <line x1="-3.5" y1="11" x2="-3.5" y2="39" stroke={activeStroke} strokeWidth="1" fill="none" />
        </svg>
      </g>
    </svg>
  );
}

/**
 * OrnateBorderB - Scrolled Corner Frame SVG (Template B)
 */
export function OrnateBorderB({ id = 'default', strokeColor, fillColor }) {
  const activeFill = fillColor || "#E3C5CD";
  const activeStroke = strokeColor || "currentColor";

  return (
    <svg 
      className="button-border-overlay"
      width="100%" 
      height="100%" 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 1
      }}
    >
      <g className="button-border-inner">
        {/* Main background rect bounded strictly inside the frame */}
        <rect 
          x="3.5" 
          y="3.5" 
          width="calc(100% - 7px)" 
          height="43" 
          className="button-bg-rect"
          fill={activeFill}
          style={{ transition: 'fill 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />

        {/* Top-Left Corner */}
        <svg x="0" y="0" width="16" height="16" viewBox="0 0 16 16" className="corner-tl" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <path d="M 16 3.5 L 5 3.5 C 3 3.5, 2 2, 3.5 1 C 5 0, 6.5 1.5, 5.5 2.5 C 4.5 3.5, 3.5 2.5, 4 2" fill="none" stroke={activeStroke} strokeWidth="1" />
          <path d="M 3.5 16 L 3.5 5 C 3.5 3, 2 2, 1 3.5 C 0 5, 1.5 6.5, 2.5 5.5 C 3.5 4.5, 2.5 3.5, 2 4" fill="none" stroke={activeStroke} strokeWidth="1" />
        </svg>

        {/* Top-Right Corner */}
        <svg x="100%" y="0" width="16" height="16" viewBox="0 0 16 16" className="corner-tr" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <g transform="translate(-16, 0)">
            <path d="M 0 3.5 L 11 3.5 C 13 3.5, 14 2, 12.5 1 C 11 0, 9.5 1.5, 10.5 2.5 C 11.5 3.5, 12.5 2.5, 12 2" fill="none" stroke={activeStroke} strokeWidth="1" />
            <path d="M 12.5 16 L 12.5 5 C 12.5 3, 14 2, 15 3.5 C 16 5, 14.5 6.5, 13.5 5.5 C 12.5 4.5, 13.5 3.5, 13 4" fill="none" stroke={activeStroke} strokeWidth="1" />
          </g>
        </svg>

        {/* Bottom-Left Corner */}
        <svg x="0" y="100%" width="16" height="16" viewBox="0 0 16 16" className="corner-bl" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <g transform="translate(0, -16)">
            <path d="M 16 12.5 L 5 12.5 C 3 12.5, 2 14, 3.5 15 C 5 16, 6.5 14.5, 5.5 13.5 C 4.5 12.5, 3.5 13.5, 4 13" fill="none" stroke={activeStroke} strokeWidth="1" />
            <path d="M 3.5 0 L 3.5 11 C 3.5 13, 2 14, 1 12.5 C 0 11, 1.5 9.5, 2.5 10.5 C 3.5 11.5, 2.5 12.5, 2 12" fill="none" stroke={activeStroke} strokeWidth="1" />
          </g>
        </svg>

        {/* Bottom-Right Corner */}
        <svg x="100%" y="100%" width="16" height="16" viewBox="0 0 16 16" className="corner-br" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <g transform="translate(-16, -16)">
            <path d="M 0 12.5 L 11 12.5 C 13 12.5, 14 14, 12.5 15 C 11 16, 9.5 14.5, 10.5 13.5 C 11.5 12.5, 12.5 13.5, 12 13" fill="none" stroke={activeStroke} strokeWidth="1" />
            <path d="M 12.5 0 L 12.5 11 C 12.5 13, 14.5 14, 15 12.5 C 16 11, 14.5 9.5, 13.5 5.5 C 12.5 4.5, 13.5 3.5, 13 12" fill="none" stroke={activeStroke} strokeWidth="1" />
          </g>
        </svg>

        {/* Frame Lines */}
        <line x1="16" y1="3.5" x2="calc(100% - 16px)" y2="3.5" stroke={activeStroke} strokeWidth="1" />
        <line x1="16" y1="46.5" x2="calc(100% - 16px)" y2="46.5" stroke={activeStroke} strokeWidth="1" />
        <line x1="3.5" y1="16" x2="3.5" y2="34" stroke={activeStroke} strokeWidth="1" fill="none" />
        <svg x="100%" y="0" width="16" height="50" style={{ overflow: 'visible' }}>
          <line x1="-3.5" y1="16" x2="-3.5" y2="34" stroke={activeStroke} strokeWidth="1" fill="none" />
        </svg>
      </g>
    </svg>
  );
}

/**
 * OrnateButton Component
 * Parametric Reusable Ornate / Plain Button Component for Newlilla UI Library
 */
export default function OrnateButton({
  variant = 'ornate-a',
  strokeColor = '#896263',
  borderColor,
  fillColor = '#E3C5CD',
  bgColor,
  hoverFillColor = '#f0dbe0',
  hoverBgColor,
  textColor = '#896263',
  captionColor,
  iconColor,
  icon = 'arrow-right',
  caption,
  children,
  onClick,
  className = '',
  style = {},
  height = 50,
  disabled = false,
  type = 'button',
  id,
  ...restProps
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Normalize color parameters
  const activeStroke = borderColor || strokeColor;
  const activeFill = isHovered 
    ? (hoverBgColor || hoverFillColor || fillColor || bgColor)
    : (bgColor || fillColor);
  const activeText = captionColor || textColor;
  const activeIconColor = iconColor || activeText;

  // Select class based on variant
  let buttonClass = 'ornate-cta-btn';
  if (variant === 'ornate-b' || variant === 'scrolled') {
    buttonClass = 'ornate-scroll-btn';
  } else if (variant === 'plain-rect') {
    buttonClass = 'plain-rect-btn';
  }

  // Combined style dictionary for parameter overrides
  const containerStyle = {
    height: `${height}px`,
    color: activeText,
    borderColor: variant === 'plain-rect' ? activeStroke : undefined,
    ...style
  };

  // Render internal icon
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return (
        <Icon 
          name={icon} 
          size={14} 
          color={activeIconColor} 
          className="cta-arrow" 
          style={{ position: 'relative', zIndex: 1 }} 
        />
      );
    }
    return icon;
  };

  const labelText = children || caption;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${buttonClass} ${className}`.trim()}
      style={containerStyle}
      {...restProps}
    >
      {variant === 'ornate-a' && (
        <OrnateBorderA id={id} strokeColor={activeStroke} fillColor={activeFill} />
      )}
      {variant === 'ornate-b' && (
        <OrnateBorderB id={id} strokeColor={activeStroke} fillColor={activeFill} />
      )}

      {labelText && (
        <span style={{ position: 'relative', zIndex: 1, color: activeText }}>
          {labelText}
        </span>
      )}

      {renderIcon()}
    </button>
  );
}
