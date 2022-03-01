import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MainLayout({ children }) {
    const dispatch = useDispatch();
    const { userinfo } = useSelector(state => state.user);

    useEffect(() => {
        dispatch.user.fetchUserinfo();
    }, [])

    return (
        <div>
            <div>
                {userinfo && <h1>{userinfo.nickname}</h1>}
                <div>
                    <Link href="/">Home</Link>&nbsp;&nbsp;
                    <Link href="/blog">Blog</Link>&nbsp;&nbsp;
                    <Link href="/about">About</Link>
                </div>
                
            </div>
            <div style={{padding: '20px'}}>{children}</div>
        </div>
    )
}
