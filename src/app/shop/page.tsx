'use client';
import { useState } from 'react';
import Link from 'next/link';

const PHOTOS: Record<string, string> = {
  'seville-sofa-set': '1613685302957-3a6fc45346ef',
  'cantor-rocking-lounger': '1617850687395-620757feb1f3',
  'maritsa-bistro-set': '1701731474441-2fd86c452997',
  'andes-lounge-chair': '1610036615775-f5814e8bd4df',
  'eastdale-dining-set': '1633330948542-0b3bdeefcdb3',
  'flysta-square': '1533391120950-2d65c72e5969',
  'flysta-barrel': '1532323544230-7191fd51bc1b',
};

function img(slug: string) {
  return `https://images.unsplash.com/photo-${PHOTOS[slug]}?q=80&w=800&auto=format&fit=crop`;
}

const PRODUCTS = [
  { slug: 'seville-sofa-set', name: 'Seville Sofa Set', material: 'Aluminum · Sunbrella', category: 'Sets', price: 890, tag: 'Best Seller' },
  { slug: 'cantor-rocking-lounger', name: 'Cantor Rocking Lounger', material: 'Aluminum · Mesh', category: 'Seating', price: 420, tag: 'New' },
  { slug: 'maritsa-bistro-set', name: 'Maritsa Bistro Set', material: 'Aluminum · Cushion', category: 'Sets', price: 340, tag: '' },
  { slug: 'andes-lounge-chair', name: 'Andes Lounge Chair', material: 'Aluminum · Mesh', category: 'Seating', price: 280, tag: '' },
  { slug: 'eastdale-dining-set', name: 'Eastdale Dining Set', material: 'Aluminum · Cushion', category: 'Sets', price: 1100, tag: '' },
  { slug: 'flysta-square', name: 'Flysta Side Table', material: 'Aluminum', category: 'Tables', price: 140, tag: '' },
  { slug: 'flysta-barrel', name: 'Flysta Barrel Table', material: 'Aluminum', category: 'Tables', price: 155, tag: '' },
];

const FILTERS = ['All', 'Seating', 'Tables', 'Sets'];

export default function Shop() {
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="koa-fade">
      <section style={{ background: '#FFFFFF', borderBottom: '0.5px solid #D9CAB3', padding: '56px 24px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C7A65', margin: '0 0 12px' }}>The Collection</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(38px, 4.8vw, 62px)', color: '#2E2420', lineHeight: 1.15, margin: 0 }}>All Products</h1>
        </div>
      </section>

      <section style={{ background: '#FFFFFF', padding: '56px 24px 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap' }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{
                  fontFamily: 'var(--font-sans)', fontSize: 14, letterSpacing: '0.08em',
                  padding: '8px 20px', borderRadius: 40, cursor: 'pointer',
                  background: filter === f ? '#2E2420' : 'transparent',
                  color: filter === f ? '#FFFFFF' : '#8C7A65',
                  border: filter === f ? 'none' : '0.5px solid #D9CAB3',
                  transition: 'all .2s',
                }}>
                {f}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}>
            {visible.map(p => (
              <Link key={p.slug} href={`/shop/${p.slug}`} className="koa-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div style={{ borderRadius: 8, aspectRatio: '4/5', marginBottom: 14, position: 'relative', overflow: 'hidden', background: '#EDE3D5' }}>
                  <img src={img(p.slug)} alt={p.name}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  {p.tag && (
                    <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 2, background: '#B8906F', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 3 }}>
                      {p.tag}
                    </div>
                  )}
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9BA98E', margin: '0 0 5px' }}>{p.material}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, gap: 8 }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: '#2E2420', margin: 0 }}>{p.name}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, color: '#8C7A65', whiteSpace: 'nowrap', margin: 0 }}>From ${p.price}</p>
                </div>
                <span style={{ display: 'inline-block', fontFamily: 'var(--font-sans)', fontSize: 13, color: '#B8906F', letterSpacing: '0.08em', borderBottom: '0.5px solid #B8906F', paddingBottom: 1 }}>Reserve →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
