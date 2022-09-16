import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
