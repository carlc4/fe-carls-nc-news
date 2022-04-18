import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../contexts/usercontext';
import * as api from "../api/api";

function NavBar() {
  const [topic, setTopic] = useState([]);
  const [defaultUser, setDefaultUser] = useState(true);
  const { loggedInUser } = useContext(UserContext)
  const [error, setError] = useState(false);

  useEffect(() => {
    const topics = [{ slug: "coding", description: "Code is love, code is life" }, { slug: "football", description: "FOOTIE!" }, { slug: "cooking", description: "Hey good looking, what you got cooking?" }]
    setTopic(topics);
    api.getTopics().catch((err) => {
      setTopic([]);
      setError(true)
    })
  }, []);

  useEffect(() => {
    if (loggedInUser.username !== "Login") {
      setDefaultUser(false)
    }
    else {
      setDefaultUser(true)
    }
  }, [loggedInUser.username]);

  return (
    error ? <p className="text-center my-4 mx-12 bg-slate-100 p-4 rounded-lg shadow-md md:my-6 md:mx-24 lg:mx-44 lg:my-8">An error has occured, please refresh your page</p> :
      <div className="grid grid-cols-6 text-center p-3 m-5 uppercase  bg-slate-300 md:m-16 lg:mx-36">
        <Link key="home" className="p-4 hover:font-bold hover:shadow-md hover:bg-slate-200 md:text-lg lg:text-xl" to="/">home
        </Link>
        {topic.map((item) => {
          return <section key={item.slug} className="p-4">
            <Link className="p-4 hover:font-bold hover:shadow-md hover:bg-slate-200 md:text-lg lg:text-xl" to={`topics/${item.slug}`}>{item.slug}
            </Link>
          </section>
        })}
        <Link to="/user" className="p-4 hover:font-bold hover:shadow-md hover:bg-slate-200 md:text-lg lg:text-xl">{loggedInUser.username}</Link>
        {defaultUser ? (<Link to="/users/new" className="p-4 hover:font-bold hover:shadow-md hover:bg-slate-200 md:text-lg lg:text-xl">Register</Link>) : (<Link to="/articles/new" className="p-4 hover:font-bold hover:shadow-md hover:bg-slate-200 md:text-lg lg:text-xl">Post Article</Link>)}
      </div>
  )
}

export default NavBar;
