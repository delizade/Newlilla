import React, { useState } from 'react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingThreshold = 1500;
  const isShippingFree = total >= shippingThreshold;
  const shippingNeeded = shippingThreshold - total;
  const shippingPercent = Math.min(100, (total / shippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate payment API delay
    setTimeout(() => {
      setIsCheckingOut(false);
      const generatedOrder = `NL-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setCheckoutSuccess(true);
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setCheckoutSuccess(false);
    onClearCart();
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
        backgroundColor: 'rgba(24, 24, 27, 0.3)',
        backdropFilter: 'blur(8px)',
        zIndex: 1500,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      {/* Sidebar Content Panel - True Liquid Glass Refraction */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          backgroundColor: 'rgba(253, 252, 249, 0.96)',
          backdropFilter: 'blur(20px) saturate(120%)',
          borderLeft: '1px solid rgba(24, 24, 27, 0.08)',
          boxShadow: 'inset 1px 0 0 rgba(255, 255, 255, 0.5), -10px 0 40px rgba(24, 24, 27, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: '500', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Sepetim
            <span style={{
              fontSize: '9px',
              backgroundColor: 'var(--text-primary)',
              color: '#fff',
              padding: '2px 8px',
              borderRadius: '2px',
              fontFamily: 'var(--font-sans)',
              fontWeight: '600',
              letterSpacing: '0.05em'
            }}>
              {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} Ürün
            </span>
          </h2>
          
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px'
            }}
          >
            <svg style={{ width: '16px', height: '16px', stroke: 'currentColor', strokeWidth: 1.4 }} viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Dynamic Shipping Goal Meter */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '16px 24px',
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            textAlign: 'left'
          }}>
            <p style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '8px', fontFamily: 'var(--font-sans)', letterSpacing: '0.01em', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {isShippingFree ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <svg style={{ width: '12px', height: '12px', fill: 'var(--success)' }} viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z" />
                  </svg>
                  Harika! <strong>Ücretsiz kargo</strong> kazandınız.
                </span>
              ) : (
                <span>Kargo bedava kampanyasına kalan tutar: <strong>₺ {shippingNeeded.toFixed(2)}</strong></span>
              )}
            </p>
            
            <div style={{
              width: '100%',
              height: '4px',
              backgroundColor: 'rgba(24, 24, 27, 0.08)',
              borderRadius: 0,
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${shippingPercent}%`,
                height: '100%',
                backgroundColor: 'var(--text-primary)',
                transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
            </div>
          </div>
        )}

        {/* Scrollable Items list */}
        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              margin: 'auto',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              color: 'var(--text-secondary)'
            }}>
              <svg style={{ width: '40px', height: '40px', stroke: 'var(--text-muted)', fill: 'none', strokeWidth: '1.4' }} viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              <div>
                <p style={{ fontWeight: '500', fontSize: '15px', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>Sepetiniz Boş</p>
                <p style={{ fontSize: '12px', marginTop: '6px', color: 'var(--text-muted)' }}>Yeni sezon koleksiyonumuzda gezinip sepetinizi doldurmaya başlayın!</p>
              </div>
              <button 
                onClick={onClose} 
                className="btn btn-primary" 
                style={{ 
                  padding: '10px 20px', 
                  fontSize: '11px', 
                  marginTop: '8px', 
                  borderRadius: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Alışverişe Başla
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartId}
                style={{
                  display: 'flex',
                  gap: '12px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid var(--border-naive)',
                  textAlign: 'left'
                }}
              >
                {/* Thumbnail */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '64px',
                    height: '80px', /* Editorial portrait aspect ratio */
                    objectFit: 'cover',
                    borderRadius: 0,
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-naive)'
                  }}
                />
                
                {/* Item Info */}
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '500', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', lineHeight: '1.4' }}>{item.name}</h4>
                  
                  {/* Selected Swatches Info */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '9px',
                      color: 'var(--text-secondary)',
                      backgroundColor: 'var(--bg-secondary)',
                      padding: '2px 6px',
                      borderRadius: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }}>
                      <span style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: item.selectedColor.code,
                        display: 'inline-block'
                      }} />
                      {item.selectedColor.name}
                    </span>
                    
                    <span style={{
                      fontSize: '9px',
                      color: 'var(--text-secondary)',
                      backgroundColor: 'var(--bg-secondary)',
                      padding: '2px 6px',
                      borderRadius: 0,
                      fontFamily: 'var(--font-sans)',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }}>
                      Beden: {item.selectedSize}
                    </span>
                  </div>

                  {/* Quantity & Price */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--border-color)',
                      borderRadius: 0,
                      overflow: 'hidden',
                      backgroundColor: 'transparent'
                    }}>
                      <button
                        onClick={() => onUpdateQty(item.cartId, item.quantity - 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: item.quantity === 1 ? 'hsl(20, 25%, 50%)' : 'var(--text-primary)',
                          transition: 'all var(--transition-fast)'
                        }}
                        title={item.quantity === 1 ? "Sepetten Çıkar" : "Azalt"}
                      >
                        {item.quantity === 1 ? (
                          <svg style={{ width: '10px', height: '10px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4' }} viewBox="0 0 24 24">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          </svg>
                        ) : "-"}
                      </button>
                      <span style={{ width: '20px', textAlign: 'center', fontSize: '11px', fontWeight: '500', fontFamily: 'var(--font-sans)' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.cartId, item.quantity + 1)}
                        style={{ width: '24px', height: '24px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px' }}
                      >
                        +
                      </button>
                    </div>

                    <span style={{ fontSize: '13px', fontWeight: '600', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
                      ₺ {(item.price * item.quantity).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Remove item button */}
                <button
                  onClick={() => onRemoveItem(item.cartId)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    alignSelf: 'flex-start',
                    padding: '2px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <svg style={{ width: '12px', height: '12px', stroke: 'currentColor', strokeWidth: 1.4 }} viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '24px',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'transparent'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
                <span>Ara Toplam:</span>
                <span style={{ fontWeight: '500' }}>₺ {total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
                <span>Kargo Ücreti:</span>
                <span>{isShippingFree ? <span style={{ color: 'var(--success)', fontWeight: '600' }}>Bedava</span> : "₺ 49,90"}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '15px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-naive)',
                fontFamily: 'var(--font-sans)'
              }}>
                <span>Toplam Tutar:</span>
                <span>₺ {(total + (isShippingFree ? 0 : 49.90)).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-primary"
              style={{ 
                width: '100%', 
                padding: '14px 0', 
                fontSize: '12px', 
                borderRadius: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: '600'
              }}
            >
              Alışverişi Tamamla
            </button>
          </div>
        )}

        {/* Payment Processing Spinner Screen */}
        {isCheckingOut && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(253, 252, 249, 0.95)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '2px solid var(--border-color)',
              borderTop: '2px solid var(--text-primary)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
            <p style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
              Ödemeniz güvenli şekilde işleniyor...
            </p>
          </div>
        )}

        {/* Order Placement Success Screen */}
        {checkoutSuccess && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--bg-primary)',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '36px',
            textAlign: 'center',
            gap: '24px',
            animation: 'scaleIn 0.3s ease-out'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 0,
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)'
            }}>
              <svg style={{ width: '20px', height: '20px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4' }} viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            
            <div>
              <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Siparişiniz Başarıyla Alındı!
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Ödemeniz güvenli şekilde tamamlandı ve paketiniz hazırlanmaya başlandı.
              </p>
            </div>

            <div style={{
              width: '100%',
              backgroundColor: 'var(--bg-secondary)',
              padding: '16px',
              borderRadius: 0,
              border: '1px solid var(--border-naive)'
            }}>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)' }}>
                Sipariş Numarası
              </span>
              <strong style={{ fontSize: '16px', color: 'var(--text-primary)', display: 'block', marginTop: '4px', fontFamily: 'var(--font-sans)', letterSpacing: '0.02em' }}>
                #{orderNumber}
              </strong>
            </div>

            <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Detaylı bilgiler e-posta adresinize gönderildi. Sipariş Takip ekranından takip edebilirsiniz.
            </p>

            <button
              onClick={handleCloseSuccess}
              className="btn btn-primary"
              style={{ 
                width: '100%', 
                padding: '12px 0', 
                borderRadius: 0, 
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: '600'
              }}
            >
              Alışverişe Devam Et
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

