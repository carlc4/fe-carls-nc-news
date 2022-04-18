import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <div className="text-center my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">
            <h2>404 Not Found</h2>
            <p className="p-5"> The page you were looking for does not exist!</p>
            <Link to={"/"} className="p-5 uppercase hover:font-bold">Go Back</Link>
        </div>
    );
}

export default ErrorPage