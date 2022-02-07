import { useLoaderData, Form } from "remix";

export async function loader({ request }) {
    const url = new URL(request.url);
    const pageSize = url.searchParams.get('pageSize') || 10;
    console.log(pageSize)
    return fetch('http://rap2api.taobao.org/app/mock/262830/home?pageSize=' + pageSize).
        then(response => response.json()).then(res => res?.data?.nodes || []);
}

export default function Form2() {
    const data = useLoaderData();

    return (
        <div>
            <Form role="search">
                <input name="pageSize" />
                <button>search</button>
            </Form>
            <div>
                <ul>
                    {data?.map(item => <li key={item.id}>{item.topic.content}</li>)}
                </ul>
            </div>
        </div>
    )
}