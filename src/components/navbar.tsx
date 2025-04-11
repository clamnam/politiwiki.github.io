import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '../utilities/ThemeToggle';
// import '../assets/app.css'

const Navbar = () => {
    const [isNavHidden, setIsNavHidden] = useState(false);
    const { isLoggedIn, logout } = useAuth();

    const NavReduce = () => {
        let lastScrollY = window.scrollY;

        window.addEventListener("scroll", () => {
            if (lastScrollY < window.scrollY && window.scrollY > 20) {
                setIsNavHidden(true);
            } else {
                setIsNavHidden(false);
            }
            lastScrollY = window.scrollY;
        });
    };

    useEffect(() => {
        NavReduce();
    }, []);

    const Login = () => {
        return (
            <ul className="flex text-white">
                <li className="m-2 hover:underline underline-offset-8">
                    <Link to="/login" className="">Login</Link>
                </li>
                <li className="m-2 hover:underline underline-offset-8">
                    <Link to="/register" className="">Register</Link>
                </li>
            </ul>
        );
    }

    const LogOut = () => {
        return (
            <ul className="flex  cursor-pointer">
                <li className="">
                    <Link to={window.location.pathname}>
                        <div onClick={logout} className="  m-2 hover:underline  underline-offset-8">Log Out</div>
                    </Link>
                </li>
            </ul>
        );
    }

    return (
        <div className={``}>
            <div className={` text-background bg-foreground min-w-full fixed text-lg top-0 ${isNavHidden ? 'hide-nav' : 'show-nav'}`}>
                <div className="dropdown flex justify-between items-center w-full">
                    <ul className="flex">
                        <li className="m-2 hover:underline  underline-offset-8">
                            <Link to="/" className="">Home</Link>
                        </li>
                        <li className="m-2 hover:underline underline-offset-8">
                            <Link to="/pages" className="">Pages</Link>
                        </li>
                    </ul>
                    <div className="flex items-center gap-4">
                    <ThemeToggle />

                        {isLoggedIn ? <LogOut /> : <Login />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;