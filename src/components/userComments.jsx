import { Link } from "react-router-dom";

function UserComments({ myComments, deleteCount, setDeleteCount }) {

    return (
        <>
            <article className="my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">
                <h5> {myComments.body} </h5>
                <h4 className="pb-2 text-sm text-slate-500 sm:text-md">Posted on {myComments.created_at}</h4>
                <p className="mr-2 text-right"></p>
                <Link to={`/comments/${myComments.comment_id}`}>DELETE</Link>
            </article>
        </>
    );
}

export default UserComments;