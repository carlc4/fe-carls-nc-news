import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as api from "../api/api";
import CommentCard from "./commentcard";

function ArticlePage() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState(0);
  const [voteDown, setVoteDown] = useState(false);
  const [voteUp, setVoteUp] = useState(false);

  const handleClick = (change) => {
    console.log("Click!")
    setVotes((currVotes) => currVotes + change);
    api.updateArticleVotes(article_id, change)
      .catch(() => {
        console.log("Error")
        setVotes(0);
        alert("Error updating votes");
      });
  };

  useEffect(() => {
    setLoading(true)
    api.getArticleById(article_id).then(({ data: { article } }) => {
      setVotes(article.votes)
      setSingleArticle(article);
      setLoading(false);
    })
  }, [article_id]);

  useEffect(() => {
    setLoading(true)
    api.getCommentsByArticleId(article_id).then(({ data: { comments } }) => {
      setComments(comments)
      setLoading(false)
    })
  }, []);


  function handleUpVote(e) {
    e.preventDefault();
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

  if (loading) return <p>Loading...</p>;
  else {
    return (
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
            </form>
          </h5>
        </article>

        <section>
          {comments.map((comment) => {
            return <section key={comment.comment_id}>
              <CommentCard comment={comment} />
            </section>
          })}



        </section>
      </>
    );
  }
}

export default ArticlePage