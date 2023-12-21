import React, { useEffect, useState } from 'react';
import ContactForm from '../ContactForm';
import search_keywordIMG from '../../images/search_keyword.png';
import circle_chevIMG from '../../images/circle_chev_down.png';
import circle_chev_BACKIMG from '../../images/Circle_Chev_Down_clrr.png';
import mailcheck from '../../images/Mail_Check.png';
import { Modal} from 'react-bootstrap';

const questions = [
  {
    question: 'Is KidzConnect available in multiple languages?',
    answer: 'Currently, KidzConnect is available in the following 5 languages: English, French, Spanish, Portuguese and German. ',
  },
  {
    question: 'How do the different subscriptions work?',
    answer: 'We offer various subscription plans with different features and benefits. You can choose the subscription plan that best suits your needs, and it will grant you access to our premium content and features.',
  },
  {
    question: 'How can I modify my profile information?',
    answer: 'You can edit your profile information by logging into your KidzConnect account, going to your profile settings on your dashboard, and making the desired changes.',
  },
  {
    question: 'How can I recover my password if I forget it?',
    answer: 'If you forget your password, simply click on the "Forgot Password" link on the login page. We will send you instructions on how to reset your password via your email address.',
  },
  {
    question: 'How can I register multiple children with a single email address?',
    answer: 'Each child can have their own KidzConnect account linked to a single parent email address. During the registration process, you can add multiple child profiles, the exact amount depending on your selected subscription plan. Click here for more details about all our subscription plans.',
  },
  {
    question: 'How can I cancel my KidzConnect subscription?',
    answer: 'You can cancel your KidzConnect subscription by logging into your account, going to your settings on your dashboard, and following the cancellation process.',
  },
];

function Support() {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [showModal, setShowModal] = useState(false); 
 
  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index);
    setTimeout(() => scrollToTop(), 5); 
  };

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };


  const handleBackClick = () => {
    setSelectedQuestionIndex(null);
  };

  return (
    
    <div className='right_sidebar_parent'> 
    <div className="support">
      {selectedQuestionIndex === null ? (
        <>
        {showModal && (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Body>
      <h4>Your message has been received!</h4>
        <img  src={mailcheck} />
        <p>Thank you for contacting us! You'll receive an email confirmation shortly. Our team is on it, and we'll get back to you soon. If you have any further questions or updates, please feel free to reply to the confirmation email. Thank you for reaching out!</p>
      </Modal.Body>
    </Modal>
    )}
      <h1 className='page_title_sr'>Help Center</h1>
        <div className="support_input_form">
        <img src={search_keywordIMG} alt="logo" />
          <input type="search" className="search" placeholder='Search for help using a keyword' />
          </div>
        <ul className="question-list">
          {questions.map((q, index) => (
            <li
              key={index}
              onClick={() => handleQuestionClick(index)}
              className="question"
            >
              {q.question}
              <span><img src={circle_chevIMG} alt="logo" /></span>
            </li>
          ))}
        </ul>
        <div className="send-us-message">
        <div className="content">
            <h2>Send us a message</h2>
            <p>Can't find the answers you need? Reach out to us by filling out the form below, and we'll be quick to respond and provide assistance!</p>
        </div>
            <ContactForm setShowModal={setShowModal}/>
        </div>
       </>
      ) : (
        <div className="question-content">
          <div className="question-content_left">
            <button className="back-button" onClick={handleBackClick}>
              <img src={circle_chev_BACKIMG} alt="logo" />
            </button>
          </div> 
          <div className="question-content_right">
            <h2>{questions[selectedQuestionIndex].question}</h2>
          
          <p>{questions[selectedQuestionIndex].answer}</p>
        </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Support;
