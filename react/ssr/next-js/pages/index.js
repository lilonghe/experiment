import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <script src="/variable.js"></script>
      </Head>

      <main>
        {global['PATH']}
        {global.PATH && <a href={global['PATH'] + '/abc'}>123</a> }
        {global.PATH && <img src={global.PATH + '/logo.png'} /> }
      
        Home Page
      </main>
    </div>
  )
}
