import { Link } from "react-router-dom";
import convertTime from "../components/utils/convertTime"

function UserArticles({ myArticles, deleteCount, setDeleteCount }) {
    const dateAndTime = convertTime(myArticles.created_at)
    return (
        <>
            <article className="grid grid-cols-8 my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">
                <Link to={`/articles/${myArticles.article_id}`} className="col-span-3 uppercase hover:font-bold">{myArticles.title}</Link>
                <h5 className="uppercase"> {myArticles.topic} </h5>
                <p className="w-10 pb-2 text-sm text-slate-500 sm:text-md">{dateAndTime}</p>
                <h4 className="pb-2 text-sm text-slate-500 sm:text-md">Comments {myArticles.comment_count}</h4>
                <h4 className="pb-2 text-sm text-slate-500 sm:text-md">Votes {myArticles.votes}</h4>
                <Link to={`/articles/${myArticles.article_id}/delete`}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg></Link>
            </article>
        </>
    );
}

export default UserArticles;