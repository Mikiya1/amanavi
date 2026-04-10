'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '../components/Header'

const categories: Record<string, { id: number; name: string; emoji: string; desc: string }[]> = {
  'ガジェット': [
    { id: 1, name: 'スマホ', emoji: '📱', desc: 'iPhone・Android・アクセサリ' },
    { id: 2, name: 'タブレット', emoji: '📲', desc: 'iPad・Androidタブレット' },
    { id: 3, name: 'イヤホン', emoji: '🎧', desc: 'ワイヤレス・ノイキャン・有線' },
    { id: 4, name: 'モニター', emoji: '🖥', desc: 'ゲーミング・4K・ウルトラワイド' },
    { id: 5, name: 'PC周辺機器', emoji: '⌨️', desc: 'キーボード・マウス・Webカメラ' },
  ],
  'ゲーム': [
    { id: 1, name: 'Nintendo Switch', emoji: '🎮', desc: 'ソフト・周辺機器・アクセサリ' },
    { id: 2, name: 'PlayStation', emoji: '🕹', desc: 'PS5・PS4・コントローラー' },
    { id: 3, name: 'PCゲーム', emoji: '💻', desc: 'ゲーミングPC・マウス・ヘッドセット' },
  ],
  '本・漫画': [
    { id: 1, name: 'ビジネス書', emoji: '💼', desc: '自己啓発・マーケティング・投資' },
    { id: 2, name: '漫画', emoji: '📕', desc: '少年・少女・青年・完結済み' },
    { id: 3, name: '小説', emoji: '📖', desc: 'ミステリー・SF・恋愛・ファンタジー' },
  ],
  'ファッション': [
    { id: 1, name: 'トップス', emoji: '👕', desc: 'Tシャツ・シャツ・パーカー' },
    { id: 2, name: 'シューズ', emoji: '👟', desc: 'スニーカー・ブーツ・サンダル' },
    { id: 3, name: 'バッグ', emoji: '🎒', desc: 'リュック・トート・ショルダー' },
    { id: 4, name: 'アクセサリ', emoji: '⌚', desc: '時計・サングラス・帽子' },
    { id: 5, name: 'アウター', emoji: '🧥', desc: 'ジャケット・コート・ダウン' },
  ],
  'インテリア': [
    { id: 1, name: 'キッチン家電', emoji: '🍳', desc: 'トースター・ミキサー・電気ケトル' },
    { id: 2, name: '空調・空気', emoji: '💨', desc: '空気清浄機・扇風機・加湿器' },
    { id: 3, name: '照明', emoji: '💡', desc: 'シーリング・スタンド・スマート照明' },
    { id: 4, name: '収納', emoji: '📦', desc: 'ボックス・棚・ハンガーラック' },
    { id: 5, name: '掃除', emoji: '🤖', desc: 'ロボット掃除機・コードレス・モップ' },
  ],
  'スポーツ': [
    { id: 1, name: '筋トレ', emoji: '💪', desc: 'ダンベル・プロテイン・ベンチ' },
    { id: 2, name: 'ランニング', emoji: '🏃', desc: 'シューズ・ウェア・スマートウォッチ' },
    { id: 3, name: 'アウトドア', emoji: '⛺', desc: 'テント・バーベキュー・登山' },
    { id: 4, name: 'ヨガ・ストレッチ', emoji: '🧘', desc: 'マット・ブロック・ウェア' },
    { id: 5, name: '球技', emoji: '⚽', desc: 'サッカー・バスケ・テニス' },
  ],
}

function CategoryContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const genresParam = searchParams.get('genres') ?? 'ガジェット'
  const genres = genresParam.split(',')

  const allItems = genres.flatMap(genre =>
    (categories[genre] ?? []).map(item => ({ ...item, genre }))
  )

  const [index, setIndex] = useState(0)
  const [likedCategories, setLikedCategories] = useState<{ name: string; genre: string }[]>([])
  const [animating, setAnimating] = useState<'left' | 'right' | null>(null)

  const current = allItems[index]
  const next = allItems[index + 1]

  const handleSwipe = (dir: 'left' | 'right') => {
    if (animating) return
    setAnimating(dir)
    const newLiked = dir === 'right'
      ? [...likedCategories, { name: current.name, genre: current.genre }]
      : likedCategories
    if (dir === 'right') setLikedCategories(newLiked)

    setTimeout(() => {
      setAnimating(null)
      if (index + 1 >= allItems.length) {
        const selected = dir === 'right' ? newLiked : likedCategories
        const category = selected.length > 0 ? selected[0].name : allItems[0].name
        const genre = selected.length > 0 ? selected[0].genre : genres[0]
        router.push(`/swipe?genre=${genre}&category=${category}`)
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
          <button onClick={() => router.push('/genre')} style={{ background: 'none', border: 'none', color: '#666', fontSize: '14px', padding: 0, cursor: 'pointer' }}>← 戻る</button>
          <span style={{ color: '#666', fontSize: '14px' }}>{index + 1} / {allItems.length}</span>
        </div>

        <div style={{ width: '100%', marginBottom: '8px' }}>
          <div style={{ fontSize: '13px', color: '#FF9500', fontWeight: '600', marginBottom: '4px' }}>STEP 2 · {current?.genre}</div>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>カテゴリを選ぼう</div>
          <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>気になったら右、興味なければ左</div>
        </div>

        <div style={{ width: '100%', height: '3px', background: '#1C1C1E', borderRadius: '2px', marginBottom: '16px' }}>
          <div style={{ height: '100%', background: '#FF9500', borderRadius: '2px', width: `${((index + 1) / allItems.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>

        {likedCategories.length > 0 && (
          <div style={{ width: '100%', display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {likedCategories.map((c, i) => (
              <span key={i} style={{ background: '#2a2a2a', color: '#FF9500', fontSize: '12px', padding: '4px 10px', borderRadius: '20px', border: '1px solid #FF9500' }}>{c.name}</span>
            ))}
          </div>
        )}

        <div style={{ width: '100%', position: 'relative', height: '300px', marginBottom: '24px' }}>
          {next && (
            <div style={{ position: 'absolute', inset: 0, background: '#1C1C1E', borderRadius: '20px', transform: 'scale(0.95) translateY(8px)', zIndex: 0 }} />
          )}
          <div style={{
            position: 'absolute', inset: 0, background: '#1C1C1E', borderRadius: '20px', overflow: 'hidden', zIndex: 1,
            transform: getCardTransform(),
            transition: animating ? 'transform 0.28s ease' : 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '32px',
          }}>
            <div style={{ fontSize: '72px' }}>{current?.emoji}</div>
            <div style={{ fontSize: '26px', fontWeight: '700', textAlign: 'center' }}>{current?.name}</div>
            <div style={{ fontSize: '13px', color: '#888', textAlign: 'center', lineHeight: 1.6 }}>{current?.desc}</div>
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

export default function CategoryPage() {
  return (
    <Suspense>
      <CategoryContent />
    </Suspense>
  )
}