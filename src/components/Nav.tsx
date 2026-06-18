'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50 }}>

      {/* ANNOUNCEMENT BAR */}
      <div style={{ background: '#B8906F', padding: '9px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, letterSpacing: '0.06em', color: '#FFFFFF', margin: 0 }}>
          New collection now available — <Link href="/shop" style={{ textDecoration: 'underline', textUnderlineOffset: 3, color: '#FFFFFF' }}>Shop Now</Link>
        </p>
      </div>

      {/* MARQUEE TICKER */}
      <div style={{ background: '#2E2420', padding: '8px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div className="koa-marquee" style={{ display: 'inline-flex' }}>
          {[0, 1].map(i => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
              {['FREE SHIPPING ON ORDERS $500+', 'PRE-ORDER NOW — LIMITED STOCK', 'FREE SHIPPING ON ORDERS $500+', 'PRE-ORDER NOW — LIMITED STOCK', 'FREE SHIPPING ON ORDERS $500+', 'PRE-ORDER NOW — LIMITED STOCK'].map((text, j) => (
                <span key={j} style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.18em', color: '#EDE3D5', textTransform: 'uppercase', padding: '0 32px' }}>
                  {text} <span style={{ color: '#B8906F', marginLeft: 32 }}>·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* LOGO ROW */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #EDE3D5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 72, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
          {/* Search — desktop only */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E2420" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.14em', color: '#2E2420', textTransform: 'uppercase' }}>Search</span>
          </div>
          <div className="md:hidden" />

          {/* Logo */}
          <Link href="/">
            <Image src="/koa-logo.png" alt="Koa Concepts" width={240} height={48} style={{ height: scrolled ? 20 : 28, width: 'auto', display: 'block', transition: 'height 0.3s ease' }} />
          </Link>

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, justifyContent: 'flex-end' }}>
            <a href="https://shopify.com/74914037956/account" target="_blank" rel="noopener noreferrer" className="koa-link hidden md:flex" style={{ alignItems: 'center', color: 'inherit' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E2420" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </a>
            <svg className="koa-link hidden md:block" style={{ cursor: 'pointer' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E2420" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <svg className="koa-link hidden md:block" style={{ cursor: 'pointer' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E2420" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {/* Mobile hamburger */}
            <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <div style={{ width: 22, display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={{ display: 'block', height: 1, background: '#2E2420', transition: 'all 0.2s', transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
                <span style={{ display: 'block', height: 1, background: '#2E2420', opacity: open ? 0 : 1, transition: 'all 0.2s' }} />
                <span style={{ display: 'block', height: 1, background: '#2E2420', transition: 'all 0.2s', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* NAV BAR */}
      <div className="hidden md:block" style={{ background: '#FFFFFF', borderBottom: '1px solid #EDE3D5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 44 }}>
          {['Shop', 'Story', 'Contact'].map(item => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="koa-link"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#2E2420', letterSpacing: '0.03em', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'opacity .2s' }}>
              {item}
            </Link>
          ))}
          <Link href="/shop" className="koa-btn"
            style={{ background: '#B8906F', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '8px 20px', borderRadius: 4, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'opacity .2s' }}>
            Pre-Order Now
          </Link>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div style={{ background: '#FFFFFF', borderTop: '0.5px solid #EDE3D5' }} className="md:hidden px-6 pb-6 pt-4 flex flex-col gap-5">
          {['Shop', 'Story', 'Contact'].map(item => (
            <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setOpen(false)}
              style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#2E2420', textDecoration: 'none' }}>
              {item}
            </Link>
          ))}
          <Link href="/shop" onClick={() => setOpen(false)}
            style={{ background: '#B8906F', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '12px 20px', borderRadius: 4, textDecoration: 'none', textAlign: 'center' }}>
            Pre-Order Now
          </Link>
        </div>
      )}
    </header>
  );
}
