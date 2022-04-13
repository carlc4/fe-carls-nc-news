import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../contexts/usercontext';
import * as api from "../api/api";

function NavBar() {
  const [topic, setTopic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [defaultUser, setDefaultUser] = useState(true);
  const { loggedInUser } = useContext(UserContext)

  useEffect(() => {
    setLoading(true)
    api.getTopics().then(({ data: { topics } }) => {
      setTopic(topics);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loggedInUser.username !== "Login") {
      setDefaultUser(false)
    }
    else {
      setDefaultUser(true)
    }
  }, [loggedInUser.username]);

  if (loading) return <p>Loading...</p>
  else {
    return (
      <div className="grid grid-cols-4 text-center p-3 m-5 uppercase  bg-slate-300 md:m-16 lg:mx-36">
        <Link key="home" className="p-4 hover:font-bold hover:shadow-md hover:bg-slate-200 md:text-lg lg:text-xl" to="/">home
        </Link>
        {topic.map((item) => {
          return <section key={item.slug} className="p-4">
            <Link className="p-4 hover:font-bold hover:bg-slate-200 hover:shadow-md md:text-lg lg:text-xl" to={`topics/${item.slug}`}>{item.slug}
            </Link>
          </section>
        })}
        <Link to="/user">{loggedInUser.username}</Link>
        {defaultUser ? (<Link to="/users/new">Register Account</Link>) : (<Link to="/articles/new">Post Article</Link>)}
      </div>
    )
  }
}

export default NavBar;
