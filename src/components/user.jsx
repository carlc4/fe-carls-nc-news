import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/usercontext';
import * as api from "../api/api";
import UserComments from './userComments';
import UserArticles from './userArticles';

const User = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([])
  const [articles, setArticles] = useState([])

  const limit = 1000

  function handleLogout(e) {
    e.preventDefault()
    setUsername("Enter username here...")
    setLoggedInUser({
      username: "Login",
      email: "",
      avatarUrl:
        "",
    })
  }

  useEffect(() => {
    setLoading(true)
    api.getAllComments().then(({ data: { comments } }) => {
      setComments(comments);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true)
    api.getAllArticles(limit).then(({ data: { articles } }) => {
      setArticles(articles);
      setLoading(false);
    });
  }, []);

  return (
    loading ? <p>Loading...</p> : loggedInUser.username === "Login" ? (
      <main>
        <form onSubmit={e => {
          e.preventDefault()
          api.findUser(username)
            .then(userInfo => {
              if (userInfo.data.user.username) {
                setLoggedInUser(userInfo.data.user)
                setUsername("Logging in..")
              } else {
                setUsername("Invalid Username")
              }
            })
            .catch(setUsername("Username not recognised")) // this flashes up on screen when we log in successfully. Why?
        }}>
          <label>Username:</label>
          <input type="text" placeholder="Enter username here..."
            value={username} onChange={
              (e) => {
                setUsername(e.target.value)
              }
            }></input>
          <button type="submit">Submit</button>
        </form>
      </main>
    ) : (
      <article>
        <main>
          <h1>Welcome, {loggedInUser.username}</h1>
          <button onClick={(e) => { handleLogout(e) }}>LOGOUT</button>
          <h2>Here are some of your posted articles</h2>

          <article>
            {articles.filter(singleArticle => singleArticle.author === loggedInUser.username).map(myArticles => (
              <section key={myArticles.article_id}>
                <UserArticles myArticles={myArticles} />
              </section>
            ))
            }
          </article>

          <h3>Here are some of your posted comments</h3>
          <article>
            {comments.filter(singleComment => singleComment.author === loggedInUser.username).map(myComments => (
              <section key={myComments.comment_id}>
                <UserComments myComments={myComments} />
              </section>
            ))
            }
          </article>
        </main>
      </article>)
  )

}

export default User;