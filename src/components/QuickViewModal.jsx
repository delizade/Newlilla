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
    onAddToCart({ ...product, selectedColor, selectedSize, quantity });
    onClose();
  };

  /* Ghost nav button */
  const ghostBtn = {
    flexShrink: 0,
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    border: '1px solid rgba(255, 255, 255, 0.35)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    transition: 'all 0.22s ease',
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 12, 20, 0.72)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 0',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      {/*
        ── 3-column grid: [prev] [modal] [next]
        Buttons always sit OUTSIDE the modal box.
        Empty <div> placeholders keep modal centred when a button is absent.
      ──*/}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'grid',
          gridTemplateColumns: '72px 1fr 72px',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1260px',
          padding: '0 12px',
          boxSizing: 'border-box',
          gap: 0,
        }}
      >
        {/* ── PREV button (or spacer) ── */}
        {hasPrev ? (
          <button
            onClick={goPrev}
            title="Önceki ürün (←)"
            style={ghostBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.22)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
            }}
          >
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="13" y1="6" x2="1" y2="6" />
              <polyline points="6 1 1 6 6 11" />
            </svg>
          </button>
        ) : (
          <div />
        )}

        {/* ── MODAL ── */}
        <div
          className="liquid-glass anim-scale-in quickview-container"
          style={{ backdropFilter: 'none', WebkitBackdropFilter: 'none' }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: 'rgba(253, 252, 249, 0.85)',
              border: '1px solid rgba(24, 24, 27, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              zIndex: 10,
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--text-primary)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(253, 252, 249, 0.85)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            <svg style={{ width: '13px', height: '13px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5' }} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image col — 1:1 fixed ratio */}
          <div className="quickview-image-col">
            <img
              src={product.image}
              alt={product.name}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Details col */}
          <div className="quickview-details-col">
            {/* Category */}
            <div style={{ display: 'flex', marginBottom: '12px' }}>
              <span className="badge badge-primary" style={{ borderRadius: '0px', backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
                {product.subCategory}
              </span>
            </div>

            {/* Title */}
            <h2 style={{ fontSize: '22px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '12px', paddingRight: '24px', fontFamily: 'var(--font-serif)', letterSpacing: '-0.01em', lineHeight: '1.3' }}>
              {product.name}
            </h2>

            {/* Price & Rating */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                ₺ {product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} style={{ width: '13px', height: '13px', fill: i < Math.floor(product.rating) ? 'var(--accent)' : 'rgba(24, 24, 27, 0.1)' }} viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '4px', fontFamily: 'var(--font-sans)' }}>
                  ({product.reviewsCount})
                </span>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: '1.65', fontFamily: 'var(--font-sans)' }}>
              {product.description}
            </p>

            {/* Color */}
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Renk Seçimi:{' '}
                <span style={{ fontWeight: 'normal', color: 'var(--text-secondary)', textTransform: 'none', letterSpacing: 'normal' }}>
                  {selectedColor.name}
                </span>
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.colors.map((color, index) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        width: '26px', height: '26px', borderRadius: '50%',
                        background: color.code,
                        border: isSelected ? '1px solid var(--text-primary)' : '1px solid rgba(24, 24, 27, 0.1)',
                        boxShadow: isSelected ? '0 0 0 2px var(--bg-primary)' : 'none',
                        cursor: 'pointer',
                        transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                        transition: 'all var(--transition-fast)',
                      }}
                      title={color.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Beden Seçimi:{' '}
                <span style={{ fontWeight: 'normal', color: selectedSize ? 'var(--text-secondary)' : 'var(--accent)', textTransform: 'none', letterSpacing: 'normal' }}>
                  {selectedSize || 'Lütfen Seçim Yapın'}
                </span>
              </span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        minWidth: '52px', height: '36px', padding: '0 10px', borderRadius: '2px',
                        border: '1px solid ' + (isSelected ? 'var(--text-primary)' : 'rgba(24, 24, 27, 0.12)'),
                        backgroundColor: isSelected ? 'var(--text-primary)' : '#fff',
                        color: isSelected ? '#fff' : 'var(--text-primary)',
                        fontWeight: isSelected ? '600' : '400',
                        fontSize: '12px', cursor: 'pointer',
                        transition: 'all var(--transition-fast)', fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Qty + Add to Cart */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(24, 24, 27, 0.15)', borderRadius: '2px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', height: '46px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '38px', height: '100%', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px', color: 'var(--text-primary)', transition: 'all var(--transition-fast)' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(24,24,27,0.05)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >-</button>
                <span style={{ width: '30px', textAlign: 'center', fontSize: '14px', fontWeight: '600', fontFamily: 'var(--font-sans)' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '38px', height: '100%', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px', color: 'var(--text-primary)', transition: 'all var(--transition-fast)' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(24,24,27,0.05)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >+</button>
              </div>

              <button
                onClick={handleAdd}
                disabled={!selectedSize}
                className={selectedSize ? 'btn btn-accent' : 'btn'}
                style={{
                  flexGrow: 1, height: '46px', borderRadius: '2px',
                  backgroundColor: !selectedSize ? 'rgba(24,24,27,0.05)' : undefined,
                  color: !selectedSize ? 'var(--text-muted)' : undefined,
                  border: '1px solid ' + (!selectedSize ? 'rgba(24,24,27,0.08)' : 'transparent'),
                  cursor: !selectedSize ? 'not-allowed' : 'pointer',
                  boxShadow: !selectedSize ? 'none' : undefined,
                  fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  fontFamily: 'var(--font-sans)', transition: 'all var(--transition-fast)',
                }}
              >
                <span>{selectedSize ? 'Sepete Ekle' : 'Lütfen Beden Seçin'}</span>
                {selectedSize && (
                  <svg style={{ width: '13px', height: '13px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4' }} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── NEXT button (or spacer) ── */}
        {hasNext ? (
          <button
            onClick={goNext}
            title="Sonraki ürün (→)"
            style={{ ...ghostBtn, justifySelf: 'end' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.22)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
            }}
          >
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="1" y1="6" x2="13" y2="6" />
              <polyline points="8 1 13 6 8 11" />
            </svg>
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
