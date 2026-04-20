'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'

const products: Record<string, { id: number; name: string; price: string; rating: string; emoji: string; tags: string[]; url: string }[]> = {
  'スマホ': [
    { id: 1, name: 'iPhone 15', price: '¥124,800', rating: '4.8', emoji: '📱', tags: ['Apple', 'カメラ', 'コンパクト'], url: 'https://www.amazon.co.jp/s?k=iPhone%2015&tag=amanavi05-22' },
    { id: 2, name: 'Galaxy S24', price: '¥99,800', rating: '4.7', emoji: '📱', tags: ['Android', 'カメラ', 'AI'], url: 'https://www.amazon.co.jp/s?k=Galaxy%20S24&tag=amanavi05-22' },
    { id: 3, name: 'Pixel 8', price: '¥82,500', rating: '4.6', emoji: '📱', tags: ['Google', 'AI', 'カメラ'], url: 'https://www.amazon.co.jp/s?k=Pixel%208&tag=amanavi05-22' },
    { id: 4, name: 'Xperia 1 VI', price: '¥189,000', rating: '4.5', emoji: '📱', tags: ['Sony', '高画質', '音質'], url: 'https://www.amazon.co.jp/s?k=Xperia%201%20VI&tag=amanavi05-22' },
    { id: 5, name: 'AQUOS sense8', price: '¥44,800', rating: '4.4', emoji: '📱', tags: ['コスパ', '軽量', '日本製'], url: 'https://www.amazon.co.jp/s?k=AQUOS%20sense8&tag=amanavi05-22' },
  ],
  'タブレット': [
    { id: 1, name: 'iPad Air M2', price: '¥98,800', rating: '4.8', emoji: '📲', tags: ['Apple', '軽量', 'M2チップ'], url: 'https://amzn.to/4mx7pG3' },
    { id: 2, name: 'iPad mini 7', price: '¥78,800', rating: '4.7', emoji: '📲', tags: ['Apple', 'コンパクト', '持ち運び'], url: 'https://amzn.to/4sEXyPY' },
    { id: 3, name: 'Galaxy Tab S9', price: '¥89,800', rating: '4.6', emoji: '📲', tags: ['Android', 'AMOLED', 'Samsung'], url: 'https://amzn.to/4mygONy' },
    { id: 4, name: 'Fire Max 11', price: '¥34,980', rating: '4.4', emoji: '📲', tags: ['コスパ', 'Amazon', '大画面'], url: 'https://amzn.to/4cBhAVA' },
    { id: 5, name: 'Lenovo Tab P12', price: '¥54,800', rating: '4.4', emoji: '📲', tags: ['大画面', 'Android', 'コスパ'], url: 'https://amzn.to/41x9MPv' },
  ],
  'イヤホン': [
    { id: 1, name: 'AirPods Pro 2', price: '¥39,800', rating: '4.8', emoji: '🎧', tags: ['Apple', 'ノイキャン', '空間音響'], url: 'https://amzn.to/4sxYKV1' },
    { id: 2, name: 'Sony WF-1000XM5', price: '¥38,500', rating: '4.8', emoji: '🎧', tags: ['Sony', 'ノイキャン', '高音質'], url: 'https://amzn.to/3Qgx35K' },
    { id: 3, name: 'Anker Soundcore P40i', price: '¥5,990', rating: '4.6', emoji: '🎧', tags: ['コスパ', 'ノイキャン', 'Anker'], url: 'https://amzn.to/3Qgx4qk' },
    { id: 4, name: 'Nothing Ear 2', price: '¥22,800', rating: '4.5', emoji: '🎧', tags: ['デザイン', '高音質', 'おしゃれ'], url: 'https://amzn.to/4cLxdux' },
    { id: 5, name: 'Bose QuietComfort', price: '¥29,800', rating: '4.7', emoji: '🎧', tags: ['Bose', 'ノイキャン', '快適'], url: 'https://amzn.to/4dKL7OG' },
  ],
  'モニター': [
    { id: 1, name: 'LG 27UL500 4K', price: '¥32,800', rating: '4.6', emoji: '🖥', tags: ['4K', 'LG', 'USB-C'], url: 'https://amzn.to/4muCaLE' },
    { id: 2, name: 'ASUS ROG Swift', price: '¥89,800', rating: '4.7', emoji: '🖥', tags: ['ゲーミング', '144Hz', 'ASUS'], url: 'https://amzn.to/4vtAk1T' },
    { id: 3, name: 'Dell U2722D', price: '¥54,800', rating: '4.7', emoji: '🖥', tags: ['仕事', 'USB-C', 'Dell'], url: 'https://amzn.to/4cKhhc2' },
    { id: 4, name: 'BenQ EW2880U', price: '¥44,800', rating: '4.5', emoji: '🖥', tags: ['4K', 'HDR', 'コスパ'], url: 'https://amzn.to/4eqB0yJ' },
    { id: 5, name: 'Samsung 49インチ曲面', price: '¥98,000', rating: '4.6', emoji: '🖥', tags: ['ウルトラワイド', '曲面', 'Samsung'], url: 'https://amzn.to/41BDmU2' },
  ],
  'PC周辺機器': [
    { id: 1, name: 'HHKB Professional', price: '¥35,200', rating: '4.7', emoji: '⌨️', tags: ['キーボード', '高級', '打鍵感'], url: 'https://amzn.to/4tQfUOO' },
    { id: 2, name: 'ロジクール MX Master 3', price: '¥14,800', rating: '4.8', emoji: '🖱', tags: ['マウス', '仕事', 'ロジクール'], url: 'https://amzn.to/429MZcB' },
    { id: 3, name: 'Anker 65W充電器', price: '¥3,990', rating: '4.7', emoji: '🔌', tags: ['充電', 'コンパクト', 'USB-C'], url: 'https://amzn.to/3Q49iOm' },
    { id: 4, name: 'ロジクール C920n', price: '¥9,800', rating: '4.6', emoji: '📷', tags: ['Webカメラ', 'テレワーク', 'フルHD'], url: 'https://amzn.to/4dLXolZ' },
    { id: 5, name: 'Twelve South HiRise', price: '¥8,800', rating: '4.5', emoji: '💻', tags: ['スタンド', 'Mac', 'デスク整理'], url: 'https://amzn.to/4cdqERo' },
  ],
  'Nintendo Switch': [
    { id: 1, name: 'ゼルダの伝説 TotK', price: '¥7,678', rating: '4.9', emoji: '🗡', tags: ['RPG', '冒険', '任天堂'], url: 'https://amzn.to/3Qquoq6' },
    { id: 2, name: 'マリオカートワールド', price: '¥7,678', rating: '4.9', emoji: '🏎', tags: ['レース', 'パーティー', '任天堂'], url: 'https://amzn.to/4tQgqwe' },
    { id: 3, name: 'スプラトゥーン3', price: '¥6,578', rating: '4.7', emoji: '🦑', tags: ['シューター', 'オンライン', '任天堂'], url: 'https://amzn.to/47Z0n6Y' },
    { id: 4, name: 'ポケットモンスター スカーレット', price: '¥6,578', rating: '4.6', emoji: '🎮', tags: ['RPG', 'ポケモン', '任天堂'], url: 'https://amzn.to/4myh4Mw' },
    { id: 5, name: 'Nintendo Switch 2', price: '¥49,980', rating: '4.8', emoji: '🎮', tags: ['本体', '新型', '携帯'], url: 'https://amzn.to/4tgDy7p' },
  ],
  'PlayStation': [
    { id: 1, name: 'PS5本体', price: '¥66,980', rating: '4.8', emoji: '🕹', tags: ['本体', 'Sony', '高性能'], url: 'https://amzn.to/4vtLUtP' },
    { id: 2, name: 'ELDEN RING NIGHTREIGN', price: '¥8,778', rating: '4.7', emoji: '⚔️', tags: ['アクション', 'フロム', 'PS5'], url: 'https://amzn.to/4sApBQc' },
    { id: 3, name: 'DualSense コントローラー', price: '¥9,480', rating: '4.7', emoji: '🎮', tags: ['コントローラー', 'Sony', '振動'], url: 'https://amzn.to/4tQgNqC' },
    { id: 4, name: 'Astro Bot', price: '¥7,678', rating: '4.9', emoji: '🤖', tags: ['アクション', 'GOTY', 'PS5'], url: 'https://amzn.to/4tKNrKc' },
    { id: 5, name: 'Ghost of Yōtei', price: '¥8,778', rating: '4.8', emoji: '🗻', tags: ['アクション', 'オープンワールド', 'PS5'], url: 'https://amzn.to/487bnz3' },
  ],
  'PCゲーム': [
    { id: 1, name: 'GTPLAYERゲーミングチェア', price: '¥19,800', rating: '4.5', emoji: '🪑', tags: ['チェア', 'オットマン付き', 'コスパ'], url: 'https://amzn.to/4cMQZG8' },
    { id: 2, name: 'ロジクール G PRO X', price: '¥14,800', rating: '4.7', emoji: '🖱', tags: ['ゲーミングマウス', 'FPS', 'ロジクール'], url: 'https://amzn.to/3OK4DAC' },
    { id: 3, name: 'HyperX Cloud III', price: '¥14,300', rating: '4.6', emoji: '🎧', tags: ['ゲーミングヘッドセット', '音質', 'HyperX'], url: 'https://amzn.to/4dRb1jS' },
    { id: 4, name: 'ASUS ROG キーボード', price: '¥18,800', rating: '4.5', emoji: '⌨️', tags: ['メカニカル', 'RGB', 'ゲーミング'], url: 'https://amzn.to/4dR5MR7' },
    { id: 5, name: 'Steam Deck OLED', price: '¥89,800', rating: '4.8', emoji: '🎮', tags: ['携帯ゲーミング', 'Valve', 'OLED'], url: 'https://amzn.to/4cjtMtC' },
  ],
  'ビジネス書': [
    { id: 1, name: '嫌われる勇気', price: '¥1,650', rating: '4.6', emoji: '📖', tags: ['自己啓発', 'アドラー', 'ベストセラー'], url: 'https://www.amazon.co.jp/s?k=%E5%AB%8C%E3%82%8F%E3%82%8C%E3%82%8B%E5%8B%87%E6%B0%97&tag=amanavi05-22' },
    { id: 2, name: 'FACTFULNESS', price: '¥2,200', rating: '4.7', emoji: '🌍', tags: ['教養', 'データ', '思考法'], url: 'https://www.amazon.co.jp/s?k=FACTFULNESS&tag=amanavi05-22' },
    { id: 3, name: '金持ち父さん貧乏父さん', price: '¥1,760', rating: '4.5', emoji: '💰', tags: ['投資', 'お金', '資産形成'], url: 'https://www.amazon.co.jp/s?k=%E9%87%91%E6%8C%81%E3%81%A1%E7%88%B6%E3%81%95%E3%82%93%E8%B2%A7%E4%B9%8F%E7%88%B6%E3%81%95%E3%82%93&tag=amanavi05-22' },
    { id: 4, name: 'ゼロ秒思考', price: '¥1,540', rating: '4.5', emoji: '⚡', tags: ['思考法', 'メモ', '仕事術'], url: 'https://www.amazon.co.jp/s?k=%E3%82%BC%E3%83%AD%E7%A7%92%E6%80%9D%E8%80%83&tag=amanavi05-22' },
    { id: 5, name: 'エッセンシャル思考', price: '¥1,760', rating: '4.6', emoji: '🎯', tags: ['仕事術', '集中', 'シンプル'], url: 'https://www.amazon.co.jp/s?k=%E3%82%A8%E3%83%83%E3%82%BB%E3%83%B3%E3%82%B7%E3%83%A3%E3%83%AB%E6%80%9D%E8%80%83&tag=amanavi05-22' },
  ],
  '漫画': [
    { id: 1, name: 'ONE PIECE 最新刊', price: '¥528', rating: '4.9', emoji: '📕', tags: ['少年', '冒険', '長編'], url: 'https://www.amazon.co.jp/s?k=ONE%20PIECE%20%E6%9C%80%E6%96%B0%E5%88%8A&tag=amanavi05-22' },
    { id: 2, name: '進撃の巨人 全巻', price: '¥18,040', rating: '4.8', emoji: '⚔️', tags: ['完結', 'ダーク', 'アクション'], url: 'https://www.amazon.co.jp/s?k=%E9%80%B2%E6%92%83%E3%81%AE%E5%B7%A8%E4%BA%BA%20%E5%85%A8%E5%B7%BB&tag=amanavi05-22' },
    { id: 3, name: 'チェンソーマン', price: '¥528', rating: '4.7', emoji: '🪚', tags: ['少年', 'ダーク', '独特'], url: 'https://www.amazon.co.jp/s?k=%E3%83%81%E3%82%A7%E3%83%B3%E3%82%BD%E3%83%BC%E3%83%9E%E3%83%B3&tag=amanavi05-22' },
    { id: 4, name: '鬼滅の刃 全巻', price: '¥9,504', rating: '4.8', emoji: '🗡', tags: ['完結', '少年', '感動'], url: 'https://www.amazon.co.jp/s?k=%E9%AC%BC%E6%BB%85%E3%81%AE%E5%88%83%20%E5%85%A8%E5%B7%BB&tag=amanavi05-22' },
    { id: 5, name: 'SPY×FAMILY', price: '¥528', rating: '4.8', emoji: '👨‍👩‍👧', tags: ['少年', 'コメディ', 'ファミリー'], url: 'https://www.amazon.co.jp/s?k=SPY%C3%97FAMILY&tag=amanavi05-22' },
  ],
  '小説': [
    { id: 1, name: '君の膵臓をたべたい', price: '¥704', rating: '4.7', emoji: '📗', tags: ['青春', '感動', '恋愛'], url: 'https://www.amazon.co.jp/s?k=%E5%90%9B%E3%81%AE%E8%86%B5%E8%87%93%E3%82%92%E3%81%9F%E3%81%B9%E3%81%9F%E3%81%84&tag=amanavi05-22' },
    { id: 2, name: '容疑者Xの献身', price: '¥858', rating: '4.8', emoji: '🔍', tags: ['ミステリー', '東野圭吾', '感動'], url: 'https://www.amazon.co.jp/s?k=%E5%AE%B9%E7%96%91%E8%80%85X%E3%81%AE%E7%8C%AE%E8%BA%AB&tag=amanavi05-22' },
    { id: 3, name: '1Q84', price: '¥2,310', rating: '4.6', emoji: '📘', tags: ['村上春樹', 'SF', '長編'], url: 'https://www.amazon.co.jp/s?k=1Q84&tag=amanavi05-22' },
    { id: 4, name: 'コンビニ人間', price: '¥726', rating: '4.5', emoji: '🏪', tags: ['芥川賞', '現代', '短編'], url: 'https://www.amazon.co.jp/s?k=%E3%82%B3%E3%83%B3%E3%83%93%E3%83%8B%E4%BA%BA%E9%96%93&tag=amanavi05-22' },
    { id: 5, name: 'かがみの孤城', price: '¥858', rating: '4.8', emoji: '🪞', tags: ['感動', 'ファンタジー', '本屋大賞'], url: 'https://www.amazon.co.jp/s?k=%E3%81%8B%E3%81%8C%E3%81%BF%E3%81%AE%E5%AD%A4%E5%9F%8E&tag=amanavi05-22' },
  ],
  'トップス': [
    { id: 1, name: 'ユニクロ エアリズム', price: '¥1,990', rating: '4.7', emoji: '👕', tags: ['涼しい', '機能性', 'インナー'], url: 'https://www.amazon.co.jp/s?k=%E3%83%A6%E3%83%8B%E3%82%AF%E3%83%AD%20%E3%82%A8%E3%82%A2%E3%83%AA%E3%82%BA%E3%83%A0&tag=amanavi05-22' },
    { id: 2, name: 'チャンピオン パーカー', price: '¥8,800', rating: '4.6', emoji: '🧥', tags: ['パーカー', 'カジュアル', 'Champion'], url: 'https://www.amazon.co.jp/s?k=%E3%83%81%E3%83%A3%E3%83%B3%E3%83%94%E3%82%AA%E3%83%B3%20%E3%83%91%E3%83%BC%E3%82%AB%E3%83%BC&tag=amanavi05-22' },
    { id: 3, name: 'ユニクロ フリース', price: '¥3,990', rating: '4.7', emoji: '🧣', tags: ['暖かい', 'コスパ', 'カジュアル'], url: 'https://www.amazon.co.jp/s?k=%E3%83%A6%E3%83%8B%E3%82%AF%E3%83%AD%20%E3%83%95%E3%83%AA%E3%83%BC%E3%82%B9&tag=amanavi05-22' },
    { id: 4, name: 'ラルフローレン ポロシャツ', price: '¥12,100', rating: '4.6', emoji: '👔', tags: ['ポロシャツ', '上品', 'ブランド'], url: 'https://www.amazon.co.jp/s?k=%E3%83%A9%E3%83%AB%E3%83%95%E3%83%AD%E3%83%BC%E3%83%AC%E3%83%B3%20%E3%83%9D%E3%83%AD%E3%82%B7%E3%83%A3%E3%83%84&tag=amanavi05-22' },
    { id: 5, name: 'ノースフェイス Tシャツ', price: '¥5,500', rating: '4.5', emoji: '👕', tags: ['アウトドア', '速乾', 'ブランド'], url: 'https://www.amazon.co.jp/s?k=%E3%83%8E%E3%83%BC%E3%82%B9%E3%83%95%E3%82%A7%E3%82%A4%E3%82%B9%20T%E3%82%B7%E3%83%A3%E3%83%84&tag=amanavi05-22' },
  ],
  'シューズ': [
    { id: 1, name: 'ニューバランス 574', price: '¥16,500', rating: '4.8', emoji: '👟', tags: ['スニーカー', 'クラシック', 'カジュアル'], url: 'https://www.amazon.co.jp/s?k=%E3%83%8B%E3%83%A5%E3%83%BC%E3%83%90%E3%83%A9%E3%83%B3%E3%82%B9%20574&tag=amanavi05-22' },
    { id: 2, name: 'Nike Air Force 1', price: '¥14,300', rating: '4.7', emoji: '👟', tags: ['Nike', 'クラシック', 'ホワイト'], url: 'https://www.amazon.co.jp/s?k=Nike%20Air%20Force%201&tag=amanavi05-22' },
    { id: 3, name: 'Adidas Stan Smith', price: '¥13,200', rating: '4.6', emoji: '👟', tags: ['Adidas', 'シンプル', 'レザー'], url: 'https://www.amazon.co.jp/s?k=Adidas%20Stan%20Smith&tag=amanavi05-22' },
    { id: 4, name: 'Vans Old Skool', price: '¥9,900', rating: '4.6', emoji: '👟', tags: ['Vans', 'スケート', 'カジュアル'], url: 'https://www.amazon.co.jp/s?k=Vans%20Old%20Skool&tag=amanavi05-22' },
    { id: 5, name: 'コンバース オールスター', price: '¥8,800', rating: '4.7', emoji: '👟', tags: ['コンバース', 'クラシック', 'カジュアル'], url: 'https://www.amazon.co.jp/s?k=%E3%82%B3%E3%83%B3%E3%83%90%E3%83%BC%E3%82%B9%20%E3%82%AA%E3%83%BC%E3%83%AB%E3%82%B9%E3%82%BF%E3%83%BC&tag=amanavi05-22' },
  ],
  'バッグ': [
    { id: 1, name: 'ノースフェイス リュック', price: '¥24,200', rating: '4.7', emoji: '🎒', tags: ['バッグ', 'アウトドア', '大容量'], url: 'https://www.amazon.co.jp/s?k=%E3%83%8E%E3%83%BC%E3%82%B9%E3%83%95%E3%82%A7%E3%82%A4%E3%82%B9%20%E3%83%AA%E3%83%A5%E3%83%83%E3%82%AF&tag=amanavi05-22' },
    { id: 2, name: 'Anello リュック', price: '¥4,980', rating: '4.5', emoji: '🎒', tags: ['コスパ', '軽量', 'カジュアル'], url: 'https://www.amazon.co.jp/s?k=Anello%20%E3%83%AA%E3%83%A5%E3%83%83%E3%82%AF&tag=amanavi05-22' },
    { id: 3, name: 'グレゴリー デイパック', price: '¥18,700', rating: '4.7', emoji: '🎒', tags: ['アウトドア', '耐久性', 'Gregory'], url: 'https://www.amazon.co.jp/s?k=%E3%82%B0%E3%83%AC%E3%82%B4%E3%83%AA%E3%83%BC%20%E3%83%87%E3%82%A4%E3%83%91%E3%83%83%E3%82%AF&tag=amanavi05-22' },
    { id: 4, name: 'ポーター タンカー', price: '¥33,000', rating: '4.8', emoji: '👜', tags: ['日本製', 'Porter', '高級'], url: 'https://www.amazon.co.jp/s?k=%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%BC%20%E3%82%BF%E3%83%B3%E3%82%AB%E3%83%BC&tag=amanavi05-22' },
    { id: 5, name: 'トートバッグ キャンバス', price: '¥2,980', rating: '4.4', emoji: '👜', tags: ['トート', 'シンプル', 'エコ'], url: 'https://www.amazon.co.jp/s?k=%E3%83%88%E3%83%BC%E3%83%88%E3%83%90%E3%83%83%E3%82%B0%20%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%90%E3%82%B9&tag=amanavi05-22' },
  ],
  'アクセサリ': [
    { id: 1, name: 'Apple Watch Series 9', price: '¥59,800', rating: '4.7', emoji: '⌚', tags: ['Apple', 'スマートウォッチ', '健康'], url: 'https://www.amazon.co.jp/s?k=Apple%20Watch%20Series%209&tag=amanavi05-22' },
    { id: 2, name: 'レイバン サングラス', price: '¥22,000', rating: '4.6', emoji: '🕶', tags: ['サングラス', 'UV', 'クラシック'], url: 'https://www.amazon.co.jp/s?k=%E3%83%AC%E3%82%A4%E3%83%90%E3%83%B3%20%E3%82%B5%E3%83%B3%E3%82%B0%E3%83%A9%E3%82%B9&tag=amanavi05-22' },
    { id: 3, name: 'ニューエラ キャップ', price: '¥5,500', rating: '4.5', emoji: '🧢', tags: ['キャップ', 'New Era', 'カジュアル'], url: 'https://www.amazon.co.jp/s?k=%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%A8%E3%83%A9%20%E3%82%AD%E3%83%A3%E3%83%83%E3%83%97&tag=amanavi05-22' },
    { id: 4, name: 'G-SHOCK', price: '¥16,500', rating: '4.7', emoji: '⌚', tags: ['時計', '耐衝撃', 'カシオ'], url: 'https://www.amazon.co.jp/s?k=G-SHOCK&tag=amanavi05-22' },
    { id: 5, name: 'アネロ ウォレット', price: '¥3,300', rating: '4.4', emoji: '👛', tags: ['財布', 'コスパ', 'カジュアル'], url: 'https://www.amazon.co.jp/s?k=%E3%82%A2%E3%83%8D%E3%83%AD%20%E3%82%A6%E3%82%A9%E3%83%AC%E3%83%83%E3%83%88&tag=amanavi05-22' },
  ],
  'アウター': [
    { id: 1, name: 'ユニクロ ウルトラライトダウン', price: '¥6,990', rating: '4.8', emoji: '🧥', tags: ['軽量', '防寒', 'コンパクト'], url: 'https://www.amazon.co.jp/s?k=%E3%83%A6%E3%83%8B%E3%82%AF%E3%83%AD%20%E3%82%A6%E3%83%AB%E3%83%88%E3%83%A9%E3%83%A9%E3%82%A4%E3%83%88%E3%83%80%E3%82%A6%E3%83%B3&tag=amanavi05-22' },
    { id: 2, name: 'ノースフェイス マウンテンジャケット', price: '¥49,500', rating: '4.8', emoji: '🧥', tags: ['防水', 'アウトドア', 'ブランド'], url: 'https://www.amazon.co.jp/s?k=%E3%83%8E%E3%83%BC%E3%82%B9%E3%83%95%E3%82%A7%E3%82%A4%E3%82%B9%20%E3%83%9E%E3%82%A6%E3%83%B3%E3%83%86%E3%83%B3%E3%82%B8%E3%83%A3%E3%82%B1%E3%83%83%E3%83%88&tag=amanavi05-22' },
    { id: 3, name: 'パタゴニア フリース', price: '¥22,000', rating: '4.7', emoji: '🧥', tags: ['フリース', 'パタゴニア', 'サステナブル'], url: 'https://www.amazon.co.jp/s?k=%E3%83%91%E3%82%BF%E3%82%B4%E3%83%8B%E3%82%A2%20%E3%83%95%E3%83%AA%E3%83%BC%E3%82%B9&tag=amanavi05-22' },
    { id: 4, name: 'コロンビア ウィンドブレーカー', price: '¥14,300', rating: '4.6', emoji: '🧥', tags: ['防風', '軽量', 'Columbia'], url: 'https://www.amazon.co.jp/s?k=%E3%82%B3%E3%83%AD%E3%83%B3%E3%83%93%E3%82%A2%20%E3%82%A6%E3%82%A3%E3%83%B3%E3%83%89%E3%83%96%E3%83%AC%E3%83%BC%E3%82%AB%E3%83%BC&tag=amanavi05-22' },
    { id: 5, name: 'ユニクロ ブロックテックパーカ', price: '¥14,990', rating: '4.6', emoji: '🧥', tags: ['防水', 'ユニクロ', 'コスパ'], url: 'https://www.amazon.co.jp/s?k=%E3%83%A6%E3%83%8B%E3%82%AF%E3%83%AD%20%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%83%86%E3%83%83%E3%82%AF%E3%83%91%E3%83%BC%E3%82%AB&tag=amanavi05-22' },
  ],
  '筋トレ': [
    { id: 1, name: 'プロテイン ザバス', price: '¥4,980', rating: '4.7', emoji: '💪', tags: ['タンパク質', 'ダイエット', '筋肥大'], url: 'https://www.amazon.co.jp/s?k=%E3%83%97%E3%83%AD%E3%83%86%E3%82%A4%E3%83%B3%20%E3%82%B6%E3%83%90%E3%82%B9&tag=amanavi05-22' },
    { id: 2, name: 'アジャスタブルダンベル', price: '¥24,800', rating: '4.6', emoji: '🏋️', tags: ['ダンベル', '可変式', '省スペース'], url: 'https://www.amazon.co.jp/s?k=%E3%82%A2%E3%82%B8%E3%83%A3%E3%82%B9%E3%82%BF%E3%83%96%E3%83%AB%E3%83%80%E3%83%B3%E3%83%99%E3%83%AB&tag=amanavi05-22' },
    { id: 3, name: 'ヨガマット 10mm', price: '¥3,980', rating: '4.6', emoji: '🧘', tags: ['マット', '厚め', '滑り止め'], url: 'https://www.amazon.co.jp/s?k=%E3%83%A8%E3%82%AC%E3%83%9E%E3%83%83%E3%83%88%2010mm&tag=amanavi05-22' },
    { id: 4, name: 'トレーニングベルト', price: '¥4,500', rating: '4.5', emoji: '🥋', tags: ['腰サポート', 'デッドリフト', 'スクワット'], url: 'https://www.amazon.co.jp/s?k=%E3%83%88%E3%83%AC%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E3%83%99%E3%83%AB%E3%83%88&tag=amanavi05-22' },
    { id: 5, name: 'EAA必須アミノ酸', price: '¥3,980', rating: '4.5', emoji: '🧪', tags: ['アミノ酸', '回復', 'パフォーマンス'], url: 'https://www.amazon.co.jp/s?k=EAA%E5%BF%85%E9%A0%88%E3%82%A2%E3%83%9F%E3%83%8E%E9%85%B8&tag=amanavi05-22' },
  ],
  'ランニング': [
    { id: 1, name: 'Nike Vaporfly 3', price: '¥29,700', rating: '4.8', emoji: '👟', tags: ['カーボン', '厚底', 'レース'], url: 'https://www.amazon.co.jp/s?k=Nike%20Vaporfly%203&tag=amanavi05-22' },
    { id: 2, name: 'Garmin Forerunner 265', price: '¥59,800', rating: '4.7', emoji: '⌚', tags: ['GPS', '心拍', 'スマートウォッチ'], url: 'https://www.amazon.co.jp/s?k=Garmin%20Forerunner%20265&tag=amanavi05-22' },
    { id: 3, name: 'On Cloudmonster', price: '¥19,800', rating: '4.6', emoji: '👟', tags: ['クッション', 'デイリー', 'スイス'], url: 'https://www.amazon.co.jp/s?k=On%20Cloudmonster&tag=amanavi05-22' },
    { id: 4, name: 'ランニングウェア上下セット', price: '¥6,980', rating: '4.5', emoji: '🏃', tags: ['速乾', '軽量', 'セット'], url: 'https://www.amazon.co.jp/s?k=%E3%83%A9%E3%83%B3%E3%83%8B%E3%83%B3%E3%82%B0%E3%82%A6%E3%82%A7%E3%82%A2%E4%B8%8A%E4%B8%8B%E3%82%BB%E3%83%83%E3%83%88&tag=amanavi05-22' },
    { id: 5, name: 'ランニングポーチ', price: '¥2,480', rating: '4.4', emoji: '👜', tags: ['スマホ収納', '軽量', 'ウエスト'], url: 'https://www.amazon.co.jp/s?k=%E3%83%A9%E3%83%B3%E3%83%8B%E3%83%B3%E3%82%B0%E3%83%9D%E3%83%BC%E3%83%81&tag=amanavi05-22' },
  ],
  'アウトドア': [
    { id: 1, name: 'コールマン テント', price: '¥24,800', rating: '4.6', emoji: '⛺', tags: ['テント', 'ファミリー', 'キャンプ'], url: 'https://www.amazon.co.jp/s?k=%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%9E%E3%83%B3%20%E3%83%86%E3%83%B3%E3%83%88&tag=amanavi05-22' },
    { id: 2, name: 'スノーピーク チェア', price: '¥19,800', rating: '4.7', emoji: '🪑', tags: ['アウトドアチェア', 'Snow Peak', '軽量'], url: 'https://www.amazon.co.jp/s?k=%E3%82%B9%E3%83%8E%E3%83%BC%E3%83%94%E3%83%BC%E3%82%AF%20%E3%83%81%E3%82%A7%E3%82%A2&tag=amanavi05-22' },
    { id: 3, name: 'ユニフレーム 焚き火台', price: '¥14,300', rating: '4.7', emoji: '🔥', tags: ['焚き火', '日本製', 'コンパクト'], url: 'https://www.amazon.co.jp/s?k=%E3%83%A6%E3%83%8B%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%20%E7%84%9A%E3%81%8D%E7%81%AB%E5%8F%B0&tag=amanavi05-22' },
    { id: 4, name: 'サーモス 山専ボトル', price: '¥4,950', rating: '4.8', emoji: '🍵', tags: ['保温', '登山', 'サーモス'], url: 'https://www.amazon.co.jp/s?k=%E3%82%B5%E3%83%BC%E3%83%A2%E3%82%B9%20%E5%B1%B1%E5%B0%82%E3%83%9C%E3%83%88%E3%83%AB&tag=amanavi05-22' },
    { id: 5, name: 'モンベル レインウェア', price: '¥29,700', rating: '4.7', emoji: '🧥', tags: ['防水', '登山', 'モンベル'], url: 'https://www.amazon.co.jp/s?k=%E3%83%A2%E3%83%B3%E3%83%99%E3%83%AB%20%E3%83%AC%E3%82%A4%E3%83%B3%E3%82%A6%E3%82%A7%E3%82%A2&tag=amanavi05-22' },
  ],
  'ヨガ・ストレッチ': [
    { id: 1, name: 'マンドゥカ ヨガマット', price: '¥19,800', rating: '4.8', emoji: '🧘', tags: ['高級', '耐久性', 'Manduka'], url: 'https://www.amazon.co.jp/s?k=%E3%83%9E%E3%83%B3%E3%83%89%E3%82%A5%E3%82%AB%20%E3%83%A8%E3%82%AC%E3%83%9E%E3%83%83%E3%83%88&tag=amanavi05-22' },
    { id: 2, name: 'ヨガブロック セット', price: '¥2,480', rating: '4.5', emoji: '🟦', tags: ['補助', '初心者', 'コスパ'], url: 'https://www.amazon.co.jp/s?k=%E3%83%A8%E3%82%AC%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%20%E3%82%BB%E3%83%83%E3%83%88&tag=amanavi05-22' },
    { id: 3, name: 'ストレッチポール', price: '¥8,800', rating: '4.6', emoji: '🔵', tags: ['筋膜リリース', '腰痛', 'リカバリー'], url: 'https://www.amazon.co.jp/s?k=%E3%82%B9%E3%83%88%E3%83%AC%E3%83%83%E3%83%81%E3%83%9D%E3%83%BC%E3%83%AB&tag=amanavi05-22' },
    { id: 4, name: 'ヨガウェア セット', price: '¥5,980', rating: '4.5', emoji: '🧘', tags: ['動きやすい', 'レディース', 'セット'], url: 'https://www.amazon.co.jp/s?k=%E3%83%A8%E3%82%AC%E3%82%A6%E3%82%A7%E3%82%A2%20%E3%82%BB%E3%83%83%E3%83%88&tag=amanavi05-22' },
    { id: 5, name: 'フォームローラー', price: '¥3,280', rating: '4.5', emoji: '🟩', tags: ['マッサージ', '回復', 'コンパクト'], url: 'https://www.amazon.co.jp/s?k=%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E3%83%AD%E3%83%BC%E3%83%A9%E3%83%BC&tag=amanavi05-22' },
  ],
  '球技': [
    { id: 1, name: 'モルテン サッカーボール', price: '¥4,800', rating: '4.6', emoji: '⚽', tags: ['サッカー', 'Molten', '練習'], url: 'https://www.amazon.co.jp/s?k=%E3%83%A2%E3%83%AB%E3%83%86%E3%83%B3%20%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%AB&tag=amanavi05-22' },
    { id: 2, name: 'スポルディング バスケットボール', price: '¥6,600', rating: '4.7', emoji: '🏀', tags: ['バスケ', 'Spalding', '練習'], url: 'https://www.amazon.co.jp/s?k=%E3%82%B9%E3%83%9D%E3%83%AB%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%20%E3%83%90%E3%82%B9%E3%82%B1%E3%83%83%E3%83%88%E3%83%9C%E3%83%BC%E3%83%AB&tag=amanavi05-22' },
    { id: 3, name: 'ウィルソン テニスラケット', price: '¥14,800', rating: '4.6', emoji: '🎾', tags: ['テニス', 'Wilson', '初中級'], url: 'https://www.amazon.co.jp/s?k=%E3%82%A6%E3%82%A3%E3%83%AB%E3%82%BD%E3%83%B3%20%E3%83%86%E3%83%8B%E3%82%B9%E3%83%A9%E3%82%B1%E3%83%83%E3%83%88&tag=amanavi05-22' },
    { id: 4, name: 'ミカサ バレーボール', price: '¥3,980', rating: '4.5', emoji: '🏐', tags: ['バレー', 'Mikasa', '練習'], url: 'https://www.amazon.co.jp/s?k=%E3%83%9F%E3%82%AB%E3%82%B5%20%E3%83%90%E3%83%AC%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%AB&tag=amanavi05-22' },
    { id: 5, name: 'SSK 野球グローブ', price: '¥12,800', rating: '4.5', emoji: '⚾', tags: ['野球', 'SSK', 'キャッチャー'], url: 'https://www.amazon.co.jp/s?k=SSK%20%E9%87%8E%E7%90%83%E3%82%B0%E3%83%AD%E3%83%BC%E3%83%96&tag=amanavi05-22' },
  ],
  'キッチン家電': [
    { id: 1, name: 'バルミューダ トースター', price: '¥33,000', rating: '4.6', emoji: '🍞', tags: ['おしゃれ', 'トースト', 'バルミューダ'], url: 'https://amzn.to/4tHFsgQ' },
    { id: 2, name: 'デロンギ コーヒーメーカー', price: '¥44,800', rating: '4.7', emoji: '☕', tags: ['コーヒー', 'デロンギ', '全自動'], url: 'https://amzn.to/3QIwPEw' },
    { id: 3, name: 'バイタミックス ブレンダー', price: '¥89,800', rating: '4.7', emoji: '🥤', tags: ['高性能', 'スムージー', '業務用'], url: 'https://amzn.to/3Qcf801' },
    { id: 4, name: 'シャープ ヘルシオ', price: '¥54,800', rating: '4.6', emoji: '🍳', tags: ['ウォーターオーブン', 'ヘルシー', 'シャープ'], url: 'https://amzn.to/48JPXbp' },
    { id: 5, name: 'タイガー 炊飯器', price: '¥24,800', rating: '4.7', emoji: '🍚', tags: ['炊飯器', 'タイガー', '日本製'], url: 'https://amzn.to/41Cqb55' },
  ],
  '空調・空気': [
    { id: 1, name: 'ダイソン 空気清浄機', price: '¥89,800', rating: '4.7', emoji: '💨', tags: ['空気清浄', '扇風機', 'ダイソン'], url: 'https://www.amazon.co.jp/s?k=%E3%83%80%E3%82%A4%E3%82%BD%E3%83%B3%20%E7%A9%BA%E6%B0%97%E6%B8%85%E6%B5%84%E6%A9%9F&tag=amanavi05-22' },
    { id: 2, name: 'シャープ 加湿空気清浄機', price: '¥34,800', rating: '4.6', emoji: '💧', tags: ['加湿', '空気清浄', 'プラズマクラスター'], url: 'https://www.amazon.co.jp/s?k=%E3%82%B7%E3%83%A3%E3%83%BC%E3%83%97%20%E5%8A%A0%E6%B9%BF%E7%A9%BA%E6%B0%97%E6%B8%85%E6%B5%84%E6%A9%9F&tag=amanavi05-22' },
    { id: 3, name: 'パナソニック エアコン', price: '¥89,800', rating: '4.7', emoji: '❄️', tags: ['エアコン', 'パナソニック', '省エネ'], url: 'https://www.amazon.co.jp/s?k=%E3%83%91%E3%83%8A%E3%82%BD%E3%83%8B%E3%83%83%E3%82%AF%20%E3%82%A8%E3%82%A2%E3%82%B3%E3%83%B3&tag=amanavi05-22' },
    { id: 4, name: 'バルミューダ 扇風機', price: '¥35,200', rating: '4.5', emoji: '🌀', tags: ['扇風機', 'おしゃれ', 'バルミューダ'], url: 'https://www.amazon.co.jp/s?k=%E3%83%90%E3%83%AB%E3%83%9F%E3%83%A5%E3%83%BC%E3%83%80%20%E6%89%87%E9%A2%A8%E6%A9%9F&tag=amanavi05-22' },
    { id: 5, name: 'ダイキン 除湿機', price: '¥29,800', rating: '4.6', emoji: '💦', tags: ['除湿', 'ダイキン', '梅雨'], url: 'https://www.amazon.co.jp/s?k=%E3%83%80%E3%82%A4%E3%82%AD%E3%83%B3%20%E9%99%A4%E6%B9%BF%E6%A9%9F&tag=amanavi05-22' },
  ],
  '照明': [
    { id: 1, name: 'フィリップス Hue', price: '¥9,980', rating: '4.5', emoji: '💡', tags: ['スマート照明', '調光', 'おしゃれ'], url: 'https://www.amazon.co.jp/s?k=%E3%83%95%E3%82%A3%E3%83%AA%E3%83%83%E3%83%97%E3%82%B9%20Hue&tag=amanavi05-22' },
    { id: 2, name: 'パナソニック シーリング', price: '¥14,800', rating: '4.6', emoji: '🔆', tags: ['シーリング', '調光', 'パナソニック'], url: 'https://www.amazon.co.jp/s?k=%E3%83%91%E3%83%8A%E3%82%BD%E3%83%8B%E3%83%83%E3%82%AF%20%E3%82%B7%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0&tag=amanavi05-22' },
    { id: 3, name: 'Anker デスクライト', price: '¥4,980', rating: '4.6', emoji: '🕯', tags: ['デスクライト', 'USB-C', 'Anker'], url: 'https://www.amazon.co.jp/s?k=Anker%20%E3%83%87%E3%82%B9%E3%82%AF%E3%83%A9%E3%82%A4%E3%83%88&tag=amanavi05-22' },
    { id: 4, name: 'YAMAGIWA 間接照明', price: '¥24,800', rating: '4.5', emoji: '🌟', tags: ['間接照明', 'おしゃれ', 'インテリア'], url: 'https://www.amazon.co.jp/s?k=YAMAGIWA%20%E9%96%93%E6%8E%A5%E7%85%A7%E6%98%8E&tag=amanavi05-22' },
    { id: 5, name: 'ボネコ アロマランプ', price: '¥8,800', rating: '4.4', emoji: '🕯', tags: ['アロマ', 'リラックス', 'おしゃれ'], url: 'https://www.amazon.co.jp/s?k=%E3%83%9C%E3%83%8D%E3%82%B3%20%E3%82%A2%E3%83%AD%E3%83%9E%E3%83%A9%E3%83%B3%E3%83%97&tag=amanavi05-22' },
  ],
  '収納': [
    { id: 1, name: 'ニトリ 収納ボックス', price: '¥1,490', rating: '4.6', emoji: '📦', tags: ['収納', 'シンプル', 'コスパ'], url: 'https://www.amazon.co.jp/s?k=%E3%83%8B%E3%83%88%E3%83%AA%20%E5%8F%8E%E7%B4%8D%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9&tag=amanavi05-22' },
    { id: 2, name: 'IKEA カラックス', price: '¥14,990', rating: '4.7', emoji: '🗄', tags: ['棚', 'IKEA', 'カスタマイズ'], url: 'https://www.amazon.co.jp/s?k=IKEA%20%E3%82%AB%E3%83%A9%E3%83%83%E3%82%AF%E3%82%B9&tag=amanavi05-22' },
    { id: 3, name: 'スタックストー バケット', price: '¥3,980', rating: '4.6', emoji: '🪣', tags: ['おしゃれ', 'スタック', 'カラフル'], url: 'https://www.amazon.co.jp/s?k=%E3%82%B9%E3%82%BF%E3%83%83%E3%82%AF%E3%82%B9%E3%83%88%E3%83%BC%20%E3%83%90%E3%82%B1%E3%83%83%E3%83%88&tag=amanavi05-22' },
    { id: 4, name: 'ハンガーラック', price: '¥6,800', rating: '4.5', emoji: '👗', tags: ['クローゼット', 'スリム', 'キャスター付き'], url: 'https://www.amazon.co.jp/s?k=%E3%83%8F%E3%83%B3%E3%82%AC%E3%83%BC%E3%83%A9%E3%83%83%E3%82%AF&tag=amanavi05-22' },
    { id: 5, name: 'フリーラック スチール', price: '¥9,800', rating: '4.5', emoji: '🗂', tags: ['スチール', '丈夫', 'DIY'], url: 'https://www.amazon.co.jp/s?k=%E3%83%95%E3%83%AA%E3%83%BC%E3%83%A9%E3%83%83%E3%82%AF%20%E3%82%B9%E3%83%81%E3%83%BC%E3%83%AB&tag=amanavi05-22' },
  ],

  'ミラーレス一眼': [
    { id: 1, name: 'Sony α7C II', price: '¥299,800', rating: '4.8', emoji: '📷', tags: ['Sony', 'フルサイズ', 'コンパクト'], url: 'https://www.amazon.co.jp/s?k=Sony+%CE%B17C+II&tag=amanavi05-22' },
    { id: 2, name: 'Fujifilm X100VI', price: '¥238,000', rating: '4.8', emoji: '📷', tags: ['Fujifilm', 'フィルム風', 'コンパクト'], url: 'https://www.amazon.co.jp/s?k=Fujifilm+X100VI&tag=amanavi05-22' },
    { id: 3, name: 'Canon EOS R50', price: '¥89,800', rating: '4.7', emoji: '📷', tags: ['Canon', '入門', '軽量'], url: 'https://www.amazon.co.jp/s?k=Canon+EOS+R50&tag=amanavi05-22' },
    { id: 4, name: 'OM System OM-5', price: '¥149,800', rating: '4.6', emoji: '📷', tags: ['防塵防滴', 'アウトドア', 'コンパクト'], url: 'https://www.amazon.co.jp/s?k=OM+System+OM-5&tag=amanavi05-22' },
    { id: 5, name: 'Nikon Z30', price: '¥79,800', rating: '4.6', emoji: '📷', tags: ['Nikon', '動画', '入門'], url: 'https://www.amazon.co.jp/s?k=Nikon+Z30&tag=amanavi05-22' },
  ],
  'アクションカメラ': [
    { id: 1, name: 'GoPro HERO13', price: '¥59,800', rating: '4.7', emoji: '🎥', tags: ['GoPro', '防水', 'アクション'], url: 'https://www.amazon.co.jp/s?k=GoPro+HERO13&tag=amanavi05-22' },
    { id: 2, name: 'DJI Osmo Action 5 Pro', price: '¥54,800', rating: '4.7', emoji: '🎥', tags: ['DJI', '手ぶれ補正', '4K'], url: 'https://www.amazon.co.jp/s?k=DJI+Osmo+Action+5+Pro&tag=amanavi05-22' },
    { id: 3, name: 'Insta360 X4', price: '¥74,800', rating: '4.6', emoji: '🎥', tags: ['360度', 'Insta360', 'VR'], url: 'https://www.amazon.co.jp/s?k=Insta360+X4&tag=amanavi05-22' },
    { id: 4, name: 'DJI Pocket 3', price: '¥79,800', rating: '4.8', emoji: '🎥', tags: ['ジンバル', '小型', 'Vlog'], url: 'https://www.amazon.co.jp/s?k=DJI+Pocket+3&tag=amanavi05-22' },
    { id: 5, name: 'Sony ZV-1 II', price: '¥59,800', rating: '4.6', emoji: '🎥', tags: ['Sony', 'Vlog', '広角'], url: 'https://www.amazon.co.jp/s?k=Sony+ZV-1+II&tag=amanavi05-22' },
  ],
  'スマートスピーカー': [
    { id: 1, name: 'Amazon Echo Dot 第5世代', price: '¥7,480', rating: '4.6', emoji: '🔊', tags: ['Alexa', 'コンパクト', 'コスパ'], url: 'https://www.amazon.co.jp/s?k=Echo+Dot+第5世代&tag=amanavi05-22' },
    { id: 2, name: 'Apple HomePod mini', price: '¥12,800', rating: '4.5', emoji: '🔊', tags: ['Apple', 'Siri', '音質'], url: 'https://www.amazon.co.jp/s?k=HomePod+mini&tag=amanavi05-22' },
    { id: 3, name: 'Google Nest Audio', price: '¥11,000', rating: '4.5', emoji: '🔊', tags: ['Google', '音質', 'スマートホーム'], url: 'https://www.amazon.co.jp/s?k=Google+Nest+Audio&tag=amanavi05-22' },
    { id: 4, name: 'Amazon Echo Show 8', price: '¥14,980', rating: '4.6', emoji: '📺', tags: ['画面付き', 'ビデオ通話', 'Alexa'], url: 'https://www.amazon.co.jp/s?k=Echo+Show+8&tag=amanavi05-22' },
    { id: 5, name: 'Amazon Echo Pop', price: '¥4,980', rating: '4.5', emoji: '🔊', tags: ['コンパクト', 'コスパ', 'Alexa'], url: 'https://www.amazon.co.jp/s?k=Echo+Pop&tag=amanavi05-22' },
  ],
  'スキンケア': [
    { id: 1, name: 'SK-II フェイシャルトリートメントエッセンス', price: '¥16,500', rating: '4.7', emoji: '🧴', tags: ['SK-II', '美容液', 'ピテラ'], url: 'https://www.amazon.co.jp/s?k=SK-II+フェイシャルトリートメント&tag=amanavi05-22' },
    { id: 2, name: 'COSRX ナイアシンアミドセラム', price: '¥2,980', rating: '4.6', emoji: '🧴', tags: ['韓国コスメ', 'ニキビ跡', 'コスパ'], url: 'https://www.amazon.co.jp/s?k=COSRX+ナイアシンアミド&tag=amanavi05-22' },
    { id: 3, name: 'ドクタージャルト シカペア', price: '¥4,500', rating: '4.6', emoji: '🟢', tags: ['敏感肌', '鎮静', '韓国コスメ'], url: 'https://www.amazon.co.jp/s?k=ドクタージャルト+シカペア&tag=amanavi05-22' },
    { id: 4, name: 'Anessa 日焼け止め', price: '¥1,980', rating: '4.8', emoji: '☀️', tags: ['日焼け止め', 'SPF50+', 'ウォータープルーフ'], url: 'https://www.amazon.co.jp/s?k=Anessa+日焼け止め&tag=amanavi05-22' },
    { id: 5, name: 'クレ・ド・ポー ボーテ 美容液', price: '¥19,800', rating: '4.7', emoji: '✨', tags: ['高級', '美白', 'ハリ'], url: 'https://www.amazon.co.jp/s?k=クレドポーボーテ+美容液&tag=amanavi05-22' },
  ],
  '美容家電': [
    { id: 1, name: 'Dyson Supersonic', price: '¥59,400', rating: '4.7', emoji: '💨', tags: ['ダイソン', 'ドライヤー', '速乾'], url: 'https://www.amazon.co.jp/s?k=Dyson+Supersonic&tag=amanavi05-22' },
    { id: 2, name: 'ヤーマン 美顔器 RF', price: '¥29,800', rating: '4.5', emoji: '✨', tags: ['RF美顔器', 'リフトアップ', 'EMS'], url: 'https://www.amazon.co.jp/s?k=ヤーマン+美顔器&tag=amanavi05-22' },
    { id: 3, name: 'パナソニック ヘアアイロン', price: '¥14,800', rating: '4.7', emoji: '💇', tags: ['ストレート', 'イオン', 'パナソニック'], url: 'https://www.amazon.co.jp/s?k=パナソニック+ヘアアイロン&tag=amanavi05-22' },
    { id: 4, name: 'Braun 電気シェーバー', price: '¥24,800', rating: '4.7', emoji: '🪒', tags: ['シェーバー', '防水', 'Braun'], url: 'https://www.amazon.co.jp/s?k=Braun+電気シェーバー&tag=amanavi05-22' },
    { id: 5, name: 'ケノン 脱毛器', price: '¥69,800', rating: '4.5', emoji: '💡', tags: ['家庭用脱毛', 'フラッシュ', '全身'], url: 'https://www.amazon.co.jp/s?k=ケノン+脱毛器&tag=amanavi05-22' },
  ],
  'お菓子・スイーツ': [
    { id: 1, name: 'ロイズ 生チョコレート', price: '¥1,296', rating: '4.8', emoji: '🍫', tags: ['北海道', 'チョコ', 'ギフト'], url: 'https://www.amazon.co.jp/s?k=ロイズ+生チョコレート&tag=amanavi05-22' },
    { id: 2, name: 'メリーチョコレート 缶', price: '¥2,160', rating: '4.7', emoji: '🍬', tags: ['ギフト', 'アソート', '缶'], url: 'https://www.amazon.co.jp/s?k=メリーチョコレート&tag=amanavi05-22' },
    { id: 3, name: 'ポップコーン カラフル', price: '¥1,980', rating: '4.6', emoji: '🍿', tags: ['おつまみ', 'カラフル', 'パーティー'], url: 'https://www.amazon.co.jp/s?k=カラフルポップコーン&tag=amanavi05-22' },
    { id: 4, name: 'ハリボー グミ 大袋', price: '¥998', rating: '4.7', emoji: '🐻', tags: ['グミ', 'ハリボー', 'お徳用'], url: 'https://www.amazon.co.jp/s?k=ハリボー+グミ&tag=amanavi05-22' },
    { id: 5, name: 'GODIVAチョコレート', price: '¥3,240', rating: '4.7', emoji: '🍫', tags: ['高級', 'ギフト', 'ベルギー'], url: 'https://www.amazon.co.jp/s?k=GODIVA+チョコレート&tag=amanavi05-22' },
  ],
  'サプリメント': [
    { id: 1, name: 'NOW Foods ビタミンC', price: '¥2,480', rating: '4.7', emoji: '🍋', tags: ['ビタミンC', '免疫', 'コスパ'], url: 'https://www.amazon.co.jp/s?k=NOW+Foods+ビタミンC&tag=amanavi05-22' },
    { id: 2, name: 'DHC マルチビタミン', price: '¥598', rating: '4.6', emoji: '💊', tags: ['DHC', '総合ビタミン', 'コスパ'], url: 'https://www.amazon.co.jp/s?k=DHC+マルチビタミン&tag=amanavi05-22' },
    { id: 3, name: 'Nature Made マグネシウム', price: '¥1,980', rating: '4.6', emoji: '💪', tags: ['マグネシウム', '睡眠', '筋肉'], url: 'https://www.amazon.co.jp/s?k=Nature+Made+マグネシウム&tag=amanavi05-22' },
    { id: 4, name: 'オメガ3 フィッシュオイル', price: '¥2,980', rating: '4.5', emoji: '🐟', tags: ['DHA', 'EPA', '心臓'], url: 'https://www.amazon.co.jp/s?k=オメガ3+フィッシュオイル&tag=amanavi05-22' },
    { id: 5, name: 'BCAA アミノ酸', price: '¥3,480', rating: '4.6', emoji: '🧪', tags: ['BCAA', '筋トレ', '回復'], url: 'https://www.amazon.co.jp/s?k=BCAA+アミノ酸&tag=amanavi05-22' },
  ],
  '犬用品': [
    { id: 1, name: 'コングクラシック', price: '¥1,280', rating: '4.7', emoji: '🐶', tags: ['おもちゃ', '知育', 'ゴム'], url: 'https://www.amazon.co.jp/s?k=コング+クラシック&tag=amanavi05-22' },
    { id: 2, name: 'ロイヤルカナン 中型犬', price: '¥6,980', rating: '4.7', emoji: '🦴', tags: ['ロイヤルカナン', 'ドッグフード', '総合栄養食'], url: 'https://www.amazon.co.jp/s?k=ロイヤルカナン+中型犬&tag=amanavi05-22' },
    { id: 3, name: 'フレキシリード', price: '¥2,980', rating: '4.5', emoji: '🐕', tags: ['伸縮リード', '散歩', 'フレキシ'], url: 'https://www.amazon.co.jp/s?k=フレキシリード&tag=amanavi05-22' },
    { id: 4, name: 'ペット用キャリーバッグ', price: '¥4,980', rating: '4.5', emoji: '👜', tags: ['キャリー', '持ち運び', '通院'], url: 'https://www.amazon.co.jp/s?k=ペット+キャリーバッグ+犬&tag=amanavi05-22' },
    { id: 5, name: 'GEX おでかけカート', price: '¥14,800', rating: '4.4', emoji: '🛒', tags: ['カート', '小型犬', '散歩'], url: 'https://www.amazon.co.jp/s?k=GEX+ペットカート&tag=amanavi05-22' },
  ],
  '猫用品': [
    { id: 1, name: 'キャットタワー 大型', price: '¥9,800', rating: '4.5', emoji: '🐱', tags: ['キャットタワー', '多頭', '大型'], url: 'https://www.amazon.co.jp/s?k=キャットタワー+大型&tag=amanavi05-22' },
    { id: 2, name: 'ロイヤルカナン 猫用', price: '¥4,980', rating: '4.7', emoji: '🐟', tags: ['キャットフード', 'ロイヤルカナン', '総合栄養食'], url: 'https://www.amazon.co.jp/s?k=ロイヤルカナン+猫&tag=amanavi05-22' },
    { id: 3, name: 'じゃらし おもちゃ', price: '¥980', rating: '4.6', emoji: '🪶', tags: ['おもちゃ', 'じゃらし', '運動'], url: 'https://www.amazon.co.jp/s?k=猫+じゃらし&tag=amanavi05-22' },
    { id: 4, name: 'システムトイレ デオトイレ', price: '¥4,480', rating: '4.6', emoji: '🚽', tags: ['システムトイレ', '消臭', 'デオトイレ'], url: 'https://www.amazon.co.jp/s?k=デオトイレ&tag=amanavi05-22' },
    { id: 5, name: '自動給水器 ピュアクリスタル', price: '¥3,980', rating: '4.6', emoji: '💧', tags: ['給水器', '自動', '猫'], url: 'https://www.amazon.co.jp/s?k=ピュアクリスタル+猫&tag=amanavi05-22' },
  ],
  'おもちゃ': [
    { id: 1, name: 'レゴ クラシック', price: '¥4,980', rating: '4.8', emoji: '🧱', tags: ['レゴ', '知育', '創造力'], url: 'https://www.amazon.co.jp/s?k=レゴ+クラシック&tag=amanavi05-22' },
    { id: 2, name: 'プラレール 新幹線', price: '¥3,480', rating: '4.7', emoji: '🚄', tags: ['プラレール', '電車', '男の子'], url: 'https://www.amazon.co.jp/s?k=プラレール+新幹線&tag=amanavi05-22' },
    { id: 3, name: 'シルバニアファミリー', price: '¥3,980', rating: '4.8', emoji: '🐰', tags: ['シルバニア', '女の子', 'ままごと'], url: 'https://www.amazon.co.jp/s?k=シルバニアファミリー&tag=amanavi05-22' },
    { id: 4, name: 'ニンテンドー ゲームウォッチ', price: '¥5,478', rating: '4.6', emoji: '🎮', tags: ['任天堂', 'レトロ', 'コレクション'], url: 'https://www.amazon.co.jp/s?k=ゲームウォッチ&tag=amanavi05-22' },
    { id: 5, name: 'タカラトミー 人生ゲーム', price: '¥4,200', rating: '4.6', emoji: '🎲', tags: ['ボードゲーム', 'ファミリー', 'パーティー'], url: 'https://www.amazon.co.jp/s?k=タカラトミー+人生ゲーム&tag=amanavi05-22' },
  ],
  '電動工具': [
    { id: 1, name: 'マキタ 充電式ドリルドライバ', price: '¥19,800', rating: '4.8', emoji: '🔧', tags: ['マキタ', 'コードレス', 'DIY'], url: 'https://www.amazon.co.jp/s?k=マキタ+充電式ドリル&tag=amanavi05-22' },
    { id: 2, name: 'Bosch インパクトドライバー', price: '¥24,800', rating: '4.7', emoji: '🔩', tags: ['Bosch', 'プロ', 'インパクト'], url: 'https://www.amazon.co.jp/s?k=Bosch+インパクトドライバー&tag=amanavi05-22' },
    { id: 3, name: '電動サンダー', price: '¥8,980', rating: '4.5', emoji: '🪚', tags: ['研磨', '仕上げ', 'DIY'], url: 'https://www.amazon.co.jp/s?k=電動サンダー+DIY&tag=amanavi05-22' },
    { id: 4, name: 'レーザー距離計', price: '¥5,980', rating: '4.7', emoji: '📏', tags: ['測定', 'レーザー', '精度'], url: 'https://www.amazon.co.jp/s?k=レーザー距離計&tag=amanavi05-22' },
    { id: 5, name: 'ドリルビット セット', price: '¥2,980', rating: '4.6', emoji: '🔩', tags: ['ビット', 'セット', 'コスパ'], url: 'https://www.amazon.co.jp/s?k=ドリルビット+セット&tag=amanavi05-22' },
  ],
  'ドライブレコーダー': [
    { id: 1, name: 'VANTRUE N4 前後3カメラ', price: '¥29,800', rating: '4.7', emoji: '📹', tags: ['3カメラ', '前後', '駐車監視'], url: 'https://www.amazon.co.jp/s?k=VANTRUE+N4&tag=amanavi05-22' },
    { id: 2, name: 'Garmin Dash Cam Mini2', price: '¥9,800', rating: '4.6', emoji: '📹', tags: ['小型', 'Garmin', 'シンプル'], url: 'https://www.amazon.co.jp/s?k=Garmin+Dash+Cam+Mini2&tag=amanavi05-22' },
    { id: 3, name: 'ユピテル SN-TW9600d', price: '¥24,800', rating: '4.5', emoji: '📹', tags: ['前後', '4K', 'ユピテル'], url: 'https://www.amazon.co.jp/s?k=ユピテル+ドライブレコーダー&tag=amanavi05-22' },
    { id: 4, name: 'Nextbase 622GW', price: '¥34,800', rating: '4.6', emoji: '📹', tags: ['4K', 'WiFi', '手ぶれ補正'], url: 'https://www.amazon.co.jp/s?k=Nextbase+622GW&tag=amanavi05-22' },
    { id: 5, name: 'コムテック ZDR035', price: '¥19,800', rating: '4.7', emoji: '📹', tags: ['前後', '駐車監視', 'コムテック'], url: 'https://www.amazon.co.jp/s?k=コムテック+ZDR035&tag=amanavi05-22' },
  ],
  '掃除': [
    { id: 1, name: 'ルンバ j7+', price: '¥99,800', rating: '4.5', emoji: '🤖', tags: ['ロボット掃除機', '自動ゴミ収集', 'iRobot'], url: 'https://www.amazon.co.jp/s?k=%E3%83%AB%E3%83%B3%E3%83%90%20j7%2B&tag=amanavi05-22' },
    { id: 2, name: 'ダイソン V15', price: '¥89,800', rating: '4.7', emoji: '🌀', tags: ['コードレス', '強力吸引', 'ダイソン'], url: 'https://www.amazon.co.jp/s?k=%E3%83%80%E3%82%A4%E3%82%BD%E3%83%B3%20V15&tag=amanavi05-22' },
    { id: 3, name: 'パナソニック コードレス', price: '¥34,800', rating: '4.5', emoji: '🧹', tags: ['コードレス', '軽量', 'パナソニック'], url: 'https://www.amazon.co.jp/s?k=%E3%83%91%E3%83%8A%E3%82%BD%E3%83%8B%E3%83%83%E3%82%AF%20%E3%82%B3%E3%83%BC%E3%83%89%E3%83%AC%E3%82%B9&tag=amanavi05-22' },
    { id: 4, name: 'ブラーバ 床拭きロボット', price: '¥44,800', rating: '4.4', emoji: '🫧', tags: ['床拭き', 'ロボット', 'iRobot'], url: 'https://www.amazon.co.jp/s?k=%E3%83%96%E3%83%A9%E3%83%BC%E3%83%90%20%E5%BA%8A%E6%8B%AD%E3%81%8D%E3%83%AD%E3%83%9C%E3%83%83%E3%83%88&tag=amanavi05-22' },
    { id: 5, name: 'マキタ 充電式クリーナー', price: '¥19,800', rating: '4.6', emoji: '🔋', tags: ['マキタ', '充電式', 'コンパクト'], url: 'https://www.amazon.co.jp/s?k=%E3%83%9E%E3%82%AD%E3%82%BF%20%E5%85%85%E9%9B%BB%E5%BC%8F%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%8A%E3%83%BC&tag=amanavi05-22' },
  ],
}

function RecommendContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const genre = searchParams.get('genre') ?? 'ガジェット'
  const categoriesParam = searchParams.get('categories') ?? searchParams.get('category') ?? 'スマホ'
  const categoryList = categoriesParam.split(',')
  const tagsParam = searchParams.get('tags') ?? ''
  const likedTags = tagsParam ? tagsParam.split(',') : []

  // LIKEしたカテゴリの商品のみ取得（なければ全カテゴリ）
  const allItems = categoryList.flatMap(cat => products[cat] ?? [])

  // タグスコアでソート（LIKEしたタグが多いほど上位）
  const scored = allItems.map(item => ({
    ...item,
    score: item.tags.filter(t => likedTags.includes(t)).length,
  })).sort((a, b) => b.score - a.score)

  // スコア0の商品は除外（タグが一致しないものは表示しない）
  const filtered = likedTags.length > 0
    ? scored.filter(item => item.score > 0)
    : scored

  // filteredが空の場合はscoredの上位5件を使う
  const displayItems = filtered.length > 0 ? filtered : scored.slice(0, 5)

  const reason = likedTags.length > 0
    ? `${[...new Set(likedTags)].slice(0, 3).join('・')}に興味があるあなたへ`
    : `${genre} / ${categoryList.join('・')}のおすすめ商品です`

  return (
    <>
      <Header />
      <main style={{ background: '#F3F3F3', minHeight: '100vh', color: '#0F1111', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', paddingBottom: '40px' }}>

        {/* ヒーローバナー */}
        <div style={{ background: '#131921', padding: '20px 16px 24px', marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: '#FF9900', fontWeight: '700', marginBottom: '6px' }}>診断結果</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>あなたへのおすすめ</div>
          <div style={{ background: 'rgba(255,216,20,0.15)', border: '1px solid rgba(255,216,20,0.4)', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', color: '#FFD814' }}>
            💡 {reason}
          </div>
          {likedTags.length > 0 && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
              {[...new Set(likedTags)].map(tag => (
                <span key={tag} style={{ background: 'rgba(255,153,0,0.2)', color: '#FF9900', fontSize: '11px', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(255,153,0,0.4)' }}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* 商品リスト */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {displayItems.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              style={{
                background: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                border: i === 0 ? '2px solid #FF9900' : '1px solid #DDD',
                boxShadow: i === 0 ? '0 4px 16px rgba(255,153,0,0.15)' : '0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              {/* ベストマッチバッジ */}
              {i === 0 && (
                <div style={{ background: 'linear-gradient(90deg, #FF9900, #FFB700)', color: '#fff', fontSize: '12px', padding: '5px 12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ★ あなたへのベストマッチ
                </div>
              )}
              {i === 1 && (
                <div style={{ background: '#F3F3F3', color: '#565959', fontSize: '11px', padding: '4px 12px', fontWeight: '600' }}>
                  2位
                </div>
              )}
              {i === 2 && (
                <div style={{ background: '#F3F3F3', color: '#565959', fontSize: '11px', padding: '4px 12px', fontWeight: '600' }}>
                  3位
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                {/* 絵文字エリア */}
                <div style={{
                  width: '110px', minHeight: '110px', flexShrink: 0,
                  background: i === 0 ? 'linear-gradient(135deg, #FFF8E7, #FFF3CD)' : '#F8F8F8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '48px',
                }}>
                  {item.emoji}
                </div>

                {/* 商品情報 */}
                <div style={{ flex: 1, padding: '12px 14px', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', lineHeight: 1.4, color: '#0F1111' }}>{item.name}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
                      <span style={{ fontSize: '20px', color: '#B12704', fontWeight: '700' }}>{item.price}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      {'★★★★★'.slice(0, Math.round(parseFloat(item.rating))).split('').map((_, si) => (
                        <span key={si} style={{ color: '#FF9900', fontSize: '12px' }}>★</span>
                      ))}
                      <span style={{ fontSize: '12px', color: '#565959', marginLeft: '2px' }}>{item.rating}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
                      {item.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '11px',
                          color: likedTags.includes(tag) ? '#FF9900' : '#565959',
                          background: likedTags.includes(tag) ? '#FFF3CD' : '#F3F3F3',
                          padding: '2px 8px', borderRadius: '4px',
                          border: likedTags.includes(tag) ? '1px solid #FF9900' : '1px solid #DDD',
                          fontWeight: likedTags.includes(tag) ? '700' : '400',
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(item.url, '_blank')}
                    style={{
                      marginTop: '10px',
                      background: i === 0 ? '#FFD814' : '#fff',
                      color: '#0F1111',
                      border: i === 0 ? 'none' : '1px solid #DDD',
                      borderRadius: '6px',
                      padding: '8px',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    🛒 Amazonで見る
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 16px' }}>
          <button
            onClick={() => router.push('/genre')}
            style={{ width: '100%', background: '#131921', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '14px', cursor: 'pointer', fontWeight: '700' }}
          >
            もう一度診断する
          </button>
        </div>
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