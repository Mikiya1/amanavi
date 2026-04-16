import Header from '../components/Header'

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main style={{
        background: '#F3F3F3',
        minHeight: '100vh',
        color: '#0F1111',
        fontFamily: 'sans-serif',
        maxWidth: '640px',
        margin: '0 auto',
        padding: '24px 16px 48px',
      }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px' }}>プライバシーポリシー</h1>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>Amazonアソシエイトについて</h2>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#333' }}>
            アマナビは、amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
          </p>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>収集する情報</h2>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#333' }}>
            当サービスは、ユーザーの個人情報を収集しません。サービス改善のため、匿名のアクセス情報（ページビュー数など）をGoogle Analyticsで収集する場合があります。
          </p>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>Cookieについて</h2>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#333' }}>
            当サービスは、Amazonアソシエイト・プログラムの仕組み上、Amazonのサービスとのリンクにおいてクッキーを使用する場合があります。
          </p>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>免責事項</h2>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#333' }}>
            当サービスに掲載している商品情報・価格は、掲載時点のものであり、実際の価格とは異なる場合があります。最新の情報はAmazon.co.jpにてご確認ください。
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>お問い合わせ</h2>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#333' }}>
            プライバシーポリシーに関するご質問は、サービス運営者までお問い合わせください。
          </p>
        </section>

        <p style={{ fontSize: '12px', color: '#888', marginTop: '32px' }}>最終更新日：2025年1月</p>
      </main>
    </>
  )
}
