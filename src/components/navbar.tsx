import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '../utilities/ThemeToggle';
import { ChevronDownIcon } from './ui/chevron-down';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// import '../assets/app.css'

const Navbar = () => {
    const [isNavHidden, setIsNavHidden] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const [username, setUsername] = useState<string>();



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
        const usernamestring = localStorage.getItem("username")

        if (usernamestring) {
            setUsername(usernamestring);
        }
        NavReduce();
    }, [setUsername]);

    const Login = () => {
        return (
            <><DropdownMenuItem className="hover:bg-foreground/10 hover:underline underline-offset-8">
                <Link to="/login" className=" m-2">Login</Link>
            </DropdownMenuItem><DropdownMenuItem className="hover:bg-foreground/10 hover:underline underline-offset-8">
                    <Link to="/register" className=" m-2">Register</Link>

                </DropdownMenuItem></>
        );
    }

    const LogOut = () => {
        return (
                <DropdownMenuItem className="hover:bg-foreground/10 hover:underline underline-offset-8">
                    
                    <Link to={window.location.pathname}>
                        <div onClick={logout} className="  m-2  ">Log Out</div>
                    </Link>
                </DropdownMenuItem>
        );
    }

    return (
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
                    <div className="flex items-center ">
                        <ThemeToggle />

                        <div className="">
                            <DropdownMenu >
                                <DropdownMenuTrigger className=" p-3 flex hover:cursor-pointer bg-foreground text-background hover:bg-background/10 "> {username?username:<>Acccount</>}<ChevronDownIcon  className='p-0 pr-2'/></DropdownMenuTrigger>
                                <DropdownMenuContent className='bg-background'>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {isLoggedIn ? <LogOut /> : <Login />}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Navbar;
