import React, { useState } from 'react';

export default function Header({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  cartCount,
  setIsCartOpen,
  currentUser,
  onLoginClick,
  onLogout
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categories = ['Tümü', 'Kadın', 'Çocuk', 'Erkek'];

  return (
    <header className="glassmorphism" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
      padding: '16px 0',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }} onClick={() => setActiveCategory('Tümü')}>
          <img 
            src="/assets/NewLilla-logo.svg" 
            alt="NewLilla" 
            style={{ 
              height: '52px', 
              width: 'auto', 
              objectFit: 'contain',
              display: 'block'
            }} 
          />
        </div>

        {/* Search Bar */}
        <div style={{
          flex: '1',
          maxWidth: '400px',
          minWidth: '240px',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="Koleksiyonda ara (ör. büstiyer, boxer, pamuklu)..."
            className="input-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: '40px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              fontSize: '13px'
            }}
          />
          <svg
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '18px',
              height: '18px',
              fill: 'none',
              stroke: 'var(--text-secondary)',
              strokeWidth: '1.4'
            }}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                fontSize: '16px'
              }}
            >
              &times;
            </button>
          )}
        </div>

        {/* Navigation Categories */}
        <nav style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  color: isActive ? 'var(--primary-dark)' : 'var(--text-secondary)',
                  fontWeight: isActive ? '600' : '400',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            );
          })}
        </nav>

        {/* Actions Block */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* Cart Trigger */}
          <div
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-secondary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              border: '1px solid var(--border-color)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-light)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            <svg
              style={{
                width: '20px',
                height: '20px',
                fill: 'none',
                stroke: 'var(--text-primary)',
                strokeWidth: '1.4'
              }}
              viewBox="0 0 24 24"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: 'var(--accent)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: '700',
                width: '20px',
                height: '20px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(220, 100, 100, 0.4)',
                animation: 'scaleIn 0.2s ease-out'
              }}>
                {cartCount}
              </span>
            )}
          </div>

          {/* User Account State Trigger */}
          {currentUser ? (
            <div
              className="profile-avatar-container"
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div
                className="profile-avatar-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {currentUser.name ? currentUser.name.substring(0, 2).toUpperCase() : 'HE'}
              </div>
              
              {isDropdownOpen && (
                <div className="profile-dropdown-menu liquid-glass" style={{
                  border: '1px solid rgba(255,255,255,0.18)'
                }}>
                  <div className="profile-dropdown-header">
                    <div className="profile-dropdown-name">{currentUser.name}</div>
                    <div className="profile-dropdown-email">{currentUser.email}</div>
                  </div>
                  
                  <button
                    className="profile-dropdown-item"
                    onClick={() => {
                      alert("Profil & Sihirbaz ayarlarınız yükleniyor...");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Profil & Beden Ayarlarım</span>
                  </button>
                  
                  <button
                    className="profile-dropdown-item"
                    onClick={() => {
                      alert("Siparişleriniz yükleniyor...");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="21 8 21 21 3 21 3 8" />
                      <rect x="1" y="3" width="22" height="5" rx="1" />
                      <line x1="10" y1="12" x2="14" y2="12" />
                    </svg>
                    <span>Siparişlerim</span>
                  </button>
                  
                  <button
                    className="profile-dropdown-item"
                    onClick={() => {
                      alert("Yeni Üye İndirim Kodunuz: LILLA10 (%10 Sepet İndirimi)");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <line x1="7" y1="8" x2="17" y2="8" />
                      <line x1="7" y1="12" x2="17" y2="12" />
                      <line x1="7" y1="16" x2="17" y2="16" />
                    </svg>
                    <span>İndirim Kuponlarım (%10)</span>
                  </button>
                  
                  <button
                    className="profile-dropdown-item logout"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onLogout();
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>Çıkış Yap</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="btn btn-secondary"
              style={{
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary-light)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.color = 'var(--primary-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              <svg
                style={{
                  width: '16px',
                  height: '16px',
                  fill: 'none',
                  stroke: 'currentColor',
                  strokeWidth: '1.4'
                }}
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Giriş Yap / Üye Ol</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
