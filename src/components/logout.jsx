import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/usercontext';

function Logout({name, setName}) {
  const { login } = useContext(UserContext);

  return (
    <>
      <label>Userame:</label>
      <input
        type="text"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <button onClick={() => login(name)}>Log in</button>
    </>
  );
}

export default Logout;
