import React, { useState } from 'react';

export default function FitFinderModal({ isOpen, onClose, onSaveRecommendation }) {
  const [step, setStep] = useState(1);
  const [waist, setWaist] = useState('');
  const [fabric, setFabric] = useState('');
  const [size, setSize] = useState('');

  if (!isOpen) return null;

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    // Generate recommendation matching criteria
    onSaveRecommendation({
      waist,
      fabric,
      size,
      text: `${size} Beden • ${fabric === 'cotton' ? 'Pamuklu' : fabric === 'seamless' ? 'Dikişsiz' : 'Modal Lüks'} • ${waist === 'high' ? 'Yüksek Bel' : waist === 'mid' ? 'Orta Bel' : 'Düşük Bel'}`
    });
    setStep(1);
    onClose();
  };

  const isNextDisabled = () => {
    if (step === 1 && !waist) return true;
    if (step === 2 && !fabric) return true;
    if (step === 3 && !size) return true;
    return false;
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
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      {/* Premium Liquid Glass Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '560px',
          backgroundColor: 'rgba(253, 252, 249, 0.96)',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          borderRadius: 0,
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 20px 50px rgba(24, 24, 27, 0.1)',
          border: '1px solid rgba(24, 24, 27, 0.08)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Glowing Ambient lights */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '30%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-light) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.5
        }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
        >
          <svg style={{ width: '16px', height: '16px', stroke: 'currentColor', strokeWidth: 1.4 }} viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header Area */}
        <div style={{ padding: '32px 32px 16px 32px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span style={{
            fontSize: '9px',
            fontWeight: '600',
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '8px',
            fontFamily: 'var(--font-sans)'
          }}>
            <svg style={{ width: '11px', height: '11px', fill: 'currentColor' }} viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z" />
            </svg>
            BEDEN & STİL SİHİRBAZI
          </span>
          <h2 style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', fontWeight: '400', color: 'var(--text-primary)' }}>
            Doğru Bedeni & En Rahat Kesimi Bulun
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>
            NewLilla Lüks İç Giyim deneyimini bedeninize en uygun parçalarla keşfedin.
          </p>

          {/* Progress Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
            <span style={{ fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', letterSpacing: '0.05em' }}>
              ADIM {step} / {totalSteps}
            </span>
            <div className="progress-glow-bar" style={{ flexGrow: 1, height: '2px', backgroundColor: 'rgba(24, 24, 27, 0.08)' }}>
              <div className="progress-glow-fill" style={{ width: `${(step / totalSteps) * 100}%`, height: '100%', backgroundColor: 'var(--text-primary)' }} />
            </div>
          </div>
        </div>

        {/* Body Wizard Steps */}
        <div style={{ padding: '0 32px 32px 32px', position: 'relative', zIndex: 2, flexGrow: 1 }}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.3s ease-out' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '500', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '4px', textAlign: 'left' }}>
                1. Nasıl bir bel ve kalıp yüksekliği tercih edersiniz?
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                <div
                  className={`fit-finder-option ${waist === 'high' ? 'selected' : ''}`}
                  onClick={() => setWaist('high')}
                  style={{ borderRadius: 0 }}
                >
                  <strong style={{ fontSize: '13px', display: 'block', color: 'var(--text-primary)' }}>Yüksek Bel & Toparlayıcı</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
                    Korse şıklığında göbek ve kalça bölgesini toparlayan klasik, güvenli kesim.
                  </span>
                </div>

                <div
                  className={`fit-finder-option ${waist === 'mid' ? 'selected' : ''}`}
                  onClick={() => setWaist('mid')}
                  style={{ borderRadius: 0 }}
                >
                  <strong style={{ fontSize: '13px', display: 'block', color: 'var(--text-primary)' }}>Orta Bel & Günlük Konfor</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
                    Pamuklu slip ve dikişsiz şort külotlar için her gün ideal olan standart kesim.
                  </span>
                </div>

                <div
                  className={`fit-finder-option ${waist === 'low' ? 'selected' : ''}`}
                  onClick={() => setWaist('low')}
                  style={{ borderRadius: 0 }}
                >
                  <strong style={{ fontSize: '13px', display: 'block', color: 'var(--text-primary)' }}>İnce Askı & Lazer Kesim Askılı</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
                    Kıyafetlerin altında kesinlikle sıfır iz bırakan zarif crop büstiyerler ve düşük bel parçalar.
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.3s ease-out' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '500', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '4px', textAlign: 'left' }}>
                2. Kumaş ve doku önceliğiniz nedir?
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                <div
                  className={`fit-finder-option ${fabric === 'cotton' ? 'selected' : ''}`}
                  onClick={() => setFabric('cotton')}
                  style={{ borderRadius: 0 }}
                >
                  <strong style={{ fontSize: '13px', display: 'block', color: 'var(--text-primary)' }}>%100 Organik Penye Pamuk</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
                    Nefes alabilen yapısıyla cildi terletmeyen, alerji karşıtı en saf doğal doku.
                  </span>
                </div>

                <div
                  className={`fit-finder-option ${fabric === 'seamless' ? 'selected' : ''}`}
                  onClick={() => setFabric('seamless')}
                  style={{ borderRadius: 0 }}
                >
                  <strong style={{ fontSize: '13px', display: 'block', color: 'var(--text-primary)' }}>Dikişsiz Lazer Mikrofiber</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
                    Kıyafetlerin altından dikiş çizgilerini belli etmeyen, pürüzsüz ikinci ten hissiyatı.
                  </span>
                </div>

                <div
                  className={`fit-finder-option ${fabric === 'modal' ? 'selected' : ''}`}
                  onClick={() => setFabric('modal')}
                  style={{ borderRadius: 0 }}
                >
                  <strong style={{ fontSize: '13px', display: 'block', color: 'var(--text-primary)' }}>Modal-Elastan Lüks Karışım</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
                    Kayın ağacı liflerinden elde edilen ipeksi parlaklık, premium yumuşaklık ve esneklik.
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.3s ease-out' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '500', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '4px', textAlign: 'left' }}>
                3. Normalde kullandığınız beden ölçüsü nedir?
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginTop: '8px' }}>
                {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <div
                    key={sz}
                    className={`fit-finder-option ${size === sz ? 'selected' : ''}`}
                    onClick={() => setSize(sz)}
                    style={{ padding: '20px 16px', borderRadius: 0 }}
                  >
                    <span style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', fontFamily: 'var(--font-sans)' }}>
                      {sz}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block', fontFamily: 'var(--font-sans)' }}>
                      {sz === 'S' ? 'Beden 36' : sz === 'M' ? 'Beden 38' : sz === 'L' ? 'Beden 40' : sz === 'XL' ? 'Beden 42' : 'Beden 44+'}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 0,
                fontSize: '11px',
                color: 'var(--text-secondary)',
                textAlign: 'left',
                border: '1px solid var(--border-naive)',
                lineHeight: '1.6'
              }}>
                <strong>Beden Güvencesi:</strong> Sihirbazımız, NewLilla'nın özel dikiş kalıplarını analiz ederek %98 uyumluluk oranıyla beden tespiti yapar. Siparişinizde beden uyuşmazlığı olursa <strong>koşulsuz ücretsiz değişim</strong> garantisi sunuyoruz.
              </div>
            </div>
          )}
        </div>

        {/* Footer Area with Action buttons */}
        <div style={{
          padding: '20px 32px 32px 32px',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'transparent',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="btn btn-secondary"
              style={{ padding: '10px 24px', fontSize: '11px', borderRadius: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              Geri Git
            </button>
          ) : (
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500', fontFamily: 'var(--font-sans)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
              Hazırsanız başlayalım!
            </span>
          )}

          {step < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={isNextDisabled()}
              className="btn btn-primary"
              style={{
                padding: '10px 24px',
                fontSize: '11px',
                borderRadius: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                opacity: isNextDisabled() ? 0.6 : 1,
                cursor: isNextDisabled() ? 'not-allowed' : 'pointer'
              }}
            >
              Sonraki Adım
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={isNextDisabled()}
              className="btn btn-primary"
              style={{
                padding: '10px 28px',
                fontSize: '11px',
                borderRadius: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                background: 'var(--accent)',
                opacity: isNextDisabled() ? 0.6 : 1,
                cursor: isNextDisabled() ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Analiz Et & Sonuçları Gör
              <svg style={{ width: '12px', height: '12px', fill: 'currentColor' }} viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

