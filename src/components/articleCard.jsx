import { Link } from "react-router-dom";
import convertTime from "../components/utils/convertTime"

function ArticleCard({ article }) {

  const dateAndTime = convertTime(article.created_at)

  return (
    <>
      <article className="m-5 bg-white p-4 rounded-lg shadow-md md:m-16 lg:mx-36">
        <h3 className="pb-2 font-bold uppercase text-lg sm:text-xl">{article.title}</h3>
        <h4 className="pb-2 text-sm text-slate-500 hover:text-slate-800 sm:text-md cursor-pointer">by {article.author}</h4>
        <h4 className="pb-2 text-sm text-slate-500 sm:text-md">Posted on {dateAndTime}</h4>
        <h4 className="box-border rounded-md p-3 font-bold uppercase text-center border-2 border-red-300 sm:text-xl">{article.topic}</h4>
        <br></br>
        <Link className="grid box-border rounded-md p-1 font-bold text-center border-2 border-slate-500 sm:text-xl hover:text-white hover:bg-slate-500 hover:shadow-md" to={`/articles/${article.article_id}`}>View Article</Link>
        <h5>
          <footer className="text-center" action="">
            <p className="p-3 text-slate-500 hover:text-slate-800">{article.comment_count} Comments</p>
            <p className="p-3 text-slate-500 hover:text-slate-800">{article.votes} Votes</p>
          </footer>
        </h5>
      </article>
    </>
  );
}

export default ArticleCard;