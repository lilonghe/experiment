import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MainLayout(children) {
    const [userinfo, setUserinfo] = useState();

    const loadUserInfo = async () => {
        const res = await fetch(`http://rap2api.taobao.org/app/mock/262830/login`)
        const data = await res.json();
        setUserinfo(data.data)
    }

    useEffect(() => {
        loadUserInfo();
    }, []);

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