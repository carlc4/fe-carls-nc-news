import React, { useContext } from 'react';
import { UserContext } from '../contexts/usercontext';

function Auth() {
  const { user, logout } = useContext(UserContext);

  return (
    <>
      <h1>Hello, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Auth;
