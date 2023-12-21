import React, { useEffect, useState } from 'react';
import ParentalSwitch from '../../images/Home.png';
import BookCover from '../../images/Story/Page_covers.png';
import Previous_ButtonImg from '../../images/Previous_Button.png';
import Next_Button_leftbookImg from '../../images/Next_Button_leftbook.png';
import Vector from '../../images/Vector (2).png';
import quize_fun_arrow from '../../images/quize_fun_arrow.png';
import Star_Icon from '../../images/Star_Icon.png';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
// import './DoneWithBook.css'; // Import your custom CSS file for styling

const DoneWithBook = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 200);

    return () => {
      clearTimeout(popupTimer);
    };
  }, []);

  return (
    <>
    

      <div className='chosen-story-section'>
      <Link className="nav-link top_navbtnsr" to="/Kids-view"  ><img src={ParentalSwitch} alt=''/></Link>

        <div className='main-container-story' >
        {showPopup && (
        <div className='popup'>
          <div className='popup-content'>
          <img src={Star_Icon} />
            <h3>Congratulations!</h3>
            <p>You Completed This Story</p>
            <button className='close-button'>
            <Link className="nav-link" to="/gettingstartedquiz"  > Let’s Start the Quiz Fun! <img src={quize_fun_arrow} /></Link>
            </button>
          </div>
        </div>
      )}
          <div className='story-display-section_new'>
            <img src={BookCover} alt=''/>
          </div>
          <Link className="nav-link next_previous_btnbook" to="/openbook"  ><img src={Next_Button_leftbookImg} alt="protected" /></Link>
        </div>
        
      </div>
    </>
  );
};

export default DoneWithBook;