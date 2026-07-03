import React, { useState } from 'react';

// Helper to prevent ragged lines / orphan words wrapping alone
const formatProductNameForTitle = (name) => {
  if (!name) return '';
  const words = name.split(' ');
  if (words.length <= 3) return name;
  const lastThree = words.slice(-3).join('\u00a0');
  const remainder = words.slice(0, -3).join(' ');
  return `${remainder} ${lastThree}`;
};

export default function ProductCard({ product, onAddToCart, onQuickView, onAddToBundle, isRecommended }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [sizeSelectorMode, setSizeSelectorMode] = useState('cart'); // 'cart' or 'bundle'

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizeSelector(false);
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        borderRadius: 0,
        overflow: 'visible',
        transition: 'transform var(--transition-normal)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        position: 'relative'
      }}
    >
      {/* Category / Promo Badge & AI Badge */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        alignItems: 'flex-start'
      }}>
        <span
          className="badge badge-primary"
          style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
            fontSize: '10px',
            color: 'var(--text-primary)',
            padding: '4px 10px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-sans)',
            fontWeight: '600'
          }}
        >
          {product.subCategory}
        </span>
        
        {isRecommended && (
          <span className="lilla-badge" style={{ 
            animation: 'shimmer-gold 3s linear infinite',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: 'var(--font-sans)',
            fontWeight: '600',
            fontSize: '10px',
            letterSpacing: '0.02em',
            padding: '4px 8px',
            backgroundColor: 'rgba(24, 24, 27, 0.9)',
            color: '#fff',
            borderRadius: '2px'
          }}>
            <svg style={{ width: '10px', height: '10px', fill: 'var(--gold)' }} viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z" />
            </svg>
            Önerilen Kesim
          </span>
        )}
      </div>

      {/* Image Container with Actions overlay */}
      <div 
        onClick={() => onQuickView(product)}
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '125%', /* Premium 4:5 fashion editorial aspect ratio */
          backgroundColor: 'var(--bg-secondary)',
          overflow: 'hidden',
          border: '1px solid var(--border-naive)',
          transition: 'border-color var(--transition-normal)',
          cursor: 'pointer'
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--transition-slow)',
            transform: isHovered ? 'scale(1.04)' : 'scale(1)'
          }}
        />

        {/* Hover Action Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '16px',
          background: 'linear-gradient(to top, rgba(24,24,27,0.75) 0%, rgba(24,24,27,0) 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          transition: 'all var(--transition-normal)',
          opacity: isHovered && !showSizeSelector ? 1 : 0,
          transform: isHovered && !showSizeSelector ? 'translateY(0)' : 'translateY(12px)',
          pointerEvents: isHovered && !showSizeSelector ? 'auto' : 'none',
          zIndex: 5
        }}>
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSizeSelectorMode('cart');
                setShowSizeSelector(true);
              }}
              className="btn btn-primary"
              style={{
                flex: 1,
                padding: '10px 12px',
                fontSize: '11px',
                fontWeight: '600',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              Sepete Ekle
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="btn btn-secondary"
              style={{
                padding: '10px 12px',
                backgroundColor: 'rgba(253, 252, 249, 0.9)',
                border: '1px solid rgba(253, 252, 249, 0.9)',
                color: 'var(--text-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all var(--transition-fast)'
              }}
              title="Hızlı Bakış"
            >
              <svg style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4 }} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>

          {onAddToBundle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSizeSelectorMode('bundle');
                setShowSizeSelector(true);
              }}
              className="btn btn-accent"
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '11px',
                fontWeight: '600',
                background: 'var(--accent)',
                border: 'none',
                color: '#fff',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <svg style={{ width: '12px', height: '12px', fill: 'currentColor' }} viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z" />
              </svg>
              Pakete Ekle (Mix & Match)
            </button>
          )}
        </div>

        {/* Inline Size Selector Drawer (Slides Up) - Liquid Glass Styling */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '16px',
          backgroundColor: 'var(--bg-primary)',
          borderTop: '1px solid var(--border-color)',
          boxShadow: '0 -4px 20px rgba(24, 24, 27, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          transition: 'transform var(--transition-normal)',
          transform: showSizeSelector ? 'translateY(0)' : 'translateY(100%)',
          zIndex: 10,
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ 
              fontSize: '10px', 
              fontWeight: '600', 
              color: 'var(--text-primary)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              fontFamily: 'var(--font-sans)'
            }}>
              Beden Seçin
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSizeSelector(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px'
              }}
            >
              <svg style={{ width: '12px', height: '12px', stroke: 'currentColor', strokeWidth: 1.4 }} viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  if (sizeSelectorMode === 'bundle' && onAddToBundle) {
                    onAddToBundle(product, { selectedSize: size });
                  } else {
                    onAddToCart(product, { selectedSize: size });
                  }
                  setShowSizeSelector(false);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '2px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '11px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--text-primary)';
                  e.currentTarget.style.borderColor = 'var(--text-primary)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Content - Clean asymmetric look, floating with generous spacing */}
      <div style={{
        padding: '16px 0 8px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flexGrow: 1,
        textAlign: 'left'
      }}>
        {/* Category & Rating */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '9px',
            color: 'var(--text-muted)',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontFamily: 'var(--font-sans)'
          }}>
            {product.category}
          </span>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <svg style={{ width: '10px', height: '10px', fill: 'var(--gold)' }} viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
              {product.rating}
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h3
          className="product-name"
          onClick={() => onQuickView(product)}
          style={{
            cursor: 'pointer',
            height: '42px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
            transition: 'color var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
        >
          {formatProductNameForTitle(product.name)}
        </h3>

        {/* Color Swatches */}
        <div style={{
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
          height: '16px'
        }}>
          {product.colors.map((color, index) => (
            <span
              key={index}
              title={color.name}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: color.code,
                border: '1px solid rgba(24, 24, 27, 0.15)',
                display: 'inline-block'
              }}
            />
          ))}
        </div>

        {/* Price & Cart Shortcut */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-naive)'
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.02em'
          }}>
            ₺ {product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSizeSelectorMode('cart');
              setShowSizeSelector(true);
            }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '11px',
              color: 'var(--accent)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              padding: '4px 8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontFamily: 'var(--font-sans)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--accent)';
            }}
          >
            + Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
