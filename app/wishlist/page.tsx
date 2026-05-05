'use client'

import Header from '../components/Header'

const categoryEmoji: Record<string, string> = {
  'ガジェット': '📱', 'ゲーム': '🎮', 'カメラ': '📷', 'スマートホーム': '🏠',
  'ファッション': '👕', 'コスメ・美容': '💄', 'インテリア': '🛋', '食品・グルメ': '🍜',
  '本・漫画': '📚', 'スポーツ': '⚽', '音楽': '🎸', 'ホビー': '🎨',
  '健康・医療': '💊', 'ペット': '🐾', 'DIY・工具': '🔧', 'カー用品': '🚗',
  'ベビー・キッズ': '🍼', '学習・教育': '✏️', 'その他': '🛒',
}

const items: { name: string; category: string; url: string }[] = [
  {
    name: 'ソフケン(Sofken) アルミ額縁 スリムエイト A2 ブラック',
    category: 'カメラ',
    url: 'https://amzn.to/4cWg4hU',
  },
  {
    name: 'anan(アンアン)2026/05/20号 No.2495増刊 スペシャルエディション[Black onyX]',
    category: '本・雑誌',
    url: 'https://amzn.to/4cZS0K4',
  },
  {
    name: '【形状記憶・3秒ととのえる】日傘 UVカット率100% スマートセーフティロック ワンタッチ自動開閉 折り畳み 超軽量 完全遮光 UPF50+ 晴雨兼用',
    category: 'ファッション小物',
    url: 'https://amzn.to/4w9qSkv',
  },
]

export default function WishlistPage() {
  return (
    <>
      <Header />
      <main style={{ background: '#F3F3F3', minHeight: '100vh', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', paddingBottom: '40px' }}>

        <div style={{ background: '#131921', padding: '20px 16px 24px', marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', color: '#FF9900', fontWeight: '700', marginBottom: '6px' }}>PICK UP</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>おすすめ商品リスト</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>実際に使ってみたい・気になる商品を厳選</div>
        </div>

        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: '#fff',
                borderRadius: '14px',
                border: '1px solid #DDD',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '12px',
                  background: '#F3F3F3', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '28px', flexShrink: 0,
                }}>
                  {categoryEmoji[item.category] ?? '🛒'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', color: '#FF9900', fontWeight: '700', marginBottom: '4px' }}>{item.category}</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#0F1111', lineHeight: 1.4 }}>{item.name}</div>
                </div>
                <div style={{ fontSize: '20px', color: '#FF9900', flexShrink: 0 }}>→</div>
              </div>
            </a>
          ))}
        </div>

      </main>
    </>
  )
}
