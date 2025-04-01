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
import ContentConfirmButton from "../content/CRUD/ContentQueueButton";
// import ContentConfirmButton from "../content/CRUD/ContentConfirmButton";

interface Page {
    status: string;
    id: string;
    title: string;
    content_body: string;
    queue: string;

}

const Page = () => {
    const [data, setData] = useState<Page | null>(null);
    const [content, setContent] = useState<Page[] | null>(null);
    const [pending, setPending] = useState(0);
    const { execute } = useApi();
    const { id } = useParams();
    const { isLoggedIn } = useAuth();


    useEffect(() => {
        // if (content) {
        //     for (let x = 0; x < content.length; x++) {
        //         console.log(content,x,content[x].queue);
        //     }
        // }
        if (content) {
            // console.log(content);
            const pendingCount: number = content.filter((item: Page) => item.queue!="[]").length;
            setPending(pendingCount);
        }
    }, [content, pending]);

    const rendercontent = (content: Page[]) => (
        // console.log(content),
        <div>
            {content.filter(item => item.status != "Pending")
            .map((item, index) => {
                // console.log(item);
                return (
                    <div key={index} className="break-words">
                        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                        <div className="flex">
                            <div className="text-2xl py-2 font-serif">{item.title}</div>
                        
                            <Link state={{ content: item}} to={`/content/edit/${item.id}`}  className="p-0">
                                <SquarePenIcon className="text-white" />
                            </Link>

                        </div>
                        <div className="text-base ">{item.content_body}</div>

                    </div>
                );
            })}
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
            <div className="">

                <div className=" text-white  font-medium ">
                {pending ?
                    <ContentConfirmButton id={Number(id)} value={pending} /> : null
                }
                    <div className=" flex justify-between my-8 font-medium text-4xl ">

                        <div className="font-serif py-2">{data.title}</div>
                        {isLoggedIn && content ? <Button variant="primary" className="">
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
        );
    } else {
        return (
            <div className=" ">
                <PageList />
            </div>);
    }
};

export default Page;
