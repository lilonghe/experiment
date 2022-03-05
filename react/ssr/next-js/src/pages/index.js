import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home(props) {
  const { t } = useTranslation();

  return (
    <div className="container">
      <main>
        <h1>Home</h1> Page
        <div>
          {t('title')}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}