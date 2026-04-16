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

const faqs = [
  {
    q: '無料で使えますか？',
    a: 'はい、アマナビは完全無料でご利用いただけます。会員登録も不要です。',
  },
  {
    q: '商品はどこで購入できますか？',
    a: 'すべての商品はAmazon.co.jpでご購入いただけます。「Amazonで見る」ボタンを押すとAmazonの商品ページに移動します。',
  },
  {
    q: 'どんなジャンルに対応していますか？',
    a: 'ガジェット・ゲーム・本・漫画・ファッション・インテリア・スポーツの6ジャンル、30以上のカテゴリに対応しています。',
  },
  {
    q: '個人情報は収集されますか？',
    a: 'アマナビは個人情報を収集しません。スワイプした内容はブラウザ内のみで処理され、外部に送信されることはありません。',
  },
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

        {/* アマナビについて */}
        <div style={{ padding: '24px 16px 0' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>アマナビとは</div>
          <div style={{ background: '#ffffff', border: '1px solid #DDD', borderRadius: '8px', padding: '16px', fontSize: '14px', color: '#333', lineHeight: 1.8 }}>
            <p style={{ marginBottom: '12px' }}>
              アマナビは「Amazonで何を買えばいいかわからない」という悩みを解決するためのサービスです。
            </p>
            <p style={{ marginBottom: '12px' }}>
              Amazonには数百万点以上の商品があり、検索しても似たような商品が大量に表示されて選べない、という経験をしたことはありませんか？
            </p>
            <p>
              アマナビでは、スワイプ操作で好みを伝えるだけで、あなたにぴったりの商品を絞り込んで表示します。プロテイン、イヤホン、ゲームソフトなど、カテゴリごとに最適な商品をすぐに見つけられます。
            </p>
          </div>
        </div>

        {/* よくある質問 */}
        <div style={{ padding: '24px 16px 0' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>よくある質問</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {faqs.map((item, i) => (
              <div key={i} style={{ background: '#ffffff', border: '1px solid #DDD', borderRadius: '8px', padding: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F1111', marginBottom: '8px' }}>Q. {item.q}</div>
                <div style={{ fontSize: '13px', color: '#565959', lineHeight: 1.7 }}>A. {item.a}</div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  )
}
