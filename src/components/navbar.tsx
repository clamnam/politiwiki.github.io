import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import '../assets/app.css'

const Navbar = () => {
    const [isNavHidden, setIsNavHidden] = useState(false);

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

    return (
        <div className={``}>

            <div className={`fixed top-0 ${isNavHidden ? 'hide-nav' : 'show-nav'}`}>
                <div className="dropdown flex justify-between min-w-full items-center w-full">
                    <ul className="flex">
                        <li className="m-2 hover:underline text-white underline-offset-8">
                            <Link to="/" className="text-white">Home</Link>
                        </li>
                        <li className="m-2 hover:underline underline-offset-8">
                            <Link to="/page" className="text-white">Pages</Link>
                        </li>
                    </ul>
                    <ul className="flex">
                        <li className="m-2 hover:underline underline-offset-8">
                            <Link to="/login" className="text-white">Login</Link>
                        </li>
                        <li className="m-2 hover:underline underline-offset-8">
                            <Link to="/register" className="text-white">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Navbar;