import { useRouter } from "next/router"
import { useEffect } from "react"
import useUser from "../lib/useUser"

const UserSpace = () => {
    // this code and layout useUser should move to save global 
    const { user, loading } = useUser()
    const router = useRouter()

    useEffect(() => {
        // client check
        if (!loading && !user) {
            router.replace('/login')
        }
    }, [user, loading])
    
    if (!user) {
        return <div className="container text-xl">
            Loading
        </div>
    }
   
    return (
        <div className="container text-xl">
            <div>ID: {user.id}</div>
            <div>Username: {user.username}</div>
        </div>
    )
}

export default UserSpace