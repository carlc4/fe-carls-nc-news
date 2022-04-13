import { useState, useContext } from "react";
import * as api from "../api/api";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../contexts/usercontext";

function PostArticle() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    // const [title, setTitle] = useState("");
    const [newArticle, setNewArticle] = useState();
    const [loading, setLoading] = useState(true);
    const { loggedInUser } = useContext(UserContext)
    const [status, setStatus] = useState('')
    const username = loggedInUser.username

    const topic = "coding"

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        api.postArticle(username, title, body, topic).then(({ data: { article } }) => {
            setNewArticle(article)
            setLoading(false);
            setStatus("Posted")
        });
    }

    if (status === "Posted") {
        return (
            <>
                <p>Article posted successfully!</p>
                <Link to={`/articles/${newArticle.article_id}`}>View the Article</Link>
            </>
        )
    } else {

        return (
            <>
                <main>
                    <h2>Post New Article</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <h3>Title</h3>
                            <input
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                            <h3>Body</h3>
                            <input
                                value={body}
                                onChange={(event) => setBody(event.target.value)}
                            />
                        </label>
                        <br></br>
                        <button type="submit">Post</button>
                    </form>
                </main>
            </>
        )
    }
}


export default PostArticle