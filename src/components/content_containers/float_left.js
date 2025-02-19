import { Link } from 'react-router-dom';

const FloatLeft = ({ resource, content }) => {
    console.log(content);

    // Check if content is a valid non-empty array
    if (!content || !Array.isArray(content) || content.length === 0) {
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
                {content.map((item, index) => (
                    <div key={index} className="text-white col-span-1 font-medium text-2xl flex justify-center items-center">
                        <Link to={`/${resource}/${item.id}`}>{item.title}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FloatLeft;