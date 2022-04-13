import { useState, useContext } from "react";
import * as api from "../api/api";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../contexts/usercontext";

function PostComment() {
  const { article_id } = useParams();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useContext(UserContext)
  const [status, setStatus] = useState('')
  const username = loggedInUser.username

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.length === 0) {
      alert("Comments cannot be empty")
    } else {
      setLoading(true)
      api.postComment(article_id, username, comment).then(({ data: { article } }) => {
        setLoading(false);
        setStatus("Posted")
      });
    }
  }

  if (status === "Posted") {
    return (
      <>
        <p>Comment posted successfully!</p>
        <Link to={`/articles/${article_id}`}>Back to Article</Link>
      </>
    )
  } else {

    return (
      <>
        <main>
          <h2>Post your comment..</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </label>
            <button type="submit">Post</button>
          </form>
        </main>
      </>
    )
  }
}

export default PostComment