import { Link, Outlet } from "remix";

export default function User() {
    return (
        <div>
            User<br/>
            <Link to='/user'>User Index</Link>&nbsp;
            <Link to='/user/123'>User Detail</Link>
            <Outlet />
        </div>
    )
}