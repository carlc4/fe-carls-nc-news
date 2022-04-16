import { Link } from "react-router-dom";
import convertTime from "../components/utils/convertTime"

function UserArticles({ myArticles, deleteCount, setDeleteCount }) {
    const dateAndTime = convertTime(myArticles.created_at)
    return (
        <>
            <article className="my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">
                <h5> {myArticles.title} </h5>
                <h5> {myArticles.topic} </h5>
                <p>Posted on {dateAndTime}</p>
                <h4 className="pb-2 text-sm text-slate-500 sm:text-md">Comments {myArticles.comment_count}</h4>
                <h4 className="pb-2 text-sm text-slate-500 sm:text-md">Votes {myArticles.votes}</h4>
                <p className="mr-2 text-right"></p>
                <Link to={`/articles/${myArticles.article_id}/delete`}>DELETE</Link>
            </article>
        </>
    );
}

export default UserArticles;