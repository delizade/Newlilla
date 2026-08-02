import React, { useState } from 'react';
import { Icon } from './ui';

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

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      setOrderNumber(`NL-${Math.floor(100000 + Math.random() * 900000)}`);
      onClearCart();
    }, 1500);
  };

  const handleClose = () => {
    setCheckoutSuccess(false);
    onClose();
  };

  return (
    <div 
      className="cart-drawer-overlay liquid-glass-dark" 
      onClick={handleClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div 
        className="cart-drawer-container" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          animation: 'slideLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '500', fontFamily: 'var(--font-serif)' }}>Alışveriş Sepetim</h2>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: '600', 
              backgroundColor: 'var(--primary-light)', 
              color: 'var(--primary-dark)',
              padding: '2px 8px',
              borderRadius: '0px'
            }}>
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Ürün
            </span>
          </div>
          <button
            onClick={handleClose}
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
                  <Icon name="check" size="small" color="var(--success)" />
                  Harika! <strong>Ücretsiz kargo</strong> kazandınız.
                </span>
              ) : (
                <span>Kargo bedava kampanyasına kalan tutar: <strong>₺ {shippingNeeded.toFixed(2)}</strong></span>
              )}
            </p>
            <div style={{
              height: '4px',
              width: '100%',
              backgroundColor: 'rgba(24, 24, 27, 0.08)',
              borderRadius: '0px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, (total / shippingThreshold) * 100)}%`,
                backgroundColor: isShippingFree ? 'var(--success)' : 'var(--accent)',
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>
        )}

        {/* Cart Items Scroll Container */}
        <div style={{ flex: '1', overflowY: 'auto', padding: '24px' }}>
          {cartItems.length === 0 && !checkoutSuccess ? (
            <div style={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              textAlign: 'center',
              padding: '40px 0',
              gap: '16px',
              color: 'var(--text-secondary)'
            }}>
              <Icon name="cart" size="big" color="var(--text-muted)" />
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
                  textTransform: 'uppercase', 
                  letterSpacing: '1px',
                  borderRadius: '0px'
                }}
              >
                Koleksiyonu Keşfet
              </button>
            </div>
          ) : checkoutSuccess ? (
            /* Checkout Success State */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              gap: '16px',
              padding: '20px 0'
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
                <Icon name="check" size="base" color="var(--success)" />
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
                border: '1px dashed var(--border-color)',
                margin: '12px 0'
              }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sipariş Numarası</p>
                <p style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', marginTop: '4px' }}>
                  {orderNumber}
                </p>
              </div>

              <button
                onClick={handleClose}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderRadius: '0px'
                }}
              >
                Alışverişe Devam Et
              </button>
            </div>
          ) : (
            /* Items List */
            cartItems.map((item) => (
              <div 
                key={item.cartId}
                style={{
                  display: 'flex',
                  gap: '16px',
                  paddingBottom: '20px',
                  marginBottom: '20px',
                  borderBottom: '1px solid var(--border-naive)',
                  position: 'relative'
                }}
              >
                {/* Image */}
                <div style={{
                  width: '70px',
                  height: '90px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0px',
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '500', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', paddingRight: '20px' }}>
                      {item.name}
                    </h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>
                      Beden: <strong>{item.selectedSize}</strong> {item.colorName && `• Renk: ${item.colorName}`}
                    </p>
                  </div>

                  {/* Quantity & Price */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--border-color)',
                      borderRadius: '0px',
                      height: '26px'
                    }}>
                      <button
                        onClick={() => item.quantity > 1 ? onUpdateQty(item.cartId, item.quantity - 1) : onRemoveItem(item.cartId)}
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
                          <Icon name="trash" size="small" />
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
                  <Icon name="close" size="small" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && !checkoutSuccess && (
          <div style={{
            padding: '24px',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Ara Toplam</span>
                <span>₺ {total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Kargo Bedeli</span>
                <span>{isShippingFree ? 'Ücretsiz' : '₺ 49.90'}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '16px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                paddingTop: '8px',
                borderTop: '1px solid var(--border-naive)',
                fontFamily: 'var(--font-sans)'
              }}>
                <span>Toplam</span>
                <span>₺ {(total + (isShippingFree ? 0 : 49.90)).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                borderRadius: '0px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isCheckingOut ? (
                <span>Ödeme Tamamlanıyor...</span>
              ) : (
                <>
                  <Icon name="lock" size="small" />
                  <span>Güvenli Ödemeye Geç</span>
                </>
              )}
            </button>

            <p style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
              256-Bit SSL Güvenli Alışveriş Altyapısı ile Korumalı Ödeme
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
