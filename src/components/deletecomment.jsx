import { useParams, Link } from "react-router-dom";
import * as api from "../api/api";
import { useState, useEffect } from "react";

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

    return (
        loading ? <p>Loading...</p> :
            commentDeleted ?
                <>
                    <p>Your comment has been deleted</p>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/user"}>User Profile</Link>
                </> :
                <article className="m-5 bg-white p-4 rounded-lg shadow-md md:m-16 lg:mx-36">
                    <h3 className="font-bold uppercase text-lg sm:text-xl">{articleTitle.title}</h3>
                    <p className="p-2 pb-10 sm:text-xl">{singleComment.body}</p>
                    <h4>Votes: {singleComment.votes}</h4>
                    <h5>Created at: {singleComment.created_at}</h5>
                    <h1 className="font-bold uppercase text-lg sm:text-xl">Are you sure you want to delete this article? Action cannot be undone</h1>
                    <h3 className="p-1 font-bold uppercase text-center border-2 border-red-300 sm:text-xl"><button onClick={(e) => { handleDelete(e) }}>CONFIRM DELETE</button></h3>
                </article>
    )
}

export default DeleteComment