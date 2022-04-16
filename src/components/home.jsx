import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as api from "../api/api";
import ArticleCard from "./articleCard"
import DropDownMenu from "./dropdownmenu";

function Home() {
    const [sortedArticles, setSortedArticles] = useState("created_at");
    const [homeArticles, setHomeArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderBy, setOrderBy] = useState("desc");
    let [page, setPage] = useState(1);
    let [totalPages, setTotalPages] = useState(0);
    const [enablePrevious, setEnablePrevious] = useState(false);
    const [enableNext, setEnableNext] = useState(true);

    let limit = 10

    useEffect(() => {
        setLoading(true)
        api.getAllArticles(limit, page).then(({ data: { articles } }) => {
            setHomeArticles(articles);
            setLoading(false);
        })
            .catch((err) => {
                setLoading(false)
                setHomeArticles([])
            });
    }, [orderBy, sortedArticles, page]);

    useEffect(() => {
        setLoading(true)
        api.getAllArticles(1000).then(({ data: { articles } }) => {
            setTotalPages(Math.ceil(articles.length / 10))
            setLoading(false)
        })
    }, []);

    useEffect(() => {
        if (page > 1) {
            setEnablePrevious(true)
        }
        if (page === 1) {
            setEnablePrevious(false)
        }
        if (page === totalPages) {
            setEnableNext(false)
        }
    }, [page]);

    function handlePrevious(e) {
        e.preventDefault();
        setPage((currPage) => currPage - 1)
        setEnableNext(true)
    }

    function handleNext(e) {
        e.preventDefault();
        setPage((currPage) => currPage + 1)
        setEnablePrevious(true)
    }

    return (
        loading ? <p>Loading...</p> : homeArticles.length > 0 ? (
            <>
                <DropDownMenu sortedArticles={sortedArticles} setSortedArticles={setSortedArticles} setOrderBy={setOrderBy}
                    orderBy={orderBy} />
                <div className="">
                    {homeArticles.map((article) => {
                        return <section key={article.article_id}>
                            <ArticleCard article={article} />
                        </section>
                    })}
                </div>
                <footer>
                    <p>Showing {page} of {totalPages} pages</p>
                    {enablePrevious ? <button onClick={(e) => { handlePrevious(e) }}>Previous Page</button> : null}
                    {enableNext ? <button onClick={(e) => { handleNext(e) }}>Next Page</button> : null}
                </footer>
            </>
        ) : <main>
            <h1>Topic does not exist</h1>
            <Link to="/">Back Home</Link>
        </main>)
}

export default Home;