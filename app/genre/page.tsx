'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'

const genres = [
  // ガジェット・テック
  { name: 'ガジェット', emoji: '📱', desc: 'スマホ・イヤホン・PC周辺', color: '#1a1a2e' },
  { name: 'ゲーム', emoji: '🎮', desc: 'Switch・PS5・PCゲーム', color: '#0f3460' },
  { name: 'カメラ', emoji: '📷', desc: '一眼・ミラーレス・アクション', color: '#1a2a1a' },
  { name: 'スマートホーム', emoji: '🏠', desc: '音声アシスト・スマート家電', color: '#2a1a2a' },
  // ライフスタイル
  { name: 'ファッション', emoji: '👕', desc: 'トップス・シューズ・バッグ', color: '#3d1a1a' },
  { name: 'コスメ・美容', emoji: '💄', desc: 'スキンケア・メイク・香水', color: '#3d1a2d' },
  { name: 'インテリア', emoji: '🛋', desc: '家電・照明・収納', color: '#1a2d3d' },
  { name: '食品・グルメ', emoji: '🍜', desc: 'お菓子・調味料・お取り寄せ', color: '#3d2a1a' },
  // 趣味・エンタメ
  { name: '本・漫画', emoji: '📚', desc: 'ビジネス書・小説・漫画', color: '#2d4a22' },
  { name: 'スポーツ', emoji: '⚽', desc: 'トレーニング・アウトドア', color: '#1a3d2d' },
  { name: '音楽', emoji: '🎸', desc: '楽器・DTM・レコード', color: '#2d1a3d' },
  { name: 'ホビー', emoji: '🎨', desc: 'プラモデル・フィギュア・手芸', color: '#1a2a3d' },
  // 生活・実用
  { name: '健康・医療', emoji: '💊', desc: 'サプリ・医療機器・マッサージ', color: '#1a3a2a' },
  { name: 'ペット', emoji: '🐾', desc: '犬・猫・小動物グッズ', color: '#2a3a1a' },
  { name: 'DIY・工具', emoji: '🔧', desc: '電動工具・塗料・材料', color: '#2a2a1a' },
  { name: 'カー用品', emoji: '🚗', desc: 'カーナビ・パーツ・ケア用品', color: '#1a1a3a' },
  // ベビー・キッズ
  { name: 'ベビー・キッズ', emoji: '🍼', desc: 'おもちゃ・育児グッズ', color: '#3a1a3a' },
  { name: '学習・教育', emoji: '✏️', desc: '参考書・知育・文具', color: '#1a3a3a' },
]

export default function GenrePage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (name: string) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    )
  }

  const handleNext = () => {
    if (selected.length === 0) return
    router.push(`/category?genres=${selected.join(',')}`)
  }

  return (
    <>
      <Header />
      <main style={{ background: '#F3F3F3', minHeight: '100vh', color: '#0F1111', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', paddingBottom: '100px' }}>

        {/* ヘッダー */}
        <div style={{ background: '#131921', padding: '20px 16px 24px' }}>
          <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '13px', padding: 0, cursor: 'pointer', marginBottom: '12px', display: 'block' }}>← 戻る</button>
          <div style={{ fontSize: '11px', color: '#FF9900', fontWeight: '700', marginBottom: '6px' }}>STEP 1</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>興味あるジャンルを選ぼう</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>複数選択できます（{selected.length}個選択中）</div>
        </div>

        {/* ジャンルグリッド */}
        <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {genres.map(g => {
            const isSelected = selected.includes(g.name)
            return (
              <button
                key={g.name}
                onClick={() => toggle(g.name)}
                style={{
                  background: isSelected ? g.color : '#fff',
                  border: isSelected ? '2px solid #FF9900' : '1px solid #DDD',
                  borderRadius: '14px',
                  padding: '16px 14px',
                  textAlign: 'left',
                  color: isSelected ? '#fff' : '#0F1111',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.15s',
                  boxShadow: isSelected ? '0 4px 16px rgba(255,153,0,0.3)' : 'none',
                }}
              >
                {isSelected && (
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#FF9900', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: '#fff' }}>✓</div>
                )}
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>{g.emoji}</div>
                <div style={{ fontSize: '13px', fontWeight: '700' }}>{g.name}</div>
                <div style={{ fontSize: '11px', color: isSelected ? 'rgba(255,255,255,0.6)' : '#888', marginTop: '3px' }}>{g.desc}</div>
              </button>
            )
          })}
        </div>

        {/* 次へボタン（固定） */}
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', padding: '16px', background: 'rgba(243,243,243,0.95)', backdropFilter: 'blur(8px)', borderTop: '1px solid #DDD' }}>
          <button
            onClick={handleNext}
            disabled={selected.length === 0}
            style={{
              width: '100%',
              background: selected.length > 0 ? 'linear-gradient(90deg, #FFD814, #FF9900)' : '#DDD',
              color: selected.length > 0 ? '#0F1111' : '#999',
              border: 'none',
              borderRadius: '12px',
              padding: '14px',
              fontSize: '16px',
              fontWeight: '800',
              cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
              boxShadow: selected.length > 0 ? '0 4px 16px rgba(255,153,0,0.3)' : 'none',
            }}
          >
            {selected.length > 0 ? `${selected.length}個のジャンルで探す →` : 'ジャンルを選んでください'}
          </button>
        </div>
      </main>
    </>
  )
}
