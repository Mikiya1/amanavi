'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'

const genres = [
  { id: 1, name: 'ガジェット', emoji: '📱', desc: 'スマホ・イヤホン・カメラ・PC周辺機器' },
  { id: 2, name: 'ゲーム',     emoji: '🎮', desc: 'ソフト・コントローラー・周辺機器' },
  { id: 3, name: '本・漫画',   emoji: '📚', desc: 'ビジネス書・小説・漫画・雑誌' },
  { id: 4, name: 'ファッション', emoji: '👕', desc: 'トップス・パンツ・シューズ・バッグ' },
  { id: 5, name: 'インテリア', emoji: '🛋', desc: '家具・照明・雑貨・収納' },
  { id: 6, name: 'スポーツ',   emoji: '⚽', desc: 'トレーニング・アウトドア・ウェア' },
]

export default function GenrePage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [likedGenres, setLikedGenres] = useState<string[]>([])
  const [animating, setAnimating] = useState<'left' | 'right' | null>(null)

  const current = genres[index]
  const next = genres[index + 1]

  const handleSwipe = (dir: 'left' | 'right') => {
    if (animating) return
    setAnimating(dir)
    const newLiked = dir === 'right' ? [...likedGenres, current.name] : likedGenres
    if (dir === 'right') setLikedGenres(newLiked)

    setTimeout(() => {
      setAnimating(null)
      if (index + 1 >= genres.length) {
        const selected = dir === 'right' ? newLiked : likedGenres
        if (selected.length === 0) {
          router.push('/category?genres=ガジェット')
        } else {
          router.push(`/category?genres=${selected.join(',')}`)
        }
      } else {
        setIndex(prev => prev + 1)
      }
    }, 280)
  }

  const getCardTransform = () => {
    if (animating === 'right') return 'translateX(120%) rotate(15deg)'
    if (animating === 'left') return 'translateX(-120%) rotate(-15deg)'
    return 'none'
  }

  return (
    <>
      <Header />
      <main style={{ background: '#0F0F0F', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 20px', maxWidth: '480px', margin: '0 auto' }}>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', color: '#666', fontSize: '14px', padding: 0, cursor: 'pointer' }}>← 戻る</button>
          <span style={{ color: '#666', fontSize: '14px' }}>{index + 1} / {genres.length}</span>
        </div>

        <div style={{ width: '100%', marginBottom: '8px' }}>
          <div style={{ fontSize: '13px', color: '#FF9500', fontWeight: '600', marginBottom: '4px' }}>STEP 1</div>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>興味あるジャンルは？</div>
          <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>全部スワイプしてから次へ進みます</div>
        </div>

        <div style={{ width: '100%', height: '3px', background: '#1C1C1E', borderRadius: '2px', marginBottom: '16px' }}>
          <div style={{ height: '100%', background: '#FF9500', borderRadius: '2px', width: `${((index + 1) / genres.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>

        {likedGenres.length > 0 && (
          <div style={{ width: '100%', display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {likedGenres.map(g => (
              <span key={g} style={{ background: '#2a2a2a', color: '#FF9500', fontSize: '12px', padding: '4px 10px', borderRadius: '20px', border: '1px solid #FF9500' }}>{g}</span>
            ))}
          </div>
        )}

        <div style={{ width: '100%', position: 'relative', height: '320px', marginBottom: '24px' }}>
          {next && (
            <div style={{ position: 'absolute', inset: 0, background: '#1C1C1E', borderRadius: '20px', transform: 'scale(0.95) translateY(8px)', zIndex: 0 }} />
          )}
          <div style={{
            position: 'absolute', inset: 0, background: '#1C1C1E', borderRadius: '20px', overflow: 'hidden', zIndex: 1,
            transform: getCardTransform(),
            transition: animating ? 'transform 0.28s ease' : 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '32px',
          }}>
            <div style={{ fontSize: '80px' }}>{current.emoji}</div>
            <div style={{ fontSize: '28px', fontWeight: '700', textAlign: 'center' }}>{current.name}</div>
            <div style={{ fontSize: '14px', color: '#888', textAlign: 'center', lineHeight: 1.6 }}>{current.desc}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button
            onClick={() => handleSwipe('left')}
            style={{ width: '64px', height: '64px', borderRadius: '50%', border: '1.5px solid #444', background: '#1C1C1E', fontSize: '26px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ✕
          </button>
          <button
            onClick={() => handleSwipe('right')}
            style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid #FF9500', background: '#FF9500', fontSize: '28px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(255,149,0,0.4)' }}
          >
            ♥
          </button>
        </div>

        <div style={{ marginTop: '16px', fontSize: '12px', color: '#444' }}>← 興味なし ／ 興味あり →</div>

      </main>
    </>
  )
}