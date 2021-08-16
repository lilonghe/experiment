import BlogLayout from "../../components/layouts/blog"
export default function Home() {
    return (
        <div>
            This is blog index.
        </div>
    )
}

Home.getLayout = BlogLayout;