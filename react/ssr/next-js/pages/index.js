import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <script src="/variable.js"></script>
      </Head>

      <main>
        <h1>Home</h1> Page

        <div>
          <small>全局注入变量测试， build once, run anywhere.</small><br/>
          {global['PATH']}<br/>
          {global.PATH && <a href={global['PATH'] + '/abc'}>123</a> }<br/>
          {global.PATH && <img src={global.PATH + '/logo.png'} /> }
        </div>
      </main>
    </div>
  )
}
