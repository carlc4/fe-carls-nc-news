import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as api from "../api/api";
import { UserContext } from '../contexts/usercontext';

function CommentCard({ comment, article_id }) {

  const [commentVotes, setCommentVotes] = useState(0);
  const [voteDown, setVoteDown] = useState(false);
  const [voteUp, setVoteUp] = useState(false);
  const { loggedInUser } = useContext(UserContext)
  const [error, setError] = useState(false);
  const [enableDelete, setEnableDelete] = useState(false);

  useEffect(() => {
    setCommentVotes(comment.votes)
  }, []);

  useEffect(() => {
    if (comment.author === loggedInUser.username) {
      setEnableDelete(true)
    }
  }, []);

  const handleClick = (change) => {
    setCommentVotes((currVotes) => currVotes + change);
    api.updateCommentVotes(article_id, change)
      .catch(() => {
        setCommentVotes((currVotes) => currVotes - change);
        setError(true)
      });
  };

  function handleUpVote(e) {
    e.preventDefault();
    if (comment.author === loggedInUser.username) {
      alert("Cannot vote on own comments!")
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
    if (comment.author === loggedInUser.username) {
      alert("Cannot vote on own comments!")
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

  return error ? <p>An error has occured, please refresh your page</p> : (

    <article className="my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">
      <h5> {comment.body} </h5>
      <h4 className="pb-2 text-sm text-slate-500 hover:text-slate-800 sm:text-md cursor-pointer">by {comment.author}</h4>
      <h4 className="pb-2 text-sm text-slate-500 sm:text-md">Posted on {comment.created_at}</h4>
      <button onClick={(e) => { handleUpVote(e) }}>+</button><p className="p-3 text-slate-500">{commentVotes} Votes</p><button onClick={(e) => { handleDownVote(e) }}>-</button>
      {enableDelete ? <Link to={`/comments/${comment.comment_id}`}>DELETE</Link> : null}
    </article>
  )
}

export default CommentCard;