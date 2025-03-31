import Page from "@/components/page/Page";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCheckIcon } from "@/components/ui/check-check";
import { XIcon } from "@/components/ui/x";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog"
import TokenService from "@/api/tokenService";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    queue_index: z.number().int().min(0),

})

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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            queue_index: -1,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
        const token = TokenService.tokenRetrieval();
        console.log("Form values:", values);
        const url = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}/${id}`;
        try {
            const response = await axios.patch(
                url,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Response:", response);
            // Show success message or redirect user
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error - show error message to user
        }
    }

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
    const renderContentQueue = ()=> {
        console.log(content);

        return (
            <div className="text-white">

                {content && Array.isArray(content) &&
                    content
                        .filter(item => typeof item.queue === "string")
                        .map((item, index) => {
                            let parsedQueue;
                            try {
                                parsedQueue = JSON.parse(item.queue);
                                if (parsedQueue[0] != undefined) {
                                    parsedQueue = parsedQueue[0];
                                }
                            } catch (err) {
                                console.error("Failed to parse queue", err);
                                parsedQueue = {};
                            }
                            if (!parsedQueue) {
                                return null;
                            }
                            console.log(parsedQueue);
                            return (
                                <div className="text-white" key={index}>
                                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                                    <div>{parsedQueue?.title}</div>
                                    <div className="m-4">
                                        {item?.status === "Pending" ? (
                                            <div className="text-red-500">New Content</div>
                                        ) : (
                                            <div className="text-green-500">edit</div>
                                        )}
                                        <div className="text-2xl font-serif">{parsedQueue?.title}</div>
                                        <div className="text-lg">{parsedQueue?.content_body}</div>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button>
                                                    <CheckCheckIcon
                                                        className="cursor-pointer text-white rounded-sm bg-green-400"
                                                        size={20}
                                                    />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px] bg-neutral-800 text-white">
                                                <DialogHeader>
                                                    <DialogTitle>APPROVE CONTENT?</DialogTitle>
                                                    <DialogDescription>
                                                        Are you sure you want to approve this section?
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="text-2xl gap-4 py-4">
                                                    <div className="font-serif">Section Title :</div>
                                                    <div className="text-white items-center">
                                                        {parsedQueue?.title}
                                                    </div>
                                                </div>
                                                <hr className="h-px my-4 bg-gray-200 border-0" />
                                                <div className="text-lg gap-4 py-4">
                                                    <div className="font-serif">Section body :</div>
                                                    <div className="items-center">
                                                        {parsedQueue?.content_body}
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button
                                                        variant="submit"
                                                        onClick={() => {
                                                            form.setValue('queue_index', index);
                                                            form.handleSubmit(onSubmit)();
                                                        }}
                                                        type="submit"
                                                    >
                                                        Confirm Changes
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <Button className="m-0 p-0">
                                            <XIcon
                                                className="cursor-pointer text-white rounded-sm bg-red-400"
                                                size={50}
                                            />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
            </div>
        );
    };

    return (
        <div className="text-white">

            <div className=" text-neutral-500 justify-between my-8  ">
                content queue
                <div className="font-serif font-medium text-white text-4xl">
                    {data?.title}
                </div>
                {renderContentQueue()}
                
            </div>
            {
            }
        </div>

    )
}
export default ContentConfirmQueue;