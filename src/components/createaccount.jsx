import { useState, useContext, useEffect } from "react";
import * as api from "../api/api";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/usercontext";

function CreateAccount() {
    const [username, setUsername] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [name, setName] = useState("");
    const [newUser, setNewUser] = useState();
    const [existingUsers, setExistingUsers] = useState();
    const [loading, setLoading] = useState(true);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)
    const [status, setStatus] = useState('')

    useEffect(() => {
        setLoading(true)
        api.getUsers().then(({ data: { users } }) => {
            setExistingUsers(users);
            setLoading(false);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (existingUsers.includes(username)) {
            alert("Username already exists, try again!")
        }
        setLoading(true)
        api.postNewUser(username, name, avatarUrl)
            .then(({ data: { user } }) => {
                setNewUser(user)
                setLoading(false)
                setStatus("Posted")
                setLoggedInUser(user)
            })
            .catch((err) => {
                alert("Username already exists, try again!")
            });
    }

    return (

        loading ? <p>Loading...</p> : status === "Posted" ? (
            <main>
                <p>New user profile created!</p>
                <Link to={`/user`}>View my Profile</Link>
            </main>
        ) : (
            <main>
                <h2>Tell us about yourself..</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <h3>Username</h3>
                        <input
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <h3>Name</h3>
                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <h3>Avatar URL</h3>
                        <input
                            value={avatarUrl}
                            onChange={(event) => setAvatarUrl(event.target.value)}
                        />
                    </label>
                    <br></br>
                    <button type="submit">Post</button>
                </form>
            </main>
        )
    )
}


export default CreateAccount