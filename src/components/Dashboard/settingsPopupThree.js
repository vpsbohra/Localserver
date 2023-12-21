import React, { useEffect, useState } from 'react';
import AuthUser from '../AuthUser';
import axios from 'axios';

const PopupThree = ({ removeBodyClass }) => {
  // Define a state variable to control the visibility of the popup
  const [isVisible, setIsVisible] = useState(true);
  const { token } = AuthUser();
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const userInformation = sessionStorage.getItem('user');
    const user = JSON.parse(userInformation);
    const { id } = user;

    setUserId(id);

  }, []);

 
  // Function to handle the "Got It!" button click
  const handleGotItClick = () => {
    console.log(userId);
    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const accountData = {
      account_status: 'inactive',
    };

    axios.patch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-user-account/${userId}`, accountData, { headers })
      .then(response => {
        console.log('User updated successfully:', response.data);
        setIsVisible(false);
        removeBodyClass();
        sessionStorage.clear();
        localStorage.clear();
        localStorage.removeItem('userToken');
        window.location.href = '/login';
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error('Error adding member:', error);
        }
      });
    

  };

  // Render the popup if isVisible is true
  return (
    isVisible && (
      <div className="will_miss_you">
        <div className="will_miss_you_inner">
          <h3>We’ll miss you!</h3>
          <div className="text_content">
            <p>
              A confirmation email has been sent your way. From this point forward, there will be no more billing or emails from us.
            </p>
            <p>
              If you change your mind, you can always cancel your deactivation within the next 14 days by logging into your account and selecting a new plan.
            </p>
          </div>
          <button onClick={handleGotItClick}>Got It!</button>
        </div>
      </div>
    )
  );
};

export default PopupThree;

