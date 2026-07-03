import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function OrnateBorderA() {
  return (
    <>
      {/* Absolute-positioned HTML elements for horizontal lines and main background fill */}
      <div className="button-bg-main" style={{
        position: 'absolute',
        top: '3px',
        bottom: '3px',
        left: '11px',
        right: '11px',
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }} />
      <div className="button-line-horizontal" style={{
        position: 'absolute',
        top: '3px',
        left: '16px',
        right: '16px',
        height: '1px',
        pointerEvents: 'none',
        zIndex: 2,
        transition: 'background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }} />
      <div className="button-line-horizontal" style={{
        position: 'absolute',
        bottom: '3px',
        left: '16px',
        right: '16px',
        height: '1px',
        pointerEvents: 'none',
        zIndex: 2,
        transition: 'background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }} />

      <svg 
        className="button-border-overlay"
        width="100%" 
        height="100%" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: 1
        }}
      >
        <g className="button-border-inner">
          {/* Left margin body */}
          <rect 
            x="3.0" 
            y="11" 
            width="8.0" 
            height="28" 
            className="button-bg-rect"
            style={{
              transition: 'fill 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
          {/* Right margin body */}
          <svg x="100%" y="0" width="16" height="50" style={{ overflow: 'visible' }}>
            <rect 
              x="-11.0" 
              y="11" 
              width="8.0" 
              height="28" 
              className="button-bg-rect"
              style={{
                transition: 'fill 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          </svg>

          {/* Top-Left Corner */}
          <svg x="0" y="0" width="16" height="16" viewBox="0 0 16 16" className="corner-tl" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <path 
              d="M 3.5 11 A 7.5 7.5 0 0 0 11 3.5 L 11 11 Z" 
              className="button-bg-rect"
              style={{ transition: 'fill 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
            <path d="M 3.5 11 A 7.5 7.5 0 0 0 11 3.5" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M 16 3.5 L 11 3.5 C 9 3.5, 8 1.5, 9 1 C 10 0.5, 11.5 1.5, 11 2.5 C 10.5 3.5, 9.5 2.5, 10 2" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M 3.5 16 L 3.5 11 C 3.5 9, 1.5 8, 1 9 C 0.5 10, 1.5 11.5, 2.5 11 C 3.5 10.5, 2.5 9.5, 2 10" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* Top-Right Corner */}
          <svg x="100%" y="0" width="16" height="16" viewBox="0 0 16 16" className="corner-tr" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <g transform="translate(-16, 0)">
              <path 
                d="M 12.5 11 A 7.5 7.5 0 0 1 5 3.5 L 5 11 Z" 
                className="button-bg-rect"
                style={{ transition: 'fill 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
              />
              <path d="M 12.5 11 A 7.5 7.5 0 0 1 5 3.5" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 0 3.5 L 5 3.5 C 7 3.5, 8 1.5, 7 1 C 6 0.5, 4.5 1.5, 5 2.5 C 5.5 3.5, 6.5 2.5, 6 2" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 12.5 16 L 12.5 11 C 12.5 9, 14.5 8, 15 9 C 15.5 10, 14.5 11.5, 13.5 11 C 12.5 10.5, 13.5 9.5, 14 10" fill="none" stroke="currentColor" strokeWidth="1" />
            </g>
          </svg>

          {/* Bottom-Left Corner */}
          <svg x="0" y="100%" width="16" height="16" viewBox="0 0 16 16" className="corner-bl" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <g transform="translate(0, -16)">
              <path 
                d="M 3.5 5 A 7.5 7.5 0 0 1 11 12.5 L 11 5 Z" 
                className="button-bg-rect"
                style={{ transition: 'fill 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
              />
              <path d="M 3.5 5 A 7.5 7.5 0 0 1 11 12.5" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 16 12.5 L 11 12.5 C 9 12.5, 8 14.5, 9 15 C 10 15.5, 11.5 14.5, 11 13.5 C 10.5 12.5, 9.5 13.5, 10 13" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 3.5 0 L 3.5 5 C 3.5 7, 1.5 8, 1 7 C 0.5 6, 1.5 4.5, 2.5 5 C 3.5 5.5, 2.5 6.5, 2 6" fill="none" stroke="currentColor" strokeWidth="1" />
            </g>
          </svg>

          {/* Bottom-Right Corner */}
          <svg x="100%" y="100%" width="16" height="16" viewBox="0 0 16 16" className="corner-br" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <g transform="translate(-16, -16)">
              <path 
                d="M 12.5 5 A 7.5 7.5 0 0 0 5 12.5 L 5 5 Z" 
                className="button-bg-rect"
                style={{ transition: 'fill 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
              />
              <path d="M 12.5 5 A 7.5 7.5 0 0 0 5 12.5" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 0 12.5 L 5 12.5 C 7 12.5, 8 14.5, 7 15 C 6 15.5, 4.5 14.5, 5 13.5 C 5.5 12.5, 6.5 13.5, 6 13" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 12.5 0 L 12.5 5 C 12.5 7, 14.5 8, 15 7 C 15.5 6, 14.5 4.5, 13.5 5 C 12.5 5.5, 13.5 6.5, 14 6" fill="none" stroke="currentColor" strokeWidth="1" />
            </g>
          </svg>

          {/* Left Line */}
          <line x1="3.5" y1="16" x2="3.5" y2="34" stroke="currentColor" strokeWidth="1" fill="none" />
          {/* Right Line */}
          <svg x="100%" y="0" width="16" height="50" style={{ overflow: 'visible' }}>
            <line 
              x1="-3.5" 
              y1="16" 
              x2="-3.5" 
              y2="34" 
              stroke="currentColor" 
              strokeWidth="1" 
              fill="none" 
            />
          </svg>
        </g>
      </svg>
    </>
  );
}

function OrnateBorderB() {
  return (
    <>
      {/* Absolute-positioned HTML elements for horizontal lines and main background fill */}
      <div className="button-bg-main" style={{
        position: 'absolute',
        top: '3px',
        bottom: '3px',
        left: '3px',
        right: '3px',
        borderRadius: '3px',
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }} />
      <div className="button-line-horizontal" style={{
        position: 'absolute',
        top: '3px',
        left: '16px',
        right: '16px',
        height: '1px',
        pointerEvents: 'none',
        zIndex: 2,
        transition: 'background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }} />
      <div className="button-line-horizontal" style={{
        position: 'absolute',
        bottom: '3px',
        left: '16px',
        right: '16px',
        height: '1px',
        pointerEvents: 'none',
        zIndex: 2,
        transition: 'background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }} />

      <svg 
        className="button-border-overlay"
        width="100%" 
        height="100%" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: 1
        }}
      >
        <g className="button-border-inner">
          {/* Top-Left Corner */}
          <svg x="0" y="0" width="16" height="16" viewBox="0 0 16 16" className="corner-tl" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <path d="M 16 3.5 L 5 3.5 C 3 3.5, 2 2, 3.5 1 C 5 0, 6.5 1.5, 5.5 2.5 C 4.5 3.5, 3.5 2.5, 4 2" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M 3.5 16 L 3.5 5 C 3.5 3, 2 2, 1 3.5 C 0 5, 1.5 6.5, 2.5 5.5 C 3.5 4.5, 2.5 3.5, 2 4" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* Top-Right Corner */}
          <svg x="100%" y="0" width="16" height="16" viewBox="0 0 16 16" className="corner-tr" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <g transform="translate(-16, 0)">
              <path d="M 0 3.5 L 11 3.5 C 13 3.5, 14 2, 12.5 1 C 11 0, 9.5 1.5, 10.5 2.5 C 11.5 3.5, 12.5 2.5, 12 2" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 12.5 16 L 12.5 5 C 12.5 3, 14 2, 15 3.5 C 16 5, 14.5 6.5, 13.5 5.5 C 12.5 4.5, 13.5 3.5, 13 4" fill="none" stroke="currentColor" strokeWidth="1" />
            </g>
          </svg>

          {/* Bottom-Left Corner */}
          <svg x="0" y="100%" width="16" height="16" viewBox="0 0 16 16" className="corner-bl" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <g transform="translate(0, -16)">
              <path d="M 16 12.5 L 5 12.5 C 3 12.5, 2 14, 3.5 15 C 5 16, 6.5 14.5, 5.5 13.5 C 4.5 12.5, 3.5 13.5, 4 13" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 3.5 0 L 3.5 11 C 3.5 13, 2 14, 1 12.5 C 0 11, 1.5 9.5, 2.5 10.5 C 3.5 11.5, 2.5 12.5, 2 12" fill="none" stroke="currentColor" strokeWidth="1" />
            </g>
          </svg>

          {/* Bottom-Right Corner */}
          <svg x="100%" y="100%" width="16" height="16" viewBox="0 0 16 16" className="corner-br" style={{ overflow: 'visible', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <g transform="translate(-16, -16)">
              <path d="M 0 12.5 L 11 12.5 C 13 12.5, 14 14, 12.5 15 C 11 16, 9.5 14.5, 10.5 13.5 C 11.5 12.5, 12.5 13.5, 12 13" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 12.5 0 L 12.5 11 C 12.5 13, 14.5 14, 15 12.5 C 16 11, 14.5 9.5, 13.5 10.5 C 12.5 11.5, 13.5 12.5, 13 12" fill="none" stroke="currentColor" strokeWidth="1" />
            </g>
          </svg>

          {/* Left Line */}
          <line x1="3.5" y1="16" x2="3.5" y2="34" stroke="currentColor" strokeWidth="1" fill="none" />
          {/* Right Line */}
          <svg x="100%" y="0" width="16" height="50" style={{ overflow: 'visible' }}>
            <line 
              x1="-3.5" 
              y1="16" 
              x2="-3.5" 
              y2="34" 
              stroke="currentColor" 
              strokeWidth="1" 
              fill="none" 
            />
          </svg>
        </g>
      </svg>
    </>
  );
}

export default function Hero({ setActiveCategory }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  // Valentine's Day Countdown state (starts at 1 day, 16 hours, 47 minutes, 15 seconds)
  // 1 day = 86400, 16h = 57600, 47m = 2820, 15s = 15 => Total: 146835 seconds
  const [secondsLeft, setSecondsLeft] = useState(146835);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = () => {
    const days = Math.floor(secondsLeft / (24 * 3600));
    const hours = Math.floor((secondsLeft % (24 * 3600)) / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    return { days, hours, minutes, seconds };
  };

  const time = formatCountdown();

  const slides = [
    {
      id: "slide-1",
      title: "İlk Üyelik",
      headline: "Konforun En Naif Hali: Saten Zarafet",
      description: "Kulübümüze özel ilk alışverişinizde sepette %10 indirim fırsatı.",
      image: "assets/promo_membership.png",
      buttonText: "Hemen Keşfet",
      buttonCategory: "Kadın",
      theme: "theme-membership",
      accentColor: "var(--accent)",
      template: "A"
    },
    {
      id: "slide-2",
      title: "Paketini Tasarla",
      headline: "Kendi Paketini Yarat: Kombin Özgürlüğü",
      description: "Çoklu alımlarda %20'ye varan sepet indirimini keşfedin.",
      image: "assets/promo_bundle_box.png",
      buttonText: "Paketini Tasarla",
      buttonCategory: "Tümü",
      theme: "theme-bundle",
      accentColor: "var(--gold)",
      template: "B"
    },
    {
      id: "slide-3",
      title: "Extreme Boxer",
      headline: "İkonik Karakter: Extreme Cnr",
      description: "Nefes alan esnek pamuk-modal dokusuyla benzersiz konfor.",
      image: "assets/promo_diamond_briefs.png",
      buttonText: "Koleksiyonu Keşfet",
      buttonCategory: "Erkek",
      theme: "theme-diamond",
      accentColor: "var(--gold)",
      template: "C"
    },
    {
      id: "slide-4",
      title: "Çocuk Dünyası",
      headline: "Hassas Tenlere Özel: Saf Organik",
      description: "Kimyasalsız saf organik pamuk ipliğinden üretilen doğal setler.",
      image: "assets/promo_child_organic.png",
      buttonText: "Dünyayı Keşfet",
      buttonCategory: "Çocuk",
      theme: "theme-child",
      accentColor: "hsl(120, 25%, 35%)",
      template: "A"
    },
    {
      id: "slide-5",
      title: "Sevgililer Günü",
      headline: "Sevgililer Gününe Özel: %25 Aşk İndirimi",
      description: "Sevgililer gününe özel %25 indirim fırsatını kaçırma!",
      image: "assets/promo_valentines.png",
      buttonText: "Aşkla Keşfet",
      buttonCategory: "Tümü",
      theme: "theme-valentines",
      accentColor: "#E02424",
      isCountdown: true,
      template: "B"
    }
  ];

  // Preload all slide images on mount to avoid texture upload lag during transition
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Use IntersectionObserver to pause slider updates when off-screen
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-play interval effect for stories progression - Pauses when off-screen or hovered
  useEffect(() => {
    if (!isVisible || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => prev + 0.5); // 0.5% every 25ms = 5000ms total
    }, 25);

    return () => clearInterval(interval);
  }, [isVisible, isPaused]);

  // Handle slide transition when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      setActiveIndex((curr) => (curr + 1) % slides.length);
      setProgress(0);
    }
  }, [progress, slides.length]);

  // Reset progress when active index changes (e.g. on manual tab switch or auto-progression)
  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  // GSAP Active Slide Change animations - Only run when slider is visible in viewport and scoped to active slide
  useEffect(() => {
    if (containerRef.current && isVisible) {
      const activeSlideEl = containerRef.current.querySelector(`.hero-slide-wrapper-${activeIndex}`);
      if (activeSlideEl) {
        // Elegant GSAP text staggered fade up on active index change, scoped strictly to active slide to prevent layout thrashing
        gsap.fromTo(
          activeSlideEl.querySelectorAll(".hero-text-animate"),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power2.out" }
        );

        // Subtle background zoom on the active slide
        const bgImg = activeSlideEl.querySelector(".hero-slide-bg");
        if (bgImg) {
          gsap.fromTo(
            bgImg,
            { scale: 1.03 },
            { scale: 1, duration: 1.2, ease: "power2.out" }
          );
        }
      }
    }
  }, [activeIndex, isVisible]);

  const handleTabClick = (index) => {
    setActiveIndex(index);
    setProgress(0);
  };

  return (
    <section className="anim-fade-in" ref={containerRef} style={{
      padding: '24px 0 40px 0',
      backgroundColor: 'var(--bg-primary)'
    }}>
      <div className="container">

        {/* Carousel Slide Window */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            position: 'relative',
            borderRadius: '0',
            overflow: 'hidden',
            minHeight: '560px',
            boxShadow: 'var(--shadow-lg)',
            backgroundColor: 'var(--bg-secondary)',
            transition: 'all var(--transition-slow)'
          }}
        >

          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex;

            // Render Slide 3 (Extreme Boxer - Template C)
            if (slide.template === 'C') {
              return (
                <div
                  key={slide.id}
                  className={`hero-slide-wrapper-${idx} ${slide.theme}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: isActive ? 1 : 0,
                    visibility: isActive ? 'visible' : 'hidden',
                    pointerEvents: isActive ? 'auto' : 'none',
                    transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.65s',
                    zIndex: isActive ? 2 : 1,
                    backgroundImage: `url("${slide.image}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingLeft: '8%'
                  }}
                >
                  {/* Naive soft circular background highlight behind text for readability */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '25%',
                    transform: 'translate(-50%, -50%)',
                    width: '750px',
                    height: '750px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(13, 18, 32, 0.7) 0%, rgba(13, 18, 32, 0.3) 45%, transparent 70%)',
                    filter: 'blur(160px)',
                    zIndex: 1,
                    pointerEvents: 'none'
                  }} />

                  {/* Text+CTA block */}
                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    maxWidth: '480px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                  }}>
                    {/* Gold accent bar */}
                    <div style={{ width: '32px', height: '2px', backgroundColor: 'var(--gold)', marginBottom: '28px', opacity: 0.7 }} />

                    <h1 className="hero-text-animate hero-headline" style={{ color: '#ffffff', fontSize: '86px', lineHeight: '0.82' }}>
                      {slide.headline.split(':')[0]}
                      <span className="hero-text-animate hero-headline-italic" style={{ color: 'var(--gold)', fontSize: '86px', display: 'block', marginBottom: '24px', lineHeight: '0.82' }}>
                        {slide.headline.split(':')[1]?.trim() || slide.headline}
                      </span>
                    </h1>

                    <p className="hero-text-animate" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', marginBottom: '44px', lineHeight: '1.75', maxWidth: '34ch', letterSpacing: '0.01em' }}>
                      {slide.description}
                    </p>

                    <div className="hero-text-animate">
                      <button
                        onClick={() => {
                          setActiveCategory(slide.buttonCategory);
                          document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="plain-rect-btn"
                      >
                        <span style={{ position: 'relative', zIndex: 1 }}>{slide.buttonText}</span>
                        <svg className="cta-arrow" style={{ position: 'relative', zIndex: 1 }} width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="1" y1="5" x2="13" y2="5" />
                          <polyline points="9 1 13 5 9 9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // Render all other templates (A & B: Slides 1, 2, 4, 5) with full-bleed image + floating glassmorphic card
            const isValentines = slide.theme === 'theme-valentines';

            return (
              <div
                key={slide.id}
                className={`hero-slide-wrapper-${idx} ${slide.theme}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: isActive ? 1 : 0,
                  visibility: isActive ? 'visible' : 'hidden',
                  pointerEvents: isActive ? 'auto' : 'none',
                  transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.65s',
                  zIndex: isActive ? 2 : 1
                }}
              >
                {/* 100% Full-Bleed Image Background - NO GRADIENT OVERLAY */}
                <div
                  className="hero-slide-bg"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url("${slide.image}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 1,
                    willChange: 'transform'
                  }}
                />

                {/* Self-aligning flex container for left or right floating cards */}
                <div className={`hero-slide-content-container ${slide.template === 'B' ? 'align-right' : 'align-left'}`}>
                  {/* Floating Glassmorphic Atelier Card */}
                  <div
                    className={`hero-glass-card hero-glass-card-template-${slide.template.toLowerCase()} hero-text-animate ${isValentines
                        ? 'hero-glass-card-dark-valentines'
                        : 'hero-glass-card-light'
                      }`}
                    style={{
                      padding: '48px 56px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      textAlign: 'left'
                    }}
                  >
                    <h1 className="hero-text-animate hero-headline" style={{
                      color: isValentines ? '#ffffff' : 'var(--text-primary)',
                      fontSize: '56px'
                    }}>
                      {slide.headline.split(':')[0]}
                      <span
                        className="hero-headline-italic"
                        style={{
                          color: isValentines ? '#FF4D4D' : 'var(--accent)',
                          fontSize: '56px'
                        }}
                      >
                        {slide.headline.split(':')[1] || slide.headline}
                      </span>
                    </h1>

                    <p className="hero-text-animate" style={{
                      fontSize: '15px',
                      color: isValentines ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-secondary)',
                      marginBottom: slide.isCountdown ? '20px' : '36px',
                      lineHeight: '1.6',
                      maxWidth: '42ch'
                    }}>
                      {slide.description}
                    </p>

                    {slide.isCountdown && (
                      <div className="hero-text-animate countdown-container" style={{
                        display: 'flex',
                        gap: '10px',
                        marginBottom: '28px',
                        alignItems: 'center'
                      }}>
                        <div className="countdown-pill" style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(255, 45, 85, 0.1)',
                          border: '1.2px solid rgba(255, 45, 85, 0.35)',
                          borderRadius: '12px',
                          padding: '8px 12px',
                          minWidth: '56px',
                          boxShadow: '0 4px 12px rgba(255, 45, 85, 0.05)'
                        }}>
                          <span className="countdown-value" style={{
                            fontFamily: 'monospace',
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#FF4D4D',
                            lineHeight: '1.2'
                          }}>{time.days}</span>
                          <span className="countdown-label" style={{
                            fontSize: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'rgba(255, 255, 255, 0.6)',
                            marginTop: '2px'
                          }}>Gün</span>
                        </div>

                        <div className="countdown-colon" style={{ fontSize: '16px', fontWeight: '700', color: 'rgba(255, 255, 255, 0.4)' }}>:</div>

                        <div className="countdown-pill" style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(255, 45, 85, 0.1)',
                          border: '1.2px solid rgba(255, 45, 85, 0.35)',
                          borderRadius: '12px',
                          padding: '8px 12px',
                          minWidth: '56px',
                          boxShadow: '0 4px 12px rgba(255, 45, 85, 0.05)'
                        }}>
                          <span className="countdown-value" style={{
                            fontFamily: 'monospace',
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#FF4D4D',
                            lineHeight: '1.2'
                          }}>{String(time.hours).padStart(2, '0')}</span>
                          <span className="countdown-label" style={{
                            fontSize: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'rgba(255, 255, 255, 0.6)',
                            marginTop: '2px'
                          }}>Saat</span>
                        </div>

                        <div className="countdown-colon" style={{ fontSize: '16px', fontWeight: '700', color: 'rgba(255, 255, 255, 0.4)' }}>:</div>

                        <div className="countdown-pill" style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(255, 45, 85, 0.1)',
                          border: '1.2px solid rgba(255, 45, 85, 0.35)',
                          borderRadius: '12px',
                          padding: '8px 12px',
                          minWidth: '56px',
                          boxShadow: '0 4px 12px rgba(255, 45, 85, 0.05)'
                        }}>
                          <span className="countdown-value" style={{
                            fontFamily: 'monospace',
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#FF4D4D',
                            lineHeight: '1.2'
                          }}>{String(time.minutes).padStart(2, '0')}</span>
                          <span className="countdown-label" style={{
                            fontSize: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'rgba(255, 255, 255, 0.6)',
                            marginTop: '2px'
                          }}>Dk</span>
                        </div>

                        <div className="countdown-colon" style={{ fontSize: '16px', fontWeight: '700', color: 'rgba(255, 255, 255, 0.4)' }}>:</div>

                        <div className="countdown-pill" style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(255, 45, 85, 0.1)',
                          border: '1.2px solid rgba(255, 45, 85, 0.35)',
                          borderRadius: '12px',
                          padding: '8px 12px',
                          minWidth: '56px',
                          boxShadow: '0 4px 12px rgba(255, 45, 85, 0.05)'
                        }}>
                          <span className="countdown-value" style={{
                            fontFamily: 'monospace',
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#FF4D4D',
                            lineHeight: '1.2'
                          }}>{String(time.seconds).padStart(2, '0')}</span>
                          <span className="countdown-label" style={{
                            fontSize: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'rgba(255, 255, 255, 0.6)',
                            marginTop: '2px'
                          }}>Sn</span>
                        </div>
                      </div>
                    )}

                    <div className="hero-text-animate" style={{ display: 'flex', marginBottom: '8px', padding: '4px' }}>
                      {slide.template === 'A' ? (
                        <button
                          onClick={() => {
                            const target = document.getElementById(slide.buttonText.includes('Paket') ? 'bundle-builder-section' : 'catalog-section');
                            if (target) {
                              target.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="ornate-cta-btn"
                        >
                          <OrnateBorderA id={slide.id} />

                          <span style={{ position: 'relative', zIndex: 1 }}>{slide.buttonText}</span>
                          <svg className="cta-arrow" style={{ position: 'relative', zIndex: 1 }} width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="1" y1="5" x2="13" y2="5" />
                            <polyline points="9 1 13 5 9 9" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const target = document.getElementById(slide.buttonText.includes('Paket') ? 'bundle-builder-section' : 'catalog-section');
                            if (target) {
                              target.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="ornate-scroll-btn"
                        >
                          <OrnateBorderB id={slide.id} />

                          <span style={{ position: 'relative', zIndex: 1 }}>{slide.buttonText}</span>
                          <svg className="cta-arrow" style={{ position: 'relative', zIndex: 1 }} width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="1" y1="5" x2="13" y2="5" />
                            <polyline points="9 1 13 5 9 9" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp/Instagram Story-Style Progress Pill Tabs */}
        <div style={{ marginTop: '24px' }}>
          <div 
            className="story-pills-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {slides.map((slide, idx) => {
              const isActive = idx === activeIndex;
              const isFilled = idx < activeIndex;

              return (
                <button
                  key={slide.id}
                  className={`story-pill-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleTabClick(idx)}
                >
                  <div className="story-pill-track">
                    <div
                      className={`story-pill-fill ${isActive ? 'active' : ''} ${isFilled ? 'filled' : ''}`}
                      style={{
                        width: isActive ? `${progress}%` : (isFilled ? '100%' : '0%'),
                        transition: isActive ? 'none' : 'width 0.2s ease-out'
                      }}
                    />
                  </div>
                  <span className="story-pill-title">
                    {slide.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
