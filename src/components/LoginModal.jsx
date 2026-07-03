import React, { useState } from 'react';

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

    if (activeTab === 'login') {
      // Simulate successful login
      setSuccessMsg('Başarıyla giriş yapıldı! Yönlendiriliyorsunuz...');
      setTimeout(() => {
        onLoginSuccess({
          name: email.split('@')[0].toUpperCase(),
          email: email
        });
        setSuccessMsg('');
        setEmail('');
        setPassword('');
        onClose();
      }, 1500);
    } else {
      // Simulate successful registration
      setSuccessMsg('Hesabınız başarıyla oluşturuldu! Giriş yapılıyor...');
      setTimeout(() => {
        onLoginSuccess({
          name: name,
          email: email
        });
        setSuccessMsg('');
        setName('');
        setEmail('');
        setPassword('');
        onClose();
      }, 1500);
    }
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
        zIndex: 2100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="liquid-glass anim-scale-in"
        style={{
          width: '90%',
          maxWidth: '440px',
          borderRadius: '0px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(24, 24, 27, 0.08)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none'
        }}
      >
        {/* Header Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(24, 24, 27, 0.05)',
          backgroundColor: 'rgba(253, 252, 249, 0.4)'
        }}>
          <button
            onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '18px 0',
              background: activeTab === 'login' ? 'rgba(253, 252, 249, 0.95)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'login' ? '2px solid var(--accent)' : 'none',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: activeTab === 'login' ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              outline: 'none'
            }}
          >
            Giriş Yap
          </button>
          <button
            onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '18px 0',
              background: activeTab === 'register' ? 'rgba(253, 252, 249, 0.95)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'register' ? '2px solid var(--accent)' : 'none',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: activeTab === 'register' ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              outline: 'none'
            }}
          >
            Kayıt Ol
          </button>
        </div>

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            transition: 'all var(--transition-fast)',
            zIndex: 10,
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
          <svg style={{ width: '16px', height: '16px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4' }} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
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
              <svg style={{ width: '16px', height: '16px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4', flexShrink: 0 }} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
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
              <svg style={{ width: '16px', height: '16px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4', flexShrink: 0 }} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Name Field (Register Only) */}
          {activeTab === 'register' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Adınız Soyadınız
              </label>
              <input
                type="text"
                placeholder="Ör. Aylin Yılmaz"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  fontSize: '13px',
                  borderRadius: '0px',
                  backgroundColor: 'rgba(253, 252, 249, 0.6)',
                  border: '1px solid rgba(24, 24, 27, 0.12)',
                  transition: 'all var(--transition-fast)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--text-primary)';
                  e.target.style.backgroundColor = 'rgba(253, 252, 249, 0.9)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(24, 24, 27, 0.12)';
                  e.target.style.backgroundColor = 'rgba(253, 252, 249, 0.6)';
                }}
              />
            </div>
          )}

          {/* Email Field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              E-posta Adresi
            </label>
            <input
              type="email"
              placeholder="Ornek@email.com"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                fontSize: '13px',
                borderRadius: '0px',
                backgroundColor: 'rgba(253, 252, 249, 0.6)',
                border: '1px solid rgba(24, 24, 27, 0.12)',
                transition: 'all var(--transition-fast)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--text-primary)';
                e.target.style.backgroundColor = 'rgba(253, 252, 249, 0.9)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(24, 24, 27, 0.12)';
                e.target.style.backgroundColor = 'rgba(253, 252, 249, 0.6)';
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Şifre
              </label>
              {activeTab === 'login' && (
                <a href="#forgot" style={{ fontSize: '11px', color: 'var(--accent)', textDecoration: 'none', fontWeight: '500' }}>
                  Şifremi Unuttum
                </a>
              )}
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                fontSize: '13px',
                borderRadius: '0px',
                backgroundColor: 'rgba(253, 252, 249, 0.6)',
                border: '1px solid rgba(24, 24, 27, 0.12)',
                transition: 'all var(--transition-fast)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--text-primary)';
                e.target.style.backgroundColor = 'rgba(253, 252, 249, 0.9)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(24, 24, 27, 0.12)';
                e.target.style.backgroundColor = 'rgba(253, 252, 249, 0.6)';
              }}
            />
          </div>

          {/* Remember Me Checkbox (Login Only) */}
          {activeTab === 'login' && (
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}>
              <input type="checkbox" style={{ accentColor: 'var(--accent)', width: '14px', height: '14px', cursor: 'pointer' }} />
              <span>Beni Hatırla</span>
            </label>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-accent"
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
            <svg style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4' }} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
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
                Zaten üye misiniz?{' '}
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
