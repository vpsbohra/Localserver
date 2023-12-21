import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';

import ParentalSwitch from '../../images/Home.png';
import Replay from '../../images/Replay Audio.png';
import Record from '../../images/Record button.png'
import sun_effect_IMG from '../../images/sun_effect.png';
import Vector from '../../images/money.png';
const RecordedAnswer = () => {
  return (
    <>
    <div className='chosen-story-section all_activity_sr'>
      <div className='all_activity_sr_inner'>
        <div className='all_activity_navSR'>
            <div className='left_activity_btns' >
              <Link className="nav-link" to="/Kids-view"  ><img src={ParentalSwitch} alt=''/></Link>
            </div>
          <div className='right_activity_btns' >
              <span><img src={sun_effect_IMG} alt=''/></span>
            </div>
        </div>
    {/* <img src={Replay} alt=''/> */}
      <div className='feedback-container-story' >
      <h2>Lorem ipsum dolor sit amet consectetur amet?</h2>
        <p>You can check one or multiple answers</p>
        <div className='record-section'>
      <img src={Record} alt=''/>
      </div>
      </div>
      </div>
      </div>

      
    </>
  );
};

export default RecordedAnswer;