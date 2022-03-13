import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as api from "../api/api";
import CommentCard from "./commentcard";

function ArticlePage() {
    const { article_id } = useParams();
    const [singleArticle, setSingleArticle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
  
    useEffect(() => {
      setLoading(true)
      api.getArticleById(article_id).then(({data: {article}}) => {
        setSingleArticle(article);
        setLoading(false);
      })
    }, []);

    useEffect(() => {
      setLoading(true)
      api.getCommentsByArticleId(article_id).then(({data: {comments}}) => {
        setComments(comments)
        setLoading(false)
      })
    }, []);
  
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
          <button type="submit" className="p-3 text-slate-500 hover:text-slate-800">Comment</button>
          <button type="submit" className="p-3 text-slate-500 hover:text-slate-800">Vote</button>
        </form>
      </h5>
    </article>

    <section>
      {comments.map((comment)=> {
        return <section key={comment.comment_id}>
        <CommentCard comment={comment}/>
        </section>
      })}



    </section>
    </>
    );
  }
} 

export default ArticlePage