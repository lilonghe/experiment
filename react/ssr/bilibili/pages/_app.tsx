import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { NextPage } from 'next';
import { ReactNode } from 'react';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type IProps = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: IProps) {

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
