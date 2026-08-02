import React from 'react';
import Icon from './IconLibrary';

/**
 * Tag Component - Centralized Reusable Tag System for NewLilla
 * 
 * Rules:
 * - NO borders allowed on tags!
 * - Standardized 4px corner radius.
 * - Standardized variants: 'glass' (overlay on images), 'accent', 'primary', 'sale', 'neutral'
 */

export default function Tag({
  children,
  variant = 'glass', // 'glass' | 'accent' | 'primary' | 'sale' | 'neutral'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon,
  className = '',
  style = {},
  ...restProps
}) {
  // Variant styles without any borders
  const variantStyles = {
    glass: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      color: 'var(--text-primary)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
    },
    accent: {
      backgroundColor: 'var(--accent-light)',
      color: 'var(--accent)'
    },
    primary: {
      backgroundColor: '#896263',
      color: '#ffffff'
    },
    sale: {
      backgroundColor: 'rgba(211, 47, 47, 0.08)',
      color: '#d32f2f'
    },
    neutral: {
      backgroundColor: 'rgba(24, 24, 27, 0.06)',
      color: 'var(--text-secondary)'
    }
  };

  // Size configurations
  const sizeStyles = {
    sm: {
      padding: '3px 8px',
      fontSize: '9px',
      letterSpacing: '0.08em'
    },
    md: {
      padding: '5px 10px',
      fontSize: '10px',
      letterSpacing: '0.08em'
    },
    lg: {
      padding: '7px 14px',
      fontSize: '11px',
      letterSpacing: '0.1em'
    }
  };

  const selectedVariant = variantStyles[variant] || variantStyles.glass;
  const selectedSize = sizeStyles[size] || sizeStyles.md;

  const combinedStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    borderRadius: '4px',
    border: 'none', // Strictly no border on tags
    outline: 'none',
    fontWeight: '600',
    fontFamily: 'var(--font-sans)',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    lineHeight: 1,
    ...selectedSize,
    ...selectedVariant,
    ...style
  };

  return (
    <span style={combinedStyle} className={`nl-tag nl-tag-${variant} ${className}`.trim()} {...restProps}>
      {icon && <Icon name={icon} size={size === 'sm' ? 12 : 14} />}
      <span>{children}</span>
    </span>
  );
}
