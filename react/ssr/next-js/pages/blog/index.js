import Link from "next/link";

export default function Home({ data }) {
    return (
        <div>
            {data.data && data.data.map(item=><div key={item.appid}>
                <Link href={`/blog/` + item.appid}>{item.name}</Link>
            </div>)}
        </div>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`http://rap2api.taobao.org/app/mock/24484/apps`)
    const data = await res.json()
    return { props: { data } }
}