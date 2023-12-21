import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from './components/AuthUser';
import Guest from './navbar/guest';
import Auth from './navbar/auth';
import "./css/custom.css";
import "./css/responsive.css";
import PasswordPage from './components/PasswordPage';
import Coming_soon from './components/Coming_soon';

function App() {
  const { getToken } = AuthUser();
  const [authenticated, setAuthenticated] = useState(false);
  const [door, setDoor] = useState(false);

  const handlePasswordSubmit = (password) => {
    console.log(password);
    // Replace 'KidzConnect@123' with the actual password
    if (password === 'KidzConnect@123') {
      setAuthenticated(true);
    }else{
      alert("Please enter correct password...! ");
    }
  };

  const handleDoorClick = () => {
    setDoor(true);
  };

  if (!getToken()) {
    return (
      <>
        {authenticated ? <Guest /> : (
          <>
            {!door && <Coming_soon onDoorClick={handleDoorClick} />}
            {door && <PasswordPage onPasswordSubmit={handlePasswordSubmit} />}
          </>
        )}
      </>
    );
  }

  return <Auth />;
}

export default App;
