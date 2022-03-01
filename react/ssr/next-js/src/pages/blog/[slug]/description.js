import BlogLayout from "../../../components/layouts/blog";
import { useState, useEffect } from 'react';

export default function Page() {
    const [description, setDescription] = useState();

    const loadInfo = async () => {
        const res = await fetch(`http://rap2api.taobao.org/app/mock/262830/message`)
        const data = await res.json()
        setDescription(data.content);
    }

    useEffect(() => {
        loadInfo();
    }, []);

    return (
        <div>
            {description}
        </div>
    )
}

Page.getLayout = BlogLayout;