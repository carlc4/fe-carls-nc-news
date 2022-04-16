import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as api from "../api/api";
import CommentCard from "./commentcard";
import { UserContext } from '../contexts/usercontext';

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

  return (loading ? <p>Loading...</p> : error ? <p>An error has occured, please refresh your page</p> : singleArticle.article_id ? (
    <>
      <article className="m-5 bg-white p-4 rounded-lg shadow-md md:m-16 lg:mx-36">
        <h3 className="font-bold uppercase text-lg sm:text-xl">{singleArticle.title}</h3>
        <h4 className="pl-3  pb-5 text-sm text-slate-500 hover:text-slate-800 sm:text-md cursor-pointer">by {singleArticle.author}</h4>
        <p className="p-2 pb-10 sm:text-xl">{singleArticle.body}</p>
        <h4 className="p-1 font-bold uppercase text-center border-2 border-red-300 sm:text-xl">{singleArticle.topic}</h4>
        <h5>
          <form action="">
            <Link className="p-3 text-slate-500 hover:text-slate-80 hover:text-slate-800" to={`/articles/${singleArticle.article_id}/comments`}>Comment on this</Link>
            <p></p><button onClick={(e) => { handleUpVote(e) }}>+</button><p className="p-3 text-slate-500">{votes} Votes</p><button onClick={(e) => { handleDownVote(e) }}>-</button>
            {enableDelete ? <Link to={`/articles/${article_id}/delete`}>DELETE</Link> : null}
          </form>
        </h5>
      </article>

      <section>
        {comments.map((comment) => {
          return <section key={comment.comment_id}>
            <CommentCard comment={comment} article_id={article_id} />
          </section>
        })}
      </section>
      <footer>
        <p>Showing {page} of {totalPages} pages</p>
        {enablePrevious ? <button onClick={(e) => { handlePrevious(e) }}>Previous Page</button> : null}
        {enableNext ? <button onClick={(e) => { handleNext(e) }}>Next Page</button> : null}
      </footer>
    </>
  ) : <main>
    <h1>Article does not exist</h1>
    <Link to="/">Back Home</Link>
  </main>
  );
}

export default ArticlePage