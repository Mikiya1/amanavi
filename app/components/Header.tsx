'use client'

import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#131921',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      <button
        onClick={() => router.push('/')}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
      >
        <span style={{ color: '#FF9900', fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px' }}>amazon</span>
        <span style={{ color: '#ffffff', fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px' }}>ナビ</span>
      </button>
      <span style={{ color: '#cccccc', fontSize: '12px', marginLeft: '8px', marginTop: '4px' }}>スワイプで商品発見</span>
    </header>
  )
}