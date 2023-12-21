import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthUser from './AuthUser';

import GoogleImage from '../images/google_icon.png';

function GoogleAuth() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  const {http,setToken} = AuthUser();
  const [errors, setErrors] = useState({});
  const [erro, setErro] = useState({});
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

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
          saveProfileToDatabase(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const saveProfileToDatabase = (profileData) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };

    const data = {
        name: `${profileData.name}`,
        email: `${profileData.email}`,
        password: `${profileData.email}`,
        register_type: 'google'
    };
    http
    .post('/register', data, { headers: headers })
    .then((res) => {
        const { access_token, user } = res.data;
        setToken(res.data.user,res.data.access_token);
        navigate('/account-created', { state: { user } });
    })
    .catch((error) => {
        if (error.response.status === 409) {
            // console.log(error.response.data.error);
            const errors = error.response.data.error;
            console.log();
            setErrors(errors);
        }
        if (error.response.status === 422) {
            const errors = error.response.data.errors;
            setErrors(errors);
        } else {
            console.log(error.response.data.message);
        }
    });
  };

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <>
      <button onClick={() => login()} type="button" className="login-with-google-btn">
        <img src={GoogleImage} alt="meet-character-1" />
        Sign up with Google
      </button>
    </>
  );
}

export default GoogleAuth;
