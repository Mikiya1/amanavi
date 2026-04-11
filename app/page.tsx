'use client'

import { useRouter } from 'next/navigation'
import Header from './components/Header'

const genres = [
  { name: 'ガジェット', emoji: '📱', desc: 'スマホ・イヤホン・カメラ' },
  { name: 'ゲーム',     emoji: '🎮', desc: 'ソフト・周辺機器' },
  { name: '本・漫画',   emoji: '📚', desc: 'ビジネス書・小説・漫画' },
  { name: 'ファッション', emoji: '👕', desc: 'トップス・シューズ・バッグ' },
  { name: 'インテリア', emoji: '🛋', desc: '家電・照明・収納' },
  { name: 'スポーツ',   emoji: '⚽', desc: 'トレーニング・アウトドア' },
]

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Header />
      <main style={{ background: '#F3F3F3', minHeight: '100vh', color: '#0F1111', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', padding: '0 0 40px' }}>

      {/* ヒーロー */}
      <div style={{ background: '#131921', padding: '24px', marginBottom: '16px', borderRadius: '0 0 12px 12px' }}>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#ffffff', lineHeight: 1.4, marginBottom: '8px' }}>
            スワイプして<br />ぴったりの商品を探そう
          </div>
          <div style={{ fontSize: '13px', color: '#cccccc', marginBottom: '20px' }}>
            ジャンル → カテゴリ → 商品の順に選ぶだけ
          </div>
          <button
            onClick={() => router.push('/genre')}
            style={{ background: '#FFD814', color: '#0F1111', border: 'none', borderRadius: '8px', padding: '12px 32px', fontSize: '16px', fontWeight: '700', width: '100%' }}
          >
            診断スタート
          </button>
        </div>

        {/* ジャンルから探す */}
        <div style={{ padding: '0 16px' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: '#0F1111' }}>ジャンルから探す</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {genres.map(g => (
              <button
                key={g.name}
                onClick={() => router.push(`/category?genres=${g.name}`)}
                style={{ background: '#ffffff', border: '1px solid #DDD', borderRadius: '8px', padding: '16px', textAlign: 'left', color: '#0F1111', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>{g.emoji}</div>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>{g.name}</div>
                <div style={{ fontSize: '11px', color: '#565959', marginTop: '4px' }}>{g.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 使い方 */}
        <div style={{ padding: '24px 16px 0' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>使い方</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { step: '01', text: 'ジャンルをスワイプして好みを選ぶ' },
              { step: '02', text: 'カテゴリをスワイプしてさらに絞り込む' },
              { step: '03', text: 'ぴったりの商品がAmazonで見つかる' },
            ].map(item => (
              <div key={item.step} style={{ background: '#ffffff', border: '1px solid #DDD', borderRadius: '8px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ color: '#FF9900', fontSize: '13px', fontWeight: '700', minWidth: '24px' }}>{item.step}</div>
                <div style={{ fontSize: '14px', color: '#0F1111' }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  )
}