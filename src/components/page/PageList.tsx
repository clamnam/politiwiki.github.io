import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

interface Page {
    id: number;
    title: string;
    category: number;
    created_at: string;
    updated_at: string;
}

interface Category {
    id: number,
    name: string;
    pages: Page[];
}


export default function PageList() {
    const [categories, setCategories] = useState<Category[]>();

    const { execute } = useApi();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            // First fetch all pages
            let allPages: Page[] = [];

            const fetchPages = async () => {
                const url = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PAGE_ENDPOINT}`;
                try {
                    const response = await axios.get(url, {});
                    allPages = response.data.map((page: Page) => ({
                        id: page.id,
                        title: page.title,
                        category: page.category,
                        created_at: page.created_at,
                        updated_at: page.updated_at
                    }));
                    console.log('Pages fetched:', response.data);
                } catch (error) {
                    console.error("Error fetching pages:", error);
                }
            };

            // Then fetch categories and associate the pages
            const fetchCategories = async () => {
                const url = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CATEGORY_ENDPOINT}`;
                try {
                    const response = await axios.get(url, {});
                    const formattedCategories = response.data.map((category: Category) => {
                        // Find pages that belong to this category
                        const categoryPages = allPages.filter(page => page.category === category.id);
                        return {
                            id: category.id,
                            name: category.name,
                            pages: categoryPages // Associate pages with their category
                        };
                    });
                    setCategories(formattedCategories);
                    console.log('Categories with pages:', formattedCategories);
                } catch (error) {
                    console.error("Error fetching categories:", error);
                }
            };

            // Execute in sequence
            await fetchPages();
            await fetchCategories();
        };

        fetchData();
    }, [execute]);



    return (
        <>
            <div className=" min-w-full  py-4">
                <div className='flex justify-between'>
                    <div className='text-4xl font-serif'>Page List</div>

                    {isLoggedIn ? <Button variant="primary" className="">
                        <Link className='flex' to="/page/create">create one?</Link>
                    </Button> : <Button variant="primary"><Link className='flex' to="/login">Start creating content, login?</Link></Button>}
                </div>
                <div className="mt-8 space-y-10">
                    {categories?.map((category) => (
                        <div key={category.id} className="space-y-4">
                            <h2 className="text-2xl font-bold">{category.name}</h2>
                            {category.pages && category.pages.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {category.pages.map((page) => (
                                        <Link 
                                        key={page.id} 
                                        to={`/page/${page.id}`} className="p-4 border rounded-lg hover:bg-gray-100 transition-colors">
                                            <h3 className="text-lg font-medium">
                                                {page.title}
                                            </h3>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p>No pages in this category.</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
