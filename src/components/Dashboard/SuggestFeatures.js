
import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AngryImg from '../../images/Angry.png';
import ConfusedImg from '../../images/Confused.png';
import NeutralImg from '../../images/Neutral.png';
import HappyImg from '../../images/Happy.png';
import LoveItImg from '../../images/Love-It.png';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



import Angry_activeImg from '../../images/Angry_active.png';
import Confused_activeImg from '../../images/Confused_active.png';
import Neutral_activeImg from '../../images/Neutral_active.png';
import Happy_activeImg from '../../images/Happy_active.png';
import LoveIt_activeImg from '../../images/Love-It_active.png';
import { useEffect } from 'react';



import emailjs from 'emailjs-com';
const SuggestFeatures = ({ handleLiClick }) => {




    const [activeEmoteIndex, setActiveEmoteIndex] = useState(null);

    const handleEmoteClick = (index) => {
        setActiveEmoteIndex(index);
    };
    const sendEmail = () => {
        const text = document.getElementById('feedback').value;
        const emailAddresses = ['testmail@gmail.com']; //PLEASE ENTER YOUR EMAIL ID HERE
        const emoji = ['😡', '😕', '😐', '😊', '😃'];
        // Get the selected emote name based on the activeEmoteIndex
        const selectedEmote = activeEmoteIndex !== null ? emoji[activeEmoteIndex] : 'Not Selected';

        const templateParams = { message: `User Feedback: ${text}\nUser experience using KidzConnect: ${selectedEmote}` };

        emailAddresses.forEach((emailAddress) => {
            templateParams.user_email = emailAddress;

            emailjs
                .send(
                    'service_oa10xs4',
                    'template_spdasds',
                    templateParams,
                    'I8VSSe2ScoovjjwRQ'
                )
                .then(
                    (result) => {
                        console.log(templateParams);
                        console.log('Email sent:', result.text);
                    },
                    (error) => {
                        console.error('Email error:', error.text);
                    }
                );
        });
    };

  


    return (
        <div className='right_sidebar_parent'>
            <div className="suggest-features">
                <h1>Suggest Features</h1>
                <div className="content">
                    <h2>Your Feedback</h2>
                    <p>How was your experience using KidzConnect?</p>
                    <div className="emotes">
                        <Link
                            onClick={() => handleEmoteClick(0)}
                            className={activeEmoteIndex === 0 ? 'activeemote' : ''}
                        >
                            <img className='normal_review' src={AngryImg} alt="protected" />
                            <img className='active_review' src={Angry_activeImg} alt="protected" />
                            
                        </Link>
                        <Link
                            onClick={() => handleEmoteClick(1)}
                            className={activeEmoteIndex === 1 ? 'activeemote' : ''}
                        >
                            <img className='normal_review' src={ConfusedImg} alt="protected" />
                            <img className='active_review' src={Confused_activeImg} alt="protected" />
                        </Link>
                        <Link
                            onClick={() => handleEmoteClick(2)}
                            className={activeEmoteIndex === 2 ? 'activeemote' : ''}
                        >
                            <img className='normal_review' src={NeutralImg} alt="protected" />
                            <img className='active_review' src={Neutral_activeImg} alt="protected" />
                        </Link>
                        <Link
                            onClick={() => handleEmoteClick(3)}
                            className={activeEmoteIndex === 3 ? 'activeemote' : ''}
                        >
                            <img className='normal_review' src={HappyImg} alt="protected" />
                            <img className='active_review' src={Happy_activeImg} alt="protected" />
                        </Link>
                        <Link
                            onClick={() => handleEmoteClick(4)}
                            className={activeEmoteIndex === 4 ? 'activeemote' : ''}
                        >
                            <img className='normal_review' src={LoveItImg} alt="protected" />
                            <img className='active_review' src={LoveIt_activeImg} alt="protected" />
                        </Link>
                    </div>
                    <p>Your feedback matters! Share your thoughts to enhance your experience. Need urgent assistance? Click    <Link
              to='/parent-dashboard'
              onClick={() => handleLiClick('Support')}
            >here</Link> to contact our support team.</p>
                    <div className="mb-3">
                        <textarea className="form-control" id="feedback" placeholder="Share your feedback.."></textarea>
                        <div className="invalid-feedback">
                            Share your feedback..
                        </div>
                    </div>
                    <button onClick={sendEmail}>Send Feedback</button>
                </div>
            </div>
        </div>
    );
};

export default SuggestFeatures;


