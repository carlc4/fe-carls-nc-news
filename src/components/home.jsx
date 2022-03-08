import { useState, useEffect } from "react";
import * as api from "../api/api";
import ArticleCard from "./articleCard"

function Home({loading, setLoading}) {
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    setLoading(true)
    api.getArticles().then((articles) => {
      setAllArticles(articles);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="">
      {allArticles.map((article)=> {
        return <ArticleCard article={article} key={article.article_id}/>
      })}


    </div>
  );
}

export default Home;
