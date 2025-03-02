import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
const PageList = () => {
    const [data, setData] = useState(null);
    const { execute } = useApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await execute('get', `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_PAGE_ENDPOINT}`);
                setData(result);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [execute]);


    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <div className="container-fluid text-white bg-stone-900 py-4">
                <div className="lg:grid grid-cols-3 gap-4 container">
                theres no pages?
                    <div className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                        <Link to="/page/create">create one?</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid text-white bg-stone-900 py-4">
            <div className="lg:grid grid-cols-3 gap-4 container">
            <div className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded max-w-xs">
                        <Link to="/page/create">create one?</Link>
                    </div>
                {data.map((item, index) => (
                    
                    <div key={index} className="">
                        <Link to={`/page/${item.id}`}>{item.title}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageList;