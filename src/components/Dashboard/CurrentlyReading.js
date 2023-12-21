import React, { useEffect, useState } from 'react';
import NotificationVector from '../../images/Notification-Vector.png';
import AuthUser from '../AuthUser';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import close_iconImage from '../../images/close_icon_sr.png';
import close_btnImage from '../../images/Close_btn_sr.png';
import ForwardPopup from './forward_Popup';
import silent from '../../images/silent.png'
import ParentHeaderSection from './ParentHeaderSection';
import Chat from '../chat/Chat';
import Calendar from 'react-calendar';
import ChatPopup from '../chat/ChatPopup';
import Fullchat from '../chat/Fullchat';
const truncateText = (text, maxLength) => {
  const words = text.split(' ');
  if (words.length <= maxLength) {
    return text;
  }
  const truncatedText = words.slice(0, maxLength).join(' ');
  return truncatedText + '...';
};

export default function CurrentlyReading({ toggle, chats, selectedDate, chatsForDate}) {
const [T,setT ]= useState(false) ;

useEffect(() => {
  const intervalId = setInterval(() => {
    const toggleValue = JSON.parse(sessionStorage.getItem('TOGGLE'));
    // console.log('toggle', toggleValue);
    setT(toggleValue);
    // console.log('T', T);
  }, 2000);

  // Clear the interval when the component unmounts
  return () => clearInterval(intervalId);
}, []); 


  const date = sessionStorage.getItem("date");
  const [audio] = useState(new Audio("https://phplaravel-1142377-3976235.cloudwaysapps.com/stories/audio/Histoire_1_2.mp3"));
  const start = () => {
    if (audio.paused) {
      audio.play();
      setAudiostate(false);
    } else {
      audio.pause();
      setAudiostate(true);
    }

    audio.addEventListener('ended', () => {
      // Redirect to '/donewithbook' when audio ends
      window.location.href = '/donewithbook';
    });
  }

  function formatDate(dateTimeString) {
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };

    const formattedDate = new Date(dateTimeString).toLocaleDateString('en-US', options);
    return formattedDate;
  }

  const hasChats = chats && chats.length > 0;
  const groupedChats = hasChats
    ? chats.reduce((result, chat) => {
      const date = formatDate(chat.created_at);
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(chat);
      return result;
    }, {})
    : {};

  const [toggle1, setToggle1] = useState(true);


  // const [showAddFamily, setShowAddFamily] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/get-notification', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };
 
  const navigate = useNavigate();
  function back (){
    sessionStorage.setItem("TOGGLE",false);
      navigate('/parent-dashboard');
  }


  //for forward popup
  const [showForwardPopup, setForwardPopup] = useState(false);
  const [showAddFamily, setShowAddFamily] = useState(false);


  // for hiding accept and decline button 
  const [showButtons, setShowButtons] = useState(true);

  // for hiding notification bar if dddecline
  const [showBar, setShowBar] = useState(true);

  const addBodyClass = () => {
    document.body.classList.add('popup_active');
  };


  const removeBodyClass = () => {
    document.body.classList.remove('popup_active');
  };

  const handleAccept = (data, index) => {
    console.log(data);
    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const notificationData = {
      user_id: data.user_id,
      status: "inactive",
      result: data.result,
      name: data.name,
      id: data.id,
      number: data.number,
      child_id: data.child_id,
      child_name: data.child_name,
    };


    axios.patch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-notification`, notificationData, { headers })
      .then(response => {
        console.log('notification updated successfully:', response.data);

      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error('Error adding member:', error);
        }
      });
    setForwardPopup(true);
    setAcceptedStories([...acceptedStories, data]);
    addBodyClass();

  };

  const handleDecline = (data) => {
    // setShowBar(false);
    console.log(data);
    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const notificationData = {
      user_id: data.user_id,
      status: "inactive",
      result: data.result,
      name: data.name,
      id: data.id,
      number: data.number,
      child_id: data.child_id,
      child_name: data.child_name,
    };

    axios.patch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-notification`, notificationData, { headers })
      .then(response => {
        console.log('notification updated successfully:', response.data);
        window.location.reload(false);
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error('Error adding member:', error);
        }
      });


  };



  const handleCloseForwardPopup = () => {

    setForwardPopup(false);
    removeBodyClass();
    setShowAddFamily(true);
    setShowButtons(false);
  };





  const [currentPlan, setCurrentPlan] = useState('');
  const [currenBilling, setCurrentBilling] = useState('');
  const [userId, setUserId] = useState('');
  const [member, isMember] = useState(false);
  const { token } = AuthUser();
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({});
  const [payments, setPayments] = useState([]);
  const [addMemberSuccess, setAddMemberSuccess] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showMember, setShowMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [clickedStoryIndex, setClickedStoryIndex] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [shownonotifications, setshownoNotifications] = useState(false);
  const [acceptedStories, setAcceptedStories] = useState([]);
  const [notificationsFetched, setNotificationsFetched] = useState(false);
  const [childProfiles, setChildProfiles] = useState([]);
  const [currentyReading, setCurrentyReading] = useState([]);
  const { user } = AuthUser();
  const fetchStories = async () => {
    try {
      const response = await axios.get('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/stories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStories(response.data);
      sessionStorage.setItem("StoryData", response);
      console.log("Stories", response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };
  const [currntlyreading, setCurrentlyreading] = useState();

  const fetchChildData = async () => {

    try {
      const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/child-profiles?user_id=${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const abc = response.data;
      const cid = sessionStorage.getItem('setChildID');
      console.log("session child id", cid);
      const child = abc.find((n) => n.id === parseInt(cid, 10));
      if (child) {
        console.log('test123' + child.currenty_reading
        );
        setCurrentyReading(child.currenty_reading);
      }

      console.log("Children123", response.data);
    } catch (error) {
      console.error('Error fetching child data:', error);
    }
  };

  const [chid, setChid] = useState('');
  const [selectedChild, setSelectedChild] = useState(null);
  const [audiostate, setAudiostate] = useState(true);
  const [children, setChildren] = useState([]); // State for storing children
  const [stories, setStories] = useState([]); // State for storing stories
  const nextModal = (index, data1) => {
    console.log(index);
    let d = index - 1;
    console.log(stories[d]);
    let data = JSON.stringify(stories[d])
    sessionStorage.setItem('childStory', index);
    sessionStorage.setItem('childStoryText', data1);
    sessionStorage.setItem('childStorydata', data);
    // useNavigate('/chosenstory');
  };
  useEffect(() => {
    const cid = sessionStorage.getItem('setChildID');
    console.log("session child id", cid);
    fetchChildData();
    fetchStories();
    if (!notificationsFetched) {
      fetchNotifications();
      setNotificationsFetched(true);
    }
    const userInformation = sessionStorage.getItem('user');
    const user = JSON.parse(userInformation);
    const { plan } = user;
    const { billing } = user;
    const { id } = user;
    console.log("frgdfgdfhdf", userId);
    const userNotifications = notifications.filter(notification => notification.user_id === Number(userId));
    // console.log("userNotification", userNotifications);
    // console.log("Notifications", notifications);

    if (userNotifications.length > 0) {
      // console.log("userfound");



      const allInactive = userNotifications.every(notification => notification.status === "inactive");
      const noActive = !userNotifications.some(notification => notification.status === "active");

      if (allInactive || noActive) {
        // Perform your action here, e.g., show a message or execute some code
        console.log("Perform your action here.");
        setshownoNotifications(true);
      } else {
        // Handle the case where there are "active" statuses for the user
        console.log("There are active statuses for the user.");
      }
    } else {
      // Handle the case where there are no notifications for the user
      console.log("No notifications found for the user.");
    }
    setCurrentPlan(plan);
    setCurrentBilling(billing);
    setUserId(id);
    if (chid && chid !== '') {
      const selected = children.find(child => child.id === chid);
      setSelectedChild(selected);
    }


  }, [userId, chid, notifications]);
  const matchStoryWithReading = (selectedChild, stories) => {
    if (selectedChild && stories && stories.length > 0) {
      const { currently_reading } = selectedChild;
      const matchingStory = stories.find(story => story.id === currently_reading);

      if (matchingStory) {
        console.log('Matching Story with Currently Reading:', matchingStory);
        // Do something with the matching story, such as setting it in state or displaying it
      } else {
        console.log('No matching story found for the currently reading value of the child.');
      }
    } else {
      console.log('Selected child or stories not available.');
    }
  };
  useEffect(() => {
    matchStoryWithReading(selectedChild, stories);
  }, [selectedChild, stories]);
  function close() {
    setAddMemberSuccess(false);
    isMember(false);
    setShowPopup(false);
    setShowMember(false);
  }
  const fetchMembers = async () => {
    try {
      const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/members/${userId}`);
      const membersData = response.data;
      setMembers(membersData);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };
  useEffect(() => {

    fetchMembers();
  }, [userId]);

  const handleAddMember = () => {
    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const firstName = document.getElementsByName('fname')[0].value;
    const lastName = document.getElementsByName('lname')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const phone = document.getElementsByName('phone')[0].value;
    setMemberName(firstName);
    const memberData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      user_id: userId,
    };

    axios.post('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/add-member', memberData, { headers })
      .then(response => {
        console.log('Member added successfully:', response.data);
        // isMember(false);
        setErrors({});
        setAddMemberSuccess(true);
        fetchMembers();
        fetchNotifications();
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error('Error adding member:', error);
        }
      });
  };


  const addBodyClassAddmember = () => {
    document.body.classList.add('popup_active');
  };


  const removeBodyClassAddmember = () => {
    document.body.classList.remove('popup_active');
  };

// useEffect(()=>{
// setT(sessionStorage.getItem("TOGGLE"));
// },[selectedDate])
  return (
    <>
  
        {toggle ? (
          <>
          <div className='currently_reading_date'>
          <div className='currently_reading_date_inner'>
           
            <Link  onClick={back}>  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8L2 12L6 16" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2 12H22" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
            </svg>Go back to currently reading </Link>
            </div>
            <h2>{selectedDate}</h2>
          
            {hasChats && Object.entries(groupedChats).map(([date, chatsForDate]) => (
              <div key={date}>
                <p>Hello </p>

              </div>
            ))}
          </div>
          </>
        ) : (
          <>
         
          <div className='top_currently_notification'>
            <div className='main_heading'>
              <h3> Notifications </h3>
            </div>
            {shownonotifications ? (
              <div className='notification_item_sr'>
                <img src={silent} />
                <span>There are no new notifications</span>
              </div>) : (
              <>



                {notifications.map((story, index) => (
                  <>
                    {story.status == "active" && (
                      <>

                        <div className='inner-container_notification'>
                          <div className='inner_notification_left'>
                            <img src={NotificationVector} />
                          </div>
                          <div className='inner_notification_right'>
                            <p><span style={{ color: '#26a69a' }}> {story.child_name}</span> would like to share something with <span style={{ color: '#8A6CB1' }}>{story.name} ({story.number})</span></p>

                          </div>
                        </div>
                        {acceptedStories.includes(story) ? (
                          <div className='button_add-member'>
                            <button className='notification-Member' onClick={() => isMember(true)} >Add as a Family Member</button>
                          </div>
                        ) : (
                          <div className='notification-buttons'>
                            <button className='notification-decline' onClick={() => handleDecline(story)}>Decline</button>
                            <button className='notification-accept' onClick={() => handleAccept(story)}>Accept</button>
                          </div>
                        )}
                      </>
                    )}
                    {showForwardPopup && (
                      <ForwardPopup onClose={handleCloseForwardPopup} />
                    )}

                  </>
                ))}
              </>
            )}
             
          </div>
          <div className='main_heading'>
            <h3> Currently Reading </h3>
          </div>
          </>
        )}
        {showAddFamily && (
          <>

            {/* <div className='notification-buttons_add-member'> */}
            {/* <button onClick={() => isMember(true)} className='notification-Member'>Add as a Family Member</button> */}
            {member && (
              <div className="password-update Add_Member_popup">
                <button className='closed_popup_password' onClick={close}><img src={close_btnImage} alt="protected" /></button>
                <div className="add-member">
                  {addMemberSuccess ? (
                    <div className="success">
                      {memberName} has been successfully added!
                    </div>
                  ) : (
                    <>
                    <div className="add-member">
                      <h2>Add a Member</h2>
                      <div className="form-group">
                        <label>First Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fname"
                        />
                        {errors && errors.first_name && (
                          <p className="error-message">{errors.first_name}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Name"
                          name="lname"
                        />
                        {errors && errors.last_name && (
                          <p className="error-message">{errors.last_name}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Email*</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email address"
                          name="email"
                        />
                        {errors && errors.email && (
                          <p className="error-message">{errors.email}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter phone number"
                          name="phone"
                        />
                        {errors && errors.phone && (
                          <p className="error-message">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="form-group payment_btn_lastoption">
                    <button onClick={handleAddMember} className='add_paymentplan'>Add to your payment plan</button>
                    <button className='send_invitation'>Send an invitation</button>
                    <p>*The additional fee of $3.5/month will be covered by the member themselves</p>
                  </div>
                  </>
                  )}
                  
                </div>
              </div>
            )}
            {/* </div> */}
          </>
        )}
        <div className='top_currently_parent'>
          
          <div className='inner-container'>
          {T? (



            <>
            No story is present on this date. 
            </>
          ):(
            <>
            {currentyReading ? (
              <>
                {stories.map((story, index) => (
                  <>
                    {story.id == currentyReading && (
                      <>
                        <div className='inner-container-left'>
                          <img src={story.image_path} alt='Story' width={137} height={137} />
                        </div>
                        <div className='inner-container-right'>
                          <h4>{story.title}</h4>
                          <p>{truncateText(story.description, 15)}</p>
                          <div className='Currently_Reading_right'>
                            <Link className='Currently_Reading_btn'>
                              <button onClick={start}>
                                { audiostate ? (
                                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="16.5" cy="16" r="16" fill="#00897B" />
                                  <path d="M20.6886 13.7671L14.5743 10.27C14.2728 10.0932 13.9295 10 13.58 10C13.2305 10 12.8872 10.0932 12.5857 10.27C12.2542 10.4745 11.9804 10.7603 11.7904 11.1004C11.6004 11.4404 11.5004 11.8233 11.5 12.2129V19.2071C11.5004 19.5967 11.6004 19.9796 11.7904 20.3196C11.9804 20.6597 12.2542 20.9455 12.5857 21.15C12.8864 21.3293 13.2299 21.4241 13.58 21.4243C13.9283 21.4223 14.2705 21.3318 14.5743 21.1614L20.6886 17.6757C21.0244 17.472 21.3021 17.1851 21.4949 16.8428C21.6876 16.5005 21.7888 16.1143 21.7888 15.7214C21.7888 15.3286 21.6876 14.9424 21.4949 14.6001C21.3021 14.2578 21.0244 13.9709 20.6886 13.7671ZM13.8314 18.99V12.4529L19.6029 15.7214L13.8314 18.99Z" fill="white" />
                                </svg>
                                ):(
                                  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.4998 29.3337C23.8636 29.3337 29.8332 23.3641 29.8332 16.0003C29.8332 8.63653 23.8636 2.66699 16.4998 2.66699C9.13604 2.66699 3.1665 8.63653 3.1665 16.0003C3.1665 23.3641 9.13604 29.3337 16.4998 29.3337Z" stroke="#00897B" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.8335 20V12" stroke="#00897B" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.1665 20V12" stroke="#00897B" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                                )}
                                Play Story
                              </button>
                            </Link>
                            <Link to="/openbook" className='Currently_Reading_btn Currently_Reading_btnsecnd'>
                              <button onClick={nextModal(story.id, story.audio_text)}>Read Story</button>
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ))}
              </>
            ) : (
              <p>No Stories</p>
            )}
            </>
          )}



          </div>
        </div>
        <div className='top_interactions_parent'>
          <div className='top_interactions_parent_inner'>
            <div className='main_heading'>
              <h3>Interactions</h3>
              {toggle ? (
                <>
                  <nav class="nav">
                  <a className={`nav-link ${toggle1 ? 'active' : ''}`} onClick={() => setToggle1(true)}>Full Conversation</a>
                    <a className={`nav-link ${toggle1 ? '' : 'active'}`} onClick={() => setToggle1(false)}>Individual Moments</a>
                  </nav>
                  {toggle1 ? (
                    <>
                    <Fullchat/>
</>
                  ) : (
                    <>
                      {/* <Chat /> */}
                      <ChatPopup chats={chatsForDate}/>
                      {/* {chid && <Chat key={chid} dataId={chid} userId={userId} />} */}
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
    </>
  );
}




