import { useParams, Link } from "react-router-dom";
import * as api from "../api/api";
import { useState, useEffect } from "react";
import convertTime from "../components/utils/convertTime"

function DeleteComment() {
    const { comment_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [commentDeleted, setCommentDeleted] = useState(false);
    const [singleComment, setSingleComment] = useState("");
    const [articleTitle, setArticleTitle] = useState("");

    useEffect(() => {
        setLoading(true)
        api.updateCommentVotes(comment_id, 1).then(({ data: { comment } }) => {
            setSingleComment(comment);
            api.getArticleById(comment.article_id).then(({ data: { article } }) => {
                setArticleTitle(article);
                setLoading(false);
            })
        })
    }, []);

    function handleDelete(e) {
        e.preventDefault()
        api.deleteComment(comment_id)
            .then(() => {
                setCommentDeleted(true)
            })
    }

    const dateAndTime = convertTime(singleComment.created_at)

    return (
        loading ? <div className="flex h-screen justify-center items-center">
            <div className="text-center">

                <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>

            </div>
        </div> :
            commentDeleted ?
                <>
                    <main className="text-center my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">
                        <p className="p-5">Your comment has been deleted</p>
                        <Link to={"/"} className="p-5 uppercase hover:font-bold">Home</Link>
                        <Link to={"/user"} className="p-5 uppercase hover:font-bold">User Profile</Link>
                    </main>
                </> :

                <article className="grid grid-cols-6 m-5 bg-white p-4 rounded-lg shadow-md md:m-16 lg:mx-36">
                    <h3 className="col-span-5 font-bold uppercase text-lg sm:text-xl">{articleTitle.title}</h3>
                    <div className="col-span-1"></div>

                    <p className="col-span-6 p-2 pb-10 sm:text-xl">{singleComment.body}</p>

                    <div className="col-span-1"></div>
                    <h4 className="col-span-2">{singleComment.votes} Votes</h4>
                    <h5 className="col-span-2">Posted on {dateAndTime}</h5>
                    <div className="col-span-3"></div>

                    <h1 className="col-span-6 py-5 text-center font-bold uppercase text-lg sm:text-xl">Are you sure you want to delete this comment? Action cannot be undone</h1>
                    <h3 className="col-span-6 p-1 font-bold uppercase text-center border-2 border-red-300 sm:text-xl hover:text-white hover:bg-red-500 hover:shadow-md"><button className="hover:font-bold" onClick={(e) => { handleDelete(e) }}>CONFIRM DELETE</button></h3>
                </article>
    )
}

export default DeleteComment