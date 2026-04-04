'use client';

import { useState, useEffect } from 'react';

export interface FilterState {
  priceRanges: string[];
  countries: string[];
  features: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (f: FilterState) => void;
  resultCount: number;
}

const PRICE_OPTIONS = ['Free', 'Under £15', '£15–£30', 'Over £30'];
const COUNTRY_OPTIONS = ['UK', 'Ireland', 'Nordic'];
const FEATURE_OPTIONS = ['Seafront', 'Woodland', 'Wood-fired', 'Halotherapy', 'Contrast Therapy', 'Finnish', 'Historic Building', 'Outdoor'];

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '8px 0', borderBottom: '1px solid #F7F7F7' }}>
      <div style={{
        width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0,
        border: checked ? '2px solid #FF5A5F' : '2px solid #EBEBEB',
        background: checked ? '#FF5A5F' : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <span style={{ color: '#fff', fontSize: '12px', lineHeight: 1, fontWeight: 700 }}>✓</span>}
      </div>
      <span style={{ fontSize: '14px', color: '#222222' }}>{label}</span>
    </label>
  );
}

export default function FiltersModal({ open, onClose, filters, onChange, resultCount }: Props) {
  const [local, setLocal] = useState<FilterState>(filters);

  useEffect(() => { setLocal(filters); }, [filters, open]);

  if (!open) return null;

  function toggle(key: keyof FilterState, val: string) {
    setLocal(prev => {
      const arr = prev[key] as string[];
      return { ...prev, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  }

  function clearAll() {
    setLocal({ priceRanges: [], countries: [], features: [] });
  }

  function apply() {
    onChange(local);
    onClose();
  }

  const totalActive = local.priceRanges.length + local.countries.length + local.features.length;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'flex-end',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: '#fff', width: '100%', maxWidth: '520px',
        margin: '0 auto',
        borderRadius: '16px 16px 0 0',
        maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px 16px', borderBottom: '1px solid #EBEBEB',
        }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#555', lineHeight: 1 }}>×</button>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#222' }}>Filters</span>
          <button onClick={clearAll} style={{ background: 'none', border: 'none', fontSize: '13px', color: '#888', cursor: 'pointer', textDecoration: 'underline' }}>
            Clear all
          </button>
        </div>

        {/* Body */}
        <div style={{ overflow: 'auto', flex: 1, padding: '0 24px' }}>
          <Section title="Price">
            {PRICE_OPTIONS.map(p => (
              <Checkbox key={p} label={p} checked={local.priceRanges.includes(p)} onChange={() => toggle('priceRanges', p)} />
            ))}
          </Section>
          <Section title="Country">
            {COUNTRY_OPTIONS.map(c => (
              <Checkbox key={c} label={c} checked={local.countries.includes(c)} onChange={() => toggle('countries', c)} />
            ))}
          </Section>
          <Section title="Features">
            {FEATURE_OPTIONS.map(f => (
              <Checkbox key={f} label={f} checked={local.features.includes(f)} onChange={() => toggle('features', f)} />
            ))}
          </Section>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #EBEBEB' }}>
          <button
            onClick={apply}
            style={{
              width: '100%', padding: '15px', borderRadius: '10px',
              background: '#FF5A5F', color: '#fff', border: 'none',
              fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Show {resultCount} venue{resultCount !== 1 ? 's' : ''}{totalActive > 0 ? ` · ${totalActive} filter${totalActive !== 1 ? 's' : ''} active` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '20px 0', borderBottom: '1px solid #EBEBEB' }}>
      <div style={{ fontSize: '15px', fontWeight: 700, color: '#222', marginBottom: '4px' }}>{title}</div>
      {children}
    </div>
  );
}
