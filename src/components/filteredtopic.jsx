import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as api from "../api/api";
import ArticleCard from "./articleCard"

function FilteredTopic() {
  const { topic } = useParams();
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    api.getArticles(topic).then(({data: {articles}}) => {
      setAllArticles(articles);
      setLoading(false);
    });
  }, [topic]);

  if (loading) return <p>Loading...</p>;
  else {
  return (
    <div className="">
      {allArticles.map((article)=> {
        return <section key={article.article_id}>
        <ArticleCard article={article}/>
        </section>
      })}
    </div>
  );
}
}

export default FilteredTopic;