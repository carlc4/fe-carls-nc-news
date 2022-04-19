import { useState, useContext } from "react";
import * as api from "../api/api";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../contexts/usercontext";

function PostComment() {
  const { article_id } = useParams();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
      })
        .catch((err) => {
          setError(true)
          setLoading(false)
        });
    }
  }

  return (
    loading ? <div className="flex h-screen justify-center items-center">
      <div className="text-center">

        <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>

      </div>
    </div> : error ?
      <main className="text-center my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">
        <h2>Your must be registered to comment</h2>
        <Link to={"/users/new"} className="p-5 uppercase hover:font-bold">Register Here</Link>
      </main>
      :
      status === "Posted" ? (
        <main className="text-center my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">
          <p className="p-5">Comment posted successfully!</p>
          <Link to={`/articles/${article_id}`} className="p-5 uppercase hover:font-bold">Back to Article</Link>
        </main>
      ) :
        (
          <>
            <main className="text-center my-4 mx-12 bg-slate-300 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">
              <h2 className="p-5 uppercase">Post your comment..</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  <textarea
                    cols="40"
                    rows="5"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  >
                  </textarea>
                </label>
                <br></br>
                <button type="submit" className="box-border border-slate-500 border-2 p-5 m-5 uppercase hover:font-bold hover:text-white hover:bg-slate-500 hover:shadow-md">Post</button>
              </form>
            </main>
          </>
        )
  )
}


export default PostComment