import React, { useEffect, useState } from 'react';
import ParentalSwitch from '../../images/Home.png';
import BookCover from '../../images/BookCover.png';
import BookCoverImg from '../../images/bookcover01.png';
import Next_Button_bookImg from '../../images/Next_Button_book.png';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';

const ChosenStory = () => {

  return (
    <>
    <div className='chosen-story-section'>
     <div className='start_book_topLeft'>
     <Link className="nav-link" to="/kids-view"  ><img src={ParentalSwitch} alt=''/></Link>
      </div> 
      <div className='main-container-story' >
        <div className='story-display-section'>
          <img className='book_cover_imgsr' src={BookCoverImg} alt=''/>
          <div className='startbook_content'>
              <h2>Stany and the Secret Stomachache</h2>
          </div>
          <div className='startbook_content_btn'>
          <button className='Update_pass_btn'><img className='' src={Next_Button_bookImg} alt=''/></button>
          </div>
        </div>
      </div>
      </div>
    
    </>
  ); 
};             

export default ChosenStory;
