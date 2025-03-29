import Page from "@/components/page/Page";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCheckIcon } from "@/components/ui/check-check";
import { XIcon } from "@/components/ui/x";



interface Content {
    id: string;
    title: string;
    content_body: string;
    queue: string;
    status: string;
}

const ContentConfirmQueue = () => {
    const { id } = useParams();
    const [data, setData] = useState<Page | null>(null);
    const [content, setContent] = useState<Content[]>();

    // const [pending, setPending] = useState(0);
    // const { execute } = useApi();
    // const { isLoggedIn } = useAuth();

    useEffect(() => {

        try {
            const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PAGE_ENDPOINT}${id}`;
            axios.get(apiUrl).then((response) => {
                setContent(response.data);
                setData(response.data);

            });
        } catch (err) {
            console.error(err);
        }
        try {
            const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}/bypage/${id}`;
            axios.get(apiUrl).then((response) => {
                setContent(response.data);
            });

        } catch (err) {
            console.error(err);
        }

    }, [id]);


    return (
        <div className="text-white">
            
            <div className=" text-neutral-500 justify-between my-8  ">
            content queue

                <div className="font-serif font-medium text-white text-4xl">
                    {data?.title}
                </div>
            </div>
                {content && Array.isArray(content) &&
                    content
                        .filter(item => typeof item.queue === "string")
                        .map((item, index) => {
                            let parsedQueue;
                            try {
                                parsedQueue = JSON.parse(item.queue);
                            } catch (err) {
                                console.error("Failed to parse queue", err);
                                parsedQueue = {};
                            }
                            return (
                                <div className="" key={index}>
                                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                                    <div className="m-4">
                                        {content[index]?.status === "Pending" ? <div className="text-red-500">New Item</div> : <div className="text-green-500">Changes</div>}
                                        <div className="text-2xl font-serif">{parsedQueue.title}</div>
                                        <div >{parsedQueue.content_body}</div>
                                        {/* TODO ACTIVATE Button */}
                                        <Button className="m-0 pl-2  "><CheckCheckIcon className="cursor-pointer text-white rounded-sm bg-green-400" size={50}/></Button>
                                        <Button className="m-0 p-0  "><XIcon className="cursor-pointer text-white rounded-sm bg-red-400" size={50}/></Button>

                                    </div>
                                </div>
                            );
                        })
                }
        </div>

    )
}
export default ContentConfirmQueue;