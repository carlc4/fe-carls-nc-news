import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as api from "../api/api";
import { UserContext } from '../contexts/usercontext';
import convertTime from "../components/utils/convertTime"

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

  const dateAndTime = convertTime(comment.created_at)

  return error ? <p className="text-center my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">An error has occured, please refresh your page</p> : (

    <article className="grid grid-cols-5 my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">
      <h5 className="col-span-5"> {comment.body} </h5>

      <h4 className="col-span-3 pb-2 text-sm text-slate-500 hover:text-slate-800 sm:text-md cursor-pointer">by {comment.author}</h4>
      <div className="col-span-2"></div>

      <h4 className="col-span-3 pb-2 text-sm text-slate-500 sm:text-md">Posted on {dateAndTime}</h4>
      <div className="col-span-2"></div>

      <div className="col-span-1"></div>
      <button className="col-span-1" onClick={(e) => { handleUpVote(e) }}>{<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>}</button>
      <p className="col-span-1 p-3 text-slate-500">{commentVotes} Votes</p>
      <button className="col-span-1" onClick={(e) => { handleDownVote(e) }}>{<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" /></svg>}</button>
      <div className="col-span-1"></div>

      {enableDelete ? <Link to={`/comments/${comment.comment_id}`} className="mx-auto col-span-6 p-1 font-bold uppercase text-center sm:text-xl"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg></Link> : null}

    </article>
  )
}

export default CommentCard;