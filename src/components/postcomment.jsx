import { useState, useContext } from "react";
import * as api from "../api/api";
import { useParams } from "react-router-dom";
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
    setLoading(true)
    api.postComment(article_id, username, comment).then(({ data: { article } }) => {
      setLoading(false);
      setStatus("Posted")
    });
  }

  if (status === "Posted") {
    return (
      <>
        <p>Comment posted successfully!</p>
        {/* <Link to="/createnewuser">View Comment</Link> */}
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


{/* <main>
      <form onSubmit={e => {
        e.preventDefault()
        api.findUser(username)
          .then(userInfo => {
            if (userInfo.data.user.username) {
              setLoggingIn(true)
              setLoggedInUser(userInfo.data.user)
              setUsername("Logging in..")
            } else {
              setLoggingIn(true)
              setUsername("Invalid Username")
            }
          })
          .catch(setUsername("Username not recognised"))
        registerUser();
        // render link to create new user page - run function?
      }}>
        <label>Username:</label>
        <input type="text" placeholder="Enter username here..."
          value={username} onChange={
            (e) => {
              setUsername(e.target.value)
            }
          }></input>
        <button type="submit">Submit</button>
        <button type="submit"></button>
        <Link to={loggingIn ? loggedInUser ? "/profile" : "/success" : "/createnewuser"}>

          {loggingIn ? "Proceed" : "Register"}
        </Link>
      </form>
    </main> */}