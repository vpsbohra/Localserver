import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser(){
    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    const htmlTag = document.documentElement;
    if (htmlTag.classList.contains('menu_active')) {
      htmlTag.classList.remove('menu_active');
    }

    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    const getUserId = () => {
        return user ? user.id : null;
      };

    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    const saveToken = (user,token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/who-are-you');
    }

   
 const logout = () => {        
    sessionStorage.clear();
    localStorage.clear();
    setTimeout(() => {
        navigate('/login');
      }, 100);
};

    
    const updateCode = (user_code) => {
        const token = getToken();
        const headers = {   
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}` 
        };
    
        const data = { code: user_code };
        return axios.post('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-code', data, { headers })
            .then((response) => {
                const userString = sessionStorage.getItem('user');
                const user_detail = JSON.parse(userString);
    
                const updatedUser = { ...user_detail, user_code };
                
                sessionStorage.setItem('user', JSON.stringify(updatedUser));
    
                navigate('/add-profile');
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    const http = axios.create({
        baseURL:"https://phplaravel-1142377-3976235.cloudwaysapps.com/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        http,
        logout,
        getUserId,
        updateCode
    }
}