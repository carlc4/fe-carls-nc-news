import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/usercontext';
import * as api from "../api/api";

const User = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)


  if (loggedInUser.username === "Login") {
    return (
      <main>
        <form onSubmit={e => {
          e.preventDefault()
          api.findUser(username)
            .then(userInfo => {
              if (userInfo.data.user.username) {
                setLoggingIn(true)
                setLoggedInUser(userInfo.data.user)
                setUsername("Logging in..")
              } else {
                setLoggingIn(true)
                setUsername("Invalid Username")
              }
            })
            .catch(setUsername("Username not recognised"))
        }}>
          <label>Username:</label>
          <input type="text" placeholder="Enter username here..."
            value={username} onChange={
              (e) => {
                setUsername(e.target.value)
              }
            }></input>
          <button type="submit">Submit</button>
        </form>
      </main>
    )
  } else {
    return (
      <main>
        <h3>Welcome, {loggedInUser.username}</h3>


        {/* <button type="submit"></button>
        <Link to={loggingIn ? loggedInUser ? "/profile" : "/success" : "/createnewuser"}>

          {loggingIn ? "Proceed" : "Register"}
        </Link> */}
      </main>
    )
  }

}

export default User;