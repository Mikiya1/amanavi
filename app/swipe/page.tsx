'use client'

import { useState, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '../components/Header'

const products: Record<string, { id: number; name: string; price: string; rating: string; emoji: string; tags: string[] }[]> = {
  'スマホ': [
    { id: 1, name: 'iPhone 15', price: '¥124,800', rating: '4.8', emoji: '📱', tags: ['Apple', 'カメラ', 'コンパクト'] },
    { id: 2, name: 'Galaxy S24', price: '¥99,800', rating: '4.7', emoji: '📱', tags: ['Android', 'カメラ', 'AI'] },
    { id: 3, name: 'Pixel 8', price: '¥82,500', rating: '4.6', emoji: '📱', tags: ['Google', 'AI', 'カメラ'] },
    { id: 4, name: 'Xperia 1 VI', price: '¥189,000', rating: '4.5', emoji: '📱', tags: ['Sony', '高画質', '音質'] },
    { id: 5, name: 'AQUOS sense8', price: '¥44,800', rating: '4.4', emoji: '📱', tags: ['コスパ', '軽量', '日本製'] },
  ],
  'タブレット': [
    { id: 1, name: 'iPad Air M2', price: '¥98,800', rating: '4.8', emoji: '📲', tags: ['Apple', '軽量', 'M2チップ'] },
    { id: 2, name: 'iPad mini 7', price: '¥78,800', rating: '4.7', emoji: '📲', tags: ['Apple', 'コンパクト', '持ち運び'] },
    { id: 3, name: 'Galaxy Tab S9', price: '¥89,800', rating: '4.6', emoji: '📲', tags: ['Android', 'AMOLED', 'Samsung'] },
    { id: 4, name: 'Fire HD 10', price: '¥19,980', rating: '4.3', emoji: '📲', tags: ['コスパ', 'Amazon', '動画'] },
    { id: 5, name: 'Lenovo Tab P12', price: '¥54,800', rating: '4.4', emoji: '📲', tags: ['大画面', 'Android', 'コスパ'] },
  ],
  'イヤホン': [
    { id: 1, name: 'AirPods Pro 2', price: '¥39,800', rating: '4.8', emoji: '🎧', tags: ['Apple', 'ノイキャン', '空間音響'] },
    { id: 2, name: 'Sony WF-1000XM5', price: '¥38,500', rating: '4.8', emoji: '🎧', tags: ['Sony', 'ノイキャン', '高音質'] },
    { id: 3, name: 'Anker Soundcore P40i', price: '¥5,990', rating: '4.6', emoji: '🎧', tags: ['コスパ', 'ノイキャン', 'Anker'] },
    { id: 4, name: 'Nothing Ear 2', price: '¥22,800', rating: '4.5', emoji: '🎧', tags: ['デザイン', '高音質', 'おしゃれ'] },
    { id: 5, name: 'Bose QuietComfort', price: '¥29,800', rating: '4.7', emoji: '🎧', tags: ['Bose', 'ノイキャン', '快適'] },
  ],
  'モニター': [
    { id: 1, name: 'LG 27UL500 4K', price: '¥32,800', rating: '4.6', emoji: '🖥', tags: ['4K', 'LG', 'USB-C'] },
    { id: 2, name: 'ASUS ROG Swift', price: '¥89,800', rating: '4.7', emoji: '🖥', tags: ['ゲーミング', '144Hz', 'ASUS'] },
    { id: 3, name: 'Dell U2722D', price: '¥54,800', rating: '4.7', emoji: '🖥', tags: ['仕事', 'USB-C', 'Dell'] },
    { id: 4, name: 'BenQ EW2880U', price: '¥44,800', rating: '4.5', emoji: '🖥', tags: ['4K', 'HDR', 'コスパ'] },
    { id: 5, name: 'Samsung 49インチ曲面', price: '¥98,000', rating: '4.6', emoji: '🖥', tags: ['ウルトラワイド', '曲面', 'Samsung'] },
  ],
  'PC周辺機器': [
    { id: 1, name: 'HHKB Professional', price: '¥35,200', rating: '4.7', emoji: '⌨️', tags: ['キーボード', '高級', '打鍵感'] },
    { id: 2, name: 'ロジクール MX Master 3', price: '¥14,800', rating: '4.8', emoji: '🖱', tags: ['マウス', '仕事', 'ロジクール'] },
    { id: 3, name: 'Anker 65W充電器', price: '¥3,990', rating: '4.7', emoji: '🔌', tags: ['充電', 'コンパクト', 'USB-C'] },
    { id: 4, name: 'ロジクール C920n', price: '¥9,800', rating: '4.6', emoji: '📷', tags: ['Webカメラ', 'テレワーク', 'フルHD'] },
    { id: 5, name: 'Twelve South HiRise', price: '¥8,800', rating: '4.5', emoji: '💻', tags: ['スタンド', 'Mac', 'デスク整理'] },
  ],
  'Nintendo Switch': [
    { id: 1, name: 'ゼルダの伝説 TotK', price: '¥7,678', rating: '4.9', emoji: '🗡', tags: ['RPG', '冒険', '任天堂'] },
    { id: 2, name: 'マリオカート8DX', price: '¥6,578', rating: '4.9', emoji: '🏎', tags: ['レース', 'パーティー', '任天堂'] },
    { id: 3, name: 'スプラトゥーン3', price: '¥6,578', rating: '4.7', emoji: '🦑', tags: ['シューター', 'オンライン', '任天堂'] },
    { id: 4, name: 'あつまれどうぶつの森', price: '¥6,578', rating: '4.8', emoji: '🏝', tags: ['のんびり', 'コミュニティ', '任天堂'] },
    { id: 5, name: 'Switch有機ELモデル', price: '¥37,980', rating: '4.8', emoji: '🎮', tags: ['本体', '有機EL', '携帯'] },
  ],
  'PlayStation': [
    { id: 1, name: 'PS5本体', price: '¥66,980', rating: '4.8', emoji: '🕹', tags: ['本体', 'Sony', '高性能'] },
    { id: 2, name: 'FF7リバース', price: '¥9,878', rating: '4.7', emoji: '⚔️', tags: ['RPG', 'Final Fantasy', 'PS5'] },
    { id: 3, name: 'DualSense コントローラー', price: '¥9,480', rating: '4.7', emoji: '🎮', tags: ['コントローラー', 'Sony', '振動'] },
    { id: 4, name: 'Spider-Man 2', price: '¥8,678', rating: '4.8', emoji: '🕷', tags: ['アクション', 'Marvel', 'PS5'] },
    { id: 5, name: 'God of War Ragnarok', price: '¥5,478', rating: '4.9', emoji: '🪓', tags: ['アクション', 'PS5', '神話'] },
  ],
  'PCゲーム': [
    { id: 1, name: 'ゲーミングPC RTX4070', price: '¥189,800', rating: '4.7', emoji: '💻', tags: ['高性能', 'RTX', 'デスクトップ'] },
    { id: 2, name: 'ロジクール G PRO X', price: '¥14,800', rating: '4.7', emoji: '🖱', tags: ['ゲーミングマウス', 'FPS', 'ロジクール'] },
    { id: 3, name: 'HyperX Cloud III', price: '¥14,300', rating: '4.6', emoji: '🎧', tags: ['ゲーミングヘッドセット', '音質', 'HyperX'] },
    { id: 4, name: 'ASUS ROG キーボード', price: '¥18,800', rating: '4.5', emoji: '⌨️', tags: ['メカニカル', 'RGB', 'ゲーミング'] },
    { id: 5, name: 'Steam Deck OLED', price: '¥89,800', rating: '4.8', emoji: '🎮', tags: ['携帯ゲーミング', 'Valve', 'OLED'] },
  ],
  'ビジネス書': [
    { id: 1, name: '嫌われる勇気', price: '¥1,650', rating: '4.6', emoji: '📖', tags: ['自己啓発', 'アドラー', 'ベストセラー'] },
    { id: 2, name: 'FACTFULNESS', price: '¥2,200', rating: '4.7', emoji: '🌍', tags: ['教養', 'データ', '思考法'] },
    { id: 3, name: '金持ち父さん貧乏父さん', price: '¥1,760', rating: '4.5', emoji: '💰', tags: ['投資', 'お金', '資産形成'] },
    { id: 4, name: 'ゼロ秒思考', price: '¥1,540', rating: '4.5', emoji: '⚡', tags: ['思考法', 'メモ', '仕事術'] },
    { id: 5, name: 'エッセンシャル思考', price: '¥1,760', rating: '4.6', emoji: '🎯', tags: ['仕事術', '集中', 'シンプル'] },
  ],
  '漫画': [
    { id: 1, name: 'ONE PIECE 最新刊', price: '¥528', rating: '4.9', emoji: '📕', tags: ['少年', '冒険', '長編'] },
    { id: 2, name: '進撃の巨人 全巻', price: '¥18,040', rating: '4.8', emoji: '⚔️', tags: ['完結', 'ダーク', 'アクション'] },
    { id: 3, name: 'チェンソーマン', price: '¥528', rating: '4.7', emoji: '🪚', tags: ['少年', 'ダーク', '独特'] },
    { id: 4, name: '鬼滅の刃 全巻', price: '¥9,504', rating: '4.8', emoji: '🗡', tags: ['完結', '少年', '感動'] },
    { id: 5, name: 'SPY×FAMILY', price: '¥528', rating: '4.8', emoji: '👨‍👩‍👧', tags: ['少年', 'コメディ', 'ファミリー'] },
  ],
  '小説': [
    { id: 1, name: '君の膵臓をたべたい', price: '¥704', rating: '4.7', emoji: '📗', tags: ['青春', '感動', '恋愛'] },
    { id: 2, name: '容疑者Xの献身', price: '¥858', rating: '4.8', emoji: '🔍', tags: ['ミステリー', '東野圭吾', '感動'] },
    { id: 3, name: '1Q84', price: '¥2,310', rating: '4.6', emoji: '📘', tags: ['村上春樹', 'SF', '長編'] },
    { id: 4, name: 'コンビニ人間', price: '¥726', rating: '4.5', emoji: '🏪', tags: ['芥川賞', '現代', '短編'] },
    { id: 5, name: 'かがみの孤城', price: '¥858', rating: '4.8', emoji: '🪞', tags: ['感動', 'ファンタジー', '本屋大賞'] },
  ],
  'トップス': [
    { id: 1, name: 'ユニクロ エアリズム', price: '¥1,990', rating: '4.7', emoji: '👕', tags: ['涼しい', '機能性', 'インナー'] },
    { id: 2, name: 'チャンピオン パーカー', price: '¥8,800', rating: '4.6', emoji: '🧥', tags: ['パーカー', 'カジュアル', 'Champion'] },
    { id: 3, name: 'ユニクロ フリース', price: '¥3,990', rating: '4.7', emoji: '🧣', tags: ['暖かい', 'コスパ', 'カジュアル'] },
    { id: 4, name: 'ラルフローレン ポロシャツ', price: '¥12,100', rating: '4.6', emoji: '👔', tags: ['ポロシャツ', '上品', 'ブランド'] },
    { id: 5, name: 'ノースフェイス Tシャツ', price: '¥5,500', rating: '4.5', emoji: '👕', tags: ['アウトドア', '速乾', 'ブランド'] },
  ],
  'シューズ': [
    { id: 1, name: 'ニューバランス 574', price: '¥16,500', rating: '4.8', emoji: '👟', tags: ['スニーカー', 'クラシック', 'カジュアル'] },
    { id: 2, name: 'Nike Air Force 1', price: '¥14,300', rating: '4.7', emoji: '👟', tags: ['Nike', 'クラシック', 'ホワイト'] },
    { id: 3, name: 'Adidas Stan Smith', price: '¥13,200', rating: '4.6', emoji: '👟', tags: ['Adidas', 'シンプル', 'レザー'] },
    { id: 4, name: 'Vans Old Skool', price: '¥9,900', rating: '4.6', emoji: '👟', tags: ['Vans', 'スケート', 'カジュアル'] },
    { id: 5, name: 'コンバース オールスター', price: '¥8,800', rating: '4.7', emoji: '👟', tags: ['コンバース', 'クラシック', 'カジュアル'] },
  ],
  'バッグ': [
    { id: 1, name: 'ノースフェイス リュック', price: '¥24,200', rating: '4.7', emoji: '🎒', tags: ['バッグ', 'アウトドア', '大容量'] },
    { id: 2, name: 'Anello リュック', price: '¥4,980', rating: '4.5', emoji: '🎒', tags: ['コスパ', '軽量', 'カジュアル'] },
    { id: 3, name: 'グレゴリー デイパック', price: '¥18,700', rating: '4.7', emoji: '🎒', tags: ['アウトドア', '耐久性', 'Gregory'] },
    { id: 4, name: 'ポーター タンカー', price: '¥33,000', rating: '4.8', emoji: '👜', tags: ['日本製', 'Porter', '高級'] },
    { id: 5, name: 'トートバッグ キャンバス', price: '¥2,980', rating: '4.4', emoji: '👜', tags: ['トート', 'シンプル', 'エコ'] },
  ],
  'アクセサリ': [
    { id: 1, name: 'Apple Watch Series 9', price: '¥59,800', rating: '4.7', emoji: '⌚', tags: ['Apple', 'スマートウォッチ', '健康'] },
    { id: 2, name: 'レイバン サングラス', price: '¥22,000', rating: '4.6', emoji: '🕶', tags: ['サングラス', 'UV', 'クラシック'] },
    { id: 3, name: 'ニューエラ キャップ', price: '¥5,500', rating: '4.5', emoji: '🧢', tags: ['キャップ', 'New Era', 'カジュアル'] },
    { id: 4, name: 'G-SHOCK', price: '¥16,500', rating: '4.7', emoji: '⌚', tags: ['時計', '耐衝撃', 'カシオ'] },
    { id: 5, name: 'アネロ ウォレット', price: '¥3,300', rating: '4.4', emoji: '👛', tags: ['財布', 'コスパ', 'カジュアル'] },
  ],
  'アウター': [
    { id: 1, name: 'ユニクロ ウルトラライトダウン', price: '¥6,990', rating: '4.8', emoji: '🧥', tags: ['軽量', '防寒', 'コンパクト'] },
    { id: 2, name: 'ノースフェイス マウンテンジャケット', price: '¥49,500', rating: '4.8', emoji: '🧥', tags: ['防水', 'アウトドア', 'ブランド'] },
    { id: 3, name: 'パタゴニア フリース', price: '¥22,000', rating: '4.7', emoji: '🧥', tags: ['フリース', 'パタゴニア', 'サステナブル'] },
    { id: 4, name: 'コロンビア ウィンドブレーカー', price: '¥14,300', rating: '4.6', emoji: '🧥', tags: ['防風', '軽量', 'Columbia'] },
    { id: 5, name: 'ユニクロ ブロックテックパーカ', price: '¥14,990', rating: '4.6', emoji: '🧥', tags: ['防水', 'ユニクロ', 'コスパ'] },
  ],
  '筋トレ': [
    { id: 1, name: 'プロテイン ザバス', price: '¥4,980', rating: '4.7', emoji: '💪', tags: ['タンパク質', 'ダイエット', '筋肥大'] },
    { id: 2, name: 'アジャスタブルダンベル', price: '¥24,800', rating: '4.6', emoji: '🏋️', tags: ['ダンベル', '可変式', '省スペース'] },
    { id: 3, name: 'ヨガマット 10mm', price: '¥3,980', rating: '4.6', emoji: '🧘', tags: ['マット', '厚め', '滑り止め'] },
    { id: 4, name: 'トレーニングベルト', price: '¥4,500', rating: '4.5', emoji: '🥋', tags: ['腰サポート', 'デッドリフト', 'スクワット'] },
    { id: 5, name: 'EAA必須アミノ酸', price: '¥3,980', rating: '4.5', emoji: '🧪', tags: ['アミノ酸', '回復', 'パフォーマンス'] },
  ],
  'ランニング': [
    { id: 1, name: 'Nike Vaporfly 3', price: '¥29,700', rating: '4.8', emoji: '👟', tags: ['カーボン', '厚底', 'レース'] },
    { id: 2, name: 'Garmin Forerunner 265', price: '¥59,800', rating: '4.7', emoji: '⌚', tags: ['GPS', '心拍', 'スマートウォッチ'] },
    { id: 3, name: 'On Cloudmonster', price: '¥19,800', rating: '4.6', emoji: '👟', tags: ['クッション', 'デイリー', 'スイス'] },
    { id: 4, name: 'ランニングウェア上下セット', price: '¥6,980', rating: '4.5', emoji: '🏃', tags: ['速乾', '軽量', 'セット'] },
    { id: 5, name: 'ランニングポーチ', price: '¥2,480', rating: '4.4', emoji: '👜', tags: ['スマホ収納', '軽量', 'ウエスト'] },
  ],
  'アウトドア': [
    { id: 1, name: 'コールマン テント', price: '¥24,800', rating: '4.6', emoji: '⛺', tags: ['テント', 'ファミリー', 'キャンプ'] },
    { id: 2, name: 'スノーピーク チェア', price: '¥19,800', rating: '4.7', emoji: '🪑', tags: ['アウトドアチェア', 'Snow Peak', '軽量'] },
    { id: 3, name: 'ユニフレーム 焚き火台', price: '¥14,300', rating: '4.7', emoji: '🔥', tags: ['焚き火', '日本製', 'コンパクト'] },
    { id: 4, name: 'サーモス 山専ボトル', price: '¥4,950', rating: '4.8', emoji: '🍵', tags: ['保温', '登山', 'サーモス'] },
    { id: 5, name: 'モンベル レインウェア', price: '¥29,700', rating: '4.7', emoji: '🧥', tags: ['防水', '登山', 'モンベル'] },
  ],
  'ヨガ・ストレッチ': [
    { id: 1, name: 'マンドゥカ ヨガマット', price: '¥19,800', rating: '4.8', emoji: '🧘', tags: ['高級', '耐久性', 'Manduka'] },
    { id: 2, name: 'ヨガブロック セット', price: '¥2,480', rating: '4.5', emoji: '🟦', tags: ['補助', '初心者', 'コスパ'] },
    { id: 3, name: 'ストレッチポール', price: '¥8,800', rating: '4.6', emoji: '🔵', tags: ['筋膜リリース', '腰痛', 'リカバリー'] },
    { id: 4, name: 'ヨガウェア セット', price: '¥5,980', rating: '4.5', emoji: '🧘', tags: ['動きやすい', 'レディース', 'セット'] },
    { id: 5, name: 'フォームローラー', price: '¥3,280', rating: '4.5', emoji: '🟩', tags: ['マッサージ', '回復', 'コンパクト'] },
  ],
  '球技': [
    { id: 1, name: 'モルテン サッカーボール', price: '¥4,800', rating: '4.6', emoji: '⚽', tags: ['サッカー', 'Molten', '練習'] },
    { id: 2, name: 'スポルディング バスケットボール', price: '¥6,600', rating: '4.7', emoji: '🏀', tags: ['バスケ', 'Spalding', '練習'] },
    { id: 3, name: 'ウィルソン テニスラケット', price: '¥14,800', rating: '4.6', emoji: '🎾', tags: ['テニス', 'Wilson', '初中級'] },
    { id: 4, name: 'ミカサ バレーボール', price: '¥3,980', rating: '4.5', emoji: '🏐', tags: ['バレー', 'Mikasa', '練習'] },
    { id: 5, name: 'SSK 野球グローブ', price: '¥12,800', rating: '4.5', emoji: '⚾', tags: ['野球', 'SSK', 'キャッチャー'] },
  ],
  'キッチン家電': [
    { id: 1, name: 'バルミューダ トースター', price: '¥33,000', rating: '4.6', emoji: '🍞', tags: ['おしゃれ', 'トースト', 'バルミューダ'] },
    { id: 2, name: 'デロンギ コーヒーメーカー', price: '¥44,800', rating: '4.7', emoji: '☕', tags: ['コーヒー', 'デロンギ', '全自動'] },
    { id: 3, name: 'バイタミックス ブレンダー', price: '¥89,800', rating: '4.7', emoji: '🥤', tags: ['高性能', 'スムージー', '業務用'] },
    { id: 4, name: 'シャープ ヘルシオ', price: '¥54,800', rating: '4.6', emoji: '🍳', tags: ['ウォーターオーブン', 'ヘルシー', 'シャープ'] },
    { id: 5, name: 'タイガー 炊飯器', price: '¥24,800', rating: '4.7', emoji: '🍚', tags: ['炊飯器', 'タイガー', '日本製'] },
  ],
  '空調・空気': [
    { id: 1, name: 'ダイソン 空気清浄機', price: '¥89,800', rating: '4.7', emoji: '💨', tags: ['空気清浄', '扇風機', 'ダイソン'] },
    { id: 2, name: 'シャープ 加湿空気清浄機', price: '¥34,800', rating: '4.6', emoji: '💧', tags: ['加湿', '空気清浄', 'プラズマクラスター'] },
    { id: 3, name: 'パナソニック エアコン', price: '¥89,800', rating: '4.7', emoji: '❄️', tags: ['エアコン', 'パナソニック', '省エネ'] },
    { id: 4, name: 'バルミューダ 扇風機', price: '¥35,200', rating: '4.5', emoji: '🌀', tags: ['扇風機', 'おしゃれ', 'バルミューダ'] },
    { id: 5, name: 'ダイキン 除湿機', price: '¥29,800', rating: '4.6', emoji: '💦', tags: ['除湿', 'ダイキン', '梅雨'] },
  ],
  '照明': [
    { id: 1, name: 'フィリップス Hue', price: '¥9,980', rating: '4.5', emoji: '💡', tags: ['スマート照明', '調光', 'おしゃれ'] },
    { id: 2, name: 'パナソニック シーリング', price: '¥14,800', rating: '4.6', emoji: '🔆', tags: ['シーリング', '調光', 'パナソニック'] },
    { id: 3, name: 'Anker デスクライト', price: '¥4,980', rating: '4.6', emoji: '🕯', tags: ['デスクライト', 'USB-C', 'Anker'] },
    { id: 4, name: 'YAMAGIWA 間接照明', price: '¥24,800', rating: '4.5', emoji: '🌟', tags: ['間接照明', 'おしゃれ', 'インテリア'] },
    { id: 5, name: 'ボネコ アロマランプ', price: '¥8,800', rating: '4.4', emoji: '🕯', tags: ['アロマ', 'リラックス', 'おしゃれ'] },
  ],
  '収納': [
    { id: 1, name: 'ニトリ 収納ボックス', price: '¥1,490', rating: '4.6', emoji: '📦', tags: ['収納', 'シンプル', 'コスパ'] },
    { id: 2, name: 'IKEA カラックス', price: '¥14,990', rating: '4.7', emoji: '🗄', tags: ['棚', 'IKEA', 'カスタマイズ'] },
    { id: 3, name: 'スタックストー バケット', price: '¥3,980', rating: '4.6', emoji: '🪣', tags: ['おしゃれ', 'スタック', 'カラフル'] },
    { id: 4, name: 'ハンガーラック', price: '¥6,800', rating: '4.5', emoji: '👗', tags: ['クローゼット', 'スリム', 'キャスター付き'] },
    { id: 5, name: 'フリーラック スチール', price: '¥9,800', rating: '4.5', emoji: '🗂', tags: ['スチール', '丈夫', 'DIY'] },
  ],
  '掃除': [
    { id: 1, name: 'ルンバ j7+', price: '¥99,800', rating: '4.5', emoji: '🤖', tags: ['ロボット掃除機', '自動ゴミ収集', 'iRobot'] },
    { id: 2, name: 'ダイソン V15', price: '¥89,800', rating: '4.7', emoji: '🌀', tags: ['コードレス', '強力吸引', 'ダイソン'] },
    { id: 3, name: 'パナソニック コードレス', price: '¥34,800', rating: '4.5', emoji: '🧹', tags: ['コードレス', '軽量', 'パナソニック'] },
    { id: 4, name: 'ブラーバ 床拭きロボット', price: '¥44,800', rating: '4.4', emoji: '🫧', tags: ['床拭き', 'ロボット', 'iRobot'] },
    { id: 5, name: 'マキタ 充電式クリーナー', price: '¥19,800', rating: '4.6', emoji: '🔋', tags: ['マキタ', '充電式', 'コンパクト'] },
  ],
}

function SwipeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const genre = searchParams.get('genre') ?? 'ガジェット'
  const category = searchParams.get('category') ?? 'スマホ'
  const items = products[category] ?? products['スマホ']

  const [index, setIndex] = useState(0)
  const [likedTags, setLikedTags] = useState<string[]>([])
  const [done, setDone] = useState(false)
  const [animating, setAnimating] = useState<'left' | 'right' | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const dragStart = useRef<{ x: number; y: number } | null>(null)
  const isDragging = useRef(false)

  const current = items[index]
  const next = items[index + 1]
  const nextNext = items[index + 2]

  const handleSwipe = (dir: 'left' | 'right') => {
    if (animating) return
    setDragOffset({ x: 0, y: 0 })
    setAnimating(dir)
    const newTags = dir === 'right' ? [...likedTags, ...current.tags] : likedTags
    if (dir === 'right') setLikedTags(newTags)
    setTimeout(() => {
      setAnimating(null)
      if (index + 1 >= items.length) setDone(true)
      else setIndex(prev => prev + 1)
    }, 320)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    if (animating) return
    const t = e.touches[0]
    dragStart.current = { x: t.clientX, y: t.clientY }
    isDragging.current = true
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !dragStart.current || animating) return
    const t = e.touches[0]
    setDragOffset({
      x: t.clientX - dragStart.current.x,
      y: t.clientY - dragStart.current.y,
    })
  }

  const onTouchEnd = () => {
    if (!isDragging.current) return
    isDragging.current = false
    const { x } = dragOffset
    if (x > 80) handleSwipe('right')
    else if (x < -80) handleSwipe('left')
    else setDragOffset({ x: 0, y: 0 })
    dragStart.current = null
  }

  const onMouseDown = (e: React.MouseEvent) => {
    if (animating) return
    dragStart.current = { x: e.clientX, y: e.clientY }
    isDragging.current = true
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !dragStart.current || animating) return
    setDragOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    })
  }

  const onMouseUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    const { x } = dragOffset
    if (x > 80) handleSwipe('right')
    else if (x < -80) handleSwipe('left')
    else setDragOffset({ x: 0, y: 0 })
    dragStart.current = null
  }

  const getCardTransform = () => {
    if (animating === 'right') return 'translateX(130%) rotate(20deg)'
    if (animating === 'left') return 'translateX(-130%) rotate(-20deg)'
    if (isDragging.current || (dragOffset.x !== 0 || dragOffset.y !== 0)) {
      const rotate = dragOffset.x * 0.08
      return `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotate}deg)`
    }
    return 'none'
  }

  const showLike = animating === 'right' || dragOffset.x > 40
  const showNope = animating === 'left' || dragOffset.x < -40

  if (done) {
    return (
      <>
        <Header />
        <main style={{ background: '#F3F3F3', minHeight: '100vh', color: '#0F1111', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '20px', maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ fontSize: '48px' }}>🎉</div>
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>診断完了！</h2>
          <div style={{ background: '#1C1C1E', borderRadius: '16px', padding: '16px 20px', width: '100%' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>あなたの好みキーワード</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[...new Set(likedTags)].map(tag => (
                <span key={tag} style={{ background: '#2a2a2a', color: '#FF9500', fontSize: '13px', padding: '4px 12px', borderRadius: '20px', border: '1px solid #FF9500' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => router.push(`/recommend?genre=${genre}&category=${category}&tags=${[...new Set(likedTags)].join(',')}`)}
            style={{ background: '#FF9500', color: '#fff', border: 'none', borderRadius: '16px', padding: '16px', fontSize: '17px', fontWeight: '600', width: '100%' }}
          >
            おすすめを見る
          </button>
          <button
            onClick={() => { setIndex(0); setLikedTags([]); setDone(false) }}
            style={{ background: 'transparent', color: '#888', border: '1px solid #DDD', borderRadius: '16px', padding: '14px', fontSize: '15px', width: '100%' }}
          >
            もう一度やり直す
          </button>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main style={{ background: '#F3F3F3', minHeight: '100vh', color: '#0F1111', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 20px', maxWidth: '480px', margin: '0 auto' }}>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <button onClick={() => router.push(`/category?genres=${genre}`)} style={{ background: 'none', border: 'none', color: '#666', fontSize: '14px', padding: 0, cursor: 'pointer' }}>← 戻る</button>
          <span style={{ color: '#666', fontSize: '14px' }}>{index + 1} / {items.length}</span>
        </div>

        <div style={{ width: '100%', marginBottom: '8px' }}>
          <div style={{ fontSize: '13px', color: '#FF9500', fontWeight: '600', marginBottom: '4px' }}>STEP 3 · {genre} / {category}</div>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>気になる商品は？</div>
        </div>

        <div style={{ width: '100%', height: '3px', background: '#1C1C1E', borderRadius: '2px', marginBottom: '24px' }}>
          <div style={{ height: '100%', background: '#FF9500', borderRadius: '2px', width: `${((index + 1) / items.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>

        <div style={{ width: '100%', position: 'relative', height: '380px', marginBottom: '24px' }}>
          {nextNext && (
            <div style={{ position: 'absolute', inset: 0, background: '#1C1C1E', borderRadius: '20px', transform: 'scale(0.90) translateY(16px)', zIndex: 0 }} />
          )}
          {next && (
            <div style={{ position: 'absolute', inset: 0, background: '#1C1C1E', borderRadius: '20px', transform: 'scale(0.95) translateY(8px)', zIndex: 1 }} />
          )}

          <div
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            ref={(el) => {
              if (!el) return
              el.ontouchstart = (e) => {
                if (animating) return
                const t = e.touches[0]
                dragStart.current = { x: t.clientX, y: t.clientY }
                isDragging.current = true
              }
              el.ontouchmove = (e) => {
                e.preventDefault()
                if (!isDragging.current || !dragStart.current || animating) return
                const t = e.touches[0]
                setDragOffset({
                  x: t.clientX - dragStart.current.x,
                  y: t.clientY - dragStart.current.y,
                })
              }
              el.ontouchend = () => {
                if (!isDragging.current) return
                isDragging.current = false
                setDragOffset(prev => {
                  if (prev.x > 80) handleSwipe('right')
                  else if (prev.x < -80) handleSwipe('left')
                  else return { x: 0, y: 0 }
                  return prev
                })
                dragStart.current = null
              }
            }}
            style={{
              position: 'absolute', inset: 0, background: '#1C1C1E', borderRadius: '20px', overflow: 'hidden', zIndex: 2,
              transform: getCardTransform(),
              transition: animating ? 'transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
              cursor: 'grab',
              userSelect: 'none',
              touchAction: 'none',
            }}
            
          >
            <div style={{ height: '220px', background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px', position: 'relative', pointerEvents: 'none' }}>
              {current.emoji}
              {showLike && (
                <div style={{
                  position: 'absolute', top: '24px', left: '20px',
                  border: '3px solid #4CD964', borderRadius: '8px', padding: '6px 16px',
                  transform: 'rotate(-15deg)', color: '#4CD964',
                  fontSize: '28px', fontWeight: '800', letterSpacing: '2px',
                  opacity: Math.min(1, Math.abs(dragOffset.x) / 80),
                }}>LIKE</div>
              )}
              {showNope && (
                <div style={{
                  position: 'absolute', top: '24px', right: '20px',
                  border: '3px solid #FF3B30', borderRadius: '8px', padding: '6px 16px',
                  transform: 'rotate(15deg)', color: '#FF3B30',
                  fontSize: '28px', fontWeight: '800', letterSpacing: '2px',
                  opacity: Math.min(1, Math.abs(dragOffset.x) / 80),
                }}>NOPE</div>
              )}
            </div>

            <div style={{ padding: '20px', pointerEvents: 'none' }}>
              <div style={{ fontSize: '20px', fontWeight: '600' }}>{current.name}</div>
              <div style={{ color: '#FF9500', fontSize: '18px', marginTop: '4px', fontWeight: '700' }}>{current.price}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <span style={{ color: '#FFD60A', fontSize: '14px' }}>★</span>
                <span style={{ fontSize: '13px', color: '#888' }}>{current.rating}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                {current.tags.map(tag => (
                  <span key={tag} style={{ background: '#333', color: '#ccc', fontSize: '12px', padding: '4px 10px', borderRadius: '20px' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button
            onClick={() => handleSwipe('left')}
            style={{ width: '64px', height: '64px', borderRadius: '50%', border: '1.5px solid #444', background: '#1C1C1E', fontSize: '26px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >✕</button>
          <button
            onClick={() => handleSwipe('right')}
            style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid #FF9500', background: '#FF9500', fontSize: '28px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(255,149,0,0.4)' }}
          >♥</button>
        </div>

        <div style={{ marginTop: '16px', fontSize: '12px', color: '#444' }}>← 興味なし ／ 気になる →</div>

      </main>
    </>
  )
}

export default function SwipePage() {
  return (
    <Suspense>
      <SwipeContent />
    </Suspense>
  )
}