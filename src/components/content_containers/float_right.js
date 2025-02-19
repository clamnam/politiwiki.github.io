const FloatRight = (content) => {
    return(
        <div className="container-fluid bg-neutral-600 py-4">
        <div className="lg:grid grid-cols-3 gap-4 container">
            <div className="text-white col-span-1 font-medium text-2xl flex justify-center items-center">
            {content?.title}
            </div>
        </div>
    </div>
    )
}
export default FloatRight;