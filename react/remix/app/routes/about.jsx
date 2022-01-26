import { useLoaderData } from "remix";

export function loader() {
    return fetch('http://rap2api.taobao.org/app/mock/262830/home').
        then(response => response.json()).then(res => res?.data?.nodes || []);
}

export default function About() {
    const data = useLoaderData();

    return (
        <div>
            About
            <ul>
                {data.map(item => <li key={item.id}>{item.topic.content}</li>)}
            </ul>
        </div>
    )
}