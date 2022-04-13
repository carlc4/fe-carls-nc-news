import { useParams, Link } from "react-router-dom";
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
    api.getArticles(topic, sortedArticles, orderBy).then(({ data: { articles } }) => {
      setAllArticles(articles);
      setLoading(false);
    })
      .catch((err) => {
        setLoading(false)
        setAllArticles([])
      });
  }, [topic, sortedArticles, orderBy]);

  return (loading ? <p>Loading...</p> : allArticles.length > 0 ? (
    <>
      <DropDownMenu sortedArticles={sortedArticles} setSortedArticles={setSortedArticles} setOrderBy={setOrderBy}
        orderBy={orderBy} />
      <div className="">
        {allArticles.map((article) => {
          return <section key={article.article_id}>
            <ArticleCard article={article} />
          </section>
        })}
      </div>
    </>
  ) : <main>
    <h1>Topic does not exist</h1>
    <Link to="/">Back Home</Link>
  </main>
  );
}

export default FilteredTopic;