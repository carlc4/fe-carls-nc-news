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

    useEffect(() => {
        setLoading(true)
        api.getAllArticles().then(({ data: { articles } }) => {
            setHomeArticles(articles);
            setLoading(false);
        })
            .catch((err) => {
                setLoading(false)
                setHomeArticles([])
            });
    }, [orderBy, sortedArticles]);

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
            </>
        ) : <main>
            <h1>Topic does not exist</h1>
            <Link to="/">Back Home</Link>
        </main>)
}

export default Home;