import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import FilteredTopic from "./components/filteredtopic";
import ArticlePage from "./components/articlepage";
import DeleteComment from "./components/deletecomment"
import PostComment from "./components/postcomment";
import User from "./components/user";
import { useState } from "react";
import { UserContext } from "./contexts/usercontext";
import DeleteArticle from "./components/deletearticle";
import PostArticle from "./components/postarticle";
import CreateAccount from "./components/createaccount";

function App() {
  const [sortedArticles, setSortedArticles] = useState("created_at");
  const [loggedInUser, setLoggedInUser] = useState({
    username: "Login",
    email: "",
    avatarUrl:
      "",
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <div className="font-DMsans bg-slate-400">
          <header className="p-10 text-3xl md:text-6xl font-bold text-right bg-slate-200">
            <h1>Carls NC News</h1>
          </header>
          <nav>
            <NavBar />
          </nav>
          <section>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:topic" element={<FilteredTopic
                    sortedArticles={sortedArticles}
                    setSortedArticles={setSortedArticles}
                  />} />
              <Route path="/articles/:article_id" element={<ArticlePage />} />
              <Route path="/articles/:article_id/comments" element={<PostComment />} />
              <Route path="/comments/:comment_id" element={<DeleteComment />} />
              <Route path="/articles/:article_id/delete" element={<DeleteArticle />} />
              <Route path="/articles/new" element={<PostArticle />} />
              <Route path="/users/new" element={<CreateAccount />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </section>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
