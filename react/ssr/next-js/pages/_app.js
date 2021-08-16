import MainLayout from '../components/layouts/main';
export default function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)

  if (!Component.getLayout) {
    return MainLayout(<Component {...pageProps} />)
  }

  return getLayout(<Component {...pageProps} />)
}