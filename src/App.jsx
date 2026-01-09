import React, { useState } from 'react';
import Login from './components/Login';
import Vault from './components/Vault';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {!loggedIn ? (
        <Login onLogin={() => setLoggedIn(true)} />
      ) : (
        <Vault onLogout={() => setLoggedIn(false)} />
      )}
    </div>
  );
};

export default App;
