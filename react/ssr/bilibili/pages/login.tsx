import { useRouter } from "next/router"
import { ReactElement, useState } from "react"

const Login = () => {
    const router = useRouter()
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [status, setStatus] = useState('input')

    const handleSubmit = () => {
        if (username && password) {
            setStatus('submiting')
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }).
                then(res => res.json()).
                then(data => {
                    if (data?.success) {
                        router.push('/')
                    }
                }).
                finally(() => {
                    setStatus('completed')
                })
        }
    }

    return (
        <div>
            <div className="rounded p-4 w-[300px] m-auto mt-[30vh] flex flex-col gap-4">
                <div>
                    <input className="input" placeholder="Username" required onChange={e => setUsername(e.target.value) } />
                </div>
                <div>
                    <input className="input" type={'password'} placeholder="Password" required onChange={e => setPassword(e.target.value) } />
                </div>
                <div>
                    <button disabled={status === 'submiting'} className="btn w-full" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

Login.getLayout = (page: ReactElement) => <div>{page}</div>

export default Login
