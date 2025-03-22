import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { Button } from "@/components/ui/button";
import { SquarePenIcon } from "../ui/square-pen";
import PageList from "./PageList";

interface Page {
    id: string;
    title: string;
    content_body: string;
}

const Page = () => {
    const [data, setData] = useState<Page | null>(null);
    const [content, setContent] = useState(null);
    const { execute } = useApi();
    const { id } = useParams();

    const rendercontent = (content: Page[]) => (
        <div>
            {content.map((item, index) => (
                <div key={index} className="py-2">
                    <div className="flex">
                        <div className="text-2xl p-2">{item.title}</div>
                        <Link to={`/content/${item.id}`} className="p-0">
                            <SquarePenIcon className="text-white" />
                        </Link>
                    </div>
                    <div className="text-sm">{item.content_body}</div>
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
                const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}bypage/${id}`;
                const result = await execute("get", apiUrl);
                setContent(result);
            } catch (err) {
                console.error(err);
            }
        };

        if (id) fetchData();
    }, [execute, id]);

    if (data?.title) {
        return (
            <div className="text-white col-span-1 font-medium text-2xl items-center">
                <div className="bg-neutral-900">
                    <div className="justify-center p-4">
                        <div className="text-white col-span-1 font-medium text-4xl justify-center">
                            <div>{data.title}</div>
                            <Button className="max-w-min font-semibold hover:text-white py-2 px-4 border hover:border-gray-500 rounded">
                                <Link to="/content/create">create content?</Link>
                            </Button>
                        </div>
                        <div className="text-white col-span-1 font-medium flex">
                            {content && rendercontent(content)}
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
