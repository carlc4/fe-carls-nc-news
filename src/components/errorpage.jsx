import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <div>
            <h2>404 Not Found</h2>
            <p>The page you were looking for does not exist!</p>
            <Link to={"/"}>Go Back</Link>
        </div>
    );
}

export default ErrorPage