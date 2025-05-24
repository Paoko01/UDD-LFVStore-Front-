import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../modules/auth/context/authContext"
import { CartIcon } from "../../../modules/cart/components/CartIcon";
import LFV_logo from "../../../assets/LFV_logo.png";

export const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    return (
        <nav className="navbar flex flex-col items-center py-2 w-full">
            <div className="mb-4">
                <Link to="/">
                    <img src={LFV_logo} alt="Logo La Fuckin' Vie" className="h-24 w-auto" />
                </Link>
            </div>
            <ul className="navbar__links flex space-x-4">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/ProductPage">Tienda</Link></li>
            </ul>
            {/* <div>
                <CartIcon />
            </div> */}
            <div className="space-x-4">
                {
                    !user ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    ) : (
                        <div className="navbar-user-info">
                            <span>{user.nombre} {user.apellido}</span>
                            <Link to={'/'} onClick={ handleLogout} >Logout</Link>
                        </div>
                    )
                }
            </div>
        </nav>

    )
}