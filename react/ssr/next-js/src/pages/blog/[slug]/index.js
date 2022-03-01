import BlogLayout from "../../../components/layouts/blog";

function Page({ data }) {
    return (
        <div>
            <div>{data.content}</div>
        </div>
    )
}

export default Page

export async function getServerSideProps(context) {
    const { params } = context;
    const res = await fetch(`http://rap2api.taobao.org/app/mock/262830/message?id=${params.slug}`)
    const data = await res.json()
    return { props: { data } }
}


Page.getLayout = BlogLayout;