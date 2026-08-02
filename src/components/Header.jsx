import React, { useState } from 'react';
import { Icon } from './ui';

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
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const categories = ['Tümü', 'Kadın', 'Çocuk', 'Erkek'];

  return (
    <header 
      className="glassmorphism" 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        padding: '16px 0',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        borderBottom: '1px solid rgba(24, 24, 27, 0.06)'
      }}
    >
      {/* Main Header Container */}
      <div 
        className="container" 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '28px'
        }}
      >
        {/* Logo */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }} 
          onClick={() => setActiveCategory('Tümü')}
        >
          <img 
            src={`${import.meta.env.BASE_URL || '/'}assets/NewLilla-logo.svg`} 
            alt="NewLilla" 
            style={{ 
              height: '48px', 
              width: 'auto', 
              objectFit: 'contain',
              display: 'block'
            }} 
          />
        </div>

        {/* Search Bar (Frameless Line Search) */}
        <div style={{ flex: '1', maxWidth: isSearchFocused ? '320px' : '200px', position: 'relative', transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <input
            type="text"
            placeholder="Arama yapın..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            style={{
              width: '100%',
              height: '38px',
              padding: '0 10px 0 28px',
              borderRadius: '0px',
              border: 'none',
              borderBottom: isSearchFocused ? '1.5px solid #896263' : '1px solid rgba(24, 24, 27, 0.18)',
              backgroundColor: 'transparent',
              fontFamily: 'var(--font-serif)',
              fontSize: '14px',
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'all 0.25s ease'
            }}
          />
          <Icon 
            name="search" 
            size={14} 
            color="#896263" 
            style={{
              position: 'absolute',
              left: '4px',
              top: '50%',
              transform: 'translateY(-50%)'
            }} 
          />
        </div>

        {/* Menu Items (Couture All-Caps Serif & Rose Bottom Line) */}
        <nav style={{ display: 'flex', gap: '34px', alignItems: 'center' }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  position: 'relative',
                  padding: '6px 0',
                  border: 'none',
                  background: 'transparent',
                  color: isActive ? '#896263' : 'var(--text-primary)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#896263';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <span>{cat}</span>
                <span 
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    height: '1.5px',
                    backgroundColor: '#896263',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'center center',
                    transition: 'transform 0.25s ease'
                  }}
                />
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: 1. Şiirsel Editoryal Metin-Link (Pure Text Link with Serif Italic) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Pure Serif Cart Link */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 0',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.75'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <Icon name="cart" size={20} color="#896263" />
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '15px', color: '#896263' }}>
              Sepet ({cartCount})
            </span>
          </button>

          {/* Pure Serif Login Link or User Profile */}
          {currentUser ? (
            <div 
              style={{ position: 'relative' }} 
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 0',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                <Icon name="user" size={20} color="#896263" />
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '15px', color: '#896263' }}>
                  {currentUser.name ? currentUser.name : 'Hesabım'}
                </span>
              </button>

              {/* User Dropdown */}
              {isDropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                    border: '1px solid rgba(24, 24, 27, 0.08)',
                    borderRadius: '4px',
                    minWidth: '180px',
                    padding: '8px 0',
                    zIndex: 110
                  }}
                >
                  <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(24, 24, 27, 0.06)' }}>
                    <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>{currentUser.name}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#d32f2f',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(211, 47, 47, 0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Icon name="logout" size="small" color="#d32f2f" />
                    <span>Çıkış Yap</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 0',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.75'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <Icon name="user" size={20} color="#896263" />
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '15px', color: '#896263' }}>
                Giriş Yap / Üye Ol
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
