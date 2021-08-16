import MainLayout from './main'

export default function BlogLayout(children) {
    return MainLayout(
        <div>
            <div>Blog Header</div>
            <div>{children}</div>
            <div>Blog Footer</div>
        </div>
    )
}