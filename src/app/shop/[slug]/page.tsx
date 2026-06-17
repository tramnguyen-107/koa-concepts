'use client';
import { useState } from 'react';
import Link from 'next/link';
import { use } from 'react';

const PHOTOS: Record<string, string[]> = {
  'seville-sofa-set': ['1613685302957-3a6fc45346ef', '1600210492090-a159ffa3aeaf', '1715090576114-c07384af2069'],
  'cantor-rocking-lounger': ['1617850687395-620757feb1f3', '1610036615775-f5814e8bd4df', '1590361232060-61b9a025a068'],
  'maritsa-bistro-set': ['1701731474441-2fd86c452997', '1623625434531-d130448273c1', '1617887021567-fe8d2480bd96'],
  'andes-lounge-chair': ['1610036615775-f5814e8bd4df', '1617850687395-620757feb1f3', '1590361232060-61b9a025a068'],
  'eastdale-dining-set': ['1633330948542-0b3bdeefcdb3', '1617887021567-fe8d2480bd96', '1613317447829-eea2ed59640f'],
  'flysta-square': ['1533391120950-2d65c72e5969', '1613317447829-eea2ed59640f', '1532323544230-7191fd51bc1b'],
  'flysta-barrel': ['1532323544230-7191fd51bc1b', '1623625434531-d130448273c1', '1533391120950-2d65c72e5969'],
};

const PRODUCTS = [
  { slug: 'seville-sofa-set', name: 'Seville Sofa Set', type: 'Outdoor Sofa · 3-piece', material: 'Aluminum · Sunbrella', materialsLong: 'Powder-coated Aluminum · Sunbrella Fabric', price: 890, tag: 'Best Seller', desc: 'A three-piece sofa set that comes together in under an hour. Clean lines, deep seats, and built to stay outside.', dims: 'Sofa: 220W × 80D × 75H cm · Chair: 80W × 80D × 75H cm · Table: 60W × 60D × 40H cm', shipping: 'Ships in multiple boxes. Estimated lead time 8–12 weeks from order confirmation.' },
  { slug: 'cantor-rocking-lounger', name: 'Cantor Rocking Lounger', type: 'Lounge Chair', material: 'Aluminum · Mesh', materialsLong: 'Powder-coated Aluminum · Woven Mesh', price: 420, tag: 'New', desc: 'The rocking lounge chair that earns its spot. Woven mesh seat, powder-coated frame, and a gentle rock that makes it hard to get up.', dims: '75W × 120D × 85H cm', shipping: 'Ships in 1 box. Estimated lead time 8–12 weeks from order confirmation.' },
  { slug: 'maritsa-bistro-set', name: 'Maritsa Bistro Set', type: 'Bistro Set · 3-piece', material: 'Aluminum · Cushion', materialsLong: 'Powder-coated Aluminum · Cushion', price: 340, tag: '', desc: 'Two chairs and a table that turn any corner into a destination. Compact, elegant, and easy to move.', dims: 'Table: 70 × 70 × 74H cm · Chair: 52W × 56D × 85H cm', shipping: 'Ships in multiple boxes. Estimated lead time 8–12 weeks from order confirmation.' },
  { slug: 'andes-lounge-chair', name: 'Andes Lounge Chair', type: 'Lounge Chair', material: 'Aluminum · Mesh', materialsLong: 'Powder-coated Aluminum · Mesh', price: 280, tag: '', desc: 'Lightweight and quietly good-looking. The chair that works everywhere.', dims: '68W × 78D × 82H cm', shipping: 'Ships in 1 box. Estimated lead time 8–12 weeks from order confirmation.' },
  { slug: 'eastdale-dining-set', name: 'Eastdale Dining Set', type: 'Dining · 5-piece', material: 'Aluminum · Cushion', materialsLong: 'Powder-coated Aluminum · Cushion', price: 1100, tag: '', desc: 'A full outdoor dining set — table plus four chairs. For the meals that go long into the evening.', dims: 'Table: 160W × 90D × 75H cm · Chair: 55W × 60D × 88H cm', shipping: 'Ships in multiple boxes. Estimated lead time 8–12 weeks from order confirmation.' },
  { slug: 'flysta-square', name: 'Flysta Side Table', type: 'Side Table · Square', material: 'Aluminum', materialsLong: 'Powder-coated Aluminum', price: 140, tag: '', desc: 'Always in the right place. Minimal, light, and built to stay outside year-round.', dims: '45W × 45D × 50H cm', shipping: 'Ships in 1 box. Estimated lead time 8–12 weeks from order confirmation.' },
  { slug: 'flysta-barrel', name: 'Flysta Barrel Table', type: 'Side Table · Barrel', material: 'Aluminum', materialsLong: 'Powder-coated Aluminum', price: 155, tag: '', desc: 'Barrel-shaped side table. Pairs perfectly with the Seville Sofa or Cantor Lounger.', dims: 'Ø 40 × 52H cm', shipping: 'Ships in 1 box. Estimated lead time 8–12 weeks from order confirmation.' },
];

const FINISHES = [
  { color: '#2E2420', label: 'Matte Black' },
  { color: '#8C7A65', label: 'Driftwood' },
  { color: '#FFFFFF', label: 'Ivory White' },
];

function img(id: string) {
  return `https://images.unsplash.com/photo-${id}?q=80&w=1100&auto=format&fit=crop`;
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const prod = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  const shots = (PHOTOS[prod.slug] || PHOTOS['seville-sofa-set']).map(id => img(id));
  const related = PRODUCTS.filter(p => p.slug !== prod.slug).slice(0, 3);

  const [thumb, setThumb] = useState(0);
  const [finish, setFinish] = useState(0);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [reserveDone, setReserveDone] = useState(false);

  return (
    <div className="koa-fade">
      {/* BREADCRUMB */}
      <div style={{ background: '#FFFFFF', borderBottom: '0.5px solid #D9CAB3', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#8C7A65', margin: 0 }}>
            <Link href="/" className="koa-link" style={{ textDecoration: 'none', color: '#8C7A65', transition: 'opacity .2s' }}>Home</Link>
            {' · '}
            <Link href="/shop" className="koa-link" style={{ textDecoration: 'none', color: '#8C7A65', transition: 'opacity .2s' }}>Shop</Link>
            {' · '}
            <span style={{ color: '#2E2420' }}>{prod.name}</span>
          </p>
        </div>
      </div>

      {/* PRODUCT */}
      <section style={{ background: '#FFFFFF', padding: '56px 24px 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64 }}>

          {/* GALLERY */}
          <div>
            <div style={{ borderRadius: 8, aspectRatio: '4/5', marginBottom: 12, overflow: 'hidden', background: '#EDE3D5' }}>
              <img src={shots[thumb]} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {[0, 1, 2].map(i => (
                <div key={i} onClick={() => setThumb(i)}
                  style={{ backgroundImage: `url(${shots[i]})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 6, aspectRatio: '1/1', cursor: 'pointer', border: i === thumb ? '1.5px solid #B8906F' : '0.5px solid #D9CAB3' }} />
              ))}
            </div>
          </div>

          {/* INFO */}
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9BA98E', margin: '0 0 12px' }}>{prod.material}</p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 3.6vw, 48px)', color: '#2E2420', lineHeight: 1.15, margin: '0 0 16px' }}>{prod.name}</h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 29, fontWeight: 300, color: '#2E2420', margin: '0 0 24px' }}>From ${prod.price}</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 300, color: '#5C4A38', lineHeight: 1.8, margin: '0 0 32px' }}>{prod.desc}</p>

            {/* FINISHES */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8C7A65', margin: '0 0 12px' }}>
                Frame Finish · {FINISHES[finish].label}
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                {FINISHES.map((f, i) => (
                  <button key={i} title={f.label} onClick={() => setFinish(i)}
                    style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: f.color, border: i === finish ? '2px solid #B8906F' : '1px solid #D9CAB3', cursor: 'pointer', padding: 0 }} />
                ))}
              </div>
            </div>

            <button onClick={() => { setReserveOpen(true); setReserveDone(false); }} className="koa-btn"
              style={{ width: '100%', background: '#B8906F', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '16px 24px', borderRadius: 4, border: 'none', cursor: 'pointer', marginBottom: 12, transition: 'opacity .2s' }}>
              Reserve Your Set
            </button>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#8C7A65', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
              We&apos;ll confirm availability and collect payment within 48 hours.
            </p>

            {/* FEATURES */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 32 }}>
              {[['Easy assembly', ''], ['Weather-resistant', ''], ['2-year warranty', ''], ['Free shipping HI', '']].map(([feat]) => (
                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#B8906F', fontSize: 14 }}>✓</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#5C4A38' }}>{feat}</span>
                </div>
              ))}
            </div>

            {/* ACCORDIONS */}
            <div style={{ marginTop: 40, borderTop: '0.5px solid #D9CAB3' }}>
              {[
                { label: 'Dimensions', content: prod.dims },
                { label: 'Materials', content: prod.materialsLong },
                { label: 'Shipping', content: prod.shipping },
                { label: 'Assembly', content: 'Tools included. No professional required. Average assembly: 45–60 min.' },
              ].map(({ label, content }) => (
                <details key={label} style={{ borderBottom: '0.5px solid #D9CAB3' }}>
                  <summary style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#2E2420', padding: '16px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                    {label} <span style={{ color: '#8C7A65' }}>+</span>
                  </summary>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#5C4A38', lineHeight: 1.7, paddingBottom: 16, margin: 0 }}>{content}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section style={{ background: '#FFFFFF', borderTop: '0.5px solid #D9CAB3', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C7A65', margin: '0 0 36px' }}>You may also like</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 24 }}>
            {related.map(p => (
              <Link key={p.slug} href={`/shop/${p.slug}`} className="koa-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div style={{ borderRadius: 8, aspectRatio: '4/5', marginBottom: 12, overflow: 'hidden', background: '#EDE3D5' }}>
                  <img src={img(PHOTOS[p.slug][0])} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 19, color: '#2E2420', margin: 0 }}>{p.name}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#8C7A65', margin: '4px 0 0' }}>From ${p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVE DRAWER */}
      {reserveOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={() => setReserveOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(46,36,32,0.45)', animation: 'koaVeil .25s ease' }} />
          <div style={{ position: 'relative', width: 420, maxWidth: '100%', height: '100%', background: '#FFFFFF', borderLeft: '1px solid #D9CAB3', animation: 'koaSlide .35s cubic-bezier(.2,.7,.2,1)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '24px 28px', borderBottom: '0.5px solid #D9CAB3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8C7A65' }}>Reserve · Pre-order</span>
              <span onClick={() => setReserveOpen(false)} className="koa-link"
                style={{ fontSize: 24, color: '#8C7A65', cursor: 'pointer', lineHeight: 1, transition: 'opacity .2s' }}>×</span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
              {reserveDone ? (
                <div style={{ textAlign: 'center', padding: '40px 8px' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#9BA98E', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 31, margin: '0 auto 24px' }}>✓</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 29, color: '#2E2420', margin: '0 0 12px' }}>You&apos;re reserved.</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 300, color: '#5C4A38', lineHeight: 1.75, margin: '0 0 28px' }}>
                    Your {prod.name} is held. We&apos;ll email you within 48 hours to confirm availability and arrange secure payment.
                  </p>
                  <button onClick={() => setReserveOpen(false)} className="koa-btn"
                    style={{ background: '#2E2420', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '13px 28px', borderRadius: 4, border: 'none', cursor: 'pointer', transition: 'opacity .2s' }}>
                    Continue browsing
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                    <div style={{ width: 88, height: 110, borderRadius: 6, flexShrink: 0, backgroundImage: `url(${shots[thumb]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: '#2E2420', margin: '0 0 6px' }}>{prod.name}</h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#8C7A65', margin: '0 0 4px' }}>Finish · {FINISHES[finish].label}</p>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 19, color: '#2E2420', margin: 0 }}>From ${prod.price}</p>
                    </div>
                  </div>
                  <div style={{ background: '#FFFFFF', border: '0.5px solid #D9CAB3', borderRadius: 8, padding: '18px 20px', marginBottom: 24 }}>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 500, color: '#2E2420', margin: '0 0 10px' }}>How pre-order works</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 300, color: '#5C4A38', lineHeight: 1.7, margin: 0 }}>
                      Reserve now with no charge. We confirm availability and send a secure payment link within 48 hours. Production begins once confirmed — estimated lead time 8–12 weeks.
                    </p>
                  </div>
                  <form onSubmit={e => { e.preventDefault(); setReserveDone(true); }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <input type="text" required placeholder="Full name"
                      style={{ background: '#FFFFFF', border: '0.5px solid #D9CAB3', borderRadius: 4, padding: '13px 14px', fontFamily: 'var(--font-sans)', fontSize: 17, color: '#2E2420', outline: 'none' }} />
                    <input type="email" required placeholder="Email address"
                      style={{ background: '#FFFFFF', border: '0.5px solid #D9CAB3', borderRadius: 4, padding: '13px 14px', fontFamily: 'var(--font-sans)', fontSize: 17, color: '#2E2420', outline: 'none' }} />
                    <input type="text" required placeholder="Shipping ZIP code"
                      style={{ background: '#FFFFFF', border: '0.5px solid #D9CAB3', borderRadius: 4, padding: '13px 14px', fontFamily: 'var(--font-sans)', fontSize: 17, color: '#2E2420', outline: 'none' }} />
                    <button type="submit" className="koa-btn"
                      style={{ background: '#B8906F', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '15px 24px', borderRadius: 4, border: 'none', cursor: 'pointer', transition: 'opacity .2s' }}>
                      Confirm Reservation
                    </button>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#8C7A65', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
                      No charge today. You&apos;re reserving your place in line.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
