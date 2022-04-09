import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import FilteredTopic from "./components/filteredtopic";
import ArticlePage from "./components/articlepage";
import PostComment from "./components/postcomment";
import User from "./components/user";
import { useState } from "react";
import { UserContext } from "./contexts/usercontext";

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
              <Route
                path="/:topic"
                element={
                  <FilteredTopic
                    sortedArticles={sortedArticles}
                    setSortedArticles={setSortedArticles}
                  />
                }
              />
              <Route path="/articles/:article_id" element={<ArticlePage />} />
              <Route
                path="/articles/:article_id/comments"
                element={<PostComment />}
              />
              <Route path="/user" element={<User />} />
            </Routes>
          </section>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
