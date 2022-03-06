import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';

export default function MainLayout({ children }) {
    const dispatch = useDispatch();
    const { userinfo } = useSelector(state => state.user);
    const intl = useIntl();

    useEffect(() => {
        dispatch.user.fetchUserinfo();
    }, [])

    return (
        <div>
            <div>
                {userinfo && <h1>{userinfo.nickname}</h1>}
                <div>
                    <Link href="/">{intl.formatMessage({id: 'home'})}</Link>&nbsp;&nbsp;
                    <Link href="/blog">{intl.formatMessage({id: 'blog'})}</Link>&nbsp;&nbsp;
                    <Link href="/about">{intl.formatMessage({id: 'about'})}</Link>
                </div>
                
            </div>
            <div style={{padding: '20px'}}>{children}</div>
        </div>
    )
}
