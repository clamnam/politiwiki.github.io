import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { SquarePenIcon } from "../ui/square-pen";
import ContentDelete from "../content/CRUD/ContentDelete";

import PageList from "./PageList";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { AlertCircle, Plus } from "lucide-react"

import {
    Alert,
    AlertTitle,
} from "@/components/ui/alert"

import ContentConfirmButton from "../content/CRUD/ContentQueueButton";
import TokenService from "@/api/tokenService";
import { z } from "zod";
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
    const navigate = useNavigate();



    const handleDelete = async (id: number) => {
        const token = TokenService.tokenRetrieval();
        const url = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}/queue/${id}`;

        try {
            const deleteSchema = z.object({
                id: z.number(),
            });

            const payload = { id: Number(id) };
            const validatedPayload = deleteSchema.parse(payload);

            const response = await axios.delete(
                url,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: validatedPayload,
                }
            );


            console.log("Response:", response);
            navigate(`/page/${id}`);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    useEffect(() => {
        // if (content) {
        //     for (let x = 0; x < content.length; x++) {
        //         console.log(content,x,content[x].queue);
        //     }
        // }
        if (content) {
            // console.log(content);
            const pendingCount: number = content.filter((item: Page) => item.queue != "[]").length;
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
                        <div key={index} className="break-words py-2">
                            <div className="flex space-between place-content-between">
                                <div className="text-2xl py-2 font-serif">{item.title}</div>

                                <div>
                                    <div className="flex">
                                        <Link state={{ content: item }} to={`/content/edit/${item.id}`} className="hover:text-green-500 p-.5">
                                            <SquarePenIcon size={30} />
                                        </Link>
                                        <div>
                                            <ContentDelete onDelete={handleDelete} id={Number(item.id)} content={item} />
                                        </div>
                                    </div>
                                </div>

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

            <div className="   font-medium ">


                <div className=" flex justify-between font-medium text-4xl ">

                    <div className="font-serif pb-4">{data.title}</div>

                    <div className="flex py-2">
                        {pending && isLoggedIn ?
                            <ContentConfirmButton id={Number(id)} value={pending} /> : null
                        }

                    </div>
                </div>
                <hr className=" border-foreground" />



                {content && rendercontent(content)}

                {!content && <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4 " />
                    <AlertTitle>No Content Found</AlertTitle>

                </Alert>}

                {isLoggedIn ? (<Link to="/content/create" state={{ page: id }}><div className="flex my-8 hover:bg-stone-300 hover:dark:bg-stone-800 rounded-md hover:cursor-cell justify-center">
                    <Plus size={80} />
                </div></Link>) : null
                }


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
