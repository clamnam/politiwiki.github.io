import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Button } from "@/components/ui/button"
interface Page {
    id: string;
    title: string;
}

export default function PageList(){
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
            <div className="min-w-full min-h-full text-white bg-stone-900 py-4">
                <div className="lg:grid grid-cols-3 gap-4 container">
                theres no pages?
                    <button className=" text-white   ">
                        <Link to="/page/create">create one?</Link>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="px-2 min-w-full text-white bg-stone-900 py-4">
            <div className='my-4 text-4xl'>Page List</div>
            <Button className=" max-w-min font-semibold hover:text-white py-2 px-4 border hover:border-gray-500 rounded ">
                        <Link className='flex text-white' to="/page/create">create one?</Link>
                    </Button>
                {data.map((item, index) => (
                    
                    <div key={index} className="">
                        <Link to={`/page/${item?.id}`}>{item?.title}</Link>
                    </div>
                ))}
        </div>
    );
};

