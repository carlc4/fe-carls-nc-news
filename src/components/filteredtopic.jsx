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
  let [page, setPage] = useState(1);
  const [enablePrevious, setEnablePrevious] = useState(false);

  let limit = 10

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
  }, [topic, sortedArticles, orderBy, page]);

  useEffect(() => {
    if (page > 1) {
      setEnablePrevious(true)
    }
    if (page === 1) {
      setEnablePrevious(false)
    }
  }, [page]);

  function handlePrevious(e) {
    e.preventDefault();
    setPage((currPage) => currPage - 1)
  }

  function handleNext(e) {
    e.preventDefault();
    setPage((currPage) => currPage + 1)
    setEnablePrevious(true)
  }

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
      <footer>
        {enablePrevious ? <button onClick={(e) => { handlePrevious(e) }}>Previous Page</button> : null}
        <button onClick={(e) => { handleNext(e) }}>Next Page</button>
      </footer>
    </>
  ) : <main>
    <h1>Topic does not exist</h1>
    <Link to="/">Back Home</Link>
  </main>
  );
}

export default FilteredTopic;