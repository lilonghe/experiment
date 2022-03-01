import MainLayout from '../components/layouts/main';
import { store } from '../store';
import { Provider } from 'react-redux';

export default function MyApp({ Component, pageProps }) {

  const Layout = Component.getLayout || ((page) => page)

  return (
    <Provider store={store}>
      <MainLayout>
        {Component.getLayout ? <Layout>
          <Component {...pageProps} />
        </Layout> :
          <Component {...pageProps} />
        }
      </MainLayout>
    </Provider>
  )
}