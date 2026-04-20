'use client'

import { useRouter } from 'next/navigation'
import Header from './components/Header'
import { useState } from 'react'

const genres = [
  { name: 'ガジェット', emoji: '📱', desc: 'スマホ・イヤホン・PC', color: '#1a1a2e' },
  { name: 'ゲーム', emoji: '🎮', desc: 'Switch・PS5・PCゲーム', color: '#0f3460' },
  { name: '本・漫画', emoji: '📚', desc: 'ビジネス書・小説・漫画', color: '#2d4a22' },
  { name: 'ファッション', emoji: '👕', desc: 'トップス・シューズ・バッグ', color: '#3d1a1a' },
  { name: 'インテリア', emoji: '🛋', desc: '家電・照明・収納', color: '#1a2d3d' },
  { name: 'スポーツ', emoji: '⚽', desc: 'トレーニング・アウトドア', color: '#1a3d2d' },
]

const faqs = [
  { q: '無料で使えますか？', a: 'はい、完全無料・会員登録不要でご利用いただけます。' },
  { q: '商品はどこで購入できますか？', a: '「Amazonで見る」ボタンを押すとAmazon.co.jpの商品ページに移動します。' },
  { q: 'どんなジャンルに対応していますか？', a: '6ジャンル・30以上のカテゴリに対応しています。' },
  { q: '個人情報は収集されますか？', a: 'スワイプした内容はブラウザ内のみで処理され、外部には一切送信されません。' },
]

export default function Home() {
  const router = useRouter()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Header />
      <main style={{ background: '#F3F3F3', minHeight: '100vh', color: '#0F1111', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', paddingBottom: '60px' }}>

        {/* ヒーロー */}
        <div style={{
          background: 'linear-gradient(160deg, #131921 60%, #1e2d3d)',
          padding: '32px 20px 36px',
          marginBottom: '0',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* 背景の装飾 */}
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,153,0,0.06)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,216,20,0.04)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-block', background: 'rgba(255,153,0,0.2)', border: '1px solid rgba(255,153,0,0.4)', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', color: '#FF9900', fontWeight: '700', marginBottom: '12px', letterSpacing: '0.5px' }}>
              ✦ AIレコメンド
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', lineHeight: 1.3, marginBottom: '10px', letterSpacing: '-0.5px' }}>
              Amazonで<br />
              <span style={{ color: '#FFD814' }}>迷わない</span>、<br />選び抜く。
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '24px', lineHeight: 1.7 }}>
              スワイプするだけで、数百万点の中から<br />あなたにぴったりの商品が見つかる。
            </div>
            <button
              onClick={() => router.push('/genre')}
              style={{
                background: 'linear-gradient(90deg, #FFD814, #FF9900)',
                color: '#0F1111',
                border: 'none',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '16px',
                fontWeight: '800',
                width: '100%',
                cursor: 'pointer',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 20px rgba(255,153,0,0.4)',
              }}
            >
              診断スタート →
            </button>
          </div>
        </div>

        {/* 統計バー */}
        <div style={{ background: '#131921', padding: '12px 20px', display: 'flex', justifyContent: 'space-around', marginBottom: '24px' }}>
          {[
            { num: '6', label: 'ジャンル' },
            { num: '30+', label: 'カテゴリ' },
            { num: '150+', label: '商品' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#FFD814' }}>{stat.num}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ジャンルから探す */}
        <div style={{ padding: '0 16px', marginBottom: '28px' }}>
          <div style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px', color: '#0F1111', letterSpacing: '-0.3px' }}>
            ジャンルから探す
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {genres.map(g => (
              <button
                key={g.name}
                onClick={() => router.push(`/category?genres=${g.name}`)}
                style={{
                  background: g.color,
                  border: 'none',
                  borderRadius: '14px',
                  padding: '18px 14px',
                  textAlign: 'left',
                  color: '#fff',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{g.emoji}</div>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>{g.name}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '3px' }}>{g.desc}</div>
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', color: 'rgba(255,255,255,0.3)', fontSize: '18px' }}>→</div>
              </button>
            ))}
          </div>
        </div>

        {/* 使い方 */}
        <div style={{ padding: '0 16px', marginBottom: '28px' }}>
          <div style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.3px' }}>使い方</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#DDD', borderRadius: '12px', overflow: 'hidden' }}>
            {[
              { step: '01', icon: '👆', text: 'ジャンルをスワイプして好みを選ぶ' },
              { step: '02', icon: '🎯', text: 'カテゴリをスワイプしてさらに絞り込む' },
              { step: '03', icon: '🛒', text: 'ぴったりの商品がAmazonで見つかる' },
            ].map((item, i) => (
              <div key={item.step} style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#131921', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#FF9900', fontWeight: '700', marginBottom: '2px' }}>STEP {item.step}</div>
                  <div style={{ fontSize: '14px', color: '#0F1111', fontWeight: '600' }}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* アマナビとは */}
        <div style={{ margin: '0 16px 28px', background: 'linear-gradient(135deg, #131921, #1e2d3d)', borderRadius: '16px', padding: '24px', color: '#fff' }}>
          <div style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.3px' }}>アマナビとは</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            Amazonの商品が多すぎて選べない、そんな悩みを解決するためのサービスです。スワイプで好みを伝えるだけで、あなたにぴったりの商品を絞り込んで表示します。
          </div>
          <button
            onClick={() => router.push('/genre')}
            style={{ marginTop: '16px', background: 'rgba(255,216,20,0.15)', border: '1px solid rgba(255,216,20,0.3)', color: '#FFD814', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', width: '100%' }}
          >
            さっそく試してみる →
          </button>
        </div>

        {/* よくある質問 */}
        <div style={{ padding: '0 16px' }}>
          <div style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.3px' }}>よくある質問</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {faqs.map((item, i) => (
              <div
                key={i}
                style={{ background: '#fff', border: '1px solid #DDD', borderRadius: '10px', overflow: 'hidden' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', background: 'none', border: 'none', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
                >
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F1111' }}>Q. {item.q}</div>
                  <div style={{ fontSize: '18px', color: '#FF9900', transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginLeft: '8px' }}>+</div>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 16px 14px', fontSize: '13px', color: '#565959', lineHeight: 1.7, borderTop: '1px solid #F3F3F3' }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  )
}
