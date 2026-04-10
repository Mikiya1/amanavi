'use client'

import { useRouter } from 'next/navigation'
import Header from './components/Header'

const genres = [
  { name: 'ガジェット', emoji: '📱', desc: 'スマホ・イヤホン・カメラ・PC周辺機器' },
  { name: 'ゲーム',     emoji: '🎮', desc: 'ソフト・コントローラー・周辺機器' },
  { name: '本・漫画',   emoji: '📚', desc: 'ビジネス書・小説・漫画・雑誌' },
  { name: 'ファッション', emoji: '👕', desc: 'トップス・パンツ・シューズ・バッグ' },
  { name: 'インテリア', emoji: '🛋', desc: '家具・照明・雑貨・収納' },
  { name: 'スポーツ',   emoji: '⚽', desc: 'トレーニング・アウトドア・ウェア' },
]

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Header />
      <main style={{ background: '#0F0F0F', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', padding: '0 0 40px' }}>

        {/* ヒーロー */}
        <div style={{ padding: '24px 24px 24px' }}>
          <div style={{ background: '#1C1C1E', borderRadius: '20px', padding: '28px 24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '80px', opacity: 0.15 }}>🛒</div>
            <div style={{ fontSize: '22px', fontWeight: '600', lineHeight: 1.4, marginBottom: '8px' }}>
              スワイプして<br />ぴったりの商品を探そう
            </div>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>
              ジャンル選択 → カテゴリ選択 → 商品スワイプ → おすすめ表示
            </div>
            <button
              onClick={() => router.push('/genre')}
              style={{ background: '#FF9500', color: '#fff', border: 'none', borderRadius: '14px', padding: '14px 32px', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              はじめる <span style={{ fontSize: '18px' }}>→</span>
            </button>
          </div>
        </div>

        {/* ジャンルから探す */}
        <div>
          <div style={{ fontSize: '13px', color: '#666', padding: '0 24px 12px', fontWeight: '500' }}>ジャンルから探す</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '0 24px' }}>
            {genres.map(g => (
              <button
                key={g.name}
                onClick={() => router.push(`/category?genres=${g.name}`)}
                style={{ background: '#1C1C1E', border: 'none', borderRadius: '14px', padding: '16px', textAlign: 'left', color: '#fff', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{g.emoji}</div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{g.name}</div>
                <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>{g.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 使い方 */}
        <div style={{ padding: '32px 24px 0' }}>
          <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px', fontWeight: '500' }}>使い方</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { step: '01', text: 'ジャンルをスワイプして好みを選ぶ' },
              { step: '02', text: 'カテゴリをスワイプしてさらに絞り込む' },
              { step: '03', text: 'ぴったりの商品がAmazonで見つかる' },
            ].map(item => (
              <div key={item.step} style={{ background: '#1C1C1E', borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ color: '#FF9500', fontSize: '13px', fontWeight: '700', minWidth: '24px' }}>{item.step}</div>
                <div style={{ fontSize: '14px', color: '#ccc' }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  )
}