import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';

import ParentalSwitch from '../../images/Home.png';
import Replay from '../../images/Replay Audio.png';

const Quiz = () => {
  return (
    <>
     <div className='chosen-story-section'>
    <Link className="nav-link top_navbtnsr" to="/Kids-view"  ><img src={ParentalSwitch} alt=''/></Link>
    <Link className="nav-link top_navbtnsr top_navbtnsr_right" to="/Kids-view"  ><img src={Replay} alt=''/></Link>
      <div className='feedback-container-story' >
        <h2>Lorem ipsum dolor sit amet consectetur amet amet nunc lorem aliquam eu potenti risus?</h2>
        <p>You can check one or multiple answers</p>
        <div className='option-main-section'>
            <div className='option-section option_active'>
              <span className='option'>A</span>
              <p className='option-text'>Lorem ipsum dolor sit amet consectetur. Arcu ultrices non eget sem dictum nulla bibendum.</p>
            </div>
            <div className='option-section'>
                <span className='option'>B</span>
                <p className='option-text'>Lorem ipsum dolor sit amet consectetur. Arcu ultrices non eget sem dictum nulla bibendum.</p>

            </div>
            <div className='option-section'>
            <span className='option'>C</span>
                <p className='option-text'>Lorem ipsum dolor sit amet consectetur. Arcu ultrices non eget sem dictum nulla bibendum.</p>

            </div>
            <button className='check-answer'>Check Answer</button>
        </div>
        
      </div>
      </div>

      
    </>
  );
};

export default Quiz;