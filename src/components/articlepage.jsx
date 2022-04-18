import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as api from "../api/api";
import CommentCard from "./commentcard";
import { UserContext } from '../contexts/usercontext';
import convertTime from "../components/utils/convertTime"

function ArticlePage() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState(0);
  const [voteDown, setVoteDown] = useState(false);
  const [voteUp, setVoteUp] = useState(false);
  const [enableDelete, setEnableDelete] = useState(false);
  const { loggedInUser } = useContext(UserContext)
  let [page, setPage] = useState(1);
  let [totalPages, setTotalPages] = useState(0);
  const [enablePagination, setEnablePagination] = useState(false);
  const [enablePrevious, setEnablePrevious] = useState(false);
  const [enableNext, setEnableNext] = useState(true);

  let limit = 10

  useEffect(() => {
    setLoading(true)
    api.getArticleById(article_id).then(({ data: { article } }) => {
      setVotes(article.votes)
      setSingleArticle(article);
      setLoading(false);
    })
  }, []);

  useEffect(() => {
    setLoading(true)
    api.getCommentsByArticleId(article_id, limit, page).then(({ data: { comments } }) => {
      setComments(comments)
      setLoading(false)
    })
  }, [page]);

  useEffect(() => {
    setLoading(true)
    api.getCommentsByArticleId(article_id, 1000).then(({ data: { comments } }) => {
      setTotalPages(Math.ceil(comments.length / 10))
      if (comments.length > 10) {
        setEnablePagination(true)
      }
      setLoading(false)
    })
  }, []);

  useEffect(() => {
    if (singleArticle.author === loggedInUser.username) {
      setEnableDelete(true)
    }
  }, [singleArticle]);

  useEffect(() => {
    if (page > 1) {
      setEnablePrevious(true)
    }
    if (page === 1) {
      setEnablePrevious(false)
    }
    if (page === totalPages) {
      setEnableNext(false)
    }
  }, [page]);

  function handlePrevious(e) {
    e.preventDefault();
    setPage((currPage) => currPage - 1)
    setEnableNext(true)
  }

  function handleNext(e) {
    e.preventDefault();
    setPage((currPage) => currPage + 1)
    setEnablePrevious(true)
  }

  const handleClick = (change) => {
    setVotes((currVotes) => currVotes + change);
    api.updateArticleVotes(article_id, change)
      .catch(() => {
        setVotes((currVotes) => currVotes - change);
        setError(true)
      });
  };

  const dateAndTime = convertTime(singleArticle.created_at)

  function handleUpVote(e) {
    e.preventDefault();
    if (singleArticle.author === loggedInUser.username) {
      return "Cannot vote on own articles!"
    }
    if (voteUp === false && voteDown === false) {
      setVoteUp(true)
      setVoteDown(false)
      handleClick(1)
    } else if (voteUp === true && voteDown === false) {
      return <p>Already voted up!</p>
    } else if (voteUp === false && voteDown === true) {
      setVoteUp(true)
      setVoteDown(false)
      handleClick(2)
    }
  }

  function handleDownVote(e) {
    e.preventDefault();
    if (singleArticle.author === loggedInUser.username) {
      return "Cannot vote on own articles!"
    }
    if (voteUp === false && voteDown === false) {
      setVoteDown(true)
      setVoteUp(false)
      handleClick(-1)
    } else if (voteUp === false && voteDown === true) {
      return <p>Already voted down!</p>
    } else if (voteUp === true && voteDown === false) {
      setVoteDown(true)
      setVoteUp(false)
      handleClick(-2)
    }
  }

  return (loading ? <div className="flex h-screen justify-center items-center">
    <div className="text-center">
      <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
    </div>
  </div> : error ? <p className="text-center my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">An error has occured, please refresh your page</p> : singleArticle.article_id ? (
    <>
      <article className="grid grid-cols-6 m-5 bg-white p-4 rounded-lg shadow-md md:m-16 lg:mx-36">
        <h3 className="col-span-5 pb-2 font-bold uppercase text-lg sm:text-xl">{singleArticle.title}</h3>
        <h4 className="col-span-1 box-border rounded-md font-bold uppercase text-center border-2 border-red-300 sm:text-xl">{singleArticle.topic}</h4>

        <h4 className="col-span-2 pb-2 text-sm text-slate-500 hover:text-slate-800 sm:text-md">by {singleArticle.author}</h4>
        <h4 className="col-span-3 pb-2 text-sm text-slate-500 sm:text-md">Posted on {dateAndTime}</h4>
        <div className="col-span-1"></div>

        <p className="col-span-6 p-2 pb-10 sm:text-xl">{singleArticle.body}</p>

        <Link className="col-span-6 box-border rounded-md p-1 font-bold text-center border-2 border-slate-500 sm:text-xl hover:text-white hover:bg-slate-500 hover:shadow-md" to={`/articles/${singleArticle.article_id}/comments`}>Comment on this</Link>

        <div className="col-span-2"></div>
        <button className="col-span-1" onClick={(e) => { handleUpVote(e) }}>{<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>}</button>
        <p className="col-span-1 p-3 text-slate-500">{votes} Votes</p>
        <button className="col-span-1" onClick={(e) => { handleDownVote(e) }}>{<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" /></svg>}</button>
        <div className="col-span-2"></div>

        {enableDelete ? <Link className="mx-auto col-span-6" to={`/articles/${article_id}/delete`}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg></Link> : null}

      </article>

      <section>
        {comments.map((comment) => {
          return <section key={comment.comment_id}>
            <CommentCard comment={comment} article_id={article_id} />
          </section>
        })}
      </section>
      {
        enablePagination ? <footer className="text-center">
          <p>Showing {page} of {totalPages} pages</p>
          {enablePrevious ? <button className="p-5 uppercase hover:font-bold" onClick={(e) => { handlePrevious(e) }}>Previous Page</button> : null}
          {enableNext ? <button className="p-5 uppercase hover:font-bold" onClick={(e) => { handleNext(e) }}>Next Page</button> : null}
        </footer> : null
      }
    </>
  ) : <main className="text-center my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8 lg:text-xl">
    < h1 className="p-5" > Article does not exist</h1 >
    <Link to="/" className="p-5 uppercase hover:font-bold">Back Home</Link>
  </main >
  );
}

export default ArticlePage