import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import * as api from "../api/api";
import Home from "./home";
import User from "./user";

function NavBar(loading, setLoading) {
    const [topic, setTopic] = useState("");

    useEffect(() => {
      api.getTopics().then(({data: {topics}}) => {
        // setLoading(false);
        topics.map((topic)=> {
  
        });
      });
    }, []);

  return (
    <div className="">

{/* use optomistic rendering for the menu topics */}
        
          <Link to="/user">User</Link>
          <section>
          <Routes>
            <Route
              path="/user"
              element={<User />}
            />
          </Routes>
        </section>
    </div>
  );
}

export default NavBar;
