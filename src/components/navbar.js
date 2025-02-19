import { Link } from 'react-router-dom';
import { useState } from 'react';
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

    return (
        <div className={``}>
            {NavReduce()}

            <div className={`fixed top-0 ${isNavHidden ? 'hide-nav' : 'show-nav'}`}>
                <div className="dropdown">
                    <ul className="flex  text-white r w-52">
                        <li className="m-2 hover:underline  underline-offset-8 ">
                            <Link to="/">Home</Link>
                        </li>

                        <li className="m-2 hover:underline underline-offset-8">
                            <Link to='/page'>Pages</Link>
                        </li>

                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Navbar;