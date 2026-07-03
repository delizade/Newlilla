import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { gsap } from 'gsap';
import { products } from './data/products';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import Footer from './components/Footer';
import FitFinderModal from './components/FitFinderModal';
import BundleTray from './components/BundleTray';
import LoginModal from './components/LoginModal';
import CategoryCard from './components/CategoryCard';
// Helper to prevent ragged lines / orphan words (like short IDs in parenthesis) wrapping alone
const formatProductNameForTitle = (name) => {
  if (!name) return '';
  const words = name.split(' ');
  if (words.length <= 3) return name;
  const lastThree = words.slice(-3).join('\u00a0');
  const remainder = words.slice(0, -3).join(' ');
  return `${remainder} ${lastThree}`;
};

function App() {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isFitFinderOpen, setIsFitFinderOpen] = useState(false);
  const [fitRecommendation, setFitRecommendation] = useState(null);
  const [bundleItems, setBundleItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const [currentEditorialPage, setCurrentEditorialPage] = useState(0);
  const editorialGridRef = useRef(null);

  const editorialSets = [
    {
      star: '777-bustiyer',
      rows: [
        { id: 'erkek-6li-diamond', catName: 'Erkek Koleksiyonu' },
        { id: '10001-seven-days', catName: 'Kadın Koleksiyonu' },
        { id: '107-child-days', catName: 'Çocuk Koleksiyonu' }
      ]
    },
    {
      star: '308-lazer-bato-paketi',
      rows: [
        { id: 'erkek-siyah-3li', catName: 'Erkek Koleksiyonu' },
        { id: '1018-bato-3lu', catName: 'Kadın Koleksiyonu' },
        { id: '120-kalpli-cocuk', catName: 'Çocuk Koleksiyonu' }
      ]
    },
    {
      star: 'erkek-6li-diamond',
      rows: [
        { id: '308-lazer-bato-paketi', catName: 'Kadın Koleksiyonu' },
        { id: '777-bustiyer', catName: 'Kadın Koleksiyonu' },
        { id: '1018-bato-3lu', catName: 'Kadın Koleksiyonu' }
      ]
    },
    {
      star: '10001-seven-days',
      rows: [
        { id: '107-child-days', catName: 'Çocuk Koleksiyonu' },
        { id: 'erkek-siyah-3li', catName: 'Erkek Koleksiyonu' },
        { id: '120-kalpli-cocuk', catName: 'Çocuk Koleksiyonu' }
      ]
    }
  ];

  const isTransitioningRef = useRef(false);

  const triggerEditorialTransition = (nextPage = null) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const targetPage = nextPage !== null ? nextPage : (currentEditorialPage === 3 ? 0 : currentEditorialPage + 1);

    const tl = gsap.timeline({
      onComplete: () => {
        // Swap the page state instantly using flushSync to force synchronous DOM update!
        flushSync(() => {
          setCurrentEditorialPage(targetPage);
        });

        // Reset positions immediately in the same repaint frame after DOM has updated
        gsap.set('.star-inner-wrapper', { y: '0%' });
        gsap.set('.star-next-inner-wrapper', { y: '100%' });
        gsap.set('.row-inner-wrapper-0', { y: '0%' });
        gsap.set('.row-next-inner-wrapper-0', { y: '100%' });
        gsap.set('.row-inner-wrapper-1', { y: '0%' });
        gsap.set('.row-next-inner-wrapper-1', { y: '100%' });
        gsap.set('.row-inner-wrapper-2', { y: '0%' });
        gsap.set('.row-next-inner-wrapper-2', { y: '100%' });

        isTransitioningRef.current = false;
      }
    });

    // Staggered continuous slide-up push (moving the current up and next up in lock-step)
    // Left Star Card: starts at 0.0s
    tl.to('.star-inner-wrapper', { y: '-100%', duration: 0.65, ease: 'power2.inOut' }, 0);
    tl.to('.star-next-inner-wrapper', { y: '0%', duration: 0.65, ease: 'power2.inOut' }, 0);

    // Row 0: starts at 0.2s
    tl.to('.row-inner-wrapper-0', { y: '-100%', duration: 0.65, ease: 'power2.inOut' }, 0.2);
    tl.to('.row-next-inner-wrapper-0', { y: '0%', duration: 0.65, ease: 'power2.inOut' }, 0.2);

    // Row 1: starts at 0.3s
    tl.to('.row-inner-wrapper-1', { y: '-100%', duration: 0.65, ease: 'power2.inOut' }, 0.3);
    tl.to('.row-next-inner-wrapper-1', { y: '0%', duration: 0.65, ease: 'power2.inOut' }, 0.3);

    // Row 2: starts at 0.4s
    tl.to('.row-inner-wrapper-2', { y: '-100%', duration: 0.65, ease: 'power2.inOut' }, 0.4);
    tl.to('.row-next-inner-wrapper-2', { y: '0%', duration: 0.65, ease: 'power2.inOut' }, 0.4);
  };

  // 5-second automatic cycle interval
  useEffect(() => {
    const interval = setInterval(() => {
      triggerEditorialTransition();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentEditorialPage]);

  // Make sure the next wrappers have their initial positions set on mount
  useEffect(() => {
    gsap.set('.star-next-inner-wrapper', { y: '100%' });
    gsap.set('.row-next-inner-wrapper-0', { y: '100%' });
    gsap.set('.row-next-inner-wrapper-1', { y: '100%' });
    gsap.set('.row-next-inner-wrapper-2', { y: '100%' });
  }, []);


  const mainContainerRef = useRef(null);

  useEffect(() => {
    if (mainContainerRef.current) {
      // Stagger entrance transitions for category cards
      gsap.fromTo(
        mainContainerRef.current.querySelectorAll('.tactile-category-card'),
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.15, ease: 'power2.out', delay: 0.1 }
      );

      // Stagger entrance transitions for weekly star grids
      gsap.fromTo(
        mainContainerRef.current.querySelectorAll('.editorial-star-card, .editorial-row-card'),
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.15, ease: 'power2.out', delay: 0.3 }
      );

      // Stagger entrance transitions for sensory storytelling section
      gsap.fromTo(
        mainContainerRef.current.querySelectorAll('.sensory-card'),
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.15, ease: 'power2.out', delay: 0.5 }
      );
    }
  }, []);

  // Cart operations
  const handleAddToCart = (product, options = null) => {
    // If no variations are specified (e.g. quick add from grid), use defaults
    const selectedColor = options?.selectedColor || product.colors[0];
    const selectedSize = options?.selectedSize || product.sizes[0];
    const quantity = options?.quantity || 1;

    const cartId = `${product.id}-${selectedColor.name}-${selectedSize}`;

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.cartId === cartId);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            ...product,
            cartId,
            selectedColor,
            selectedSize,
            quantity
          }
        ];
      }
    });

    // Automatically slide cart drawer open for dynamic interaction feedback
    setIsCartOpen(true);
  };

  const handleUpdateQty = (cartId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (cartId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Bundle operations
  const handleAddToBundle = (product, options = null) => {
    if (bundleItems.length >= 7) {
      alert("Kendi paketiniz maksimum 7 ürün içerebilir. Sepete ekleyip yeni bir paket tasarlamaya başlayabilirsiniz!");
      return;
    }
    const selectedColor = options?.selectedColor || product.colors[0];
    const selectedSize = options?.selectedSize || product.sizes[0];
    const bundleId = `${product.id}-${selectedColor.name}-${selectedSize}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    setBundleItems((prev) => [
      ...prev,
      {
        ...product,
        bundleId,
        selectedColor,
        selectedSize
      }
    ]);
  };

  const handleRemoveFromBundle = (bundleId) => {
    setBundleItems((prev) => prev.filter((item) => item.bundleId !== bundleId));
  };

  const handleClearBundle = () => {
    setBundleItems([]);
  };

  const handleAddBundleToCart = (discountPercent) => {
    setCartItems((prevItems) => {
      let updatedItems = [...prevItems];
      bundleItems.forEach((bundleItem) => {
        // Apply bundle discount directly on the item price!
        const discountedPrice = Math.round(bundleItem.price * (1 - discountPercent / 100) * 100) / 100;

        // Cart entry identification
        const cartId = `${bundleItem.id}-${bundleItem.selectedColor.name}-${bundleItem.selectedSize}-bundle`;
        const existingItemIndex = updatedItems.findIndex((item) => item.cartId === cartId);

        if (existingItemIndex > -1) {
          updatedItems[existingItemIndex].quantity += 1;
        } else {
          updatedItems.push({
            ...bundleItem,
            name: `${bundleItem.name} (Paket İndirimli %${discountPercent})`,
            price: discountedPrice,
            cartId,
            quantity: 1
          });
        }
      });
      return updatedItems;
    });

    setBundleItems([]);
    setIsCartOpen(true);
  };

  // Lilla AI recommendation helper
  const isProductRecommended = (product) => {
    if (!fitRecommendation) return false;

    // Check size match
    if (!product.sizes.includes(fitRecommendation.size)) return false;

    // Check fabric keyword match
    let matchesFabric = false;
    const textToSearch = `${product.name} ${product.subCategory} ${product.description} ${product.category}`.toLowerCase();
    if (fitRecommendation.fabric === 'cotton') {
      matchesFabric = textToSearch.includes('pamuk') || textToSearch.includes('penye') || textToSearch.includes('organik');
    } else if (fitRecommendation.fabric === 'seamless') {
      matchesFabric = textToSearch.includes('lazer') || textToSearch.includes('dikişsiz') || textToSearch.includes('iz yapmaz');
    } else if (fitRecommendation.fabric === 'modal') {
      matchesFabric = textToSearch.includes('modal') || textToSearch.includes('ipek') || textToSearch.includes('lüks');
    }

    // Check style/waist match
    let matchesWaist = false;
    if (fitRecommendation.waist === 'high') {
      matchesWaist = textToSearch.includes('yüksek bel') || textToSearch.includes('bato') || textToSearch.includes('toparlayıcı') || textToSearch.includes('klasik');
    } else if (fitRecommendation.waist === 'mid') {
      matchesWaist = textToSearch.includes('orta bel') || textToSearch.includes('slip') || textToSearch.includes('boxer') || textToSearch.includes('şort külot');
    } else if (fitRecommendation.waist === 'low') {
      matchesWaist = textToSearch.includes('askılı') || textToSearch.includes('büstiyer') || textToSearch.includes('crop') || textToSearch.includes('düşük bel');
    }

    return matchesFabric || matchesWaist;
  };

  // Filter products by category, search queries, and AI recommended size stock
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'Tümü' || product.category === activeCategory;

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.subCategory.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower);

    // If Fit Finder AI recommended a size, only show products that have that size in stock!
    const matchesRecommendation = !fitRecommendation || product.sizes.includes(fitRecommendation.size);

    return matchesCategory && matchesSearch && matchesRecommendation;
  });

  return (
    <div ref={mainContainerRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Dynamic Top Announcement Promo Bar */}
      <div style={{
        background: 'linear-gradient(90deg, var(--accent) 0%, var(--primary) 100%)',
        color: '#fff',
        fontSize: '11px',
        fontWeight: '600',
        padding: '10px 24px',
        textAlign: 'center',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
        fontFamily: 'var(--font-sans)'
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <svg style={{ width: '13px', height: '13px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4', marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} viewBox="0 0 24 24">
            <rect x="3" y="8" width="18" height="4" rx="1" />
            <path d="M12 8V4H8" />
            <path d="M12 4h4" />
            <path d="M7 12v7c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-7" />
          </svg>
          Yeni Sezon Ürünlerde İlk Alışverişe Özel Sepette %10 İndirim!
        </span>
        <span style={{ display: 'inline-block', width: '4px', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: '50%' }} />
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <svg style={{ width: '15px', height: '15px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4', marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} viewBox="0 0 24 24">
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          1500 TL Üzeri Ücretsiz Kargo
        </span>
      </div>

      {/* Header component */}
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        setIsCartOpen={setIsCartOpen}
        currentUser={currentUser}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Hero component */}
      <Hero setActiveCategory={setActiveCategory} />

      {/* Category Grid Showcase (Circular Premium Redesign) */}
      <section style={{ position: 'relative', padding: '56px 0 28px 0', backgroundColor: 'var(--bg-primary)', overflow: 'hidden' }}>

        {/* Left Naive Botanical Illustration */}
        <div className="naive-illustration-left" style={{
          position: 'absolute',
          left: '3%',
          top: '55%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          <svg width="150" height="280" viewBox="0 0 150 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,260 C35,220 50,165 45,100 C43,80 35,45 25,25" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" opacity="0.25" />
            <path d="M45,100 C68,100 82,78 90,64 C75,71 60,84 45,100 Z" fill="none" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" opacity="0.2" />
            <path d="M43,132 C68,139 79,125 84,110 C68,113 56,120 43,132 Z" fill="none" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" opacity="0.2" />
            <path d="M46,168 C73,182 84,168 86,155 C70,158 59,162 46,168 Z" fill="none" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" opacity="0.2" />
            <path d="M41,110 C18,110 9,92 5,78 C18,85 31,96 41,110 Z" fill="none" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" opacity="0.2" />
            <path d="M39,153 C14,160 5,142 2,126 C15,133 28,142 39,153 Z" fill="none" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" opacity="0.2" />
          </svg>
        </div>

        {/* Right Naive Botanical Illustration */}
        <div className="naive-illustration-right" style={{
          position: 'absolute',
          right: '3%',
          top: '55%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          <svg width="150" height="280" viewBox="0 0 150 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M140,260 C115,220 100,165 105,100 C107,80 115,45 125,25" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" opacity="0.25" />
            <path d="M125,25 C115,23 105,29 101,43 C112,43 120,34 125,25 Z" fill="none" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" opacity="0.2" />
            <path d="M125,25 C132,27 142,32 139,46 C128,44 125,35 125,25 Z" fill="none" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" opacity="0.2" />
            <path d="M105,100 C80,100 66,78 58,64 C73,71 88,84 105,100 Z" fill="none" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" opacity="0.2" />
            <path d="M104,136 C79,143 68,129 63,114 C79,117 91,124 104,136 Z" fill="none" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" opacity="0.2" />
            <path d="M107,110 C130,110 139,92 143,78 C130,85 117,96 107,110 Z" fill="none" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" opacity="0.2" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="serif-font" style={{ fontSize: '20px', color: 'var(--primary)', letterSpacing: '0.5px' }}>Koleksiyonları Keşfet</span>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginTop: '6px' }}>Seçkin Koleksiyonlarımız</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Beden ve konfor tercihinize uygun en seçkin tasarımlarımızı inceleyin.
            </p>
          </div>

          <div className="category-circular-row">
            {/* Kadin card */}
            <CategoryCard
              title="KADIN"
              image="assets/cat_kadin_circle.png"
              onClick={() => {
                setActiveCategory('Kadın');
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Çocuk card */}
            <CategoryCard
              title="ÇOCUK"
              image="assets/cat_cocuk_circle.png"
              onClick={() => {
                setActiveCategory('Çocuk');
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Erkek card */}
            <CategoryCard
              title="ERKEK"
              image="assets/cat_erkek_circle_new.png"
              onClick={() => {
                setActiveCategory('Erkek');
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      </section>

      {/* Asymmetric Haftanın Ürünleri (1x2 Layout) */}
      <section style={{ padding: '36px 0 48px 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '32px',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '16px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ textAlign: 'left' }}>
              <span className="serif-font" style={{ fontSize: '18px', color: 'var(--primary)' }}>Haftanın Yıldızları</span>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginTop: '4px' }}>Editörün Seçtiği Haftanın Ürünleri</h2>
            </div>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>
              Sezonun En Çok Satan Premium Ürünleri 5 Saniyede Bir Otomatik Olarak Güncellenir
            </span>
          </div>

          <div ref={editorialGridRef} className="editorial-grid-1x2">
            {/* Left Side: 1x Tall Star Showcase Product */}
            {(() => {
              const activeSet = editorialSets[currentEditorialPage];
              const nextSet = editorialSets[(currentEditorialPage + 1) % editorialSets.length];

              const starProd = products.find(p => p.id === activeSet.star);
              const nextStarProd = products.find(p => p.id === nextSet.star);
              if (!starProd || !nextStarProd) return null;

              return (
                <div className="editorial-star-card" style={{ position: 'relative', overflow: 'hidden', height: '468px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-naive)', boxShadow: 'var(--shadow-sm)' }}>

                  {/* Current Active Product Wrapper */}
                  <div className="star-inner-wrapper" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
                      <img src={starProd.image} alt={starProd.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }} className="tactile-category-image" />
                    </div>
                    <span className="badge badge-accent" style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'var(--accent)', color: '#fff', boxShadow: 'var(--shadow-sm)', zIndex: 3 }}>Haftanın Yıldızı</span>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '24%', background: 'linear-gradient(to top, rgba(10, 8, 14, 0.85) 0%, rgba(10, 8, 14, 0.3) 50%, rgba(10, 8, 14, 0) 100%)', zIndex: 2, pointerEvents: 'none' }} />

                    {/* Title & Price on Left, Elegant Incele Button on Right */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
                      <div style={{ textAlign: 'left', flex: 1 }}>
                        <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.3)', marginBottom: '6px', lineHeight: '1.2', fontFamily: 'var(--font-serif)', textWrap: 'balance' }}>{formatProductNameForTitle(starProd.name)}</h3>
                        <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--gold)', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>₺ {starProd.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <button
                        onClick={() => setQuickViewProduct(starProd)}
                        className="star-card-incele-btn"
                        style={{
                          padding: '12px 24px',
                          fontSize: '12px',
                          fontWeight: '600',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          color: '#fff',
                          backdropFilter: 'blur(8px)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      >
                        <span>İncele</span>
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }} className="star-arrow">
                          <line x1="1" y1="5" x2="13" y2="5" />
                          <polyline points="9 1 13 5 9 9" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Next Product Wrapper - Positioned at y: 100% */}
                  <div className="star-next-inner-wrapper" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'translateY(100%)' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
                      <img src={nextStarProd.image} alt={nextStarProd.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }} className="tactile-category-image" />
                    </div>
                    <span className="badge badge-accent" style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'var(--accent)', color: '#fff', boxShadow: 'var(--shadow-sm)', zIndex: 3 }}>Haftanın Yıldızı</span>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '24%', background: 'linear-gradient(to top, rgba(10, 8, 14, 0.85) 0%, rgba(10, 8, 14, 0.3) 50%, rgba(10, 8, 14, 0) 100%)', zIndex: 2, pointerEvents: 'none' }} />

                    {/* Title & Price on Left, Elegant Incele Button on Right */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
                      <div style={{ textAlign: 'left', flex: 1 }}>
                        <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.3)', marginBottom: '6px', lineHeight: '1.2', fontFamily: 'var(--font-serif)', textWrap: 'balance' }}>{formatProductNameForTitle(nextStarProd.name)}</h3>
                        <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--gold)', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>₺ {nextStarProd.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <button
                        onClick={() => setQuickViewProduct(nextStarProd)}
                        className="star-card-incele-btn"
                        style={{
                          padding: '12px 24px',
                          fontSize: '12px',
                          fontWeight: '600',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          color: '#fff',
                          backdropFilter: 'blur(8px)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      >
                        <span>İncele</span>
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }} className="star-arrow">
                          <line x1="1" y1="5" x2="13" y2="5" />
                          <polyline points="9 1 13 5 9 9" />
                        </svg>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })()}

            {/* Right Side: 3x Stacked Horizontal Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(() => {
                const activeSet = editorialSets[currentEditorialPage];
                const nextSet = editorialSets[(currentEditorialPage + 1) % editorialSets.length];
                return activeSet.rows.map((item, index) => {
                  const prod = products.find(p => p.id === item.id);
                  const nextItem = nextSet.rows[index];
                  const nextProd = products.find(p => p.id === nextItem.id);
                  if (!prod || !nextProd) return null;
                  return (
                    <div key={index} className="editorial-row-card" style={{ display: 'flex', height: '152px', position: 'relative', overflow: 'hidden' }}>

                      {/* Current Active Product Wrapper */}
                      <div className={`row-inner-wrapper-${index}`} style={{ display: 'flex', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                        <div style={{ flexGrow: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', position: 'relative' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.catName}</span>
                            <h4 style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: 'var(--text-primary)',
                              margin: 0,
                              maxWidth: '240px',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              lineHeight: '1.4',
                              height: '40px'
                            }}>{formatProductNameForTitle(prod.name)}</h4>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary-dark)', display: 'block', marginTop: '2px' }}>₺ {prod.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
                          </div>
                          <button
                            onClick={() => setQuickViewProduct(prod)}
                            className="editorial-row-btn"
                            style={{
                              alignSelf: 'flex-start',
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              color: 'var(--primary)',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              transition: 'color var(--transition-fast)'
                            }}
                          >
                            <span>İncele</span>
                            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }} className="row-arrow">
                              <line x1="1" y1="5" x2="13" y2="5" />
                              <polyline points="9 1 13 5 9 9" />
                            </svg>
                          </button>
                        </div>
                        <div style={{ width: '152px', height: '100%', flexShrink: 0, backgroundColor: 'var(--bg-secondary)', overflow: 'hidden', position: 'relative' }}>
                          <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }} className="tactile-category-image" />
                        </div>
                      </div>

                      {/* Next Product Wrapper - Positioned at y: 100% */}
                      <div className={`row-next-inner-wrapper-${index}`} style={{ display: 'flex', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, transform: 'translateY(100%)' }}>
                        <div style={{ flexGrow: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', position: 'relative' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{nextItem.catName}</span>
                            <h4 style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: 'var(--text-primary)',
                              margin: 0,
                              maxWidth: '240px',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              lineHeight: '1.4',
                              height: '40px'
                            }}>{formatProductNameForTitle(nextProd.name)}</h4>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary-dark)', display: 'block', marginTop: '2px' }}>₺ {nextProd.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
                          </div>
                          <button
                            onClick={() => setQuickViewProduct(nextProd)}
                            className="editorial-row-btn"
                            style={{
                              alignSelf: 'flex-start',
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              color: 'var(--primary)',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              transition: 'color var(--transition-fast)'
                            }}
                          >
                            <span>İncele</span>
                            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }} className="row-arrow">
                              <line x1="1" y1="5" x2="13" y2="5" />
                              <polyline points="9 1 13 5 9 9" />
                            </svg>
                          </button>
                        </div>
                        <div style={{ width: '152px', height: '100%', flexShrink: 0, backgroundColor: 'var(--bg-secondary)', overflow: 'hidden', position: 'relative' }}>
                          <img src={nextProd.image} alt={nextProd.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }} className="tactile-category-image" />
                        </div>
                      </div>

                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </section>


      {/* Main Catalog Section */}
      <main id="catalog-section" style={{ padding: '48px 0', flexGrow: 1, backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">

          {/* Beden & Stil Sihirbazı Recommendation Banner */}
          {fitRecommendation && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 24px',
              background: 'linear-gradient(135deg, var(--primary-light) 0%, rgba(250, 249, 246, 0.95) 100%)',
              border: '1px solid var(--primary)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '24px',
              animation: 'fadeIn 0.3s ease-out',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg style={{ width: '20px', height: '20px', fill: 'var(--accent)', flexShrink: 0 }} viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z" />
                </svg>
                <div>
                  <strong style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>Beden & Stil Sihirbazı Filtresi Aktif</strong>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Sadece {fitRecommendation.text} özelliklerine ve kalıplarına uyan modeller gösteriliyor.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFitRecommendation(null)}
                style={{
                  background: 'none',
                  border: '1px solid var(--primary)',
                  color: 'var(--primary-dark)',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 16px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--primary-dark)';
                }}
              >
                Kişiselleştirmeyi Kaldır &times;
              </button>
            </div>
          )}

          {searchQuery ? (
            /* Search results mode */
            <>
              {/* Header Row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '36px',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '16px',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', textAlign: 'left' }}>
                  Arama Sonuçları
                  <span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--text-secondary)', marginLeft: '12px' }}>
                    "{searchQuery}" için sonuçlar
                  </span>
                </h2>

                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                  Toplam {filteredProducts.length} model listeleniyor
                </span>
              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '30px'
                }}>
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onQuickView={setQuickViewProduct}
                      onAddToBundle={handleAddToBundle}
                      isRecommended={isProductRecommended(product)}
                    />
                  ))}
                </div>
              ) : (
                /* No Results fallback state */
                <div style={{
                  padding: '80px 24px',
                  textAlign: 'center',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 0,
                  border: '1px solid var(--border-naive)',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                  <svg style={{ width: '40px', height: '40px', stroke: 'var(--text-muted)', strokeWidth: 1.4, fill: 'none', display: 'block', margin: '0 auto 20px auto' }} viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Aradığınız Ürün Bulunamadı
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', padding: '0 24px' }}>
                    Lütfen arama teriminizi kontrol edin veya filtrelerden diğer harika kategorilerimizi seçmeyi deneyin.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('Tümü');
                    }}
                    className="btn btn-primary"
                    style={{ padding: '10px 24px', fontSize: '12px' }}
                  >
                    Filtreleri Sıfırla
                  </button>

                  <div style={{ marginTop: '28px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>
                      Önerilen Aramalar:
                    </span>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', padding: '0 24px' }}>
                      {['Büstiyer', 'Boxer', 'Dikişsiz', 'Pamuklu', 'Elite', 'Külot'].map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchQuery(term);
                            setActiveCategory('Tümü');
                          }}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)',
                            fontSize: '12px',
                            cursor: 'pointer',
                            transition: 'all var(--transition-fast)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--primary-light)';
                            e.currentTarget.style.color = 'var(--primary-dark)';
                            e.currentTarget.style.borderColor = 'var(--primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                          }}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Default: Concurrent Kadın, Çocuk, Erkek Koleksiyonları */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
              {/* Kadın Koleksiyonu Section */}
              {(() => {
                const wProducts = products.filter(p => p.category === 'Kadın' && (!fitRecommendation || p.sizes.includes(fitRecommendation.size))).slice(0, 4);
                if (wProducts.length === 0) return null;
                return (
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '24px',
                      borderBottom: '1px solid var(--border-color)',
                      paddingBottom: '12px'
                    }}>
                      <h2 style={{ fontSize: '24px', fontWeight: '600', textAlign: 'left' }}>
                        Kadın Koleksiyonu
                      </h2>
                      <button
                        onClick={() => {
                          setSearchQuery('Kadın');
                          document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary)',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: 0,
                          transition: 'color var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--primary-dark)';
                          e.currentTarget.style.textDecoration = 'underline';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--primary)';
                          e.currentTarget.style.textDecoration = 'none';
                        }}
                      >
                        <span>Tümünü Gör</span>
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="1" y1="5" x2="13" y2="5" />
                          <polyline points="9 1 13 5 9 9" />
                        </svg>
                      </button>
                    </div>
                    <div className="collection-row-grid">
                      {wProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                          onQuickView={setQuickViewProduct}
                          onAddToBundle={handleAddToBundle}
                          isRecommended={isProductRecommended(product)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Çocuk Koleksiyonu Section */}
              {(() => {
                const cProducts = products.filter(p => p.category === 'Çocuk' && (!fitRecommendation || p.sizes.includes(fitRecommendation.size))).slice(0, 4);
                if (cProducts.length === 0) return null;
                return (
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '24px',
                      borderBottom: '1px solid var(--border-color)',
                      paddingBottom: '12px'
                    }}>
                      <h2 style={{ fontSize: '24px', fontWeight: '600', textAlign: 'left' }}>
                        Çocuk Koleksiyonu
                      </h2>
                      <button
                        onClick={() => {
                          setSearchQuery('Çocuk');
                          document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary)',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: 0,
                          transition: 'color var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--primary-dark)';
                          e.currentTarget.style.textDecoration = 'underline';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--primary)';
                          e.currentTarget.style.textDecoration = 'none';
                        }}
                      >
                        <span>Tümünü Gör</span>
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="1" y1="5" x2="13" y2="5" />
                          <polyline points="9 1 13 5 9 9" />
                        </svg>
                      </button>
                    </div>
                    <div className="collection-row-grid">
                      {cProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                          onQuickView={setQuickViewProduct}
                          onAddToBundle={handleAddToBundle}
                          isRecommended={isProductRecommended(product)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Erkek Koleksiyonu Section */}
              {(() => {
                const mProducts = products.filter(p => p.category === 'Erkek' && (!fitRecommendation || p.sizes.includes(fitRecommendation.size))).slice(0, 4);
                if (mProducts.length === 0) return null;
                return (
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '24px',
                      borderBottom: '1px solid var(--border-color)',
                      paddingBottom: '12px'
                    }}>
                      <h2 style={{ fontSize: '24px', fontWeight: '600', textAlign: 'left' }}>
                        Erkek Koleksiyonu
                      </h2>
                      <button
                        onClick={() => {
                          setSearchQuery('Erkek');
                          document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary)',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: 0,
                          transition: 'color var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--primary-dark)';
                          e.currentTarget.style.textDecoration = 'underline';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--primary)';
                          e.currentTarget.style.textDecoration = 'none';
                        }}
                      >
                        <span>Tümünü Gör</span>
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="1" y1="5" x2="13" y2="5" />
                          <polyline points="9 1 13 5 9 9" />
                        </svg>
                      </button>
                    </div>
                    <div className="collection-row-grid">
                      {mProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                          onQuickView={setQuickViewProduct}
                          onAddToBundle={handleAddToBundle}
                          isRecommended={isProductRecommended(product)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

        </div>
      </main>

      {/* Floating Beden Sihirbazı button */}
      <button
        className="lilla-ai-btn"
        onClick={() => setIsFitFinderOpen(true)}
      >
        <svg style={{ width: '12px', height: '12px', fill: 'currentColor', marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} viewBox="0 0 24 24">
          <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z" />
        </svg>
        <span>Bedenini Bul</span>
      </button>

      {/* Cart Drawer sliding sidebar overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Quick View detailed overlay Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Fit Finder AI Dialog Wizard */}
      <FitFinderModal
        isOpen={isFitFinderOpen}
        onClose={() => setIsFitFinderOpen(false)}
        onSaveRecommendation={(rec) => {
          setFitRecommendation(rec);
          document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Floating bottom Bundle tray */}
      <BundleTray
        bundleItems={bundleItems}
        onRemoveFromBundle={handleRemoveFromBundle}
        onClearBundle={handleClearBundle}
        onAddBundleToCart={handleAddBundleToCart}
      />

      {/* Luxury Sensory Storytelling & Fabric Tech Section */}
      <section className="sensory-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span className="serif-font" style={{ fontSize: '20px', color: 'var(--primary)', letterSpacing: '0.5px' }}>Duyusal Dokunuşlar & Premium Dokular</span>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginTop: '6px' }}>Teninizin Hak Ettiği Lüks Konfor</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '6px', maxWidth: '600px', margin: '6px auto 0 auto' }}>
              Her iplikte ve her dikişte sadece üstün kaliteli kumaş teknolojileri kullanıyoruz.
            </p>
          </div>
          <div className="sensory-grid">
            {/* Card 1: Modal */}
            <div className="sensory-card modal-card">
              <div className="sensory-icon-container" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
                <svg style={{ width: '20px', height: '20px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4', strokeLinecap: 'round', strokeLinejoin: 'round' }} viewBox="0 0 24 24">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9a7 7 0 0 1-9 9z" />
                  <path d="M19 2L9.8 11.2" />
                </svg>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--text-primary)' }}>Premium Modal Dokusu</h3>
              <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)' }}>Kayın Ağacı Liflerinden İpeksi Yumuşaklık</span>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Doğal kayın ağacı elyaflarından üretilen modal iplikler, cildinizle temas ettiği ilk andan itibaren benzersiz bir yumuşaklık hissi sunar. Nefes alabilir dokusuyla terletmez, defalarca yıkansa bile ilk günkü saten pürüzsüzlüğünü korur.
              </p>
            </div>

            {/* Card 2: Seamless */}
            <div className="sensory-card seamless-card">
              <div className="sensory-icon-container" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
                <svg style={{ width: '20px', height: '20px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4', strokeLinecap: 'round', strokeLinejoin: 'round' }} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                </svg>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--text-primary)' }}>Seamless Dikişsizlik</h3>
              <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)' }}>İz Yapmayan Lazer Kesim Teknolojisi</span>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Sıfır dikiş ve özel lazer kesim kenar tasarımı sayesinde en dar kıyafetlerin altından bile asla iz yapmaz. Teninizi ikinci bir cilt gibi saran esnek yapısıyla hareketlerinizi kısıtlamaz, gün boyu yokmuş gibi hissettirir.
              </p>
            </div>

            {/* Card 3: Organic Pamuk */}
            <div className="sensory-card organic-card">
              <div className="sensory-icon-container" style={{ backgroundColor: 'rgba(76, 175, 80, 0.08)', color: 'hsl(120, 25%, 35%)' }}>
                <svg style={{ width: '20px', height: '20px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4', strokeLinecap: 'round', strokeLinejoin: 'round' }} viewBox="0 0 24 24">
                  <path d="M12 22V10" />
                  <path d="M12 10c0-3.3-2.7-6-6-6S4 6.7 4 10c0 4 4 8 8 12" />
                  <path d="M12 10c0-3.3 2.7-6 6-6s8 2.7 8 6c0 4-4 8-8 12" />
                </svg>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--text-primary)' }}>Saf Organik Pamuk</h3>
              <span style={{ fontSize: '11px', color: 'hsl(120, 25%, 35%)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)' }}>Hassas Tenler İçin Kimyasalsız Koruma</span>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Alerjen ve sert kimyasal maddeler barındırmayan, sertifikalı %100 organik pamuk dokularımız. Çocuklarımızın ve hassas ciltlerin güvenle giyebileceği, yüksek emiciliğe ve doğal hava sirkülasyonuna sahip en sahici dokunuş.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Customer Newsletter Banner */}
      <section className="newsletter-immersive-banner">
        <div className="newsletter-immersive-decor" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            maxWidth: '680px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              color: 'var(--primary)',
              fontStyle: 'italic',
              letterSpacing: '0.5px'
            }}>
              NewLilla Privé Club
            </span>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              lineHeight: '1.2'
            }}>
              Ayrıcalıklar Dünyasına Adım Atın
            </h2>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              maxWidth: '520px',
              margin: '0 auto'
            }}>
              Lüks konfor ve dikişsiz zarafetle dolu koleksiyonlarımızdan, sadece üyelere özel sürpriz indirimlerden ve yeni sezon lansmanlarımızdan ilk siz haberdar olun.
            </p>

            {newsletterStatus === 'success' ? (
              <div className="anim-scale-in" style={{
                padding: '16px 24px',
                borderRadius: 0,
                backgroundColor: 'rgba(46, 125, 50, 0.08)',
                color: 'var(--success)',
                border: '1px solid var(--success)',
                fontSize: '14px',
                fontWeight: '600',
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'var(--font-sans)'
              }}>
                <svg style={{ width: '16px', height: '16px', fill: 'currentColor', marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }} viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z" />
                </svg>
                NewLilla kulübüne hoş geldiniz! %10 indirim kuponunuz e-posta adresinize gönderildi.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newsletterEmail) return;
                  setNewsletterStatus('success');
                  setNewsletterEmail('');
                  setTimeout(() => setNewsletterStatus(''), 6000);
                }}
                style={{
                  display: 'flex',
                  gap: '8px',
                  width: '100%',
                  maxWidth: '500px',
                  margin: '12px auto 0 auto',
                  flexWrap: 'wrap'
                }}
              >
                <input
                  type="email"
                  placeholder="E-posta adresiniz..."
                  className="input-field"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    flex: '1',
                    minWidth: '240px',
                    borderRadius: 'var(--radius-full)',
                    padding: '14px 24px',
                    backgroundColor: '#fff',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    borderRadius: 'var(--radius-full)',
                    padding: '14px 32px',
                    fontSize: '12px',
                    fontWeight: '600',
                    boxShadow: '0 4px 12px rgba(107, 76, 126, 0.15)'
                  }}
                >
                  Kulübe Katıl
                  <svg width="12" height="9" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                    <line x1="1" y1="5" x2="13" y2="5" />
                    <polyline points="9 1 13 5 9 9" />
                  </svg>
                </button>
              </form>
            )}

            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
              Dilediğiniz an tek tıkla abonelikten ayrılabilirsiniz. Gizlilik haklarınız NewLilla güvencesindedir.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Membership Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      {/* Footer component */}
      <Footer />

    </div>
  );
}

export default App;
