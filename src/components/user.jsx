import { useContext, useState } from 'react';
import { UserContext } from '../contexts/usercontext';
import Auth from './auth';
import Logout from './logout';

const User = () => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState();

return user.auth ? <Auth name={name} setName={setName}/> : <Logout name={name} setName={setName}/>;
}

export default User;

// import { useContext, useState, useEffect } from 'react';
// import { UserContext } from '../contexts/usercontext';
// import * as api from "../api/api";

// const User = () => {
//   const { user, setUser } = useContext(UserContext);
//   const [loading, setLoading] = useState(true)

//   const changeUser = () => {
//     setUser((currUser) => {
//       return currUser 
//     });
//   };

//   useEffect(() => {
//     setLoading(true)
//     api.getUsers().then(({data: {users}}) => {
//       console.log(users)
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <button>
//       Change theme
//     </button>
//   );
// };

// export default User;
