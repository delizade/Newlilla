import React, { useState } from 'react';
import { Icon } from './ui';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password || (activeTab === 'register' && !name)) {
      setErrorMsg('Lütfen tüm alanları doldurun.');
      return;
    }

    if (activeTab === 'register') {
      const newUser = { name, email, promoCode: 'LILLA10' };
      localStorage.setItem('newlilla_user', JSON.stringify(newUser));
      setSuccessMsg('Hesabınız başarıyla oluşturuldu! Hoş geldiniz.');
      setTimeout(() => {
        onLoginSuccess(newUser);
        onClose();
      }, 1200);
    } else {
      const user = { name: email.split('@')[0], email, promoCode: 'LILLA10' };
      localStorage.setItem('newlilla_user', JSON.stringify(user));
      setSuccessMsg('Giriş başarılı! Yönlendiriliyorsunuz...');
      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="login-modal-overlay liquid-glass-dark" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="login-modal-container"
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#fff',
          borderRadius: '0px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            borderRadius: '50%'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.backgroundColor = 'rgba(24, 24, 27, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Icon name="close" size="small" />
        </button>

        {/* Form Container */}
        <form onSubmit={handleSubmit} style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: '500', letterSpacing: '-0.02em' }}>
              New<span style={{ color: 'var(--accent)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>Lilla</span>
            </span>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', fontFamily: 'var(--font-sans)', letterSpacing: '0.2px' }}>
              {activeTab === 'login' ? 'Üyeliğinize giriş yapın' : 'Aramıza katılarak %10 üye indirimini kapın'}
            </p>
          </div>

          {/* Success / Error Messages */}
          {successMsg && (
            <div style={{
              padding: '12px 16px',
              borderLeft: '3px solid var(--success)',
              backgroundColor: 'rgba(46, 125, 50, 0.04)',
              color: 'var(--success)',
              fontSize: '12px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Icon name="check" size="small" color="var(--success)" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div style={{
              padding: '12px 16px',
              borderLeft: '3px solid #d32f2f',
              backgroundColor: 'rgba(239, 83, 80, 0.04)',
              color: '#d32f2f',
              fontSize: '12px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Icon name="info" size="small" color="#d32f2f" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Register Name input */}
          {activeTab === 'register' && (
            <div>
              <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Adınız & Soyadınız
              </label>
              <input
                type="text"
                placeholder="Ör. Selin Yılmaz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '0px',
                  border: '1px solid rgba(24, 24, 27, 0.15)',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--text-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(24, 24, 27, 0.15)'}
              />
            </div>
          )}

          {/* Email input */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
              E-Posta Adresi
            </label>
            <input
              type="email"
              placeholder="selin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '0px',
                border: '1px solid rgba(24, 24, 27, 0.15)',
                fontSize: '13px',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--text-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(24, 24, 27, 0.15)'}
            />
          </div>

          {/* Password input */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>
                Şifre
              </label>
              {activeTab === 'login' && (
                <span 
                  onClick={() => alert("Şifre sıfırlama bağlantısı e-postanıza gönderildi.")}
                  style={{ fontSize: '11px', color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Şifremi Unuttum?
                </span>
              )}
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '0px',
                border: '1px solid rgba(24, 24, 27, 0.15)',
                fontSize: '13px',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--text-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(24, 24, 27, 0.15)'}
            />
          </div>

          {/* Special Membership Promo Callout */}
          {activeTab === 'register' && (
            <div style={{
              padding: '10px 14px',
              backgroundColor: 'var(--primary-light)',
              borderRadius: '0px',
              fontSize: '11px',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Icon name="ticket" size="small" />
              <span>Kayıt olduğunuzda <b>LILLA10</b> %10 sepet indirimi otomatik tanımlanır.</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '14px 0',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginTop: '12px',
              borderRadius: '0px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span>{activeTab === 'login' ? 'Giriş Yap' : 'Kayıt Ol & Üye Ol'}</span>
            <Icon name="arrow-right" size="small" />
          </button>

          {/* Tab Switch prompt */}
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '8px' }}>
            {activeTab === 'login' ? (
              <span>
                Henüz hesabınız yok mu?{' '}
                <span
                  onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
                  style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: '600' }}
                >
                  Şimdi Kayıt Olun
                </span>
              </span>
            ) : (
              <span>
                Zaten hesabınız var mı?{' '}
                <span
                  onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
                  style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: '600' }}
                >
                  Giriş Yapın
                </span>
              </span>
            )}
          </p>

        </form>
      </div>
    </div>
  );
}
