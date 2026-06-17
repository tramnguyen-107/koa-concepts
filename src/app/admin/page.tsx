'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Tab = 'orders' | 'leads' | 'subscribers' | 'products' | 'inventory';

const TABS: { key: Tab; label: string }[] = [
  { key: 'orders', label: 'Reservations' },
  { key: 'leads', label: 'Leads' },
  { key: 'subscribers', label: 'Subscribers' },
  { key: 'products', label: 'Products' },
  { key: 'inventory', label: 'Inventory' },
];

const cell: React.CSSProperties = { padding: '12px 16px', borderBottom: '0.5px solid #EDE3D5', fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#2E2420', verticalAlign: 'top' };
const th: React.CSSProperties = { ...cell, fontWeight: 500, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8C7A65', background: '#F5F0E8' };

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('orders');
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editRow, setEditRow] = useState<Record<string, unknown> | null>(null);
  const [products, setProducts] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    fetchTab(tab);
    supabase.from('products').select('*').then(({ data }) => setProducts(data || []));
  }, [tab]);

  async function fetchTab(t: Tab) {
    setLoading(true);
    const table = t === 'orders' ? 'orders' : t === 'leads' ? 'leads' : t === 'subscribers' ? 'newsletter_subscribers' : t === 'products' ? 'products' : 'inventory_transactions';
    const query = t === 'inventory' ? supabase.from(table).select('*, products(name)').order('created_at', { ascending: false }) : supabase.from(table).select('*').order('created_at', { ascending: false });
    const { data } = await query;
    setData(data || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string, table: string) {
    await supabase.from(table).update({ status }).eq('id', id);
    fetchTab(tab);
  }

  async function deleteRow(id: string, table: string) {
    if (!confirm('Delete this row?')) return;
    await supabase.from(table).delete().eq('id', id);
    fetchTab(tab);
  }

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault();
    const f = e.target as HTMLFormElement;
    const get = (n: string) => (f.elements.namedItem(n) as HTMLInputElement)?.value;
    const payload = { slug: get('slug'), name: get('name'), type: get('type'), category: get('category'), material: get('material'), price: parseFloat(get('price')), description: get('description'), tag: get('tag'), dims: get('dims'), shipping: get('shipping') };
    if (editRow?.id) {
      await supabase.from('products').update(payload).eq('id', editRow.id as string);
    } else {
      await supabase.from('products').insert(payload);
    }
    setEditRow(null);
    fetchTab('products');
  }

  async function saveInventory(e: React.FormEvent) {
    e.preventDefault();
    const f = e.target as HTMLFormElement;
    const get = (n: string) => (f.elements.namedItem(n) as HTMLInputElement)?.value;
    await supabase.from('inventory_transactions').insert({ product_id: get('product_id'), type: get('type'), quantity: parseInt(get('quantity')), unit_price: parseFloat(get('unit_price')), note: get('note') });
    setEditRow(null);
    fetchTab('inventory');
  }

  const tableForTab = tab === 'orders' ? 'orders' : tab === 'leads' ? 'leads' : tab === 'subscribers' ? 'newsletter_subscribers' : 'products';

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0E8' }}>
      {/* Header */}
      <div style={{ background: '#2E2420', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: '#F5F0E8' }}>Koa Concepts</span>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#8C7A65', marginLeft: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Admin Panel</span>
        </div>
        <a href="/" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: '#A89A85', textDecoration: 'none' }}>← Back to site</a>
      </div>

      {/* Tabs */}
      <div style={{ background: '#FFFFFF', borderBottom: '0.5px solid #D9CAB3', padding: '0 32px', display: 'flex', gap: 0 }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: tab === t.key ? '#2E2420' : '#8C7A65', padding: '14px 20px', background: 'none', border: 'none', borderBottom: tab === t.key ? '2px solid #B8906F' : '2px solid transparent', cursor: 'pointer', letterSpacing: '0.04em' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '32px', maxWidth: 1200, margin: '0 auto' }}>

        {/* ADD BUTTON */}
        {(tab === 'products' || tab === 'inventory') && (
          <button onClick={() => setEditRow({})}
            style={{ marginBottom: 20, background: '#B8906F', color: '#FFFFFF', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 24px', borderRadius: 4, border: 'none', cursor: 'pointer' }}>
            + Add {tab === 'products' ? 'Product' : 'Transaction'}
          </button>
        )}

        {/* PRODUCT / INVENTORY FORM MODAL */}
        {editRow !== null && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(46,36,32,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#FFFFFF', borderRadius: 8, padding: 32, width: 560, maxWidth: '90vw', maxHeight: '85vh', overflowY: 'auto' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: '#2E2420', margin: '0 0 24px' }}>
                {tab === 'products' ? (editRow.id ? 'Edit Product' : 'New Product') : 'New Inventory Transaction'}
              </h3>
              {tab === 'products' ? (
                <form onSubmit={saveProduct} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { n: 'slug', label: 'Slug', def: editRow.slug },
                    { n: 'name', label: 'Name', def: editRow.name },
                    { n: 'type', label: 'Type', def: editRow.type },
                    { n: 'category', label: 'Category', def: editRow.category },
                    { n: 'material', label: 'Material', def: editRow.material },
                    { n: 'price', label: 'Price ($)', def: editRow.price },
                    { n: 'tag', label: 'Tag', def: editRow.tag },
                    { n: 'description', label: 'Description', def: editRow.description },
                    { n: 'dims', label: 'Dimensions', def: editRow.dims },
                    { n: 'shipping', label: 'Shipping info', def: editRow.shipping },
                  ].map(({ n, label, def }) => (
                    <div key={n}>
                      <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8C7A65', display: 'block', marginBottom: 6 }}>{label}</label>
                      <input name={n} defaultValue={def as string} style={{ width: '100%', border: '0.5px solid #D9CAB3', borderRadius: 4, padding: '9px 12px', fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#2E2420', outline: 'none' }} />
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <button type="submit" style={{ background: '#B8906F', color: '#FFFFFF', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500, padding: '10px 24px', borderRadius: 4, border: 'none', cursor: 'pointer' }}>Save</button>
                    <button type="button" onClick={() => setEditRow(null)} style={{ background: 'transparent', color: '#8C7A65', fontFamily: 'DM Sans, sans-serif', fontSize: 13, padding: '10px 20px', borderRadius: 4, border: '0.5px solid #D9CAB3', cursor: 'pointer' }}>Cancel</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={saveInventory} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8C7A65', display: 'block', marginBottom: 6 }}>Product</label>
                    <select name="product_id" style={{ width: '100%', border: '0.5px solid #D9CAB3', borderRadius: 4, padding: '9px 12px', fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#2E2420', outline: 'none' }}>
                      {products.map(p => <option key={p.id as string} value={p.id as string}>{p.name as string}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8C7A65', display: 'block', marginBottom: 6 }}>Type</label>
                    <select name="type" style={{ width: '100%', border: '0.5px solid #D9CAB3', borderRadius: 4, padding: '9px 12px', fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#2E2420', outline: 'none' }}>
                      <option value="in">In (nhập kho)</option>
                      <option value="out">Out (xuất kho)</option>
                      <option value="sale">Sale (bán)</option>
                      <option value="adjustment">Adjustment (điều chỉnh)</option>
                    </select>
                  </div>
                  {[{ n: 'quantity', label: 'Quantity' }, { n: 'unit_price', label: 'Unit Price ($)' }, { n: 'note', label: 'Note' }].map(({ n, label }) => (
                    <div key={n}>
                      <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8C7A65', display: 'block', marginBottom: 6 }}>{label}</label>
                      <input name={n} style={{ width: '100%', border: '0.5px solid #D9CAB3', borderRadius: 4, padding: '9px 12px', fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#2E2420', outline: 'none' }} />
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <button type="submit" style={{ background: '#B8906F', color: '#FFFFFF', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500, padding: '10px 24px', borderRadius: 4, border: 'none', cursor: 'pointer' }}>Save</button>
                    <button type="button" onClick={() => setEditRow(null)} style={{ background: 'transparent', color: '#8C7A65', fontFamily: 'DM Sans, sans-serif', fontSize: 13, padding: '10px 20px', borderRadius: 4, border: '0.5px solid #D9CAB3', cursor: 'pointer' }}>Cancel</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* TABLE */}
        {loading ? (
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#8C7A65' }}>Loading...</p>
        ) : (
          <div style={{ background: '#FFFFFF', borderRadius: 8, border: '0.5px solid #D9CAB3', overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                {/* ORDERS */}
                {tab === 'orders' && <tr>
                  {['Date', 'Product', 'Customer', 'Email', 'ZIP', 'Finish', 'Status', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}
                </tr>}
                {/* LEADS */}
                {tab === 'leads' && <tr>
                  {['Date', 'Name', 'Email', 'Message', 'Status', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}
                </tr>}
                {/* SUBSCRIBERS */}
                {tab === 'subscribers' && <tr>
                  {['Date', 'Email', 'Status', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}
                </tr>}
                {/* PRODUCTS */}
                {tab === 'products' && <tr>
                  {['Name', 'Category', 'Price', 'Tag', 'Active', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}
                </tr>}
                {/* INVENTORY */}
                {tab === 'inventory' && <tr>
                  {['Date', 'Product', 'Type', 'Qty', 'Unit Price', 'Note'].map(h => <th key={h} style={th}>{h}</th>)}
                </tr>}
              </thead>
              <tbody>
                {data.length === 0 && (
                  <tr><td colSpan={8} style={{ ...cell, textAlign: 'center', color: '#8C7A65', padding: 32 }}>No data yet</td></tr>
                )}
                {tab === 'orders' && data.map(r => (
                  <tr key={r.id as string}>
                    <td style={cell}>{new Date(r.created_at as string).toLocaleDateString()}</td>
                    <td style={cell}>{r.product_name as string}</td>
                    <td style={cell}>{r.customer_name as string}</td>
                    <td style={cell}>{r.customer_email as string}</td>
                    <td style={cell}>{r.zip_code as string}</td>
                    <td style={cell}>{r.finish as string}</td>
                    <td style={cell}>
                      <select value={r.status as string} onChange={e => updateStatus(r.id as string, e.target.value, 'orders')}
                        style={{ border: '0.5px solid #D9CAB3', borderRadius: 4, padding: '4px 8px', fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: '#2E2420', cursor: 'pointer' }}>
                        {['pending', 'confirmed', 'paid', 'shipped', 'cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={cell}><button onClick={() => deleteRow(r.id as string, 'orders')} style={{ color: '#B8906F', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>Delete</button></td>
                  </tr>
                ))}
                {tab === 'leads' && data.map(r => (
                  <tr key={r.id as string}>
                    <td style={cell}>{new Date(r.created_at as string).toLocaleDateString()}</td>
                    <td style={cell}>{r.name as string}</td>
                    <td style={cell}>{r.email as string}</td>
                    <td style={{ ...cell, maxWidth: 280 }}>{r.message as string}</td>
                    <td style={cell}>
                      <select value={r.status as string} onChange={e => updateStatus(r.id as string, e.target.value, 'leads')}
                        style={{ border: '0.5px solid #D9CAB3', borderRadius: 4, padding: '4px 8px', fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: '#2E2420', cursor: 'pointer' }}>
                        {['new', 'contacted', 'closed'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={cell}><button onClick={() => deleteRow(r.id as string, 'leads')} style={{ color: '#B8906F', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>Delete</button></td>
                  </tr>
                ))}
                {tab === 'subscribers' && data.map(r => (
                  <tr key={r.id as string}>
                    <td style={cell}>{new Date(r.created_at as string).toLocaleDateString()}</td>
                    <td style={cell}>{r.email as string}</td>
                    <td style={cell}>{r.status as string}</td>
                    <td style={cell}><button onClick={() => deleteRow(r.id as string, 'newsletter_subscribers')} style={{ color: '#B8906F', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>Delete</button></td>
                  </tr>
                ))}
                {tab === 'products' && data.map(r => (
                  <tr key={r.id as string}>
                    <td style={cell}><strong>{r.name as string}</strong><br /><span style={{ color: '#8C7A65', fontSize: 12 }}>{r.slug as string}</span></td>
                    <td style={cell}>{r.category as string}</td>
                    <td style={cell}>${r.price as number}</td>
                    <td style={cell}>{r.tag as string}</td>
                    <td style={cell}>{r.active ? '✓' : '—'}</td>
                    <td style={cell}>
                      <button onClick={() => setEditRow(r)} style={{ color: '#2E2420', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, marginRight: 12 }}>Edit</button>
                      <button onClick={() => deleteRow(r.id as string, 'products')} style={{ color: '#B8906F', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>Delete</button>
                    </td>
                  </tr>
                ))}
                {tab === 'inventory' && data.map(r => (
                  <tr key={r.id as string}>
                    <td style={cell}>{new Date(r.created_at as string).toLocaleDateString()}</td>
                    <td style={cell}>{(r.products as Record<string, unknown>)?.name as string}</td>
                    <td style={cell}><span style={{ background: r.type === 'in' ? '#9BA98E' : r.type === 'sale' ? '#B8906F' : '#D9CAB3', color: '#FFFFFF', padding: '2px 8px', borderRadius: 3, fontSize: 12 }}>{r.type as string}</span></td>
                    <td style={cell}>{r.quantity as number}</td>
                    <td style={cell}>{r.unit_price ? `$${r.unit_price}` : '—'}</td>
                    <td style={cell}>{r.note as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
