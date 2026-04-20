'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '../components/Header'
import SwipeCard from '../components/SwipeCard'

const categories: Record<string, { id: number; name: string; emoji: string; desc: string }[]> = {
  'カメラ': [
    { id: 1, name: 'ミラーレス一眼', emoji: '📷', desc: 'Sony・Fujifilm・Canon' },
    { id: 2, name: 'アクションカメラ', emoji: '🎥', desc: 'GoPro・DJI・Insta360' },
    { id: 3, name: 'ドローン', emoji: '🚁', desc: '空撮・入門・プロ向け' },
    { id: 4, name: 'カメラアクセサリ', emoji: '🎞', desc: 'レンズ・三脚・バッグ' },
    { id: 5, name: 'プリンター', emoji: '🖨', desc: 'フォトプリンター・ポラロイド' },
  ],
  'スマートホーム': [
    { id: 1, name: 'スマートスピーカー', emoji: '🔊', desc: 'Echo・HomePod・Google' },
    { id: 2, name: 'スマート照明', emoji: '💡', desc: 'Hue・スマート電球' },
    { id: 3, name: 'セキュリティ', emoji: '🔒', desc: '防犯カメラ・スマートロック' },
    { id: 4, name: 'スマート家電', emoji: '🏠', desc: 'ロボット掃除機・自動給餌器' },
    { id: 5, name: 'Wi-Fi・ネットワーク', emoji: '📡', desc: 'ルーター・メッシュWi-Fi' },
  ],
  'コスメ・美容': [
    { id: 1, name: 'スキンケア', emoji: '🧴', desc: '化粧水・美容液・クリーム' },
    { id: 2, name: 'メイク', emoji: '💄', desc: 'ファンデ・リップ・アイシャドウ' },
    { id: 3, name: 'ヘアケア', emoji: '💇', desc: 'ドライヤー・シャンプー・トリートメント' },
    { id: 4, name: '香水', emoji: '🌸', desc: 'フレグランス・ボディミスト' },
    { id: 5, name: '美容家電', emoji: '✨', desc: '美顔器・脱毛器・ヘアアイロン' },
  ],
  '食品・グルメ': [
    { id: 1, name: 'お菓子・スイーツ', emoji: '🍫', desc: 'チョコ・クッキー・ケーキ' },
    { id: 2, name: 'コーヒー・お茶', emoji: '☕', desc: '豆・ティーバッグ・抹茶' },
    { id: 3, name: 'お取り寄せグルメ', emoji: '🍱', desc: '肉・海産物・ご当地グルメ' },
    { id: 4, name: '調味料・パントリー', emoji: '🧂', desc: 'オリーブオイル・スパイス・だし' },
    { id: 5, name: 'お酒', emoji: '🍺', desc: 'クラフトビール・ワイン・日本酒' },
  ],
  '音楽': [
    { id: 1, name: 'ギター', emoji: '🎸', desc: 'アコギ・エレキ・ベース' },
    { id: 2, name: 'DTM・機材', emoji: '🎛', desc: 'オーディオインターフェース・DAW' },
    { id: 3, name: 'スピーカー', emoji: '🔈', desc: 'Bluetooth・据え置き・防水' },
    { id: 4, name: 'レコード', emoji: '🎵', desc: 'ターンテーブル・アナログ盤' },
    { id: 5, name: 'ピアノ・鍵盤', emoji: '🎹', desc: '電子ピアノ・キーボード' },
  ],
  'ホビー': [
    { id: 1, name: 'プラモデル', emoji: '🤖', desc: 'ガンプラ・スケールモデル' },
    { id: 2, name: 'フィギュア', emoji: '🗿', desc: 'アニメ・ゲーム・海外' },
    { id: 3, name: '手芸・クラフト', emoji: '🧶', desc: '編み物・裁縫・レジン' },
    { id: 4, name: '絵画・イラスト', emoji: '🎨', desc: '画材・デジタルペン・キャンバス' },
    { id: 5, name: 'ボードゲーム', emoji: '🎲', desc: 'カードゲーム・パズル・将棋' },
  ],
  '健康・医療': [
    { id: 1, name: 'サプリメント', emoji: '💊', desc: 'ビタミン・プロテイン・コラーゲン' },
    { id: 2, name: 'マッサージ・リカバリー', emoji: '💆', desc: 'マッサージガン・温熱器' },
    { id: 3, name: '健康機器', emoji: '🩺', desc: '血圧計・体温計・血糖計' },
    { id: 4, name: 'ダイエット', emoji: '⚖️', desc: '体重計・サポーター・食事管理' },
    { id: 5, name: '睡眠', emoji: '😴', desc: '枕・マットレス・アイマスク' },
  ],
  'ペット': [
    { id: 1, name: '犬用品', emoji: '🐶', desc: 'おもちゃ・リード・ベッド' },
    { id: 2, name: '猫用品', emoji: '🐱', desc: 'キャットタワー・おもちゃ・トイレ' },
    { id: 3, name: 'ペットフード', emoji: '🦴', desc: 'ドライ・ウェット・おやつ' },
    { id: 4, name: '小動物・その他', emoji: '🐹', desc: 'ハムスター・うさぎ・熱帯魚' },
    { id: 5, name: 'ペットケア', emoji: '🛁', desc: 'シャンプー・ブラシ・爪切り' },
  ],
  'DIY・工具': [
    { id: 1, name: '電動工具', emoji: '🔧', desc: 'ドリル・丸ノコ・サンダー' },
    { id: 2, name: '塗装・仕上げ', emoji: '🎨', desc: 'ペンキ・スプレー・刷毛' },
    { id: 3, name: '収納・整理', emoji: '🗄', desc: 'ラック・ツールボックス' },
    { id: 4, name: 'ガーデニング', emoji: '🌱', desc: '土・肥料・植木鉢・道具' },
    { id: 5, name: '防災・アウトドア用品', emoji: '🔦', desc: '懐中電灯・非常食・テント' },
  ],
  'カー用品': [
    { id: 1, name: 'カーナビ・オーディオ', emoji: '🗺', desc: 'ポータブルナビ・スピーカー' },
    { id: 2, name: 'ドライブレコーダー', emoji: '📹', desc: '前後カメラ・360度' },
    { id: 3, name: 'カーケア', emoji: '🚗', desc: 'コーティング・洗車用品' },
    { id: 4, name: 'シートカバー・内装', emoji: '💺', desc: 'シートカバー・芳香剤' },
    { id: 5, name: 'タイヤ・外装', emoji: '🔩', desc: 'タイヤ・ホイール・ステッカー' },
  ],
  'ベビー・キッズ': [
    { id: 1, name: 'おもちゃ', emoji: '🧸', desc: 'ぬいぐるみ・ブロック・知育' },
    { id: 2, name: '育児グッズ', emoji: '🍼', desc: '哺乳瓶・抱っこ紐・ベビーカー' },
    { id: 3, name: 'ベビー服', emoji: '👶', desc: 'ロンパース・肌着・帽子' },
    { id: 4, name: 'チャイルドシート', emoji: '🚗', desc: '新生児・幼児・ジュニア' },
    { id: 5, name: 'お食事グッズ', emoji: '🥄', desc: '離乳食・食器・エプロン' },
  ],
  '学習・教育': [
    { id: 1, name: '参考書・問題集', emoji: '📝', desc: '受験・資格・語学' },
    { id: 2, name: '文具', emoji: '✏️', desc: 'ノート・ペン・手帳' },
    { id: 3, name: '知育・STEM', emoji: '🔬', desc: 'プログラミング・理科実験' },
    { id: 4, name: 'タブレット学習', emoji: '📱', desc: 'スタディタブレット・教材' },
    { id: 5, name: '語学学習', emoji: '🌍', desc: '英語・中国語・テキスト' },
  ],
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
        if (selected.length === 0) {
          // 全部スキップなら最初のカテゴリへ
          router.push(`/swipe?genre=${genres[0]}&categories=${allItems[0].name}`)
        } else {
          // LIKEした全カテゴリをカンマ区切りで渡す
          const categoryNames = selected.map(c => c.name).join(',')
          const genre = selected[0].genre
          router.push(`/swipe?genre=${genre}&categories=${categoryNames}`)
        }
      } else {
        setIndex(prev => prev + 1)
      }
    }, 320)
  }

  return (
    <>
      <Header />
      <main style={{ background: '#F3F3F3', minHeight: '100vh', color: '#0F1111', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px', maxWidth: '480px', margin: '0 auto' }}>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <button onClick={() => router.push('/genre')} style={{ background: 'none', border: 'none', color: '#565959', fontSize: '14px', padding: 0, cursor: 'pointer' }}>← 戻る</button>
          <span style={{ color: '#565959', fontSize: '14px' }}>{index + 1} / {allItems.length}</span>
        </div>

        <div style={{ width: '100%', marginBottom: '8px' }}>
          <div style={{ fontSize: '12px', color: '#FF9900', fontWeight: '700', marginBottom: '4px' }}>STEP 2 · {current?.genre}</div>
          <div style={{ fontSize: '20px', fontWeight: '700' }}>カテゴリを選ぼう</div>
          <div style={{ fontSize: '13px', color: '#565959', marginTop: '4px' }}>気になったら右、興味なければ左</div>
        </div>

        <div style={{ width: '100%', height: '4px', background: '#DDD', borderRadius: '2px', marginBottom: '16px' }}>
          <div style={{ height: '100%', background: '#FF9900', borderRadius: '2px', width: `${((index + 1) / allItems.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>

        {likedCategories.length > 0 && (
          <div style={{ width: '100%', display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {likedCategories.map((c, i) => (
              <span key={i} style={{ background: '#FFF3CD', color: '#FF9900', fontSize: '12px', padding: '4px 10px', borderRadius: '20px', border: '1px solid #FF9900' }}>{c.name}</span>
            ))}
          </div>
        )}

        <div style={{ width: '100%', position: 'relative', height: '300px', marginBottom: '24px' }}>
          {next && (
            <div style={{ position: 'absolute', inset: 0, background: '#fff', border: '1px solid #DDD', borderRadius: '16px', transform: 'scale(0.95) translateY(8px)', zIndex: 0 }} />
          )}
          <SwipeCard onSwipe={handleSwipe} animating={animating}>
            <div style={{
              position: 'absolute', inset: 0, background: '#fff', border: '1px solid #DDD', borderRadius: '16px', overflow: 'hidden',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '32px',
            }}>
              <div style={{ fontSize: '72px', pointerEvents: 'none' }}>{current?.emoji}</div>
              <div style={{ fontSize: '26px', fontWeight: '700', textAlign: 'center', color: '#0F1111', pointerEvents: 'none' }}>{current?.name}</div>
              <div style={{ fontSize: '13px', color: '#565959', textAlign: 'center', lineHeight: 1.6, pointerEvents: 'none' }}>{current?.desc}</div>
            </div>
          </SwipeCard>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={() => handleSwipe('left')} style={{ width: '64px', height: '64px', borderRadius: '50%', border: '1px solid #DDD', background: '#fff', fontSize: '26px', color: '#565959', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✕</button>
          <button onClick={() => handleSwipe('right')} style={{ width: '72px', height: '72px', borderRadius: '50%', border: 'none', background: '#FFD814', fontSize: '28px', color: '#0F1111', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>♥</button>
        </div>

        <div style={{ marginTop: '16px', fontSize: '12px', color: '#888' }}>← 興味なし ／ 興味あり →</div>
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
