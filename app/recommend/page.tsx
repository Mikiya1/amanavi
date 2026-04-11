'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'

const products: Record<string, { id: number; name: string; price: string; rating: string; emoji: string; tags: string[]; url: string }[]> = {
  'スマホ': [
    { id: 1, name: 'iPhone 15', price: '¥124,800', rating: '4.8', emoji: '📱', tags: ['Apple', 'カメラ', 'コンパクト'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'Galaxy S24', price: '¥99,800', rating: '4.7', emoji: '📱', tags: ['Android', 'カメラ', 'AI'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'Pixel 8', price: '¥82,500', rating: '4.6', emoji: '📱', tags: ['Google', 'AI', 'カメラ'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'Xperia 1 VI', price: '¥189,000', rating: '4.5', emoji: '📱', tags: ['Sony', '高画質', '音質'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'AQUOS sense8', price: '¥44,800', rating: '4.4', emoji: '📱', tags: ['コスパ', '軽量', '日本製'], url: 'https://amazon.co.jp' },
  ],
  'タブレット': [
    { id: 1, name: 'iPad Air M2', price: '¥98,800', rating: '4.8', emoji: '📲', tags: ['Apple', '軽量', 'M2チップ'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'iPad mini 7', price: '¥78,800', rating: '4.7', emoji: '📲', tags: ['Apple', 'コンパクト', '持ち運び'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'Galaxy Tab S9', price: '¥89,800', rating: '4.6', emoji: '📲', tags: ['Android', 'AMOLED', 'Samsung'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'Fire HD 10', price: '¥19,980', rating: '4.3', emoji: '📲', tags: ['コスパ', 'Amazon', '動画'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'Lenovo Tab P12', price: '¥54,800', rating: '4.4', emoji: '📲', tags: ['大画面', 'Android', 'コスパ'], url: 'https://amazon.co.jp' },
  ],
  'イヤホン': [
    { id: 1, name: 'AirPods Pro 2', price: '¥39,800', rating: '4.8', emoji: '🎧', tags: ['Apple', 'ノイキャン', '空間音響'], url: 'https://amzn.to/3NXDwSu' },
    { id: 2, name: 'Sony WF-1000XM5', price: '¥38,500', rating: '4.8', emoji: '🎧', tags: ['Sony', 'ノイキャン', '高音質'], url: 'https://amzn.to/4cge82q' },
    { id: 3, name: 'Anker Soundcore P40i', price: '¥5,990', rating: '4.6', emoji: '🎧', tags: ['コスパ', 'ノイキャン', 'Anker'], url: 'https://amzn.to/3OyWHCd' },
    { id: 4, name: 'Nothing Ear 2', price: '¥22,800', rating: '4.5', emoji: '🎧', tags: ['デザイン', '高音質', 'おしゃれ'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'Bose QuietComfort', price: '¥29,800', rating: '4.7', emoji: '🎧', tags: ['Bose', 'ノイキャン', '快適'], url: 'https://amazon.co.jp' },
  ],
  'モニター': [
    { id: 1, name: 'LG 27UL500 4K', price: '¥32,800', rating: '4.6', emoji: '🖥', tags: ['4K', 'LG', 'USB-C'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'ASUS ROG Swift', price: '¥89,800', rating: '4.7', emoji: '🖥', tags: ['ゲーミング', '144Hz', 'ASUS'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'Dell U2722D', price: '¥54,800', rating: '4.7', emoji: '🖥', tags: ['仕事', 'USB-C', 'Dell'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'BenQ EW2880U', price: '¥44,800', rating: '4.5', emoji: '🖥', tags: ['4K', 'HDR', 'コスパ'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'Samsung 49インチ曲面', price: '¥98,000', rating: '4.6', emoji: '🖥', tags: ['ウルトラワイド', '曲面', 'Samsung'], url: 'https://amazon.co.jp' },
  ],
  'PC周辺機器': [
    { id: 1, name: 'HHKB Professional', price: '¥35,200', rating: '4.7', emoji: '⌨️', tags: ['キーボード', '高級', '打鍵感'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'ロジクール MX Master 3', price: '¥14,800', rating: '4.8', emoji: '🖱', tags: ['マウス', '仕事', 'ロジクール'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'Anker 65W充電器', price: '¥3,990', rating: '4.7', emoji: '🔌', tags: ['充電', 'コンパクト', 'USB-C'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'ロジクール C920n', price: '¥9,800', rating: '4.6', emoji: '📷', tags: ['Webカメラ', 'テレワーク', 'フルHD'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'Twelve South HiRise', price: '¥8,800', rating: '4.5', emoji: '💻', tags: ['スタンド', 'Mac', 'デスク整理'], url: 'https://amazon.co.jp' },
  ],
  'Nintendo Switch': [
    { id: 1, name: 'ゼルダの伝説 TotK', price: '¥7,678', rating: '4.9', emoji: '🗡', tags: ['RPG', '冒険', '任天堂'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'マリオカート8DX', price: '¥6,578', rating: '4.9', emoji: '🏎', tags: ['レース', 'パーティー', '任天堂'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'スプラトゥーン3', price: '¥6,578', rating: '4.7', emoji: '🦑', tags: ['シューター', 'オンライン', '任天堂'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'あつまれどうぶつの森', price: '¥6,578', rating: '4.8', emoji: '🏝', tags: ['のんびり', 'コミュニティ', '任天堂'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'Switch有機ELモデル', price: '¥37,980', rating: '4.8', emoji: '🎮', tags: ['本体', '有機EL', '携帯'], url: 'https://amazon.co.jp' },
  ],
  'PlayStation': [
    { id: 1, name: 'PS5本体', price: '¥66,980', rating: '4.8', emoji: '🕹', tags: ['本体', 'Sony', '高性能'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'FF7リバース', price: '¥9,878', rating: '4.7', emoji: '⚔️', tags: ['RPG', 'Final Fantasy', 'PS5'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'DualSense コントローラー', price: '¥9,480', rating: '4.7', emoji: '🎮', tags: ['コントローラー', 'Sony', '振動'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'Spider-Man 2', price: '¥8,678', rating: '4.8', emoji: '🕷', tags: ['アクション', 'Marvel', 'PS5'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'God of War Ragnarok', price: '¥5,478', rating: '4.9', emoji: '🪓', tags: ['アクション', 'PS5', '神話'], url: 'https://amazon.co.jp' },
  ],
  'PCゲーム': [
    { id: 1, name: 'ゲーミングPC RTX4070', price: '¥189,800', rating: '4.7', emoji: '💻', tags: ['高性能', 'RTX', 'デスクトップ'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'ロジクール G PRO X', price: '¥14,800', rating: '4.7', emoji: '🖱', tags: ['ゲーミングマウス', 'FPS', 'ロジクール'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'HyperX Cloud III', price: '¥14,300', rating: '4.6', emoji: '🎧', tags: ['ゲーミングヘッドセット', '音質', 'HyperX'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'ASUS ROG キーボード', price: '¥18,800', rating: '4.5', emoji: '⌨️', tags: ['メカニカル', 'RGB', 'ゲーミング'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'Steam Deck OLED', price: '¥89,800', rating: '4.8', emoji: '🎮', tags: ['携帯ゲーミング', 'Valve', 'OLED'], url: 'https://amazon.co.jp' },
  ],
  'ビジネス書': [
    { id: 1, name: '嫌われる勇気', price: '¥1,650', rating: '4.6', emoji: '📖', tags: ['自己啓発', 'アドラー', 'ベストセラー'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'FACTFULNESS', price: '¥2,200', rating: '4.7', emoji: '🌍', tags: ['教養', 'データ', '思考法'], url: 'https://amazon.co.jp' },
    { id: 3, name: '金持ち父さん貧乏父さん', price: '¥1,760', rating: '4.5', emoji: '💰', tags: ['投資', 'お金', '資産形成'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'ゼロ秒思考', price: '¥1,540', rating: '4.5', emoji: '⚡', tags: ['思考法', 'メモ', '仕事術'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'エッセンシャル思考', price: '¥1,760', rating: '4.6', emoji: '🎯', tags: ['仕事術', '集中', 'シンプル'], url: 'https://amazon.co.jp' },
  ],
  '漫画': [
    { id: 1, name: 'ONE PIECE 最新刊', price: '¥528', rating: '4.9', emoji: '📕', tags: ['少年', '冒険', '長編'], url: 'https://amazon.co.jp' },
    { id: 2, name: '進撃の巨人 全巻', price: '¥18,040', rating: '4.8', emoji: '⚔️', tags: ['完結', 'ダーク', 'アクション'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'チェンソーマン', price: '¥528', rating: '4.7', emoji: '🪚', tags: ['少年', 'ダーク', '独特'], url: 'https://amazon.co.jp' },
    { id: 4, name: '鬼滅の刃 全巻', price: '¥9,504', rating: '4.8', emoji: '🗡', tags: ['完結', '少年', '感動'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'SPY×FAMILY', price: '¥528', rating: '4.8', emoji: '👨‍👩‍👧', tags: ['少年', 'コメディ', 'ファミリー'], url: 'https://amazon.co.jp' },
  ],
  '小説': [
    { id: 1, name: '君の膵臓をたべたい', price: '¥704', rating: '4.7', emoji: '📗', tags: ['青春', '感動', '恋愛'], url: 'https://amazon.co.jp' },
    { id: 2, name: '容疑者Xの献身', price: '¥858', rating: '4.8', emoji: '🔍', tags: ['ミステリー', '東野圭吾', '感動'], url: 'https://amazon.co.jp' },
    { id: 3, name: '1Q84', price: '¥2,310', rating: '4.6', emoji: '📘', tags: ['村上春樹', 'SF', '長編'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'コンビニ人間', price: '¥726', rating: '4.5', emoji: '🏪', tags: ['芥川賞', '現代', '短編'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'かがみの孤城', price: '¥858', rating: '4.8', emoji: '🪞', tags: ['感動', 'ファンタジー', '本屋大賞'], url: 'https://amazon.co.jp' },
  ],
  'トップス': [
    { id: 1, name: 'ユニクロ エアリズム', price: '¥1,990', rating: '4.7', emoji: '👕', tags: ['涼しい', '機能性', 'インナー'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'チャンピオン パーカー', price: '¥8,800', rating: '4.6', emoji: '🧥', tags: ['パーカー', 'カジュアル', 'Champion'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'ユニクロ フリース', price: '¥3,990', rating: '4.7', emoji: '🧣', tags: ['暖かい', 'コスパ', 'カジュアル'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'ラルフローレン ポロシャツ', price: '¥12,100', rating: '4.6', emoji: '👔', tags: ['ポロシャツ', '上品', 'ブランド'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'ノースフェイス Tシャツ', price: '¥5,500', rating: '4.5', emoji: '👕', tags: ['アウトドア', '速乾', 'ブランド'], url: 'https://amazon.co.jp' },
  ],
  'シューズ': [
    { id: 1, name: 'ニューバランス 574', price: '¥16,500', rating: '4.8', emoji: '👟', tags: ['スニーカー', 'クラシック', 'カジュアル'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'Nike Air Force 1', price: '¥14,300', rating: '4.7', emoji: '👟', tags: ['Nike', 'クラシック', 'ホワイト'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'Adidas Stan Smith', price: '¥13,200', rating: '4.6', emoji: '👟', tags: ['Adidas', 'シンプル', 'レザー'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'Vans Old Skool', price: '¥9,900', rating: '4.6', emoji: '👟', tags: ['Vans', 'スケート', 'カジュアル'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'コンバース オールスター', price: '¥8,800', rating: '4.7', emoji: '👟', tags: ['コンバース', 'クラシック', 'カジュアル'], url: 'https://amazon.co.jp' },
  ],
  'バッグ': [
    { id: 1, name: 'ノースフェイス リュック', price: '¥24,200', rating: '4.7', emoji: '🎒', tags: ['バッグ', 'アウトドア', '大容量'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'Anello リュック', price: '¥4,980', rating: '4.5', emoji: '🎒', tags: ['コスパ', '軽量', 'カジュアル'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'グレゴリー デイパック', price: '¥18,700', rating: '4.7', emoji: '🎒', tags: ['アウトドア', '耐久性', 'Gregory'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'ポーター タンカー', price: '¥33,000', rating: '4.8', emoji: '👜', tags: ['日本製', 'Porter', '高級'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'トートバッグ キャンバス', price: '¥2,980', rating: '4.4', emoji: '👜', tags: ['トート', 'シンプル', 'エコ'], url: 'https://amazon.co.jp' },
  ],
  'アクセサリ': [
    { id: 1, name: 'Apple Watch Series 9', price: '¥59,800', rating: '4.7', emoji: '⌚', tags: ['Apple', 'スマートウォッチ', '健康'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'レイバン サングラス', price: '¥22,000', rating: '4.6', emoji: '🕶', tags: ['サングラス', 'UV', 'クラシック'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'ニューエラ キャップ', price: '¥5,500', rating: '4.5', emoji: '🧢', tags: ['キャップ', 'New Era', 'カジュアル'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'G-SHOCK', price: '¥16,500', rating: '4.7', emoji: '⌚', tags: ['時計', '耐衝撃', 'カシオ'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'アネロ ウォレット', price: '¥3,300', rating: '4.4', emoji: '👛', tags: ['財布', 'コスパ', 'カジュアル'], url: 'https://amazon.co.jp' },
  ],
  'アウター': [
    { id: 1, name: 'ユニクロ ウルトラライトダウン', price: '¥6,990', rating: '4.8', emoji: '🧥', tags: ['軽量', '防寒', 'コンパクト'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'ノースフェイス マウンテンジャケット', price: '¥49,500', rating: '4.8', emoji: '🧥', tags: ['防水', 'アウトドア', 'ブランド'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'パタゴニア フリース', price: '¥22,000', rating: '4.7', emoji: '🧥', tags: ['フリース', 'パタゴニア', 'サステナブル'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'コロンビア ウィンドブレーカー', price: '¥14,300', rating: '4.6', emoji: '🧥', tags: ['防風', '軽量', 'Columbia'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'ユニクロ ブロックテックパーカ', price: '¥14,990', rating: '4.6', emoji: '🧥', tags: ['防水', 'ユニクロ', 'コスパ'], url: 'https://amazon.co.jp' },
  ],
  '筋トレ': [
    { id: 1, name: 'プロテイン ザバス', price: '¥4,980', rating: '4.7', emoji: '💪', tags: ['タンパク質', 'ダイエット', '筋肥大'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'アジャスタブルダンベル', price: '¥24,800', rating: '4.6', emoji: '🏋️', tags: ['ダンベル', '可変式', '省スペース'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'ヨガマット 10mm', price: '¥3,980', rating: '4.6', emoji: '🧘', tags: ['マット', '厚め', '滑り止め'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'トレーニングベルト', price: '¥4,500', rating: '4.5', emoji: '🥋', tags: ['腰サポート', 'デッドリフト', 'スクワット'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'EAA必須アミノ酸', price: '¥3,980', rating: '4.5', emoji: '🧪', tags: ['アミノ酸', '回復', 'パフォーマンス'], url: 'https://amazon.co.jp' },
  ],
  'ランニング': [
    { id: 1, name: 'Nike Vaporfly 3', price: '¥29,700', rating: '4.8', emoji: '👟', tags: ['カーボン', '厚底', 'レース'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'Garmin Forerunner 265', price: '¥59,800', rating: '4.7', emoji: '⌚', tags: ['GPS', '心拍', 'スマートウォッチ'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'On Cloudmonster', price: '¥19,800', rating: '4.6', emoji: '👟', tags: ['クッション', 'デイリー', 'スイス'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'ランニングウェア上下セット', price: '¥6,980', rating: '4.5', emoji: '🏃', tags: ['速乾', '軽量', 'セット'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'ランニングポーチ', price: '¥2,480', rating: '4.4', emoji: '👜', tags: ['スマホ収納', '軽量', 'ウエスト'], url: 'https://amazon.co.jp' },
  ],
  'アウトドア': [
    { id: 1, name: 'コールマン テント', price: '¥24,800', rating: '4.6', emoji: '⛺', tags: ['テント', 'ファミリー', 'キャンプ'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'スノーピーク チェア', price: '¥19,800', rating: '4.7', emoji: '🪑', tags: ['アウトドアチェア', 'Snow Peak', '軽量'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'ユニフレーム 焚き火台', price: '¥14,300', rating: '4.7', emoji: '🔥', tags: ['焚き火', '日本製', 'コンパクト'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'サーモス 山専ボトル', price: '¥4,950', rating: '4.8', emoji: '🍵', tags: ['保温', '登山', 'サーモス'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'モンベル レインウェア', price: '¥29,700', rating: '4.7', emoji: '🧥', tags: ['防水', '登山', 'モンベル'], url: 'https://amazon.co.jp' },
  ],
  'ヨガ・ストレッチ': [
    { id: 1, name: 'マンドゥカ ヨガマット', price: '¥19,800', rating: '4.8', emoji: '🧘', tags: ['高級', '耐久性', 'Manduka'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'ヨガブロック セット', price: '¥2,480', rating: '4.5', emoji: '🟦', tags: ['補助', '初心者', 'コスパ'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'ストレッチポール', price: '¥8,800', rating: '4.6', emoji: '🔵', tags: ['筋膜リリース', '腰痛', 'リカバリー'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'ヨガウェア セット', price: '¥5,980', rating: '4.5', emoji: '🧘', tags: ['動きやすい', 'レディース', 'セット'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'フォームローラー', price: '¥3,280', rating: '4.5', emoji: '🟩', tags: ['マッサージ', '回復', 'コンパクト'], url: 'https://amazon.co.jp' },
  ],
  '球技': [
    { id: 1, name: 'モルテン サッカーボール', price: '¥4,800', rating: '4.6', emoji: '⚽', tags: ['サッカー', 'Molten', '練習'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'スポルディング バスケットボール', price: '¥6,600', rating: '4.7', emoji: '🏀', tags: ['バスケ', 'Spalding', '練習'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'ウィルソン テニスラケット', price: '¥14,800', rating: '4.6', emoji: '🎾', tags: ['テニス', 'Wilson', '初中級'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'ミカサ バレーボール', price: '¥3,980', rating: '4.5', emoji: '🏐', tags: ['バレー', 'Mikasa', '練習'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'SSK 野球グローブ', price: '¥12,800', rating: '4.5', emoji: '⚾', tags: ['野球', 'SSK', 'キャッチャー'], url: 'https://amazon.co.jp' },
  ],
  'キッチン家電': [
    { id: 1, name: 'バルミューダ トースター', price: '¥33,000', rating: '4.6', emoji: '🍞', tags: ['おしゃれ', 'トースト', 'バルミューダ'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'デロンギ コーヒーメーカー', price: '¥44,800', rating: '4.7', emoji: '☕', tags: ['コーヒー', 'デロンギ', '全自動'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'バイタミックス ブレンダー', price: '¥89,800', rating: '4.7', emoji: '🥤', tags: ['高性能', 'スムージー', '業務用'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'シャープ ヘルシオ', price: '¥54,800', rating: '4.6', emoji: '🍳', tags: ['ウォーターオーブン', 'ヘルシー', 'シャープ'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'タイガー 炊飯器', price: '¥24,800', rating: '4.7', emoji: '🍚', tags: ['炊飯器', 'タイガー', '日本製'], url: 'https://amazon.co.jp' },
  ],
  '空調・空気': [
    { id: 1, name: 'ダイソン 空気清浄機', price: '¥89,800', rating: '4.7', emoji: '💨', tags: ['空気清浄', '扇風機', 'ダイソン'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'シャープ 加湿空気清浄機', price: '¥34,800', rating: '4.6', emoji: '💧', tags: ['加湿', '空気清浄', 'プラズマクラスター'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'パナソニック エアコン', price: '¥89,800', rating: '4.7', emoji: '❄️', tags: ['エアコン', 'パナソニック', '省エネ'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'バルミューダ 扇風機', price: '¥35,200', rating: '4.5', emoji: '🌀', tags: ['扇風機', 'おしゃれ', 'バルミューダ'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'ダイキン 除湿機', price: '¥29,800', rating: '4.6', emoji: '💦', tags: ['除湿', 'ダイキン', '梅雨'], url: 'https://amazon.co.jp' },
  ],
  '照明': [
    { id: 1, name: 'フィリップス Hue', price: '¥9,980', rating: '4.5', emoji: '💡', tags: ['スマート照明', '調光', 'おしゃれ'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'パナソニック シーリング', price: '¥14,800', rating: '4.6', emoji: '🔆', tags: ['シーリング', '調光', 'パナソニック'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'Anker デスクライト', price: '¥4,980', rating: '4.6', emoji: '🕯', tags: ['デスクライト', 'USB-C', 'Anker'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'YAMAGIWA 間接照明', price: '¥24,800', rating: '4.5', emoji: '🌟', tags: ['間接照明', 'おしゃれ', 'インテリア'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'ボネコ アロマランプ', price: '¥8,800', rating: '4.4', emoji: '🕯', tags: ['アロマ', 'リラックス', 'おしゃれ'], url: 'https://amazon.co.jp' },
  ],
  '収納': [
    { id: 1, name: 'ニトリ 収納ボックス', price: '¥1,490', rating: '4.6', emoji: '📦', tags: ['収納', 'シンプル', 'コスパ'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'IKEA カラックス', price: '¥14,990', rating: '4.7', emoji: '🗄', tags: ['棚', 'IKEA', 'カスタマイズ'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'スタックストー バケット', price: '¥3,980', rating: '4.6', emoji: '🪣', tags: ['おしゃれ', 'スタック', 'カラフル'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'ハンガーラック', price: '¥6,800', rating: '4.5', emoji: '👗', tags: ['クローゼット', 'スリム', 'キャスター付き'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'フリーラック スチール', price: '¥9,800', rating: '4.5', emoji: '🗂', tags: ['スチール', '丈夫', 'DIY'], url: 'https://amazon.co.jp' },
  ],
  '掃除': [
    { id: 1, name: 'ルンバ j7+', price: '¥99,800', rating: '4.5', emoji: '🤖', tags: ['ロボット掃除機', '自動ゴミ収集', 'iRobot'], url: 'https://amazon.co.jp' },
    { id: 2, name: 'ダイソン V15', price: '¥89,800', rating: '4.7', emoji: '🌀', tags: ['コードレス', '強力吸引', 'ダイソン'], url: 'https://amazon.co.jp' },
    { id: 3, name: 'パナソニック コードレス', price: '¥34,800', rating: '4.5', emoji: '🧹', tags: ['コードレス', '軽量', 'パナソニック'], url: 'https://amazon.co.jp' },
    { id: 4, name: 'ブラーバ 床拭きロボット', price: '¥44,800', rating: '4.4', emoji: '🫧', tags: ['床拭き', 'ロボット', 'iRobot'], url: 'https://amazon.co.jp' },
    { id: 5, name: 'マキタ 充電式クリーナー', price: '¥19,800', rating: '4.6', emoji: '🔋', tags: ['マキタ', '充電式', 'コンパクト'], url: 'https://amazon.co.jp' },
  ],
}

function RecommendContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category') ?? 'スマホ'
  const genre = searchParams.get('genre') ?? 'ガジェット'
  const tagsParam = searchParams.get('tags') ?? ''
  const likedTags = tagsParam ? tagsParam.split(',') : []
  const items = products[category] ?? products['スマホ']

  const scored = items.map(item => ({
    ...item,
    score: item.tags.filter(t => likedTags.includes(t)).length,
  })).sort((a, b) => b.score - a.score)

  const reason = likedTags.length > 0
    ? `${[...new Set(likedTags)].slice(0, 3).join('・')}に興味があるあなたへ`
    : `${genre} / ${category}のおすすめ商品です`

  return (
    <>
      <Header />
      <main style={{ background: '#F3F3F3', minHeight: '100vh', color: '#0F1111', fontFamily: 'sans-serif', padding: '16px', maxWidth: '480px', margin: '0 auto' }}>

        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>おすすめ商品</h2>

        <div style={{ background: '#FFF3CD', border: '1px solid #FF9900', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#0F1111', marginBottom: '16px' }}>
          💡 {reason}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
          {scored.map((item, i) => (
            <div key={item.id} style={{ background: '#ffffff', borderRadius: '8px', overflow: 'hidden', border: i === 0 ? '2px solid #FF9900' : '1px solid #DDD', position: 'relative' }}>
              {i === 0 && (
                <div style={{ background: '#FF9900', color: '#fff', fontSize: '11px', padding: '3px 10px', fontWeight: '700', textAlign: 'center' }}>
                  ★ ベストマッチ
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <div style={{ width: '100px', minHeight: '100px', background: '#F3F3F3', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
                  {item.emoji}
                </div>
                <div style={{ flex: 1, padding: '12px', minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', lineHeight: 1.4, color: '#0F1111' }}>{item.name}</div>
                  <div style={{ fontSize: '18px', color: '#B12704', marginTop: '4px', fontWeight: '700' }}>{item.price}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <span style={{ color: '#FF9900', fontSize: '12px' }}>★</span>
                    <span style={{ fontSize: '12px', color: '#565959' }}>{item.rating}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {item.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '11px', color: '#565959', background: '#F3F3F3', padding: '2px 8px', borderRadius: '4px', border: '1px solid #DDD' }}>{tag}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => window.open(item.url, '_blank')}
                    style={{ marginTop: '8px', background: '#FFD814', color: '#0F1111', border: 'none', borderRadius: '4px', padding: '6px 16px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', width: '100%' }}
                  >
                    Amazonで見る
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push('/genre')}
          style={{ width: '100%', background: '#ffffff', color: '#0F1111', border: '1px solid #DDD', borderRadius: '8px', padding: '12px', fontSize: '14px', cursor: 'pointer', fontWeight: '700' }}
        >
          もう一度診断する
        </button>
      </main>
    </>
  )
}

export default function RecommendPage() {
  return (
    <Suspense>
      <RecommendContent />
    </Suspense>
  )
}