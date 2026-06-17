import Link from 'next/link';

export default function Story() {
  return (
    <div className="koa-fade">
      <section style={{ background: '#FFFFFF', minHeight: '45vh', display: 'flex', alignItems: 'flex-end', padding: '0 24px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C7A65', margin: '56px 0 16px' }}>Our Story</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(43px, 6vw, 77px)', color: '#2E2420', lineHeight: 1.1, maxWidth: 720, margin: 0 }}>
            We believe beautiful<br /><em>furniture shouldn&apos;t be a luxury.</em>
          </h1>
        </div>
      </section>

      <section style={{ background: '#FFFFFF', padding: '80px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 300, color: '#5C4A38', lineHeight: 1.85, margin: '0 0 32px' }}>
            Koa Concepts was born from a simple question: why does well-designed outdoor furniture have to cost a fortune — or feel cold and corporate?
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 300, color: '#5C4A38', lineHeight: 1.85, margin: '0 0 32px' }}>
            We believe furniture should invite you to stay outside longer. Every piece in the collection is designed with that in mind — clean lines, durable materials, and an ease that feels effortless.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, margin: '64px 0' }}>
            {[
              { title: 'Craft', body: 'Every piece is built with attention to detail — durable materials, clean lines, lasting quality.' },
              { title: 'Honesty', body: 'We keep things simple and direct. You pay for quality, not overhead.' },
              { title: 'Outdoors', body: 'Designed for anyone who loves spending time outside.' },
            ].map(({ title, body }) => (
              <div key={title} style={{ borderTop: '1.5px solid #B8906F', paddingTop: 20 }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#2E2420', margin: '0 0 12px' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 300, color: '#8C7A65', lineHeight: 1.7, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>

          <Link href="/shop" className="koa-btn"
            style={{ display: 'inline-block', background: '#B8906F', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 32px', borderRadius: 4, textDecoration: 'none', transition: 'opacity .2s' }}>
            Shop the Collection →
          </Link>
        </div>
      </section>
    </div>
  );
}
