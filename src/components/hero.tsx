// import React from "react";
import PageList from "./page/PageList.tsx";
// import { useEffect, useState } from 'react';
// import { useApi } from './hooks/useApi.js';
// import { API_ENDPOINTS, API_BASE_URL } from '../.env';

export default function Hero(){
    // const [data, setData] = useState(null);
    // const { execute } = useApi();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const result = await execute('get', `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}`);
    //             setData(result);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };

    //     fetchData();
    // }, [execute]);



    return (
        <div>
         

            <div className="container-fluid  text-white bg-stone-900 py-4">
                <h1 className="text-4xl">Pages</h1>
                <div className=" grid-cols-3 gap-4 container">

                    <PageList  />
                </div>

            </div>

        
        </div>
    );
};

