import { Link } from 'react-router-dom';

const PageList = ({ pages }) => {

    // Check if pages is a valid non-empty array
    if (!pages || !Array.isArray(pages) || pages.length === 0) {
        return (
            <div className="container-fluid text-white bg-stone-900 py-4">
                <div className="lg:grid grid-cols-3 gap-4 container">
                    <div className="text-white col-span-1 font-medium text-2xl flex justify-center items-center">
                        <>yar there be no page here</>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid text-white bg-stone-900 py-4">
            <div className="lg:grid grid-cols-3 gap-4 container">
                {pages.map((item, index) => (
                    <div key={index} className="text-white col-span-1 font-medium text-2xl flex justify-center items-center">
                        <Link to={`/page/${item.id}`}>{item.title}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageList;