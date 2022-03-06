import Link from 'next/link'
import MainLayout from './main';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

export default function BlogLayout({ children }) {
    const router = useRouter();
    const intl = useIntl();

    const { query: { slug } } = router;

    return (
        <div>
            <div>
                <Link href={`/blog/${slug}`}>Content</Link>&nbsp;&nbsp;
                <Link href={`/blog/${slug}/description`}>{intl.formatMessage({id: 'description'})}</Link>
            </div>
            <div>{children}</div>
        </div>
    )
}

BlogLayout.getLayout = MainLayout;