import React, { useState } from 'react';
import { Icon } from './ui';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <footer style={{
      backgroundColor: 'transparent',
      paddingTop: '64px',
      paddingBottom: '48px',
      marginTop: 'auto'
    }}>
      <div className="container">
        
        {/* Top Features bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '32px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(24, 24, 27, 0.06)',
          marginBottom: '48px'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Icon name="shield" size="big" color="var(--accent)" />
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>256 Bit SSL</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', marginTop: '2px' }}>Kredi kartı bilgileriniz tamamen güvendedir.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Icon name="truck" size="big" color="var(--accent)" />
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>Hızlı & Bedava Kargo</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', marginTop: '2px' }}>1500 TL üzeri tüm siparişlerde kargo bedava.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Icon name="rotate" size="big" color="var(--accent)" />
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>15 Gün İade Garantisi</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', marginTop: '2px' }}>Kullanılmamış ürünlerde koşulsuz iade imkanı.</p>
            </div>
          </div>
        </div>

        {/* Links & Newsletter Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(24, 24, 27, 0.06)'
        }}>
          {/* Brand Info */}
          <div>
            <img 
              src={`${import.meta.env.BASE_URL || '/'}assets/NewLilla-logo.svg`} 
              alt="NewLilla" 
              style={{ 
                height: '36px', 
                width: 'auto', 
                marginBottom: '16px',
                display: 'block'
              }} 
            />
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', fontFamily: 'var(--font-sans)' }}>
              Teninizle Uyumlu Lüks Lingerie & Ev Giyimi. Yüksek kaliteli modal ve dikişsiz dokularla tasarlanmış zamansız koleksiyonlar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>Kategoriler</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Kadın Sütyen & Büstiyer</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Seamless Dikişsiz Külot</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Erkek Modal Boxer</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Çocuk Organik İç Giyim</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Saten Ev Giyimi</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>Müşteri Hizmetleri</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Sipariş Takibi</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Teslimat & Kargo</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>İade & Değişim Koşulları</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Sıkça Sorulan Sorular</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Beden Tablosu & Sihirbazı</a></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div style={{ flex: '1 1 320px', maxWidth: '440px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>E-Bülten Abonesi Olun</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.5', fontFamily: 'var(--font-sans)' }}>
              Kampanyalardan ve yeni çıkan özel serilerden ilk siz haberdar olun!
            </p>
            
            {isSubscribed ? (
              <div className="badge" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', fontSize: '12px', borderRadius: '4px', backgroundColor: 'var(--primary-light)', color: 'var(--text-primary)', border: '1px solid rgba(24, 24, 27, 0.08)', fontFamily: 'var(--font-sans)' }}>
                <Icon name="check" size="small" color="var(--success)" />
                <span>Başarıyla abone oldunuz! Teşekkürler.</span>
              </div>
            ) : (
              <form 
                onSubmit={handleSubscribe} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'stretch',
                  gap: '8px', 
                  width: '100%',
                  maxWidth: '440px'
                }}
              >
                <input
                  type="email"
                  placeholder="E-posta adresiniz..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: '1 1 280px',
                    minWidth: '240px',
                    height: '46px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    padding: '0 18px',
                    backgroundColor: '#ffffff',
                    border: 'none',
                    boxShadow: 'none',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-primary)',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    height: '46px',
                    padding: '0 24px',
                    fontSize: '11px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: '600',
                    backgroundColor: '#28282d',
                    color: '#ffffff',
                    border: 'none',
                    boxShadow: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#18181b'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28282d'}
                >
                  <span>Katıl</span>
                  <Icon name="arrow-right" size="small" color="#ffffff" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright */}
        <div style={{
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '12px',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-sans)'
        }}>
          <p>© {new Date().getFullYear()} NewLilla. Tüm hakları saklıdır. Bu bir Antigravity premium redesign tasarımıdır.</p>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="lock" size="small" />
              <span>Güvenli Alışveriş Altyapısı</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="ticket" size="small" />
              <span>MasterCard / Visa / Troy</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
