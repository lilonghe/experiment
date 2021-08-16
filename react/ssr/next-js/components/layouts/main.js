import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MainLayout(children) {
    const [userinfo, setUserinfo] = useState();

    useEffect(async () => {
        const res = await fetch(`http://rap2api.taobao.org/app/mock/262830/login`)
        const data = await res.json();
        setUserinfo(data.data)
    }, []);

    return (
        <div>
            <div>
                {userinfo && <h1>{userinfo.nickname}</h1>}
                <Link href="/">Home</Link><br/>
                <Link href="/blog">Blog</Link><br/>
                <Link href="/blog/hello">Hello Blog</Link>
            </div>
            <div style={{padding: '20px'}}>{children}</div>
        </div>
    )
}