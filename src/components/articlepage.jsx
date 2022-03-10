import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as api from "../api/api";

function ArticlePage() {
    const { article_id } = useParams();
    const [singleArticle, setSingleArticle] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setLoading(true)
      api.getArticleById(article_id).then(({data: {article}}) => {
        setSingleArticle(article);
        setLoading(false);
      });
    }, []);
  
    if (loading) return <p>Loading...</p>;
    else {
    return (
      <div className="">
      <div className="m-5 bg-white p-4 rounded-lg shadow-md md:m-16 lg:mx-36">
      <h3 className="font-bold uppercase text-lg sm:text-xl">{singleArticle.title}</h3>
      <h4 className="pl-3  pb-5 text-sm text-slate-500 hover:text-slate-800 sm:text-md cursor-pointer">by {singleArticle.author}</h4>
      <p className="p-2 pb-10 sm:text-xl">{singleArticle.body}</p>
      <h4 className="p-1 font-bold uppercase text-center border-2 border-red-300 sm:text-xl">{singleArticle.topic}</h4>
      <div className="pt-5 grid grid-cols-4 text-center text-sm md:text-md lg:text-lg">
      <Link className="hover:font-bold" to={`/`}>Return Home</Link>
      <Link className="hover:font-bold" to={`/coding`}>Back to Coding</Link>
      <Link className="hover:font-bold" to={`/football`}>Back to Football</Link>
      <Link className="hover:font-bold" to={`/cooking`}>Back to Cooking</Link>
      </div>
      <h5>
        <form action="">
          <button type="submit" className="p-3 text-slate-500 hover:text-slate-800">Comments</button>
          <button type="submit" className="p-3 text-slate-500 hover:text-slate-800">Comment</button>
          <button type="submit" className="p-3 text-slate-500 hover:text-slate-800">Vote</button>
        </form>
      </h5>
    </div>

      </div>
    );
  }


        {/* {allArticles.map((article)=> {
          return <section key={article.article_id}>
          <ArticleCard article={article}/>
          </section>
        })} */}

    // when this is returned, need to either render the article page OR pass it to the articleCard
} 

export default ArticlePage