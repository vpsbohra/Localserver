import React, { useEffect, useState } from 'react';
import AuthUser from '../AuthUser';
import axios from 'axios';

export default function ReactivePopup( {handleClose}  ){
    const [isVisible, setIsVisible] = useState(true);
    const { token } = AuthUser();
    const [userId, setUserId] = useState('');
    const [errors, setErrors] = useState({});
    const [userData1, setUserData] = useState({});

  useEffect(() => {
    const userInformation = sessionStorage.getItem('user');
    const user = JSON.parse(userInformation);
    const { id } = user;

    setUserId(id);

  }, []);
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/get-user-data/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

    //   const { name, ...userData } = response.data;
    //   const [fname, lname] = name.split(' ');

    //   setUserData({ fname, lname, ...userData });

    console.log(response.data);
    const user_detail = JSON.stringify(response.data);
    if(user_detail){
        sessionStorage.setItem("user", user_detail);
    }
    
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

    const handleReactivate = () => {
        const headers = {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
          };
          const accountData = {
            account_status: 'active',
          };
      
          axios.patch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-user-account/${userId}`, accountData, { headers })
            .then(response => {
              console.log('User updated successfully:', response.data);
            })
            .catch(error => {
              if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
              } else {
                console.error('Error adding member:', error);
              }
            });
            fetchUserData();
             handleClose();
    };

    return (
        <div className="reactivate_account">
            <div className="reactivate_account_inner">
                <h3>Reactivate Account</h3>
                <div className="text_content">
                    <p>
                        We're happy to have you stay longer with us. To complete the reactivation, please confirm below.
                    </p>
                </div>
                <button onClick={handleReactivate}>Reactivate My Account</button>
            </div>
        </div>
    );
};
