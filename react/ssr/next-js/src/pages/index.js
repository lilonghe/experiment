import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

export default function Home(props) {

  return (
    <div className="container">
      <main>
        <h1><FormattedMessage id='home' /></h1>
        <div>
          <Link href='/' locale='zh-CN'>zh-CN</Link><br/>
          <Link href='/en-US' locale='en-US'>en-US</Link>
        </div>
      </main>
    </div>
  )
}