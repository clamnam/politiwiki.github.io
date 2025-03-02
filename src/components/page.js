import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import PageList from "./page_list";
const Page = () => {
    const [data, setData] = useState(null);
    const [content, setContent] = useState(null);

    const { execute } = useApi();
    const { id } = useParams(); // <--- get the 'id' from the URL
    const rendercontent = (content) => {

        
        return (
            <div>
                {content.map((item, index) => (
                    
                    <div key={index} className="p-2">
                        <div className="text-xl ">{item.title}</div>
                        
                        <div className="text-sm">{item.content_body}</div>
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
                    <PageList  />
            </div>
        );    }
};

export default Page;