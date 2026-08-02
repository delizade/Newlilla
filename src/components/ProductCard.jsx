import React, { useState } from 'react';
import { Icon, Tag } from './ui';

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
        <Tag variant="glass" size="md">
          {product.subCategory}
        </Tag>
        
        {isRecommended && (
          <Tag variant="primary" size="md" icon="star">
            Önerilen Kesim
          </Tag>
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
          borderRadius: '4px',
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
              <Icon name="eye" size={14} />
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
              <Icon name="star" size={12} color="currentColor" filled />
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
              <Icon name="close" size="small" />
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
            <Icon name="star" size="small" filled color="var(--gold)" />
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
                borderRadius: '4px',
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
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              padding: '4px 8px',
              textTransform: 'uppercase',
              letterSpacing: '2.5px',
              fontFamily: 'var(--font-serif)'
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
