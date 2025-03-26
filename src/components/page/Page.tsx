import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { Button } from "@/components/ui/button";
import { SquarePenIcon } from "../ui/square-pen";
import PageList from "./PageList";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

interface Page {
    id: string;
    title: string;
    content_body: string;
    queue: string;
}

const Page = () => {
    const [data, setData] = useState<Page | null>(null);
    const [content, setContent] = useState(null);
    const { execute } = useApi();
    const { id } = useParams();
    const { isLoggedIn } = useAuth();
    const rendercontent = (content: Page[]) => (
        <div>
            {content.map((item, index) => (
                <div key={index} className="">
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="flex">
                        <div className="text-2xl py-2 font-serif">{item.title}</div>
                        <Link to={`/content/${item.id}`} className="p-0">
                            <SquarePenIcon className="text-white" />
                        </Link>

                    </div>
                    <div className="text-base ">{item.content_body}</div>

                </div>
            ))}
        </div>
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PAGE_ENDPOINT}${id}`;
                const pageResult = await execute("get", apiUrl);
                setData(pageResult);
            } catch (err) {
                console.error(err);
            }
            try {
                const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}/bypage/${id}`;
                // const result = await execute("get", apiUrl);
                axios.get(apiUrl).then((response) => {
                    setContent(response.data);
                    // console.log(response);
                });

            } catch (err) {
                console.error(err);
            }
        };

        if (id) fetchData();
    }, [execute, id]);

    if (data?.title) {
        return (
            <div className="flex   items-center  p-6 ">
                <div className="text-white w-full col-span-1 font-medium text-2xl items-center">
                    <div className="">
                        <div className="justify-center p-4">
                            <div className="text-white col-span-1 my-8  font-medium text-4xl justify-center">
                                <div className="font-serif py-2">{data.title}</div>
                                {isLoggedIn ? <Button variant="primary" className="">
                                    <Link to="/content/create" state={{ page: id }}>Create Content for this page?</Link>
                                </Button> : null}
                                
                            </div>
                                {content && rendercontent(content)}
                                {!content && <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4 " />
                                    <AlertTitle>No Content Found</AlertTitle>
                                    <AlertDescription>
                                    {isLoggedIn ? <Button variant="primary" className="">
                                    <Link to="/content/create" state={{ page: id }}>Create Content for this page?</Link>
                                </Button> : null}
                                        
                                    </AlertDescription>
                                </Alert>}

                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex w-full  items-center  p-6 ">
                <PageList />
            </div>);
    }
};

export default Page;
