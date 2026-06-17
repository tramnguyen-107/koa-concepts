'use client';
import { useState } from 'react';
import Link from 'next/link';

const PHOTOS: Record<string, string[]> = {
  'seville-sofa-set': ['1613685302957-3a6fc45346ef', '1600210492090-a159ffa3aeaf', '1715090576114-c07384af2069'],
  'cantor-rocking-lounger': ['1617850687395-620757feb1f3', '1610036615775-f5814e8bd4df', '1590361232060-61b9a025a068'],
  'maritsa-bistro-set': ['1701731474441-2fd86c452997', '1623625434531-d130448273c1', '1617887021567-fe8d2480bd96'],
  'andes-lounge-chair': ['1610036615775-f5814e8bd4df', '1617850687395-620757feb1f3', '1590361232060-61b9a025a068'],
  'eastdale-dining-set': ['1633330948542-0b3bdeefcdb3', '1617887021567-fe8d2480bd96', '1613317447829-eea2ed59640f'],
  'flysta-square': ['1533391120950-2d65c72e5969', '1613317447829-eea2ed59640f', '1532323544230-7191fd51bc1b'],
  'flysta-barrel': ['1532323544230-7191fd51bc1b', '1623625434531-d130448273c1', '1533391120950-2d65c72e5969'],
};

function img(id: string) {
  return `https://images.unsplash.com/photo-${id}?q=80&w=1100&auto=format&fit=crop`;
}

const featured = [
  { slug: 'seville-sofa-set', name: 'Seville Sofa Set', type: 'Outdoor Sofa · 3-piece', price: 890, tag: 'Best Seller' },
  { slug: 'cantor-rocking-lounger', name: 'Cantor Rocking Lounger', type: 'Lounge Chair', price: 420, tag: 'New' },
  { slug: 'maritsa-bistro-set', name: 'Maritsa Bistro Set', type: 'Bistro Set · 3-piece', price: 340, tag: '' },
];

const reviews = [
  { quote: 'Finally outdoor furniture that doesn\'t look like every other patio set. Assembled in 45 min.', name: 'Sarah M.', location: 'Honolulu, HI' },
  { quote: 'The quality is way above what I expected at this price. My patio feels like a whole new space.', name: 'James K.', location: 'Kailua, HI' },
  { quote: 'Ordered the bistro set. It arrived flat, assembled easily, and looks stunning on my balcony.', name: 'Priya N.', location: 'San Diego, CA' },
];

export default function Home() {
  const [emailDone, setEmailDone] = useState(false);

  return (
    <div className="koa-fade">
      {/* HERO */}
      <section style={{ position: 'relative', height: '90vh', minHeight: 560, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1613685302957-3a6fc45346ef?q=80&w=1600&auto=format&fit=crop"
          alt="Outdoor living"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(46,36,32,0.65) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 64px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(42px, 6vw, 80px)', color: '#FFFFFF', lineHeight: 1.1, margin: '0 0 24px', maxWidth: 700 }}>
              Furniture for<br /><em>the long exhale.</em>
            </h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.85)', margin: '0 0 36px', maxWidth: 440, lineHeight: 1.7 }}>
              Reserve now at the best price. We build when you&apos;re ready.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/shop" className="koa-btn"
                style={{ background: '#B8906F', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '14px 32px', borderRadius: 4, textDecoration: 'none', transition: 'opacity .2s' }}>
                Shop the Collection
              </Link>
              <Link href="/story" className="koa-btn"
                style={{ background: 'transparent', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 400, letterSpacing: '0.08em', padding: '14px 24px', borderRadius: 4, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.55)', transition: 'opacity .2s' }}>
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section style={{ background: '#FFFFFF', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C7A65', margin: '0 0 12px' }}>The Collection</p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 4.2vw, 53px)', color: '#2E2420', lineHeight: 1.15, margin: 0 }}>
                Designed to<br /><em>live outside.</em>
              </h2>
            </div>
            <Link href="/shop" className="koa-link"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#8C7A65', letterSpacing: '0.04em', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'opacity .2s' }}>
              View all →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {featured.map(p => (
              <Link key={p.slug} href={`/shop/${p.slug}`} className="koa-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div style={{ borderRadius: 8, aspectRatio: '4/5', marginBottom: 16, position: 'relative', overflow: 'hidden', background: '#EDE3D5' }}>
                  <img src={img(PHOTOS[p.slug][0])} alt={p.name}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  {p.tag && (
                    <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 2, background: '#B8906F', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 3 }}>
                      {p.tag}
                    </div>
                  )}
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C7A65', margin: '0 0 6px' }}>{p.type}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: '#2E2420', margin: 0 }}>{p.name}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, color: '#8C7A65', margin: 0, whiteSpace: 'nowrap' }}>From ${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STORY STRIP */}
      <section style={{ background: '#FFFFFF', borderTop: '0.5px solid #D9CAB3', borderBottom: '0.5px solid #D9CAB3' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div style={{ minHeight: 420, overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1623625434531-d130448273c1?q=80&w=1100&auto=format&fit=crop"
              alt="Outdoor living" style={{ width: '100%', height: '100%', minHeight: 420, objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C7A65', margin: '0 0 20px' }}>Our Story</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(31px, 3.6vw, 46px)', color: '#2E2420', lineHeight: 1.25, margin: '0 0 24px' }}>
              Made with care.<br /><em>Built to last.</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 300, color: '#5C4A38', lineHeight: 1.8, margin: '0 0 32px' }}>
              Koa Concepts was born from a simple question: why does well-designed outdoor furniture have to feel cold or cost a fortune? We believe great design and lasting quality should simply be accessible.
            </p>
            <Link href="/story" className="koa-link"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#2E2420', letterSpacing: '0.08em', borderBottom: '0.5px solid #2E2420', paddingBottom: 2, width: 'fit-content', textDecoration: 'none', transition: 'opacity .2s' }}>
              Read our story →
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ background: '#FFFFFF', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C7A65', margin: '0 0 48px', textAlign: 'center' }}>From our customers</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: 8, padding: '28px 28px 24px', border: '0.5px solid #D9CAB3' }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ color: '#C9A86C', fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontStyle: 'italic', color: '#2E2420', lineHeight: 1.65, margin: '0 0 20px' }}>
                  &ldquo;{r.quote}&rdquo;
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#8C7A65', letterSpacing: '0.04em', margin: 0 }}>
                  {r.name} · {r.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section style={{ background: '#B8906F', padding: '88px 24px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F0E1CE', margin: '0 0 16px' }}>Stay in the loop</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 4.8vw, 53px)', color: '#FFFFFF', margin: '0 0 16px' }}><em>Be first.</em></h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 300, color: '#F3E7D7', lineHeight: 1.7, margin: '0 0 36px' }}>
            Get early access, pre-order pricing, and launch updates delivered to your inbox.
          </p>
          {emailDone ? (
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 24, color: '#FFFFFF', margin: 0 }}>
              You&apos;re on the list. Welcome aboard.
            </p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setEmailDone(true); }}
              style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              <input type="email" required placeholder="Your email address"
                style={{ flex: 1, minWidth: 220, background: 'transparent', border: '1px solid rgba(255,255,255,0.55)', borderRadius: 4, padding: '13px 18px', fontFamily: 'var(--font-sans)', fontSize: 17, color: '#FFFFFF', outline: 'none' }} />
              <button type="submit" className="koa-btn"
                style={{ background: '#FFFFFF', color: '#2E2420', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '13px 28px', borderRadius: 4, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'opacity .2s' }}>
                Join the list
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
