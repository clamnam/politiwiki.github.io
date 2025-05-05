import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import UserService from "@/api/userService";
import { z } from "zod";
// import ContentConfirmButton from "../content/CRUD/ContentConfirmButton";

interface Content {
    status: string;
    id: number;
    title: string;
    content_body: string;
    queue: string;
    is_deleted:boolean;
    order_id: number; // Added order_id field
}


const Page = () => {
    const [data, setData] = useState<Content | null>(null);
    const [content, setContent] = useState<Content[] | null>(null);
    const [pending, setPending] = useState(0);
    const { execute } = useApi();
    const { id } = useParams();
    const { isLoggedIn } = useAuth();



    const handleDelete = async (id: number) => {
        const data = UserService.userRetrieval();
        const token = data.token;
        const url = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}queue/${id}`;

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
            console.log(content.filter((item: Content) => item.queue != "[]"));
            // console.log(content);
            const pendingCount: number = content.filter((item: Content) => item.queue != "[]").length;
            setPending(pendingCount);
        }
    }, [content, pending]);

    const rendercontent = (content: Content[]) => (
        <div>
            {content
                .filter(item => item.status != "Pending")
                .filter(item => item.is_deleted != true)

                .sort((x, y) => (x.id || 0) - (y.id || 0)) // Sort by order_id ascending
                .map((item, index) => {
                    return (
                        <div key={index} className="break-words py-2">
                            <div className="flex space-between place-content-between">
                                <div className="text-2xl py-2 font-serif">{item.title}</div>
                                <div>
                                {isLoggedIn ?
                                    <div className="flex">
                                        <Link state={{ content: item }} to={`/content/edit/${item.id}`} className="hover:text-green-500 ">
                                            <SquarePenIcon size={30} />
                                        </Link>
                                        <div>
                                            <ContentDelete onDelete={handleDelete} id={Number(item.id)} content={item} />
                                        </div>
                                    </div>:<></>}
                                </div>

                            </div>
                            <div className="text-base">
                                {item.content_body.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </div>

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
                const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}bypage/${id}`;
                axios.get(apiUrl).then((response) => {
                    setContent(response.data);
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
                    <AlertTitle>No Content Found{!isLoggedIn?<>, <Link className="underline"to='/login'>login to create content</Link></>:<></>}</AlertTitle>

                </Alert>}

                {isLoggedIn ? (<Link to="/content/create" state={{ page: id }}><div className="flex my-8 hover:bg-stone-300 hover:dark:bg-stone-800 rounded-md hover:cursor-cell justify-center">
                    <Plus size={80} />
                </div></Link>) : 
                <><div className="text-lg">
                <Link className=" flex my-8 p-2 hover:bg-stone-300 bg-stone-400 hover:dark:bg-stone-800 rounded-md hover:cursor-cell justify-center  sm:no-underline underline" to='/login'> Want to Contribute? Login</Link>
            </div></>
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
