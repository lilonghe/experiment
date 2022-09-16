import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IUser {
    id: string
    username: string
}

export default function useUser() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<IUser>()
    const router = useRouter()

    useEffect(() => {
        fetch('/api/user').
            then(res => res.json()).
            then(data => {
                if (data.id) {
                    setUser(data)
                }
            }).finally(() => {
                setLoading(false)
            })
    }, [])

    const logout = () => {
        setLoading(true)
        fetch('/api/logout', { method: 'DELETE' }).
            then(res => res.json()).
            then(data => {
                if (data) {
                    setUser(undefined)
                    router.push('/')
                }
            }).
            finally(() => {
                setLoading(false)
            })
    }

    return { user, logout, loading }
}