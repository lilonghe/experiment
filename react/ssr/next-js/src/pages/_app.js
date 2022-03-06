import MainLayout from '../components/layouts/main';
import { store } from '../store';
import { Provider } from 'react-redux';
import {IntlProvider, FormattedMessage} from 'react-intl';
import { useRouter } from 'next/router';

let locales = ['zh-CN', 'en-US'];

let localeMessages = {};
for(let locale of locales) {
  localeMessages[locale] = await import(`../locales/${locale}.json`);
}

function hanldeIntlError(err) {
  if (err.code === 'MISSING_TRANSLATION'){
    return
  } else {
    console.error(err.code);
  }
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const Layout = Component.getLayout || ((page) => page)

  const locale = router.locale;
  const message = localeMessages[locale];

  return (
    <IntlProvider messages={message} onError={hanldeIntlError} locale={locale}>
      <Provider store={store}>
        <MainLayout>
          {Component.getLayout ? <Layout>
            <Component {...pageProps} />
          </Layout> :
            <Component {...pageProps} />
          }
        </MainLayout>
      </Provider>
    </IntlProvider>
  )
}

export default MyApp;