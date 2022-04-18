import { Link } from "react-router-dom";
import convertTime from "../components/utils/convertTime"

function ArticleCard({ article }) {

  const dateAndTime = convertTime(article.created_at)

  return (
    <>
      <article className="grid grid-cols-6 m-5 bg-white p-4 rounded-lg shadow-md md:m-16 lg:mx-36">
        <h3 className="col-span-5 pb-2 font-bold uppercase text-lg sm:text-xl">{article.title}</h3>
        <h4 className="col-span-1 box-border rounded-md font-bold uppercase text-center border-2 border-red-300 sm:text-xl">{article.topic}</h4>

        <h4 className="col-span-2 pb-2 text-sm text-slate-500 hover:text-slate-800 sm:text-md">by {article.author}</h4>
        <h4 className="col-span-3 pb-2 text-sm text-slate-500 sm:text-md">Posted on {dateAndTime}</h4>
        <div className="col-span-1"></div>

        <br></br>
        <Link className="col-span-6 box-border rounded-md p-1 font-bold text-center border-2 border-slate-500 sm:text-xl hover:text-white hover:bg-slate-500 hover:shadow-md" to={`/articles/${article.article_id}`}>View Article</Link>

        <div className="col-span-2"></div>
        <p className="mx-auto col-span-1 p-3 text-slate-500 hover:text-slate-800 text-xs sm:text-md md:text-lg lg:text-lg">{article.comment_count} Comments</p>
        <p className="mx-auto col-span-1 p-3 text-slate-500 hover:text-slate-800 text-xs sm:text-md md:text-lg lg:text-lg">{article.votes} Votes</p>
        <div className="col-span-2"></div>
      </article>
    </>
  );
}

export default ArticleCard;