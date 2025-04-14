import { useEffect } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';


export default function Hero() {
    useEffect(() => {

    }, []);

    return (
        <div className="container-fluid  h-screen">
            <div className="flex text-center flex-col my-20 min-h-screen items-center">
                <div className="text-6xl ">
                    Welcome to {import.meta.env.VITE_PROJECT_NAME}
                </div>
                <div className="text-lg py-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>                   <Button className=' bg-red-500 anime'><Link to="/pages">Get started</Link></Button>
            </div>
        </div>
    );
}

