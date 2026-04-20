'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '../components/Header'

const refineQuestions: Record<string, {
  questions: { key: string; label: string; options: { label: string; keyword: string }[] }[]
  baseKeyword: string
}> = {
  'イヤホン': {
    baseKeyword: 'ワイヤレスイヤホン',
    questions: [
      { key: 'type', label: '接続方式は？', options: [
        { label: '完全ワイヤレス（TWS）', keyword: '完全ワイヤレスイヤホン' },
        { label: 'ネックバンド型', keyword: 'ネックバンド Bluetooth イヤホン' },
        { label: '有線', keyword: '有線イヤホン 高音質' },
      ]},
      { key: 'feature', label: '重視する機能は？', options: [
        { label: 'ノイキャン最強', keyword: 'ノイズキャンセリング 最強' },
        { label: '音質重視', keyword: '高音質 audiophile' },
        { label: 'コスパ重視', keyword: 'コスパ 安い おすすめ' },
      ]},
      { key: 'budget', label: '予算は？', options: [
        { label: '〜5,000円', keyword: '5000円以下' },
        { label: '〜20,000円', keyword: '' },
        { label: '上限なし', keyword: 'ハイエンド プレミアム' },
      ]},
    ],
  },
  'モニター': {
    baseKeyword: 'PCモニター',
    questions: [
      { key: 'use', label: '用途は？', options: [
        { label: 'ゲーミング', keyword: 'ゲーミングモニター 144Hz 人気' },
        { label: 'テレワーク・仕事', keyword: 'オフィスモニター USB-C 人気' },
        { label: '映像・クリエイター', keyword: '4Kモニター 色域 クリエイター' },
      ]},
      { key: 'size', label: 'サイズは？', options: [
        { label: '24インチ以下', keyword: '24インチ' },
        { label: '27インチ', keyword: '27インチ' },
        { label: '32インチ以上', keyword: '32インチ ウルトラワイド' },
      ]},
    ],
  },
  'PC周辺機器': {
    baseKeyword: 'PC周辺機器',
    questions: [
      { key: 'type', label: '何を探してますか？', options: [
        { label: 'キーボード', keyword: 'メカニカルキーボード 人気' },
        { label: 'マウス', keyword: 'ワイヤレスマウス 人気' },
        { label: 'Webカメラ', keyword: 'Webカメラ フルHD 人気' },
        { label: 'USBハブ・充電器', keyword: 'USB-C ハブ 充電器 人気' },
      ]},
    ],
  },
  'Nintendo Switch': {
    baseKeyword: 'Nintendo Switch',
    questions: [
      { key: 'type', label: '何を探してますか？', options: [
        { label: '本体', keyword: 'Nintendo Switch 本体' },
        { label: 'ゲームソフト（RPG）', keyword: 'Nintendo Switch RPG 人気 売れ筋' },
        { label: 'ゲームソフト（アクション）', keyword: 'Nintendo Switch アクション 人気' },
        { label: 'アクセサリ', keyword: 'Nintendo Switch アクセサリ 人気' },
      ]},
    ],
  },
  'PlayStation': {
    baseKeyword: 'PS5',
    questions: [
      { key: 'type', label: '何を探してますか？', options: [
        { label: '本体・コントローラー', keyword: 'PS5 本体 DualSense' },
        { label: 'アクション・RPG', keyword: 'PS5 アクションRPG 人気 売れ筋' },
        { label: 'FPS・シューター', keyword: 'PS5 FPS 人気' },
        { label: 'スポーツ', keyword: 'PS5 スポーツ ゲーム 人気' },
      ]},
    ],
  },
  'PCゲーム': {
    baseKeyword: 'ゲーミング',
    questions: [
      { key: 'type', label: '何を探してますか？', options: [
        { label: 'ゲーミングマウス', keyword: 'ゲーミングマウス 人気 売れ筋' },
        { label: 'ゲーミングキーボード', keyword: 'ゲーミングキーボード メカニカル 人気' },
        { label: 'ヘッドセット', keyword: 'ゲーミングヘッドセット 人気' },
        { label: 'ゲーミングチェア', keyword: 'ゲーミングチェア 人気' },
      ]},
    ],
  },
  '筋トレ': {
    baseKeyword: '筋トレ',
    questions: [
      { key: 'goal', label: '目的は？', options: [
        { label: '筋肥大・増量', keyword: 'プロテイン 筋肥大 ホエイ 人気' },
        { label: 'ダイエット・減量', keyword: 'プロテイン ダイエット 低カロリー' },
        { label: 'トレーニング器具', keyword: 'トレーニング器具 自宅 人気 売れ筋' },
        { label: 'サプリ・栄養', keyword: 'EAA BCAA クレアチン 人気' },
      ]},
      { key: 'budget', label: '予算は？', options: [
        { label: '〜3,000円', keyword: 'コスパ 安い' },
        { label: '〜10,000円', keyword: '' },
        { label: '上限なし', keyword: '高品質 プレミアム' },
      ]},
    ],
  },
  'ランニング': {
    baseKeyword: 'ランニング',
    questions: [
      { key: 'type', label: '何を探してますか？', options: [
        { label: 'シューズ', keyword: 'ランニングシューズ 人気 売れ筋' },
        { label: 'ウェア', keyword: 'ランニングウェア 速乾 人気' },
        { label: 'GPS・スマートウォッチ', keyword: 'ランニング GPS スマートウォッチ 人気' },
        { label: 'その他グッズ', keyword: 'ランニング グッズ 便利 人気' },
      ]},
    ],
  },
  'スキンケア': {
    baseKeyword: 'スキンケア',
    questions: [
      { key: 'concern', label: '肌の悩みは？', options: [
        { label: '乾燥・保湿', keyword: '保湿 スキンケア 乾燥肌 人気' },
        { label: 'ニキビ・毛穴', keyword: 'ニキビケア 毛穴 スキンケア 人気' },
        { label: '美白・シミ', keyword: '美白 スキンケア ビタミンC 人気' },
        { label: 'エイジングケア', keyword: 'エイジングケア 美容液 ハリ 人気' },
      ]},
      { key: 'budget', label: '予算は？', options: [
        { label: 'プチプラ（〜3,000円）', keyword: 'プチプラ コスパ' },
        { label: 'ミドル（〜10,000円）', keyword: '' },
        { label: 'デパコス（上限なし）', keyword: '高級 ラグジュアリー' },
      ]},
    ],
  },
  '美容家電': {
    baseKeyword: '美容家電',
    questions: [
      { key: 'type', label: '何を探してますか？', options: [
        { label: 'ドライヤー', keyword: 'ドライヤー 速乾 人気 売れ筋' },
        { label: '美顔器', keyword: '美顔器 家庭用 人気 売れ筋' },
        { label: 'ヘアアイロン', keyword: 'ヘアアイロン 人気 売れ筋' },
        { label: '脱毛器', keyword: '家庭用脱毛器 人気 売れ筋' },
      ]},
    ],
  },
  'キッチン家電': {
    baseKeyword: 'キッチン家電',
    questions: [
      { key: 'type', label: '何を探してますか？', options: [
        { label: 'コーヒーメーカー', keyword: 'コーヒーメーカー 全自動 人気 売れ筋' },
        { label: '炊飯器', keyword: '炊飯器 人気 売れ筋 おすすめ' },
        { label: 'オーブン・トースター', keyword: 'オーブントースター 人気 売れ筋' },
        { label: 'ミキサー・フードプロセッサー', keyword: 'ミキサー フードプロセッサー 人気' },
      ]},
    ],
  },
  '犬用品': {
    baseKeyword: '犬',
    questions: [
      { key: 'type', label: '何を探してますか？', options: [
        { label: 'ドッグフード', keyword: 'ドッグフード 人気 売れ筋 総合栄養食' },
        { label: 'おもちゃ', keyword: '犬 おもちゃ 人気 売れ筋' },
        { label: 'ベッド・クレート', keyword: '犬 ベッド クレート 人気' },
        { label: 'お散歩グッズ', keyword: '犬 リード ハーネス 人気 売れ筋' },
      ]},
    ],
  },
  '猫用品': {
    baseKeyword: '猫',
    questions: [
      { key: 'type', label: '何を探してますか？', options: [
        { label: 'キャットフード', keyword: 'キャットフード 人気 売れ筋 総合栄養食' },
        { label: 'おもちゃ', keyword: '猫 おもちゃ 人気 売れ筋' },
        { label: 'キャットタワー', keyword: 'キャットタワー 人気 売れ筋' },
        { label: 'トイレ用品', keyword: '猫 システムトイレ 砂 人気' },
      ]},
    ],
  },
  'ビジネス書': {
    baseKeyword: 'ビジネス書',
    questions: [
      { key: 'theme', label: '興味あるテーマは？', options: [
        { label: 'お金・投資', keyword: 'お金 投資 資産形成 本 ベストセラー' },
        { label: 'マーケティング・仕事術', keyword: 'マーケティング 仕事術 ビジネス本' },
        { label: '自己啓発・思考法', keyword: '自己啓発 思考法 本 ベストセラー 2024' },
        { label: 'リーダーシップ・経営', keyword: 'リーダーシップ 経営 マネジメント 本' },
      ]},
    ],
  },
  '漫画': {
    baseKeyword: '漫画',
    questions: [
      { key: 'genre', label: '好きなジャンルは？', options: [
        { label: '少年・バトル', keyword: '少年漫画 人気 売れ筋 ランキング' },
        { label: '少女・恋愛', keyword: '少女漫画 恋愛 人気 売れ筋' },
        { label: 'SF・ファンタジー', keyword: 'SF ファンタジー 漫画 人気' },
        { label: '完結済みおすすめ', keyword: '漫画 完結 おすすめ 名作' },
      ]},
    ],
  },
  'default': {
    baseKeyword: '',
    questions: [
      { key: 'sort', label: 'どんな商品を探してますか？', options: [
        { label: '人気・売れ筋', keyword: '人気 売れ筋 ランキング' },
        { label: 'コスパ重視', keyword: 'コスパ 安い おすすめ' },
        { label: '高品質・プレミアム', keyword: '高品質 プレミアム' },
        { label: '最新モデル', keyword: '最新 2025年' },
      ]},
    ],
  },
}

function RefineContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const genre = searchParams.get('genre') ?? ''
  const category = searchParams.get('category') ?? ''

  const config = refineQuestions[category] ?? refineQuestions['default']
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [step, setStep] = useState(0)

  const currentQuestion = config.questions[step]
  const totalSteps = config.questions.length

  const goToAmazon = (extraKeyword?: string) => {
    const allAnswers = extraKeyword !== undefined
      ? { ...answers, [currentQuestion.key]: extraKeyword }
      : answers
    const keywords = [
      config.baseKeyword || category,
      ...Object.values(allAnswers).filter(v => v !== ''),
    ].join(' ').trim()
    const url = `https://www.amazon.co.jp/s?k=${encodeURIComponent(keywords)}&tag=amanavi05-22`
    window.open(url, '_blank')
    router.push('/')
  }

  const handleSelect = (keyword: string) => {
    const newAnswers = { ...answers, [currentQuestion.key]: keyword }
    setAnswers(newAnswers)
    if (step + 1 < totalSteps) {
      setStep(prev => prev + 1)
    } else {
      goToAmazon(keyword)
    }
  }

  return (
    <>
      <Header />
      <main style={{ background: '#F3F3F3', minHeight: '100vh', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>

        <div style={{ background: '#131921', padding: '20px 16px 28px' }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '13px', padding: 0, cursor: 'pointer', marginBottom: '12px', display: 'block' }}>← 戻る</button>
          <div style={{ fontSize: '11px', color: '#FF9900', fontWeight: '700', marginBottom: '6px' }}>STEP 3 · {genre} / {category}</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>もう少し教えてください</div>
          <div style={{ marginTop: '16px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
            <div style={{ height: '100%', background: '#FF9900', borderRadius: '2px', width: `${((step + 1) / totalSteps) * 100}%`, transition: 'width 0.3s' }} />
          </div>
          <div style={{ marginTop: '6px', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{step + 1} / {totalSteps}</div>
        </div>

        <div style={{ flex: 1, padding: '32px 16px 24px' }}>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#0F1111', marginBottom: '24px', lineHeight: 1.4 }}>
            {currentQuestion.label}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentQuestion.options.map((option) => (
              <button
                key={option.label}
                onClick={() => handleSelect(option.keyword)}
                style={{
                  background: '#fff',
                  border: '2px solid #DDD',
                  borderRadius: '14px',
                  padding: '18px 20px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#0F1111' }}>{option.label}</span>
                <span style={{ fontSize: '20px', color: '#FF9900' }}>→</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 16px 40px', textAlign: 'center' }}>
          <button
            onClick={() => goToAmazon()}
            style={{ background: 'none', border: 'none', color: '#888', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}
          >
            絞り込まずにAmazonで見る →
          </button>
        </div>
      </main>
    </>
  )
}

export default function RefinePage() {
  return (
    <Suspense>
      <RefineContent />
    </Suspense>
  )
}
