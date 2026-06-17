'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const FAQS = [
  { q: 'How does pre-order work?', a: 'Reserve your item online. We confirm availability and send a secure payment link within 48 hours. Estimated lead time: 8–12 weeks.' },
  { q: 'Do you ship outside Hawaii?', a: 'Yes — we ship anywhere in the US. Contact us for a shipping quote to your location.' },
  { q: 'How hard is assembly?', a: 'All tools included. Most customers complete assembly in 45–60 minutes. Step-by-step guides included with every order.' },
  { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery for unused, unassembled items. Contact us to start a return.' },
  { q: 'Can I see the furniture in person?', a: "We're currently online-only. High-res photos, material swatches, and detailed specs are available on each product page." },
];

export default function Contact() {
  const [done, setDone] = useState(false);

  return (
    <div className="koa-fade">
      <section style={{ background: '#FFFFFF', padding: '80px 24px 96px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C7A65', margin: '0 0 14px' }}>Get in touch</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.8vw, 58px)', color: '#2E2420', lineHeight: 1.2, margin: '0 0 48px' }}>
            We&apos;d love to<br /><em>hear from you.</em>
          </h1>

          <div style={{ background: '#FFFFFF', borderRadius: 8, padding: 40, marginBottom: 64, border: '0.5px solid #D9CAB3' }}>
            {done ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 26, color: '#2E2420', margin: '0 0 8px' }}>Thank you — message received.</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 300, color: '#8C7A65', margin: 0 }}>We&apos;ll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={async e => { e.preventDefault(); const f = e.target as HTMLFormElement; const name = (f.elements.namedItem('name') as HTMLInputElement).value; const email = (f.elements.namedItem('email') as HTMLInputElement).value; const message = (f.elements.namedItem('message') as HTMLTextAreaElement).value; await supabase.from('leads').insert({ name, email, message }); setDone(true); window.scrollTo(0, 0); }}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { label: 'Name', type: 'text', placeholder: 'Your name', name: 'name' },
                  { label: 'Email', type: 'email', placeholder: 'your@email.com', name: 'email' },
                ].map(({ label, type, placeholder, name }) => (
                  <div key={label}>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8C7A65', display: 'block', marginBottom: 8 }}>{label}</label>
                    <input type={type} name={name} required placeholder={placeholder}
                      style={{ width: '100%', background: '#FFFFFF', border: '0.5px solid #D9CAB3', borderRadius: 4, padding: '12px 14px', fontFamily: 'var(--font-sans)', fontSize: 17, color: '#2E2420', outline: 'none' }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8C7A65', display: 'block', marginBottom: 8 }}>Message</label>
                  <textarea name="message" rows={5} required placeholder="Tell us what you're looking for..."
                    style={{ width: '100%', background: '#FFFFFF', border: '0.5px solid #D9CAB3', borderRadius: 4, padding: '12px 14px', fontFamily: 'var(--font-sans)', fontSize: 17, color: '#2E2420', outline: 'none', resize: 'vertical' }} />
                </div>
                <button type="submit" className="koa-btn"
                  style={{ background: '#B8906F', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 32px', borderRadius: 4, border: 'none', cursor: 'pointer', alignSelf: 'flex-start', transition: 'opacity .2s' }}>
                  Send Message
                </button>
              </form>
            )}
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 34, color: '#2E2420', margin: '0 0 32px' }}>Frequently Asked Questions</h2>
          <div style={{ borderTop: '0.5px solid #D9CAB3' }}>
            {FAQS.map(({ q, a }) => (
              <details key={q} style={{ borderBottom: '0.5px solid #D9CAB3' }}>
                <summary style={{ fontFamily: 'var(--font-sans)', fontSize: 17, color: '#2E2420', padding: '18px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                  {q} <span style={{ color: '#8C7A65', flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 300, color: '#5C4A38', lineHeight: 1.75, paddingBottom: 18, margin: 0 }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
