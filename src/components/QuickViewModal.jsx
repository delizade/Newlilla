import { useState, useEffect, useCallback } from 'react';

export default function QuickViewModal({ product, allProducts = [], onNavigate, onClose, onAddToCart }) {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const currentIndex = allProducts.findIndex((p) => p.id === product?.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allProducts.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev && onNavigate) {
      onNavigate(allProducts[currentIndex - 1]);
      setSelectedColor(allProducts[currentIndex - 1]?.colors?.[0] || null);
      setSelectedSize(null);
      setQuantity(1);
    }
  }, [hasPrev, currentIndex, allProducts, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext && onNavigate) {
      onNavigate(allProducts[currentIndex + 1]);
      setSelectedColor(allProducts[currentIndex + 1]?.colors?.[0] || null);
      setSelectedSize(null);
      setQuantity(1);
    }
  }, [hasNext, currentIndex, allProducts, onNavigate]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goPrev, goNext, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(15, 12, 20, 0.65)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="liquid-glass anim-scale-in quickview-container"
        style={{
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(253, 252, 249, 0.8)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(24, 24, 27, 0.08)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            zIndex: 10,
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--text-primary)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(253, 252, 249, 0.8)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          <svg style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4' }} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Column: Image */}
        <div className="quickview-image-col">
          <img
            src={product.image}
            alt={product.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

          {/* Prev Arrow */}
          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              title="Önceki ürün (←)"
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(253, 252, 249, 0.88)',
                border: '1px solid rgba(24, 24, 27, 0.10)',
                boxShadow: '0 2px 12px rgba(24,24,27,0.10)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
                transition: 'all 0.22s ease',
                backdropFilter: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(253,252,249,1)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(24,24,27,0.16)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(253,252,249,0.88)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(24,24,27,0.10)';
              }}
            >
              <svg width="13" height="11" viewBox="0 0 13 11" fill="none" stroke="var(--text-primary)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5.5" x2="1" y2="5.5" />
                <polyline points="5 1 1 5.5 5 10" />
              </svg>
            </button>
          )}

          {/* Next Arrow */}
          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              title="Sonraki ürün (→)"
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(253, 252, 249, 0.88)',
                border: '1px solid rgba(24, 24, 27, 0.10)',
                boxShadow: '0 2px 12px rgba(24,24,27,0.10)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
                transition: 'all 0.22s ease',
                backdropFilter: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(253,252,249,1)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(24,24,27,0.16)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(253,252,249,0.88)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(24,24,27,0.10)';
              }}
            >
              <svg width="13" height="11" viewBox="0 0 13 11" fill="none" stroke="var(--text-primary)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="5.5" x2="12" y2="5.5" />
                <polyline points="8 1 12 5.5 8 10" />
              </svg>
            </button>
          )}

          {/* Product Counter */}
          {allProducts.length > 1 && (
            <div style={{
              position: 'absolute',
              bottom: '14px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '5px',
              zIndex: 5
            }}>
              {allProducts.map((_, i) => (
                <span
                  key={i}
                  onClick={(e) => { e.stopPropagation(); if (onNavigate) { onNavigate(allProducts[i]); setSelectedColor(allProducts[i]?.colors?.[0] || null); setSelectedSize(null); setQuantity(1); } }}
                  style={{
                    width: i === currentIndex ? '18px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: i === currentIndex ? 'rgba(253,252,249,0.95)' : 'rgba(253,252,249,0.45)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    display: 'block'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details */}
        <div className="quickview-details-col">
          {/* Category Tag */}
          <div style={{ display: 'flex', marginBottom: '16px' }}>
            <span className="badge badge-primary" style={{ borderRadius: '0px', backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>{product.subCategory}</span>
          </div>

          {/* Product Title */}
          <h2 style={{ fontSize: '24px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '14px', paddingRight: '24px', fontFamily: 'var(--font-serif)', letterSpacing: '-0.01em' }}>
            {product.name}
          </h2>

          {/* Price & Rating Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            {/* Price */}
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
              ₺ {product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
            </div>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  style={{
                    width: '14px',
                    height: '14px',
                    fill: i < Math.floor(product.rating) ? 'var(--gold)' : 'rgba(24, 24, 27, 0.1)'
                  }}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '6px', fontFamily: 'var(--font-sans)' }}>
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.7', fontFamily: 'var(--font-sans)' }}>
            {product.description}
          </p>

          {/* Color Selector */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Renk Seçimi: <span style={{ fontWeight: 'normal', color: 'var(--text-secondary)', textTransform: 'none', letterSpacing: 'normal' }}>{selectedColor.name}</span>
            </span>
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.colors.map((color, index) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: color.code,
                      border: isSelected ? '1px solid var(--text-primary)' : '1px solid rgba(24, 24, 27, 0.1)',
                      boxShadow: isSelected ? '0 0 0 2px var(--bg-primary)' : 'none',
                      cursor: 'pointer',
                      transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all var(--transition-fast)'
                    }}
                    title={color.name}
                  />
                );
              })}
            </div>
          </div>

          {/* Size Selector */}
          <div style={{ marginBottom: '28px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Beden Seçimi: <span style={{ fontWeight: 'normal', color: selectedSize ? 'var(--text-secondary)' : 'var(--accent)', textTransform: 'none', letterSpacing: 'normal' }}>{selectedSize || "Lütfen Seçim Yapın"}</span>
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '56px',
                      height: '38px',
                      padding: '0 12px',
                      borderRadius: '0px',
                      border: '1px solid ' + (isSelected ? 'var(--text-primary)' : 'rgba(24, 24, 27, 0.12)'),
                      backgroundColor: isSelected ? 'var(--text-primary)' : '#fff',
                      color: isSelected ? '#fff' : 'var(--text-primary)',
                      fontWeight: isSelected ? '600' : '400',
                      fontSize: '12px',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                      transition: 'all var(--transition-fast)',
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Add to Cart Action */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid rgba(24, 24, 27, 0.15)',
              borderRadius: '0px',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-secondary)',
              height: '48px',
              boxSizing: 'border-box'
            }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '40px',
                  height: '100%',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: 'var(--text-primary)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(24, 24, 27, 0.05)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                -
              </button>
              <span style={{ width: '32px', textAlign: 'center', fontSize: '14px', fontWeight: '600', fontFamily: 'var(--font-sans)' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: '40px',
                  height: '100%',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: 'var(--text-primary)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(24, 24, 27, 0.05)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={!selectedSize}
              className={selectedSize ? "btn btn-accent" : "btn"}
              style={{
                flexGrow: 1,
                height: '48px',
                borderRadius: '0px',
                backgroundColor: !selectedSize ? 'rgba(24, 24, 27, 0.05)' : undefined,
                color: !selectedSize ? 'var(--text-muted)' : undefined,
                border: '1px solid ' + (!selectedSize ? 'rgba(24, 24, 27, 0.08)' : 'transparent'),
                cursor: !selectedSize ? 'not-allowed' : 'pointer',
                boxShadow: !selectedSize ? 'none' : undefined,
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'var(--font-sans)',
                boxSizing: 'border-box',
                transition: 'all var(--transition-fast)'
              }}
            >
              <span>{selectedSize ? 'Sepete Ekle' : 'Lütfen Beden Seçin'}</span>
              {selectedSize && (
                <svg style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4' }} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
