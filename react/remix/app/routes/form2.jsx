import { useFetcher } from "remix";

export async function loader({ request }) {
    const url = new URL(request.url);
    const pageSize = url.searchParams.get('pageSize') || 10;
    return fetch('http://rap2api.taobao.org/app/mock/262830/home?pageSize=' + pageSize).
        then(response => response.json()).then(res => res?.data?.nodes || []);
}

export default function Form() {
    const data = useFetcher();

    return (
        <div>
            <data.Form method="get">
                <input name="name" onChange={e => {
                    data.submit(e.target.form);
                }} />
                <input name="pageSize" onChange={e => {
                    data.submit(e.target.form);
                }} />
            </data.Form>
            <div>
                <ul>
                    {data.data?.map(item => <li key={item.id}>{item.topic.content}</li>)}
                </ul>
            </div>
        </div>
    )
}