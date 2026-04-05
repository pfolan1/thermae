'use client';
import { useState } from 'react';

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/xpzgkwrb', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    border: '1px solid #E8E8E8',
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: 'inherit',
    background: '#F7F7F7',
    color: '#222',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#444',
    marginBottom: '6px',
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: '18px',
  };

  return (
    <main style={{ minHeight: '100vh', background: '#fff', padding: '48px 20px 80px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <h1 style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontSize: '32px',
            fontWeight: 400,
            color: '#222',
            marginBottom: '12px',
            lineHeight: 1.2,
          }}>
            Suggest a Sauna 🌿
          </h1>
          <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6, margin: 0 }}>
            Know a sauna, cold plunge or seaweed bath we&apos;re missing? Let us know and we&apos;ll review it for addition to Thermae.
          </p>
        </div>

        {submitted ? (
          <div style={{
            background: '#F6FBF7',
            border: '1px solid #c3e6cb',
            borderRadius: '14px',
            padding: '32px 28px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🌿</div>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '22px', fontWeight: 400, color: '#222', marginBottom: '12px' }}>
              Thanks for the suggestion!
            </h2>
            <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6, margin: 0 }}>
              We&apos;ll review this and add it to Thermae if it&apos;s a good fit. We aim to review all suggestions within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>

            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="venue_name">
                Sauna / Venue Name <span style={{ color: '#FF5A5F' }}>*</span>
              </label>
              <input id="venue_name" name="venue_name" type="text" required style={inputStyle} placeholder="e.g. The Harbour Sauna" />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="venue_type">Type</label>
              <select id="venue_type" name="venue_type" style={inputStyle}>
                <option value="">Select a type…</option>
                <option value="Sauna">Sauna</option>
                <option value="Cold Plunge">Cold Plunge</option>
                <option value="Sauna & Cold Plunge">Sauna &amp; Cold Plunge</option>
                <option value="Seaweed Bath">Seaweed Bath</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="address">
                Address / Location <span style={{ color: '#FF5A5F' }}>*</span>
              </label>
              <input id="address" name="address" type="text" required style={inputStyle} placeholder="e.g. Pier Road, Dingle, Co. Kerry" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
              <div>
                <label style={labelStyle} htmlFor="county">County / Region</label>
                <input id="county" name="county" type="text" style={inputStyle} placeholder="e.g. Kerry" />
              </div>
              <div>
                <label style={labelStyle} htmlFor="country">Country</label>
                <select id="country" name="country" style={inputStyle}>
                  <option value="">Select…</option>
                  <option value="Ireland">Ireland</option>
                  <option value="England">England</option>
                  <option value="Scotland">Scotland</option>
                  <option value="Wales">Wales</option>
                  <option value="Northern Ireland">Northern Ireland</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Finland">Finland</option>
                  <option value="Norway">Norway</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Iceland">Iceland</option>
                </select>
              </div>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="website">Website URL</label>
              <input id="website" name="website" type="url" style={inputStyle} placeholder="https://…" />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="instagram">Instagram Handle (optional)</label>
              <input id="instagram" name="instagram" type="text" style={inputStyle} placeholder="@yoursauna" />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="description">
                Brief Description
                <span style={{ fontWeight: 400, color: '#999', marginLeft: '6px' }}>(max 200 chars)</span>
              </label>
              <textarea
                id="description"
                name="description"
                maxLength={200}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
                placeholder="What makes this venue special?"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '28px' }}>
              <div>
                <label style={labelStyle} htmlFor="your_name">Your Name (optional)</label>
                <input id="your_name" name="your_name" type="text" style={inputStyle} placeholder="Jane" />
              </div>
              <div>
                <label style={labelStyle} htmlFor="your_email">Your Email (optional)</label>
                <input id="your_email" name="your_email" type="email" style={inputStyle} placeholder="jane@example.com" />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '14px',
                background: submitting ? '#ccc' : '#FF5A5F',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 700,
                fontFamily: 'inherit',
                cursor: submitting ? 'not-allowed' : 'pointer',
                letterSpacing: '0.2px',
              }}
            >
              {submitting ? 'Submitting…' : 'Submit Suggestion'}
            </button>

          </form>
        )}
      </div>
    </main>
  );
}
