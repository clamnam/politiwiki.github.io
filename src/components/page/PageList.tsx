import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context/AuthContext';
import { Card } from '../ui/card';

interface Page {
    id: string;
    title: string;
    page_type: string; // Assuming pages have a type property
}

interface PageTypeData {
    name: string;
    pages: Page[];
}

export default function PageList() {
    const [pageTypeData, setPageTypeData] = useState<PageTypeData[]>([]);
    const [loading, setLoading] = useState(true);
    const { execute } = useApi();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get page type count from env
                const pageTypeCount = parseInt(import.meta.env.VITE_API_PAGE_TYPE_COUNT || "0", 10);
                // Fetch all pages
                const allPages = await execute('get', `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PAGE_ENDPOINT}`);
                const pageTypes: PageTypeData[] = [];
                // Create categories based on page types

                for (let i = 0; i < pageTypeCount; i++) {
                    const typeName = import.meta.env[`VITE_API_PAGE_TYPE_${i}`];
                    if (typeName) {
                        // Filter pages by type
                        const pagesOfType = allPages.filter((page: Page) => Number(page.page_type) === i);
                        pageTypes.push({
                            name: typeName,
                            pages: pagesOfType || []
                        });
                    }
                }

                setPageTypeData(pageTypes);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [execute]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const hasPages = pageTypeData.some(type => type.pages.length > 0);

    if (!hasPages) {
        return (
            <Card className=' p-6 m-6'>
                <div className='text-lg   text-serif'>Welcome to the your new wiki</div>
                <div className="flex w-full items-center p-6">
                    <Button
                        variant="default"
                        size="lg"
                        className=" border border-red-500 hover:bg-red-500  rounded-lg px-6 py-3 transition-colors"
                    >
                        <Link to="/page/create">start by creating some pages create one?</Link>
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <>
            <div className="px-2 min-w-full  py-4">
                <div className='flex justify-between'>
                    <div className='my-1 text-4xl font-serif'>Page List</div>

                    {isLoggedIn ? <Button variant="primary" className="">
                        <Link className='flex' to="/page/create">create one?</Link>
                    </Button> : null}
                </div>
                {pageTypeData.map((typeData, typeIndex) => (
                    <div key={typeIndex} className="my-2">
                        <h2 className="text-2xl mb-2 font-serif">{typeData.name}</h2>
                        {typeData.pages.length > 0 ? (
                            typeData.pages.map((item, index) => (
                                <div key={item.id || index}>
                                    <hr className="h-px  bg-foreground border-0 " />
                                    <Link className=' text-xl font-serif' to={`/page/${item?.id}`}>
                                        <div className="px-4 py-1 hover:bg-stone-400  ">
                                            {item?.title}
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="p-4">No pages of type {typeData.name}</div>
                        )}
                    </div>

                ))}
            </div>
        </>
    );
}
