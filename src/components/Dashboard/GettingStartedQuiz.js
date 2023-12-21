import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';

import ParentalSwitch from '../../images/Home.png';
import Smiling from '../../images/emoji/02 Smiling.png';
import Squinting from '../../images/emoji/07 Grinning Squinting Face.png';
import Flushed from '../../images/emoji/18 Flushed Face.png';
import Crying from '../../images/emoji/31 Crying Face.png';
import Rounded from '../../images/emoji/Rounded_Emoji_Icons_Set (1).png';
import Rounded1 from '../../images/emoji/Rounded_Emoji_Icons_Set.png';



const GettingStartedQuiz = () => {

  return (
    <>
    <div className='chosen-story-section'>
    <Link className="nav-link" to="/Kids-view"  ><img src={ParentalSwitch} alt=''/></Link>
      <div className='feedback-container-story' >
        <h2>How did the story make you feel?</h2>
        <p>Select an emotion!</p>
        <div className='emoji-section'>
            <div className = 'single-emoji-section'>
            <Link className="nav-link" to="/quiz"  >
            <img src={Smiling} />
            <p>Happy</p>
            </Link>
            </div>
            <div className = 'single-emoji-section'>
            <Link className="nav-link" to="/quiz"  >
            <img src={Squinting} />
            <p>Excited</p>
            </Link>
            </div>
            <div className = 'single-emoji-section'>
            <Link className="nav-link" to="/quiz"  >
            <img src={Rounded1} />
            </Link>
            <p>Sad</p>
            </div>
            <div className = 'single-emoji-section'>
            <Link className="nav-link" to="/quiz"  >
            <img src={Rounded} />
            <p>Angry</p>
            </Link>
            </div>
             <div className = 'single-emoji-section'>
             <Link className="nav-link" to="/quiz"  >
            <img src={Crying} />
            <p>Scared</p>
            </Link>
            </div>
            
            <div className = 'single-emoji-section'>
            <Link className="nav-link" to="/quiz"  >
            <img src={Flushed} />
            <p>Surprised</p>
            </Link>
            </div>
            

        </div>
        
      </div>
      </div>
    
    </>
  );
};             

export default GettingStartedQuiz;
