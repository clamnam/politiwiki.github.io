import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import FloatLeft from "./content_containers/float_left";
import FloatRight from "./content_containers/float_right";

const Page = () => {
    const [data, setData] = useState(null);
    const { execute } = useApi();
    const { id } = useParams(); // <--- get the 'id' from the URL
    const resource = "page";

    useEffect(() => {
        const fetchData = async () => {
            try {
                // For example, call /api/page/{id}
                const apiUrl = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_PAGE_ENDPOINT}/${id}`;
                console.log(apiUrl);
                const result = await execute('get', apiUrl);
                setData(result);
            } catch (err) {
                console.error(err);
            }
        };

        if (id) {
            fetchData();
        }
    }, [execute, id]);

    if (data && data.length > 0) {
        return (
            <div>
                <FloatLeft content={data} resource={resource} />
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};

export default Page;