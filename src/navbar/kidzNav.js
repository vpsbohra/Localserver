import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import AuthUser from '../components/AuthUser';

import ParentalSwitch from '../images/Parental_Switch01.png';
import MessagesIcon from '../images/Messages(1).png';
import ActivitiesIcon from '../images/Activities01.png';
import HomeIcon from '../images/Home01.png';
import MoneyBagImage from '../images/money-bag.png';
import protectImg1 from '../images/036-protect.png';
import ChildChat from '../components/chat/ChildChat';
import axios from 'axios';
function KidsNav() {

  const { token } = AuthUser();

  const [rem, setRem] = useState();
  const [questions, setQuestions] = useState([]);
  const { http, setToken } = AuthUser();

  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userdetail, setUserdetail] = useState('');
  const [isParentalSwitchActive, setIsParentalSwitchActive] = useState(false);
  const { user } = AuthUser();
  const [userId, setUserId] = useState('');
  const childId = sessionStorage.getItem('childId');


  const [childProfiles, setChildProfiles] = useState([]);

  useEffect(() => {
    console.log("HELLLLLLLLLLLLLLLOOOOOOO")
    fetchQuestions();
    fetchChildData();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/stories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const storyId = sessionStorage.getItem('childStory');
      const selectedStory = response.data.find(story => story.id === parseInt(storyId, 10));
      console.log("Story data", selectedStory);

      if (selectedStory) {
        const mcqData = selectedStory.story_mcq;
        const questionArray = mcqData.split('-');
        setQuestions(questionArray);

      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };


  //*************************messages******************************************* */
  const [totalUnreadMessages, setTotalUnreadMessages] = useState({});
  const [AllMessages, setAllMessages] = useState(0);
  const fetchTotalUnreadMessages = () => {
    const totalCounts = {};

    if (Array.isArray(AllMessages)) {

      console.log("yes its an array");
      AllMessages.forEach((message) => {
        if (!totalCounts[message.spouse]) {
          totalCounts[message.spouse] = 0;
        }

        if (message.message_status === 'unread') {
          totalCounts[message.spouse]++;
        }
      });
    }
    setTotalUnreadMessages(totalCounts);
  };
  const fetchAllMessages = async () => {
    try {
      const response = await http.get('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/all-messages');
      const allMessagesFromApi = response.data;

      const filteredMessages = allMessagesFromApi.filter(message => message.receiverId === childId);

      console.log('Filtered messages:', filteredMessages);
      setAllMessages(filteredMessages);


    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  useEffect(() => {
    fetchTotalUnreadMessages();

  }, [AllMessages]);
  useEffect(() => {
    fetchAllMessages();

  }, []);
  console.log("totalUnreadMessages", totalUnreadMessages);
  console.log("AllMessages", AllMessages);
  const num = Object.values(totalUnreadMessages).reduce((total, count) => total + count, 0);
  console.log("num", num);


  useEffect(() => {
    const userInformation = sessionStorage.getItem('user');

    const user = JSON.parse(userInformation);
    const { id } = user;
    setUserId(id);

  }, []);

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    setUserdetail(user);
  };

  function renderElement() {
    if (userdetail) {
      return <p>{userdetail.name.split(' ')[0]}</p>;
    } else {
      return <p>Loading.....</p>;
    }
  }
  const handleCodeEntry = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedCode = JSON.parse(sessionStorage.getItem('user')).user_code;
    if (code === storedCode) {
      navigate('/parent-dashboard');
    } else {
      setErrorMessage('Invalid code entered. Please try again.');
      console.log('Incorrect code entered!');
    }
  };
  const handleCancel = () => {
    setShowPopup(false);
    setIsParentalSwitchActive(false);
  };
  const handleParentalSwitch = () => {
    setShowPopup(true);
    setErrorMessage('');
    setIsParentalSwitchActive(true);
  };

  const handleMessages = () => {
    navigate('/kids-messages');
  };
  const handleHome = () => {
    navigate('/kids-view');
  };

  useEffect(() => {
    if (isParentalSwitchActive) {
      document.documentElement.classList.add('parental-switch-active');
    } else {
      document.documentElement.classList.remove('parental-switch-active');
    }
  }, [isParentalSwitchActive]);

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('parental-switch-active');
    };
  }, []);

  useEffect(() => {
    const x = sessionStorage.getItem('owner');
    if (x) {
      setToggle(true);
    }
    const handleBackButton = (event) => {
      event.preventDefault();
      // alert('true');
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [showPopup]);




  const fetchChildDetail = () => {
    console.log('Fetching user detail');


    http.get(`/child-profiles?user_id=${userId}`).then((res) => {
      setChildProfiles(res.data);

    });
  };


  if (!childProfiles.length > 0) {
    fetchChildDetail();
  }


  const activeChildProfiles = childProfiles.filter(child => child.id === parseInt(childId));
  const activeChildName = activeChildProfiles.map(child => child.child_name);
  const cname = sessionStorage.getItem('setChildName')
  const fetchChildData = async () => {
    console.log("K:JFKJHKSJFDHKLJSDFHKJSHFKLJSDFHKLJSFHDKJSDH");
    try {
      const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/child-profiles?user_id=${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const abc = response.data;
      const a = sessionStorage.getItem('setChildID');
      const b = sessionStorage.getItem('childId');
      const cid = a ? a : b;
      console.log("session child id", cid);
      const child = abc.find((n) => n.id === parseInt(cid));
      if (child) {
        console.log('test123' + child.current_question);
        localStorage.setItem("question", child.current_question);
        const a = localStorage.getItem("question");
        const b = questions.length > 0 ? questions.length : 5;
        const y = b - a;
        setRem(y);
        console.log("Attempted question", a);
        console.log("Total question", b);
        console.log("REMAINING QUESTIONS", y);
      }
    } catch (error) {
      console.error('Error fetching child data:', error);
    }
  };


  const [toggle, setToggle] = useState(false);
  const handleLogout = () => {
    // Clear session storage and navigate to the logout page
    sessionStorage.clear();
    navigate('/');
  };
  return (
    <>
      <div className="kidsname">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/Kids-view" onClick={handleHome}><img src={HomeIcon} alt='' /></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={rem < 1 ? "" : "/RecordedAnswer"}><img src={ActivitiesIcon} alt='' /><span>{rem < 5 ? rem : 0}</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Kids-messages" onClick={handleMessages} ><img src={MessagesIcon} alt='' />{num > 0 ? (<span> {num} </span>) : (<></>)}</Link>
              </li>
              {toggle ? (<li className="nav-item active">
                <Link className="nav-link" id="parental_switch" onClick={handleParentalSwitch}><img src={ParentalSwitch} alt='' /></Link>
              </li>):(<>
                <Link className="nav-link" onClick={handleLogout} ><svg width="76" height="76" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.6413 2.45605H5.55794C3.70211 2.45605 2.19336 3.9648 2.19336 5.82064C2.19336 6.11105 2.43419 6.35189 2.72461 6.35189C3.01503 6.35189 3.25586 6.11105 3.25586 5.82064C3.25586 4.55272 4.29003 3.51855 5.55794 3.51855H12.6413C13.9092 3.51855 14.9434 4.55272 14.9434 5.82064V12.904C14.9434 14.1719 13.9092 15.2061 12.6413 15.2061H5.55794C4.29003 15.2061 3.25586 14.1719 3.25586 12.904C3.25586 12.6136 3.01503 12.3727 2.72461 12.3727C2.43419 12.3727 2.19336 12.6136 2.19336 12.904C2.19336 14.7598 3.70211 16.2686 5.55794 16.2686H12.6413C14.4971 16.2686 16.0059 14.7598 16.0059 12.904V5.82064C16.0059 3.9648 14.4971 2.45605 12.6413 2.45605Z" fill="#00897B"/>
  <path d="M2.19336 9.36232C2.19336 9.65274 2.43419 9.89357 2.72461 9.89357H10.6509L8.72419 11.8202C8.51878 12.0257 8.51878 12.3657 8.72419 12.5711C8.83044 12.6773 8.96503 12.7269 9.09961 12.7269C9.23419 12.7269 9.36877 12.6773 9.47503 12.5711L12.3084 9.73774C12.5138 9.53232 12.5138 9.19232 12.3084 8.98691L9.47503 6.15357C9.26961 5.94816 8.92961 5.94816 8.72419 6.15357C8.51878 6.35899 8.51878 6.69899 8.72419 6.90441L10.6509 8.83107H2.72461C2.43419 8.83107 2.19336 9.07191 2.19336 9.36232Z" fill="#00897B"/>
</svg></Link>
              </>)}

            </ul>
          </div>
          <div className="right-icons">
            <a className="nav-link points" disabled>
              <img src={MoneyBagImage} alt="protected" /> 107 Points
            </a>
            <a className="nav-link toggle-profile" disabled>
              {cname}
            </a>
          </div>
        </nav>
      </div>
      {showPopup && (
        <div className="code-popup">
          {/* <h1>Welcome, {renderElement()}</h1> */}
          <img src={protectImg1} alt="protected" />
          <p>Enter a 4-digit code to access the parental dashboard</p>
          <form onSubmit={handleSubmit}>
            <input type="password" maxLength={4} className="form-control" placeholder="Enter Code" value={code} onChange={handleCodeEntry} />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className='btn_control_codePopup'>
            <button type="button" onClick={() => handleCancel()}>Cancel</button>
            <button type="submit" className="continue-code">ENTER</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default KidsNav;
