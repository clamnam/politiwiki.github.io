import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Button } from "@/components/ui/button"
import { Card } from '../ui/card';
interface Page {
    id: string;
    title: string;
}

export default function PageList() {
    const [data, setData] = useState<Page[]>([]);
    const { execute } = useApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await execute('get', `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PAGE_ENDPOINT}`);
                setData(result);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [execute]);


    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <>
                <div className="  ">
                    theres no pages?
                </div>
                <div className="  flex w-full items-center  p-6 ">
                    <Button
                        variant="default"
                        size="lg"
                        className="text-white  hover:bg-red-500 focus:ring-red-900 shadow-md rounded-lg px-6 py-3 transition-colors"
                    >
                        <Link to="/page/create">create one?</Link>
                    </Button>

                </div>
            </>
        );
    }

    return (
        <div className="flex w-full items-center  p-6 ">


            <div className="px-2 min-w-full text-white  py-4">
                <div className='my-4 text-4xl'>Page List</div>
                <Button variant="primary" className=" ">
                    <Link className='flex ' to="/page/create">create one?</Link>
                </Button>
                <Card>
                    {data.map((item, index) => (

                        <div key={index} className="">
                            <Link className='p-4' to={`/page/${item?.id}`}>{item?.title}</Link>
                        </div>
                    ))}
                </Card>
            </div>
        </div>


    );
};

