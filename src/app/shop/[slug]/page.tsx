'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { use } from 'react';
import { supabase } from '@/lib/supabase';
import { getProductByHandle, getAllProducts, createCheckout, ShopifyProduct } from '@/lib/shopify';

const FINISHES = [
  { color: '#2E2420', label: 'Matte Black' },
  { color: '#8C7A65', label: 'Driftwood' },
  { color: '#FFFFFF', label: 'Ivory White' },
];

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [related, setRelated] = useState<ShopifyProduct[]>([]);
  const [thumb, setThumb] = useState(0);
  const [finish, setFinish] = useState(0);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [reserveDone, setReserveDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductByHandle(slug).then(p => {
      setProduct(p);
    });
    getAllProducts().then(all => {
      setRelated(all.filter(p => p.handle !== slug).slice(0, 3));
    });
  }, [slug]);

  if (!product) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'var(--font-sans)', color: '#8C7A65' }}>Loading...</p>
    </div>
  );

  const images = product.images.edges.map(e => e.node.url);
  const price = Math.round(parseFloat(product.priceRange.minVariantPrice.amount));
  const variantId = product.variants.edges[0]?.node.id;

  async function handleCheckout() {
    if (!variantId) return;
    setLoading(true);
    const url = await createCheckout(variantId);
    window.location.href = url;
  }

  return (
    <div className="koa-fade">
      {/* BREADCRUMB */}
      <div style={{ background: '#FFFFFF', borderBottom: '0.5px solid #D9CAB3', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#8C7A65', margin: 0 }}>
            <Link href="/" className="koa-link" style={{ textDecoration: 'none', color: '#8C7A65' }}>Home</Link>
            {' · '}
            <Link href="/shop" className="koa-link" style={{ textDecoration: 'none', color: '#8C7A65' }}>Shop</Link>
            {' · '}
            <span style={{ color: '#2E2420' }}>{product.title}</span>
          </p>
        </div>
      </div>

      {/* PRODUCT */}
      <section style={{ background: '#FFFFFF', padding: '56px 24px 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64 }}>

          {/* GALLERY */}
          <div>
            <div style={{ borderRadius: 8, aspectRatio: '4/5', marginBottom: 12, overflow: 'hidden', background: '#EDE3D5' }}>
              {images[thumb] && <img src={images[thumb]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
            </div>
            {images.length > 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(images.length, 3)}, 1fr)`, gap: 8 }}>
                {images.slice(0, 3).map((url, i) => (
                  <div key={i} onClick={() => setThumb(i)}
                    style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 6, aspectRatio: '1/1', cursor: 'pointer', border: i === thumb ? '1.5px solid #B8906F' : '0.5px solid #D9CAB3' }} />
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9BA98E', margin: '0 0 12px' }}>{product.productType}</p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 3.6vw, 48px)', color: '#2E2420', lineHeight: 1.15, margin: '0 0 16px' }}>{product.title}</h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 29, fontWeight: 300, color: '#2E2420', margin: '0 0 24px' }}>${price}</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 300, color: '#5C4A38', lineHeight: 1.8, margin: '0 0 32px' }}>{product.description}</p>

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

            {/* CHECKOUT BUTTON */}
            <button onClick={handleCheckout} disabled={loading} className="koa-btn"
              style={{ width: '100%', background: '#B8906F', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '16px 24px', borderRadius: 4, border: 'none', cursor: loading ? 'wait' : 'pointer', marginBottom: 8, transition: 'opacity .2s', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Redirecting...' : 'Buy Now — Checkout with Shopify'}
            </button>

            {/* RESERVE BUTTON */}
            <button onClick={() => { setReserveOpen(true); setReserveDone(false); }} className="koa-btn"
              style={{ width: '100%', background: 'transparent', color: '#2E2420', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 400, letterSpacing: '0.08em', padding: '14px 24px', borderRadius: 4, border: '0.5px solid #D9CAB3', cursor: 'pointer', marginBottom: 12, transition: 'opacity .2s' }}>
              Or Reserve (Pre-order, pay later)
            </button>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#8C7A65', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
              We&apos;ll confirm availability and collect payment within 48 hours.
            </p>

            {/* FEATURES */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 32 }}>
              {['Easy assembly', 'Weather-resistant', '2-year warranty', 'Free shipping HI'].map(feat => (
                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#B8906F', fontSize: 14 }}>✓</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#5C4A38' }}>{feat}</span>
                </div>
              ))}
            </div>

            {/* ACCORDIONS */}
            <div style={{ marginTop: 40, borderTop: '0.5px solid #D9CAB3' }}>
              {[
                { label: 'Shipping', content: 'Ships in 1–3 boxes. Estimated lead time 8–12 weeks from order confirmation.' },
                { label: 'Assembly', content: 'Tools included. No professional required. Average assembly: 45–60 min.' },
                { label: 'Returns', content: 'We accept returns within 30 days of delivery for unused, unassembled items.' },
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
      {related.length > 0 && (
        <section style={{ background: '#FFFFFF', borderTop: '0.5px solid #D9CAB3', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C7A65', margin: '0 0 36px' }}>You may also like</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 24 }}>
              {related.map(p => (
                <Link key={p.handle} href={`/shop/${p.handle}`} className="koa-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                  <div style={{ borderRadius: 8, aspectRatio: '4/5', marginBottom: 12, overflow: 'hidden', background: '#EDE3D5' }}>
                    <img src={p.images.edges[0]?.node.url} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 19, color: '#2E2420', margin: 0 }}>{p.title}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#8C7A65', margin: '4px 0 0' }}>
                    From ${Math.round(parseFloat(p.priceRange.minVariantPrice.amount))}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RESERVE DRAWER */}
      {reserveOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={() => setReserveOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(46,36,32,0.45)', animation: 'koaVeil .25s ease' }} />
          <div style={{ position: 'relative', width: 420, maxWidth: '100%', height: '100%', background: '#FFFFFF', borderLeft: '1px solid #D9CAB3', animation: 'koaSlide .35s cubic-bezier(.2,.7,.2,1)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '24px 28px', borderBottom: '0.5px solid #D9CAB3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8C7A65' }}>Reserve · Pre-order</span>
              <span onClick={() => setReserveOpen(false)} className="koa-link"
                style={{ fontSize: 24, color: '#8C7A65', cursor: 'pointer', lineHeight: 1 }}>×</span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
              {reserveDone ? (
                <div style={{ textAlign: 'center', padding: '40px 8px' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#9BA98E', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 31, margin: '0 auto 24px' }}>✓</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 29, color: '#2E2420', margin: '0 0 12px' }}>You&apos;re reserved.</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 300, color: '#5C4A38', lineHeight: 1.75, margin: '0 0 28px' }}>
                    We&apos;ll email you within 48 hours to confirm and arrange payment.
                  </p>
                  <button onClick={() => setReserveOpen(false)} className="koa-btn"
                    style={{ background: '#2E2420', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '13px 28px', borderRadius: 4, border: 'none', cursor: 'pointer' }}>
                    Continue browsing
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                    {images[0] && <div style={{ width: 88, height: 110, borderRadius: 6, flexShrink: 0, backgroundImage: `url(${images[thumb]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: '#2E2420', margin: '0 0 6px' }}>{product.title}</h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#8C7A65', margin: '0 0 4px' }}>Finish · {FINISHES[finish].label}</p>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 19, color: '#2E2420', margin: 0 }}>${price}</p>
                    </div>
                  </div>
                  <form onSubmit={async e => {
                    e.preventDefault();
                    const f = e.target as HTMLFormElement;
                    const customer_name = (f.elements.namedItem('name') as HTMLInputElement).value;
                    const customer_email = (f.elements.namedItem('email') as HTMLInputElement).value;
                    const zip_code = (f.elements.namedItem('zip') as HTMLInputElement).value;
                    await supabase.from('orders').insert({ product_name: product.title, customer_name, customer_email, zip_code, finish: FINISHES[finish].label });
                    setReserveDone(true);
                  }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <input type="text" name="name" required placeholder="Full name"
                      style={{ background: '#FFFFFF', border: '0.5px solid #D9CAB3', borderRadius: 4, padding: '13px 14px', fontFamily: 'var(--font-sans)', fontSize: 17, color: '#2E2420', outline: 'none' }} />
                    <input type="email" name="email" required placeholder="Email address"
                      style={{ background: '#FFFFFF', border: '0.5px solid #D9CAB3', borderRadius: 4, padding: '13px 14px', fontFamily: 'var(--font-sans)', fontSize: 17, color: '#2E2420', outline: 'none' }} />
                    <input type="text" name="zip" required placeholder="Shipping ZIP code"
                      style={{ background: '#FFFFFF', border: '0.5px solid #D9CAB3', borderRadius: 4, padding: '13px 14px', fontFamily: 'var(--font-sans)', fontSize: 17, color: '#2E2420', outline: 'none' }} />
                    <button type="submit" className="koa-btn"
                      style={{ background: '#B8906F', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '15px 24px', borderRadius: 4, border: 'none', cursor: 'pointer' }}>
                      Confirm Reservation
                    </button>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#8C7A65', textAlign: 'center', margin: 0 }}>
                      No charge today.
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
