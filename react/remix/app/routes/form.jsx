import { useFetcher } from "remix";

export default function Form() {
    const data = useFetcher();

    return (
        <div>
            <data.Form method="get" action="/api/form">
                <input name="name" onChange={e => {
                    data.submit(e.target.form);
                }} />
            </data.Form>
        </div>
    )
}