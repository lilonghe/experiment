import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"

interface IProps {
    children: ReactNode
}
const Layout: NextPage<IProps> = ({ children }) => {
    const router = useRouter()
    const path = router.pathname

    const linkClass = 'flex items-center px-5 hover:bg-amber-400 hover:text-white duration-200'
    const activeLinkClass = linkClass + ' bg-amber-400 text-white'
    return (
        <>
            <Head>
                <meta name="referrer" content="no-referrer" />
            </Head>
            <nav className="h-16 flex shadow">
                <div className="container flex text-xl">
                    <Link href={'/'}>
                        <a  className={path === '/' ? activeLinkClass : linkClass}>Popular</a>
                    </Link>
                    <Link href={'/stat'}>
                        <a className={path === '/stat' ? activeLinkClass : linkClass}>Stat</a>
                    </Link>
                </div>
            </nav>
            <div className="mt-10">
                {children}
            </div>
        </>
    )
}

export default Layout