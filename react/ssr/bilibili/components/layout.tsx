import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import useUser from "../lib/useUser"

interface IProps {
    children: ReactNode
}
const Layout: NextPage<IProps> = ({ children }) => {
    const router = useRouter()
    const path = router.pathname
    const { user, logout } = useUser()

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
                    {user?.id && <Link href={'/user-space'}>
                        <a className={path === '/user-space' ? activeLinkClass : linkClass}>User Space</a>
                    </Link>}

                    <div className="ml-auto flex">
                        {user?.id ? 
                            <a className="flex items-center text-amber-500 cursor-pointer" 
                                onClick={logout}>Logout</a> : 
                            <a className="flex items-center text-amber-500 cursor-pointer" 
                                onClick={() => router.push('/login')}>Login</a>}
                    </div>
                </div>
            </nav>
            <div className="mt-10">
                {children}
            </div>
        </>
    )
}

export default Layout