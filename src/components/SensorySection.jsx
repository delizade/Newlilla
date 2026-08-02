import React from 'react';
import { Icon } from './ui';

export default function SensorySection() {
  const sensoryItems = [
    {
      id: 'modal',
      icon: 'droplet',
      title: 'Premium Modal Dokusu',
      subtitle: 'KAYIN AĞACI LİFLERİNDEN İPEKSİ YUMUŞAKLIK',
      desc: 'Doğal kayın ağacı elyaflarından üretilen modal iplikler, cildinizle temas ettiği ilk andan itibaren benzersiz bir yumuşaklık hissi sunar. Nefes alabilir dokusuyla terletmez, defalarca yıkansa bile ilk günkü saten pürüzsüzlüğünü korur.'
    },
    {
      id: 'seamless',
      icon: 'sparkles',
      title: 'Seamless Dikişsizlik',
      subtitle: 'İZ YAPMAYAN LAZER KESİM TEKNOLOJİSİ',
      desc: 'Sıfır dikiş ve özel lazer kesim kenar tasarımı sayesinde en dar kıyafetlerin altından bile asla iz yapmaz. Teninizi ikinci bir cilt gibi saran esnek yapısıyla hareketlerinizi kısıtlamaz, gün boyu yokmuş gibi hissettirir.'
    },
    {
      id: 'organic',
      icon: 'leaf',
      title: 'Saf Organik Pamuk',
      subtitle: 'HASSAS TENLER İÇİN KİMYASALSIZ KORUMA',
      desc: 'Alerjen ve sert kimyasal maddeler barındırmayan, sertifikalı %100 organik pamuk dokularımız. Çocuklarımızın ve hassas ciltlerin güvenle giyebileceği, yüksek emiciliğe ve doğal hava sirkülasyonuna sahip en sahici dokunuş.'
    }
  ];

  return (
    <section className="sensory-section" style={{ padding: '60px 0 80px 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span style={{ 
            fontFamily: 'var(--font-serif)', 
            fontStyle: 'italic', 
            fontSize: '19px', 
            color: '#896263',
            display: 'block',
            marginBottom: '4px'
          }}>
            Duyusal Dokunuşlar & Premium Dokular
          </span>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '34px', 
            fontWeight: '500', 
            letterSpacing: '-0.01em',
            color: 'var(--text-primary)'
          }}>
            Teninizin Hak Ettiği Lüks Konfor
          </h2>
          <p style={{ 
            fontSize: '13px', 
            color: 'var(--text-secondary)', 
            marginTop: '8px', 
            maxWidth: '560px', 
            margin: '8px auto 0 auto',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.1px'
          }}>
            Her iplikte ve her dikişte sadece üstün kaliteli kumaş teknolojileri kullanıyoruz.
          </p>
        </div>

        {/* Option 3: Kutusuz Editoryal Sütunlar (Frameless Editorial Columns) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '0px',
          padding: '20px 0'
        }}>
          {sensoryItems.map((item, idx) => (
            <div 
              key={item.id}
              style={{
                padding: '0 36px',
                borderRight: idx < sensoryItems.length - 1 ? '1px solid rgba(24, 24, 27, 0.08)' : 'none',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Micro Fine Hairline Icon */}
              <div style={{
                color: 'var(--primary)',
                marginBottom: '18px'
              }}>
                <Icon name={item.icon} size={28} />
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '22px',
                fontWeight: '500',
                color: 'var(--text-primary)',
                marginBottom: '6px'
              }}>
                {item.title}
              </h3>

              <span style={{
                fontSize: '11px',
                fontFamily: 'var(--font-sans)',
                fontWeight: '600',
                fontStyle: 'normal',
                color: '#896263',
                display: 'block',
                marginBottom: '16px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}>
                {item.subtitle}
              </span>

              <p style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: '1.65',
                fontFamily: 'var(--font-sans)',
                maxWidth: '320px'
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
