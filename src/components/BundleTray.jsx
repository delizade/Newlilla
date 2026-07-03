import React from 'react';

export default function BundleTray({ bundleItems, onRemoveFromBundle, onAddBundleToCart, onClearBundle }) {
  if (bundleItems.length === 0) return null;

  const count = bundleItems.length;
  
  // Calculate discount levels
  let discountPercent = 0;
  let nextMilestone = 3;
  let statusText = '';
  let highlightText = '';

  if (count < 3) {
    discountPercent = 0;
    nextMilestone = 3;
    statusText = `Paketinizi tamamlamak için ${3 - count} ürün daha ekleyin`;
    highlightText = '3 ürüne %10 İndirim Fırsatı!';
  } else if (count >= 3 && count < 5) {
    discountPercent = 10;
    nextMilestone = 5;
    statusText = `%10 İndirim Kazanıldı! %15 indirim için ${5 - count} ürün daha ekleyin`;
    highlightText = "3'lü Paket İndirimi Aktif!";
  } else if (count >= 5 && count < 7) {
    discountPercent = 15;
    nextMilestone = 7;
    statusText = `%15 İndirim Kazanıldı! %20 indirim + Hediye Kutusu için ${7 - count} ürün daha ekleyin`;
    highlightText = "5'li Paket İndirimi Aktif!";
  } else {
    discountPercent = 20;
    nextMilestone = 7;
    statusText = 'Tebrikler! Maksimum %20 İndirim + Lüks Hediye Kutusu kazandınız!';
    highlightText = 'VIP Paket İndirimi Aktif!';
  }

  // Calculate dynamic progress bar percentage
  // We map 0-7 items to 0%-100%
  const progressPercent = Math.min(100, (count / 7) * 100);

  // Total bundle base price
  const baseTotal = bundleItems.reduce((sum, item) => sum + item.price, 0);
  const discountedTotal = baseTotal * (1 - discountPercent / 100);

  return (
    <div className="bundle-tray active liquid-glass" style={{ padding: '20px 24px 24px 24px', borderTop: '1px solid rgba(24, 24, 27, 0.08)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Top Info Bar with milestones and discount badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{
              fontSize: '10px',
              fontWeight: '700',
              color: 'var(--accent)',
              backgroundColor: 'var(--accent-light)',
              padding: '4px 10px',
              borderRadius: '0px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <svg style={{ width: '12px', height: '12px', fill: 'currentColor' }} viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.2 7.6.4-5.8 5 1.8 7.4-6-4.6-6 4.6 1.8-7.4-5.8-5 7.6-.4z"/>
              </svg>
              <span>{highlightText}</span>
            </span>
            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '6px', fontFamily: 'var(--font-sans)' }}>
              {statusText}
            </p>
          </div>

          {/* Pricing Summary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'right' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: discountPercent > 0 ? 'line-through' : 'none' }}>
                ₺ {baseTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </span>
              {discountPercent > 0 && (
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: 'var(--success)',
                  marginLeft: '8px',
                  backgroundColor: 'rgba(46, 125, 50, 0.06)',
                  padding: '2px 6px',
                  borderRadius: '0px',
                  border: '1px solid rgba(46, 125, 50, 0.15)'
                }}>
                  -%{discountPercent} İndirim
                </span>
              )}
              <strong style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginTop: '2px', fontFamily: 'var(--font-sans)' }}>
                ₺ {discountedTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </strong>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={onClearBundle}
                className="btn btn-secondary"
                style={{ padding: '10px 18px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '0px' }}
              >
                Temizle
              </button>
              
              <button
                onClick={() => onAddBundleToCart(discountPercent)}
                className="btn btn-primary"
                style={{
                  padding: '10px 24px',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  background: count >= 3 ? 'var(--text-primary)' : 'var(--text-muted)',
                  cursor: count >= 3 ? 'pointer' : 'not-allowed',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '0px',
                  boxShadow: count >= 3 ? 'var(--shadow-md)' : 'none',
                  transition: 'all var(--transition-fast)'
                }}
                disabled={count < 3}
                title={count < 3 ? "Paketi sepete eklemek için en az 3 ürün eklemelisiniz" : "Tüm paketi sepetine ekle"}
              >
                {count < 3 ? (
                  <span>En Az 3 Ürün Gerekli</span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>Paketi Sepete Ekle</span>
                    <svg style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4' }} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', minWidth: '45px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>0 Ürün</span>
          <div className="progress-glow-bar" style={{ flexGrow: 1, height: '6px', backgroundColor: 'rgba(24, 24, 27, 0.06)' }}>
            <div className="progress-glow-fill" style={{ width: `${progressPercent}%`, background: 'var(--accent)' }} />
            
            {/* Step markers on progress bar */}
            <div style={{ position: 'absolute', left: '42.8%', top: '50%', transform: 'translate(-50%, -50%)', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: count >= 3 ? 'var(--accent)' : 'rgba(24, 24, 27, 0.2)' }} title="3'lü Paket (%10 İndirim)" />
            <div style={{ position: 'absolute', left: '71.4%', top: '50%', transform: 'translate(-50%, -50%)', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: count >= 5 ? 'var(--accent)' : 'rgba(24, 24, 27, 0.2)' }} title="5'li Paket (%15 İndirim)" />
            <div style={{ position: 'absolute', left: '100%', top: '50%', transform: 'translate(-50%, -50%)', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: count >= 7 ? 'var(--accent)' : 'rgba(24, 24, 27, 0.2)' }} title="7'li Paket (%20 İndirim + Kutu)" />
          </div>
          <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-primary)', minWidth: '120px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
            <span>7 Ürün (%20 + </span>
            <svg style={{ width: '12px', height: '12px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4' }} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>)</span>
          </span>
        </div>

        {/* Selected Items Slots Grid */}
        <div style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '6px',
          alignItems: 'center',
          textAlign: 'left'
        }}>
          {Array.from({ length: 7 }).map((_, idx) => {
            const item = bundleItems[idx];
            return item ? (
              <div key={item.bundleId} className="bundle-slot occupied anim-scale-in" style={{ flexShrink: 0, borderRadius: '0px', border: '1px solid rgba(24, 24, 27, 0.15)' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0px' }}
                />
                
                {/* Micro Color Tag */}
                <span style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: item.selectedColor.code,
                  border: '1px solid rgba(0,0,0,0.15)',
                  zIndex: 2
                }} title={item.selectedColor.name} />

                {/* Size Badge */}
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  left: '2px',
                  fontSize: '8px',
                  fontWeight: '700',
                  color: '#fff',
                  backgroundColor: 'var(--text-primary)',
                  padding: '2px 4px',
                  borderRadius: '0px',
                  zIndex: 2,
                  lineHeight: 1,
                  fontFamily: 'var(--font-sans)'
                }}>
                  {item.selectedSize}
                </span>

                {/* Remove button */}
                <button
                  className="bundle-remove-btn"
                  onClick={() => onRemoveFromBundle(item.bundleId)}
                  title="Paketten Çıkar"
                  style={{ borderRadius: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg style={{ width: '8px', height: '8px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4' }} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div key={`empty-${idx}`} className="bundle-slot" style={{ flexShrink: 0, borderRadius: '0px', border: '1px dashed rgba(24, 24, 27, 0.15)' }}>
                {idx === 0 || bundleItems[idx - 1] ? (
                  <span style={{ fontSize: '18px', color: 'var(--text-muted)', fontWeight: '300' }}>+</span>
                ) : (
                  <svg style={{ width: '12px', height: '12px', fill: 'none', stroke: 'var(--border-color)', strokeWidth: '1.4' }} viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="0" />
                  </svg>
                )}
                {/* Index badge */}
                <span style={{
                  position: 'absolute',
                  bottom: '2px',
                  left: '2px',
                  fontSize: '8px',
                  color: 'var(--text-muted)',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Yuva {idx + 1}
                </span>
              </div>
            );
          })}
          
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', paddingLeft: '8px', fontStyle: 'italic', flexShrink: 0, fontFamily: 'var(--font-sans)' }}>
            {count < 7 ? `* Boş yuvalara ${7 - count} ürün daha ekleyerek tasarrufunuzu artırabilirsiniz.` : 'Tüm yuvalar doldu! Lüks kutulu paketiniz hazır.'}
          </div>
        </div>

      </div>
    </div>
  );
}
