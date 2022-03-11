import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as api from "../api/api";
import ArticleCard from "./articleCard"
import DropDownMenu from "./dropdownmenu";

function FilteredTopic() {
  const [sortedArticles, setSortedArticles] = useState("created_at");
  const [orderBy, setOrderBy] = useState("desc");
  const { topic } = useParams();
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    api.getArticles(topic, sortedArticles, orderBy).then(({data: {articles}}) => {
      setAllArticles(articles);
      setLoading(false);
    });
  }, [topic, sortedArticles, orderBy]);

  if (loading) return <p>Loading...</p>;
  else {
  return (
    <>
    <DropDownMenu sortedArticles={sortedArticles} setSortedArticles={setSortedArticles} setOrderBy={setOrderBy}
                  orderBy={orderBy}/>
    <div className="">
      {allArticles.map((article)=> {
        return <section key={article.article_id}>
        <ArticleCard article={article}/>
        </section>
      })}
    </div>
    </>
  );
}
}

export default FilteredTopic;