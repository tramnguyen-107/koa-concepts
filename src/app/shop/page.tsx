import Link from 'next/link';
import { getAllProducts, ShopifyProduct } from '@/lib/shopify';

function img(product: ShopifyProduct) {
  return product.images.edges[0]?.node.url ?? 'https://images.unsplash.com/photo-1613685302957-3a6fc45346ef?q=80&w=1100&auto=format&fit=crop';
}

function price(product: ShopifyProduct) {
  return Math.round(parseFloat(product.priceRange.minVariantPrice.amount));
}

export default async function Shop() {
  const products = await getAllProducts();

  return (
    <div className="koa-fade">
      <section style={{ background: '#FFFFFF', padding: '80px 24px 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C7A65', margin: '0 0 14px' }}>The Collection</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.8vw, 58px)', color: '#2E2420', lineHeight: 1.2, margin: '0 0 56px' }}>
            Designed to<br /><em>live outside.</em>
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28 }}>
            {products.map(p => (
              <Link key={p.handle} href={`/shop/${p.handle}`} className="koa-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div style={{ borderRadius: 8, aspectRatio: '4/5', marginBottom: 16, position: 'relative', overflow: 'hidden', background: '#EDE3D5' }}>
                  <img src={img(p)} alt={p.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  {p.tags.includes('best seller') || p.tags.includes('Best Seller') ? (
                    <div style={{ position: 'absolute', top: 14, left: 14, background: '#B8906F', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 3 }}>Best Seller</div>
                  ) : p.tags.includes('new') || p.tags.includes('New') ? (
                    <div style={{ position: 'absolute', top: 14, left: 14, background: '#2E2420', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 3 }}>New</div>
                  ) : null}
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C7A65', margin: '0 0 6px' }}>{p.productType}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: '#2E2420', margin: 0 }}>{p.title}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, color: '#8C7A65', margin: 0, whiteSpace: 'nowrap' }}>From ${price(p)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
