import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Button } from "@/components/ui/button"
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get page type count from env
                const pageTypeCount = parseInt(import.meta.env.VITE_API_PAGE_TYPE_COUNT || "0", 10);
                console.log("Page type count:", pageTypeCount);
                // Fetch all pages
                const allPages = await execute('get', `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PAGE_ENDPOINT}`);
                const pageTypes: PageTypeData[] = [];
                console.log("All pages:", allPages);
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
                        console.log("Pages of type", typeName, ":", pagesOfType);
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
            <>
                <div>theres no pages?</div>
                <div className="flex w-full items-center p-6">
                    <Button
                        variant="default"
                        size="lg"
                        className="text-white hover:bg-red-500 focus:ring-red-900 shadow-md rounded-lg px-6 py-3 transition-colors"
                    >
                        <Link to="/page/create">create one?</Link>
                    </Button>
                </div>
            </>
        );
    }

    return (
        <div className=" text-white flex w-full items-center p-6">
            <div className="px-2 min-w-full text-white py-4">
                <div className='my-4 text-4xl'>Page List</div>
                <Button variant="primary" className="">
                    <Link className='flex' to="/page/create">create one?</Link>
                </Button>
                
                {pageTypeData.map((typeData, typeIndex) => (
                    <div key={typeIndex} className="mt-4">
                        <h2 className="text-2xl mb-2">{typeData.name}</h2>
                        <Card>
                            {typeData.pages.length > 0 ? (
                                typeData.pages.map((item, index) => (
                                    <div key={index} className="">
                                        <Link className='p-4' to={`/page/${item?.id}`}>{item?.title}</Link>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4">No pages of type {typeData.name}</div>
                            )}
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
