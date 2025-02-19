import React from "react";
import { Link } from "react-router-dom";
import { apiService } from "../api/apiservice.js";

import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
// import { API_ENDPOINTS, API_BASE_URL } from '../.env';

const Hero = () => {
    const [data, setData] = useState(null);
    const { execute, loading, error } = useApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await execute('get', `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_CONTENT_ENDPOINT}`);
                console.log(`${process.env.REACT_APP_API_BASE_URL}`);
                setData(result);
            } catch (err) {
                console.error('Failed to fetch data:', err);
            }
        };

        fetchData();
    }, [execute]);


    // eslint-disable-next-line no-unused-vars
    const PhoneViewTop = () => {
        return (
            <>

                <div className="text-white col-span-1 font-medium text-2xl">
                    p
                {data}
                p
                </div>
                <div className="container">
                    <div className="text-6xl hidden sm:flex justify-center font-light py-16">
                        About Me
                    </div>
                </div>
            </>
        );
    };
    return (
        <div>
            {/* <PhoneViewTop /> */}

            <div className="container-fluid  bg-neutral-600 py-4">
                <div className="lg:grid grid-cols-3 gap-4 container">
                    <div className="text-white col-span-1 font-medium text-2xl flex justify-center items-center">

                    </div>
                </div>
            </div>

            <div className="container-fluid text-white bg-stone-900 py-4">
                <div className="lg:grid grid-cols-3 gap-4 container">
                    <div className="col-span-2 font-medium text-2xl">

                    </div>

                    <div className="text-white col-span-1 font-medium text-2xl flex justify-center items-center">

                    </div>
                </div>
                <div className="text-white sm:hidden col-span-1 font-medium text-2xl flex justify-center items-center">
				</div>
            </div>

            <div className="container-fluid bg-neutral-600 py-4">
                <div className="lg:grid grid-cols-3 gap-4 container">
                    <div className=" col-span-1 flex justify-center" >
                        <a href="https://www.linkedin.com/in/jackmob/">
                        </a>
                    </div>
                    <div className="col-span-2 text-white font-medium ">
                        <h1 className="text-4xl mx-4 xs:mx-0">Education and Certifications</h1>
                        <br />
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;