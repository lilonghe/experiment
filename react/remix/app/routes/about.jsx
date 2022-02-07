import { useEffect } from "react";
import { useFetcher, useLoaderData } from "remix";

export function loader() {
    return fetch('http://rap2api.taobao.org/app/mock/262830/home').
        then(response => response.json()).then(res => res?.data?.nodes || []);
}

export default function About() {
    const data = useLoaderData();
    const loadAction = useFetcher();
    const finalData = loadAction.data || data;

    useEffect(() => {
        setTimeout(() => {
            loadAction.submit();
        }, 1000);
    }, [])

    return (
        <div>
            About
            <ul>
                {finalData.map(item => <li key={item.id}>{item.topic.content}</li>)}
            </ul>
        </div>
    )
}