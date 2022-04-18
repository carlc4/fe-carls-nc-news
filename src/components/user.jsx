import { useContext, useState, useEffect } from 'react';
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
  const [myArticleNumber, setMyArticleNumber] = useState(0)
  const [myCommentNumber, setMyCommentNumber] = useState(0)

  const limit = 1000
  let articleArray = []
  let commentArray = []

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
    api.getAllComments(limit).then(({ data: { comments } }) => {
      setComments(comments);
      commentCount(comments)
      setLoading(false);
    });
  }, [loggedInUser]);

  useEffect(() => {
    setLoading(true)
    api.getAllArticles(limit).then(({ data: { articles } }) => {
      setArticles(articles);
      articleCount(articles)
      setLoading(false);
    });
  }, [loggedInUser]);

  function commentCount(comments) {
    commentArray = comments.filter(singleArticle => singleArticle.author === loggedInUser.username)
    setMyCommentNumber(commentArray.length)
    return commentArray;
  }

  function articleCount(articles) {
    articleArray = articles.filter(singleArticle => singleArticle.author === loggedInUser.username)
    setMyArticleNumber(articleArray.length)
    return articleArray;
  }

  return (
    loading ? <div className="flex h-screen justify-center items-center">
      <div className="text-center">

        <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>

      </div>
    </div> : loggedInUser.username === "Login" ? (
      <main className="text-center m-12 text-xl md:m-18">
        <form onSubmit={e => {
          e.preventDefault()
          setUsername("Logging in..")
          api.findUser(username)
            .then(userInfo => {
              setLoading(true)
              if (userInfo.data.user.username) {
                setLoggedInUser(userInfo.data.user)
                setLoading(false)
              } else {
                setUsername("Invalid Username")
                setLoading(false)
              }
            })
            .catch((err) =>
              setUsername("Username not recognised")
            )
        }}>
          <label className="pr-5">Enter Username:</label>
          <input type="text" placeholder="Enter username here..."
            value={username} onChange={
              (e) => {
                setUsername(e.target.value)
              }
            }></input>
          <button className="pl-5 hover:font-bold" type="submit">Submit</button>
        </form>
      </main>
    ) : (
      <>
        <h1 className="text-center text-xl font-bold uppercase ">Welcome, {loggedInUser.username}</h1>
        <main className="grid grid-cols-6 my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">
          <div className="col-span-2"></div>
          <img src={loggedInUser ? loggedInUser.avatar_url : ""} alt="user-avatar" className="col-span-2 border-4 border-slate-300 m-5 mx-auto" />
          <div className="col-span-2"></div>
          <h2 className="p-5 text-center col-span-6">You have posted {myArticleNumber} Articles and {myCommentNumber} comments</h2>

          <div className="col-span-2"></div>
          <button className="col-span-2 box-border border-slate-500 border-2 p-5 m-5 uppercase hover:font-bold hover:text-white hover:bg-slate-500 hover:shadow-md" onClick={(e) => { handleLogout(e) }}>LOGOUT</button>
          <div className="col-span-2"></div>
        </main>


        <article>
          <h2 className="p-5 pt-10 text-center uppercase font-bold text-md md:text-lg lg:text-xl">Here are some of your posted articles</h2>
          {articles.filter(singleArticle => singleArticle.author === loggedInUser.username).map(myArticles => (
            <section key={myArticles.article_id}>
              <UserArticles myArticles={myArticles} />
            </section>
          ))
          }
        </article>


        <article>
          <h3 className="p-5 pt-10 text-center uppercase font-bold text-md md:text-lg lg:text-xl">Here are some of your posted comments</h3>
          {comments.filter(singleComment => singleComment.author === loggedInUser.username).map(myComments => (
            <section key={myComments.comment_id}>
              <UserComments myComments={myComments} />
            </section>
          ))
          }
        </article>
      </>)
  )
}

export default User;