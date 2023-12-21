
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Vector from '../../images/money.png';
import Star_Icon from '../../images/Star_Icon.png';
import AuthUser from '../AuthUser';
import axios from 'axios';
import SharePopup from './share_popup';
import ParentalSwitch from '../../images/Home.png';
import Share from '../../images/Share 3.png';
import sun_effect_IMG from '../../images/sun_effect.png';

const AllActivity = () => {
  const { user, token } = AuthUser();
  const location = useLocation();
  //for share popup
  const [showSharePopup, setShowSharePopup] = useState(false);
  const score = location.state ? location.state.score : null;
  const[s,setS]=useState(0);
  const addBodyClass = () => {
    document.body.classList.add('popup_active');
  };
  
  const removeBodyClass = () => {
    document.body.classList.remove('popup_active');
  };

  console.log(token);
  const [userdata, setUsersdata] = useState([]);
  console.log(userdata);
  const userScorePoints = parseInt(user.user_score_points);
  const scoreToAdd = parseInt(score);
  // var totalscore;

  const handleShare = () => {
    setShowSharePopup(true);
    addBodyClass();
  }
  
const handleCloseSharePopup = () => {
    
  setShowSharePopup(false); 
    removeBodyClass();
  };


const[totalscore,setTotalscore]=useState();

  useEffect(() => {
    console.log(userScorePoints);
    console.log(scoreToAdd);
    setTotalscore(userScorePoints);
    setS(localStorage.getItem("score"));
  //  var totalscore = userScorePoints ;

    const patchRequest = async () => {
      try {
     const response = await fetch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/users/${user.id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          method: "PUT",
          body: JSON.stringify({
            user_score_points: totalscore
          })
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }; 

    patchRequest();

   
    
  }, []);
 
  return (
    <>
      <div className='chosen-story-section all_activity_sr'>
        <div className='all_activity_sr_inner'>
          <div className='all_activity_navSR'>
            <div className='left_activity_btns' >
              <Link className="nav-link" to="/Kids-view"><img src={ParentalSwitch} alt='' /></Link>
            </div>
            <div className='right_activity_btns' >
              <a class="nav-link toggle-profile" href=""> <span><img src={Vector} /></span>3,500</a>
              <span><img src={sun_effect_IMG} alt='' /></span>
            </div>
          </div>
          <div className='feedback-container-story' >
            <div className='popup'>
              <div className='popup-content'>
                <img src={Star_Icon} />
                <h3>Woohoo!</h3>
                <p>You’ve Successfully Completed All Activities</p>
                <button className='close-button'>
                  <Link className="nav-link" to=""><img src={Vector} /> {s} POINTS EARNED</Link>
                </button>
              </div> 
            </div>
            <button className='close-button Share_btn_sr' onClick={handleShare}>
              <Link className="nav-link">Share<img src={Share} /> </Link>
            </button>
            {showSharePopup && (
              <SharePopup onClose={handleCloseSharePopup} />
              )}

          </div>
        </div>
      </div>
    </>
  );
};

export default AllActivity;



