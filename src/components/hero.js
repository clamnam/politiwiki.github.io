import React from "react";
import { Link } from "react-router-dom";
import { apiService } from "../api/apiservice.js";

import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import API_ENDPOINTS from '../.env';
const Hero = () => {
    const [data, setData] = useState(null);
    const { execute, loading, error } = useApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await execute('get', API_ENDPOINTS.content);
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
                {{data}}
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
                        <p className="mb-2 text-lg mx-4 xs:mx-0 ">
                            I am a third year student of Computing where I gained a
                            comprehensive knowledge of todays digital landscape. Developing
                            skills in Programming end to end solutions, Networking and
                            databases
                        </p>
                        <p className="mb-2 text-lg mx-4 xs:mx-0">
                            Cisco Network Essentials completed with distinction on 06/12/2023
                        </p>
                        <p className="mb-2 text-lg mx-4 xs:mx-0">
                            AWS Cloud Foundations completed with distinction 14/12/2023
                        </p>
                        <p className="mb-2 text-lg mx-4 xs:mx-0">
                            <a
                                className="underline "
                                href="https://www.linkedin.com/in/jackmob/"
                            >
                                Check out
                            </a>
                            &nbsp;
                            the various Linkedin Learning course certifications
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;