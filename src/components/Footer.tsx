import Link from 'next/link';
import Image from 'next/image';

const linkStyle = { fontFamily: 'DM Sans, sans-serif', fontSize: 16.5, color: '#EFE7D9', textDecoration: 'none' } as const;
const mutedStyle = { fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: '#8A7A66', letterSpacing: '0.18em', textTransform: 'uppercase' as const, margin: '0 0 14px' };

const shopLinks = ['All Products', 'Seating', 'Tables', 'Sets'];
const infoLinks = [['Our Story', '/story'], ['Shipping & Delivery', '/contact'], ['FAQ', '/contact'], ['Contact', '/contact']];

export default function Footer() {
  return (
    <footer style={{ background: '#2E2420' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <Image src="/koa-logo-light.png" alt="Koa Concepts" width={240} height={44} style={{ height: 28, width: 'auto', display: 'block', marginBottom: 16 }} />
            <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: 15, fontStyle: 'italic', color: '#8A7A66', lineHeight: 1.6, maxWidth: 240, margin: '0 0 24px' }}>
              "Furniture for the long exhale."
            </p>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Instagram', 'Pinterest'].map(s => (
                <a key={s} href="#" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: '#8A7A66', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p style={mutedStyle}>Shop</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {shopLinks.map(l => <Link key={l} href="/shop" style={linkStyle}>{l}</Link>)}
            </div>
          </div>

          {/* Info */}
          <div>
            <p style={mutedStyle}>Info</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {infoLinks.map(([label, href]) => <Link key={label} href={href} style={linkStyle}>{label}</Link>)}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '0.5px solid #4A3E36', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#5C4A38', margin: 0 }}>© 2026 Koa Concepts. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms'].map(l => (
              <a key={l} href="#" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#5C4A38', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
