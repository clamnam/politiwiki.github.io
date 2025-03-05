import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

// import PageCreate from "./CRUD/PageCreate";
import PageList from "./PageList";
const Page = () => {
    const [data, setData] = useState(null);
    const [content, setContent] = useState(null);

    const { execute } = useApi();
    const { id } = useParams(); // <--- get the 'id' from the URL
    const rendercontent = (content) => {


        return (
            <div>
                {content.map((item, index) => (
                    <div className=" "> 
                    <Link to={`/content/${item.id}`} className="text-white col-span-1 font-medium text-2xl  justify-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                        </Link>
                        <div key={index} className="p-2">
                            <div className="text-xl ">{item.title}</div>

                            <div className="text-sm">{item.content_body}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    useEffect(() => {

        const fetchData = async () => {

            try {

                // For example, call /api/page/{id}
                var apiUrl = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_PAGE_ENDPOINT}${id}`;
                const pageResult = await execute('get', apiUrl);


                apiUrl = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_CONTENT_ENDPOINT}bypage/${id}`;
                const result = await execute('get', apiUrl);
                setContent(result);
                setData(pageResult);
                if (result && result.length > 0) {
                    rendercontent(result);
                }
            } catch (err) {
                console.error(err);
            }
        };

        if (id) {
            fetchData();
        }

    }, [execute, id]);

    if (data) {
        return (
            <div className="text-white col-span-1 font-medium text-2xl   items-center">
                <div className=" bg-neutral-900 ">
                    <div className="justify-center p-4">

                        <div className="text-white col-span-1 font-medium text-4xl  justify-center ">
                            <div>{data?.title}</div>

                        </div>
                        <div className="text-white col-span-1 font-medium flex  ">
                            {rendercontent(content)}

                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="text-white col-span-1 font-medium text-2xl flex  ">
                <PageList />
                <div className="button">
                </div>
            </div>
        );
    }
};

export default Page;