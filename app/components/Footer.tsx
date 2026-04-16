import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: '#131921',
      color: '#cccccc',
      fontSize: '11px',
      padding: '20px 16px',
      textAlign: 'center',
      lineHeight: 1.8,
    }}>
      <p style={{ marginBottom: '8px' }}>
        アマナビは、amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}>
        <Link href="/privacy" style={{ color: '#cccccc', textDecoration: 'underline' }}>
          プライバシーポリシー
        </Link>
      </div>
      <p style={{ marginTop: '8px', color: '#666' }}>© 2025 アマナビ</p>
    </footer>
  )
}
