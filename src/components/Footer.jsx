import React, { useState } from 'react';

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
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid rgba(24, 24, 27, 0.06)',
      padding: '72px 0 40px 0',
      marginTop: '80px',
      textAlign: 'left'
    }}>
      <div className="container">
        
        {/* Trust Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '32px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(24, 24, 27, 0.06)',
          marginBottom: '48px'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <svg style={{ width: '28px', height: '28px', stroke: 'var(--accent)', strokeWidth: '1.4', fill: 'none', flexShrink: 0 }} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>256 Bit SSL</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', marginTop: '2px' }}>Kredi kartı bilgileriniz tamamen güvendedir.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <svg style={{ width: '28px', height: '28px', stroke: 'var(--accent)', strokeWidth: '1.4', fill: 'none', flexShrink: 0 }} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.09-1.428a2.25 2.25 0 00-1.096-1.879l-1.921-1.153m-1.202-3.75a1.125 1.125 0 00-1.125-1.125H9.75m4.875 4.875H9.75m0 0V9.75m0 9h.008v-.008H9.75m3.562-3.63l1.164-3.5a1.125 1.125 0 011.066-.77H18m0 0V9.75m0 0h.008v-.008H18" />
            </svg>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>Hızlı & Bedava Kargo</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', marginTop: '2px' }}>1500 TL üzeri tüm siparişlerde kargo bedava.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <svg style={{ width: '28px', height: '28px', stroke: 'var(--accent)', strokeWidth: '1.4', fill: 'none', flexShrink: 0 }} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>15 Gün İade Garantisi</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', marginTop: '2px' }}>Kullanılmamış ürünlerde koşulsuz iade imkanı.</p>
            </div>
          </div>
        </div>

        {/* Links & Newsletter Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(24, 24, 27, 0.06)'
        }}>
          
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <img 
              src="/assets/NewLilla-logo.svg" 
              alt="NewLilla" 
              style={{ 
                height: '46px', 
                width: 'auto', 
                objectFit: 'contain',
                alignSelf: 'flex-start'
              }} 
            />
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.7', fontFamily: 'var(--font-sans)' }}>
              Kadın ve çocuk iç giyim dünyasında lüks detayları, üstün kumaş kalitesini ve kusursuz konforu bir arada sunan özel perakende platformu.
            </p>
          </div>

          {/* Kurumsal */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
              Kurumsal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', fontFamily: 'var(--font-sans)' }}>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Hakkımızda</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Markalarımız</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Blog & Haberler</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Müşteri İlişkileri</a></li>
            </ul>
          </div>

          {/* Politikalar */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
              Sözleşmeler
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', fontFamily: 'var(--font-sans)' }}>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Gizlilik Politikası</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Mesafeli Satış Sözleşmesi</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>İade ve İptal Koşulları</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>KVKK Bilgilendirme</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
              Ekibe Katıl
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px', fontFamily: 'var(--font-sans)', lineHeight: '1.6' }}>
              Kampanyalardan ve yeni çıkan özel serilerden ilk siz haberdar olun!
            </p>
            
            {isSubscribed ? (
              <div className="badge" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', fontSize: '12px', borderRadius: '0px', backgroundColor: 'var(--primary-light)', color: 'var(--text-primary)', border: '1px solid rgba(24, 24, 27, 0.08)', fontFamily: 'var(--font-sans)' }}>
                <svg style={{ width: '16px', height: '16px', fill: 'none', stroke: 'var(--success)', strokeWidth: '1.4' }} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Başarıyla abone oldunuz! Teşekkürler.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0px', width: '100%' }}>
                <input
                  type="email"
                  placeholder="E-posta adresiniz..."
                  className="input-field"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    borderRadius: '0px',
                    fontSize: '12px',
                    padding: '12px 16px',
                    backgroundColor: '#fff',
                    border: '1px solid rgba(24, 24, 27, 0.15)',
                    borderRight: 'none',
                    flexGrow: 1,
                    outline: 'none',
                    transition: 'all var(--transition-fast)',
                    fontFamily: 'var(--font-sans)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--text-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(24, 24, 27, 0.15)'}
                />
                <button
                  type="submit"
                  className="btn btn-accent"
                  style={{
                    padding: '12px 24px',
                    fontSize: '11px',
                    borderRadius: '0px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: '600'
                  }}
                >
                  Katıl
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
              <svg style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4' }} viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <span>Güvenli Alışveriş Altyapısı</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <svg style={{ width: '14px', height: '14px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4' }} viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 10h18" />
              </svg>
              <span>MasterCard / Visa / Troy</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
