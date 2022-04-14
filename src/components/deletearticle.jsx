import { useParams, Link } from "react-router-dom";
import * as api from "../api/api";
import { useState, useEffect } from "react";

function DeleteArticle() {
    const { article_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [articleDeleted, setArticleDeleted] = useState(false);
    const [singleArticle, setSingleArticle] = useState();

    useEffect(() => {
        setLoading(true)
        api.getArticleById(article_id).then(({ data: { article } }) => {
            setSingleArticle(article)
            setLoading(false);
        })
    }, []);

    function handleDelete(e) {
        e.preventDefault()
        api.deleteArticle(article_id)
            .then(() => {
                setArticleDeleted(true)
            })
    }

    return (
        loading ? <p>Loading...</p> :
            articleDeleted ?
                <>
                    <p>Your article has been deleted</p>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/user"}>User Profile</Link>
                </> :

                <article className="m-5 bg-white p-4 rounded-lg shadow-md md:m-16 lg:mx-36">
                    <h2 className="font-bold uppercase text-lg sm:text-xl">{singleArticle.title}</h2>
                    <p className="p-2 pb-10 sm:text-xl">{singleArticle.body}</p>
                    <h4>Votes: {singleArticle.votes}</h4>
                    <h5>Created at: {singleArticle.created_at}</h5>
                    <h1 className="font-bold uppercase text-lg sm:text-xl">Are you sure you want to delete this article? Action cannot be undone</h1>
                    <h3 className="p-1 font-bold uppercase text-center border-2 border-red-300 sm:text-xl"><button onClick={(e) => { handleDelete(e) }}>CONFIRM DELETE</button></h3>
                </article>
    )
}
// }

export default DeleteArticle