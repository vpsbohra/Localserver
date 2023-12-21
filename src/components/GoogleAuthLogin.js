import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthUser from './AuthUser';

import GoogleImage from '../images/google_icon.png';

function GoogleAuthLogin({ onError }) {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  const { http, setToken } = AuthUser();
  const [errors, setErrors] = useState({});
  const [hasError, setHasError] = useState(false);

 const login = useGoogleLogin({
  onSuccess: (codeResponse) => {
    setUser(codeResponse);
    sendAccessToken(codeResponse.access_token, profile); 
  },
  onError: (errors) => console.log('Login Failed:', errors)
});


  const sendAccessToken = (accessToken, userDetails) => {
    axios
      .post('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/login', { access_token: accessToken, user: userDetails, register_type: 'google' }) // Include user details in the request body
      .then((res) => {
        // setToken(res.data.user,res.data.access_token);
        // navigate('/who-are-you');
        // console.log(res.data.access_token);
        // console.log(res.data);
      })
      .catch((err) => {
        setHasError(true);
        setErrors(err.response.data.status);
        // navigate('/subscription');
        console.log(err.response.data.error);
      });
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
          // console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <>
      <button onClick={() => login()} type="button" className="login-with-google-btn">
        <img src={GoogleImage} alt="meet-character-1" />
        Sign in with Google
      </button>
    </>
  );
}

export default GoogleAuthLogin;
