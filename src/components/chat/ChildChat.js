
import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import AuthUser from '../AuthUser';
import KidsNav from '../../navbar/kidzNav';
import { Link } from 'react-router-dom';
import sendImage from '../../images/sendVector.png';
import PaperClipImage from '../../images/paper-clip.png';
import EmojiImage from '../../images/Emoji_icon.png';
import SendAudioImage from '../../images/Record button (1).png';
import RecordRTC from 'recordrtc';
import pause from '../../images/pause.png';
import WaveSendAudioImage from '../../images/Ongoing Recording.png';
import WaveSendAudioImage1 from '../../images/Paused Recording.png';
import Record from '../../images/Record button.png';
import { useRef } from 'react';
import axios from 'axios';


// import AuthUser from '../AuthUser';

const ChildChat = () => {
  const { http, setToken } = AuthUser();
  const { user, token } = AuthUser();


  // console.log(user);
  const [firstCharacter, setfirstCharacter] = useState([]);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [userdetail, setUserdetail] = useState({});
  const [message, setMessage] = useState('');
  const userInfo = sessionStorage.getItem('user');
  const userInfoDetail = JSON.parse(userInfo);
  const spouses = userInfoDetail.spouse;
  const [spouse, setSpouses] = useState(username);
  const [record, setRecord] = useState(true);
  const [recorder, setRecorder] = useState(null);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sendAudio, setSendAudio] = useState(null);
  const [audioImage, setAudioImage] = useState(true);
  const [activeMember, setActiveMember] = useState(username);
  const [members, setMembers] = useState([]);
  const [userId, setUserId] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [AllMessages, setAllMessages] = useState(0);
  const [totalUnreadMessages, setTotalUnreadMessages] = useState({});
  const chatSectionRightRef = useRef(null);
  const [childProfiles, setChildProfiles] = useState([]);

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
  useEffect(() => {
    fetchTotalUnreadMessages();
  }, [AllMessages]);

  const dataId = userInfoDetail.id;
  const childId = sessionStorage.getItem('childId');
  useEffect(() => {
    Pusher.logToConsole = true;
    

    const pusher = new Pusher('8bc60721fd702db2ed68', {
      cluster: 'ap2',
      encrypted: true,
    });
    const channel = pusher.subscribe('chat');

    channel.bind('message', function (data) {
      setMessages((prevMessages) => [...prevMessages, data]);

    });

    return () => {
      pusher.unsubscribe('chat');
    };

  }, []);



  const fetchChildDetail = () => {
    console.log('Fetching user detail');


    http.get(`/child-profiles?user_id=${userId}`).then((res) => {
      setChildProfiles(res.data);

    });
  };




 


  const activeChildProfiles = childProfiles.filter(child => child.id === parseInt(childId));
  const activeChildName = activeChildProfiles.map(child => child.child_name);

  console.log("activeChildNames", activeChildName);
  console.log("activeChildProfiles", activeChildProfiles);

  const firstChar = activeChildName && activeChildName.length > 0 ? activeChildName[0].charAt(0) : '';
 
  console.log("firstChar", firstChar);

useEffect(()=>{
  if (chatSectionRightRef.current) {
    chatSectionRightRef.current.scrollTop = chatSectionRightRef.current.scrollHeight;
  }
},[]);



  










  const fetchMembers = async () => {
    try {
      const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/members/${userId}`);
      const membersData = response.data;

      // Set the 'spouse' property for each member to their 'first_name'
      const membersWithSpouse = membersData.map((member) => ({
        ...member,
        spouse: member.first_name
      }));

      setMembers(membersWithSpouse);
      setLoading(true);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  console.log('members.length', members.length);
  console.log('members.length', members.length);


  useEffect(() => {


    if (chatSectionRightRef.current) {
      chatSectionRightRef.current.scrollTop = chatSectionRightRef.current.scrollHeight;
    }
  }, [spouse]);






  if (!members.length > 0) {
    fetchMembers();

  }

if(!childProfiles.length>0){
  fetchChildDetail();
}



  useEffect(() => {
    const userInformation = sessionStorage.getItem('user');

    const user = JSON.parse(userInformation);
    const { id } = user;
    setUserId(id);

  }, []);

  console.log("userID", userId);

  function formatTime(dateTimeString) {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedTime = new Date(dateTimeString).toLocaleTimeString('en-US', options);
    return formattedTime;
  }



  const recorderRef = useRef(null);

  const startRecording = async () => {
    setAudioImage(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new RecordRTC(stream, {
        type: 'audio',
      });
      mediaRecorder.startRecording();
      setRecorder(mediaRecorder);
      setRecord(false);
      recorderRef.current.startRecording();

    } catch (error) {
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        console.error('Microphone permission denied. Please allow microphone access.');
      } else {
        console.error('Error accessing microphone:', error);
      }
    }
  };
  // const stopRecording = () => {
  //   if (recorder) {
  //     recorder.stopRecording(() => {
  //       const audioBlob = recorder.getBlob();
  //       setRecordedAudio(audioBlob);
  //       setRecorder(false);
  //       setRecord(false);
  //     });
  //   }
  // };


  const pauseRecording = () => {
    setElapsedTime(0);
    setAudioImage(false);
    if (recorder) {
      recorder.stopRecording(() => {
        const audioBlob = recorder.getBlob();
        setRecordedAudio(audioBlob);
        setRecorder(null);
      });
    }
  };

  const sendAudioMessage = () => {
    setElapsedTime(0);

    const senderId = childId;
    const receiverId = dataId;
    if (recordedAudio) {
      const audioFile = new File([recordedAudio], 'audio.wav', { type: 'audio/wav' });
      const reader = new FileReader();
      reader.readAsDataURL(audioFile);
      reader.onloadend = function () {
        const base64Audio = reader.result.split(',')[1];
        const formData = new FormData();
        formData.append('audio', base64Audio);
        http
          .post('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/audio-messages', { username, senderId, message, receiverId, spouse, base64Audio })
          .then((data) => {
            console.log('si message sent:', data.message);
            console.log('Audio message data:', data.data);
          })
          .catch((error) => {
            console.error('Error sending audio message:', error);
          });
        setRecordedAudio(null);
        setRecorder(null);
        setRecord(true);
        fetchMessages(dataId);
      };
    }
  };

  const handleUpdateMessages = async (spouse) => {


    try {

      const data = {
        message_status: "read",
      }

      const response = await axios.patch(
        `https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-messages/${spouse}`, data,
        {
          headers: {

            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Data inserted successfully:', response.data);

      console.log('API response:', response);
    } catch (error) {
      console.error('Error updating messages:', error);
    }
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
  console.log("AllMessages", AllMessages);
  const fetchMessages = async () => {
    console.log("spouse", spouse);
    const senderId = childId;
    const receiverId = dataId;
    console.log('fetchmessages');
    try {
      const response = await http.get(`/messages/${senderId}/${receiverId}/${spouse}`);
      const messagesFromApi = response.data;

      console.log('messagesFromApi', messagesFromApi);
      setMessages(messagesFromApi);
      const unreadMessages = messagesFromApi.filter(message => message.message_status === 'unread');
      setUnreadMessageCount(unreadMessages.length);
      console.log('unread', unreadMessages);

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };



  const fetchUserDetail = () => {
    setUserdetail(user);
    setUsername(user.name.split(' ')[0]);
  };


  const submit = () => {
    const senderId = childId;
    const receiverId = userdetail.id;

    http
      .post('/messages', { username, message, senderId, receiverId, spouse })
      .then((response) => {
        console.log('Message saved:', response.data);
      })
      .catch((error) => {
        console.error('Error saving message:', error);
      });

    setMessage('');
    fetchMessages();
  };

  useEffect(() => {
    let timer;
    if (recorder) {
      timer = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Cleanup the timer on component unmount or when recorder is not active
  }, [recorder]);



  console.log("spouse", spouse);
  console.log("messages", messages);
  console.log("members", members)
  console.log("userInfoDetail", userInfoDetail);
  console.log("childid", childId);
  console.log("totalUnreadMessages", totalUnreadMessages);
  console.log("username", username);
  console.log("username", user.first_name);
  // console.log("totalUnreadMessages[username]", totalUnreadMessages[username].length);



  // username.first_name
  // member.first_name
  // totalUnreadMessages[username]

  const findLatestUnreadMessageTime = (member) => {
    if (!Array.isArray(AllMessages)) {
      return null;
    }
  
    const unreadMessages = AllMessages.filter(
      (message) => message.spouse === member && message.message_status === 'unread'
    );
  
    if (unreadMessages.length > 0) {
      const latestUnreadMessage = unreadMessages.reduce((prev, current) =>
        new Date(prev.updated_at) > new Date(current.updated_at) ? prev : current
      );
  
      const dateObject = new Date(latestUnreadMessage.updated_at);
      
      const month = dateObject.toLocaleString('en-US', { month: 'long' });
      const day = dateObject.getDate();
      const year = dateObject.getFullYear();
      let hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
      const period = hours >= 12 ? 'pm' : 'am';
  
      // Adjust hours for 12-hour format
      hours = hours % 12 === 0 ? 12 : hours % 12;
  
      const formattedTime = `${month} ${day}${getOrdinalSuffix(day)},  ${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  
      return formattedTime;
    }
  
    return null;
  };
  
  // Helper function to get the ordinal suffix for the day (e.g., "1st", "2nd", "3rd", "4th")
  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
  
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };
  
  

  const handleMemberClick = (spouse) => {
    setActiveMember(spouse);
    setSpouses(spouse);
    handleUpdateMessages(spouse);

  };
  console.log("spouses", spouses);

  useEffect(() => {

    fetchUserDetail();
    fetchMessages();
    fetchAllMessages();


    if (chatSectionRightRef.current) {
      chatSectionRightRef.current.scrollTop = chatSectionRightRef.current.scrollHeight;
    }


  }, [spouse], [messages]);
 // *****************************Audio Player*************************************



 const [isPlaying, setIsPlaying] = useState({});

 useEffect(() => {
   const audioPlayers = document.querySelectorAll('.audio-player');

   for (const player of audioPlayers) {
     const audio = player.querySelector('audio');
     setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: false }));
     updateCurrentTime(player, audio);
   }
 }, [isPlaying]);

 const togglePlayPause = (playerId) => {
   const audioPlayer = document.getElementById(playerId);
   const audio = audioPlayer.querySelector('audio');
   const addclass = audioPlayer.querySelector('.play-pause-btn');

   // Use audio.paused to check if audio is currently playing
   if (audio.paused) {
     audio.play();
     addclass.classList.remove('pause');
     addclass.classList.add('play');

   } else {
     addclass.classList.remove('play');
     addclass.classList.add('pause');
     audio.pause();
   }

   // Update isPlaying based on the current state of the audio
   setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [playerId]: !audio.paused }));
   updatePlayPauseButton(playerId);
 };
 const updatePlayPauseButton = (playerId) => {
   const playPauseBtn = document.getElementById(playerId).querySelector('.play-pause-btn');
   // playPauseBtn.innerHTML = isPlaying[playerId] ? '&#9616;&#9616;' : '&#9654;';
 };

 const updateBackgroundColor = (playerId) => {
   const player = document.getElementById(playerId);
   const audio = player.querySelector('audio');
   const progressRange = player.querySelector('input[type="range"]');
   const percent = (audio.currentTime / audio.duration) * 100;
   progressRange.style.backgroundColor = `linear-gradient(to right, #ff0000 ${percent}%, #ccc ${percent}%)`;
   updateCurrentTime(player, audio);
 };

 const resetBackgroundColor = (playerId) => {
   const player = document.getElementById(playerId);
   const progressRange = player.querySelector('input[type="range"]');
   progressRange.style.backgroundColor = '#ccc';
 };

 useEffect(() => {
   const audioPlayers = document.querySelectorAll('.audio-player');

   for (const player of audioPlayers) {
     const audio = player.querySelector('audio');
     setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: audio.paused }));

     // Listen for the 'loadedmetadata' event to ensure audio duration is available
     audio.addEventListener('loadedmetadata', () => {
       updateCurrentTime(player, audio);
     });

     // Listen for play and pause events to update isPlaying state
     audio.addEventListener('play', () => {
       setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: true }));
     });

     audio.addEventListener('pause', () => {
       setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: false }));
     });
   }
   return () => {
     // Cleanup: Remove event listeners
     for (const player of audioPlayers) {
       const audio = player.querySelector('audio');
       const progressRange = player.querySelector('input[type="range"]');
       const playerId = player.id;

       audio.removeEventListener('timeupdate', () => updateProgressBar(playerId));
       audio.removeEventListener('ended', () => resetBackgroundColor(playerId));
       progressRange.removeEventListener('input', () => seekTo(playerId));
     }
   };

 }, []);



 const updateProgressBar = (playerId) => {
   const player = document.getElementById(playerId);
   const audio = player.querySelector('audio');
   const progressRange = player.querySelector('input[type="range"]');
   const percent = (audio.currentTime / audio.duration) * 100;
   progressRange.value = percent;
   updateCurrentTime(player, audio);
 };

 const seekTo = (playerId) => {
   console.log("seek");
   const player = document.getElementById(playerId);
   const audio = player.querySelector('audio');
   const progressRange = player.querySelector('input[type="range"]');
   const seekTime = (progressRange.value / 100) * audio.duration;
   audio.currentTime = seekTime;
   updateCurrentTime(player, audio);
 };

 const updateCurrentTime = (player, audio) => {
   const currentTimeDisplay = player.querySelector('.current-time');
   const totalTimeDisplay = player.querySelector('.total-time');

   const minutes = Math.floor(audio.currentTime / 60);
   const seconds = Math.floor(audio.currentTime % 60);
   const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
   currentTimeDisplay.textContent = formattedTime;

   const totalMinutes = Math.floor(audio.duration / 60);
   const totalSeconds = Math.floor(audio.duration % 60);
   const formattedTotalTime = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
   totalTimeDisplay.textContent = formattedTotalTime;
 };

  return (
    <div className="kidzdashboard">
      <div className="container-fluidsc display-table">
        <KidsNav />
        <div className="main-content">
          <div className="page_ttl">
            <h1>Messages</h1>
          </div>
          <div className="chat_section_sr childchatsection_sr">
            <div className="childchatsection_inner_sr">
              <div className="child_chat_sr_left">
                <div className={`d-flex w-100 align-items-center justify-content-between childchat_messages
                ${activeMember === username ? ' active' : ''}
                `}
                  onClick={() => handleMemberClick(username)} >
                  <div className="child_chat_childchat_messages_left">
                  <strong className="mb-1">
                    <span className='profile_type_letter'>
                      {username ? username.charAt(0) : ''}
                    </span>
                  </strong>


                  {(
                    totalUnreadMessages[username] > 0 ? (
                      <p>{`${totalUnreadMessages[username] || 0} New Messages`}</p>
                    ) : (
                      <p> {username} </p>
                    )
                  )}
                  </div>

                <div className="child_chat_childchat_messages_right">
                  <span> {findLatestUnreadMessageTime(username)}</span>
                </div>

                </div>

                {isLoading ? (

                  <>
                    {members.map((member) => (
                      <div
                        key={member.first_name
                        }
                        onClick={() => handleMemberClick(member.first_name
                        )}
                        className={`d-flex w-100 align-items-center justify-content-between childchat_messages${activeMember === member.first_name ? ' active' : ''}`}

                      >
                         <div className="child_chat_childchat_messages_left">
                        <strong className="mb-1">
                          <span className="profile_type_letter">
                            {member.first_name ? member.first_name.charAt(0) : ''}
                          </span>
                        </strong>
                        {totalUnreadMessages[member.first_name] > 0 ? (
                          <p>{`${totalUnreadMessages[member.first_name] || 0} New Messages`}</p>
                        ) : (
                          <p>{member.first_name ? member.first_name : ""}</p>
                        )}
                </div>
                <div className="child_chat_childchat_messages_right">
                  <span>{findLatestUnreadMessageTime(member.first_name)}</span>
                </div>
                      </div>
                    ))}
                  </>

                ) : (
                  <>
                    Members are loading.....

                  </>
                )
                }



              </div>
              <div className="child_chat_sr_right">
              <div className="chat_section_sr_right" ref={chatSectionRightRef}>
                  <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                    <div className="user_name_chat d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                      <input
                        className="fs-5 fw-semibold"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="list-group user_list_sr_outer list-group-flush border-bottom scrollarea">
                      {messages.map((message, index) => (
                        <>
                          {message.senderId == childId ? (
                            <div
                              key={index}
                              className={`list-group-item user_list_sr list-group-item-action py-3 lh-tight ${message.senderId == childId ? 'sent-by-user' : ''
                                }`}
                            >
                              <div className="user_list_groupsr">
                                <div className={`chat-audio-main col-10 mb-1 small user_message_sr ${message.senderId == childId ? 'sent-by-user-message' : ''
                                  }`}>
                                  {message.message ? (
                                    <p>{message.message}</p>
                                  ) : (
                                    <div class="chat-audio">
                                      <div className="audio-player" id={`audio${index}`}>
                                        <div className="play-pause-btn" onClick={() => togglePlayPause(`audio${index}`)}></div>
                                        <div className="progress-bar">


                                          <input type="range" min="0" max="100" value="0" step="1" onChange={() => seekTo(`audio${index}`)} />



                                          <div className="time-display">
                                            <span className="current-time">0:00</span> / <span className="total-time">0:00</span>
                                          </div>
                                        </div>
                                        <audio className={`audio${index}`} preload controls style={{ display: 'none' }}>
                                          <source src={`data:audio/wav;base64,${message.audio_path}`} />
                                        </audio>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="d-flex w-100 align-items-center justify-content-between user_name_label">
                                  <strong className="mb-1">{firstChar}</strong>
                                </div>
                              </div>
                              <div className="user_time_sr">
                              <label>{activeChildName[0]}</label> <span>{formatTime(message.created_at)}</span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div
                                key={index}
                                className={`list-group-item user_list_sr list-group-item-action py-3 lh-tight ${message.senderId == childId ? 'sent-by-user' : ''
                                  }`}
                              >

                                <div className="user_list_groupsr">
                                  <div className="d-flex w-100 align-items-center justify-content-between user_name_label">
                                    <strong className="mb-1">{spouse.charAt(0)}</strong>
                                  </div>
                                  <div className={`right-side-user col-10 mb-1 small user_message_sr ${message.senderId == childId ? 'sent-by-user-message' : ''
                                    }`}>
                                    {message.message ? (
                                     <p> {message.message}</p>
                                    ) : (
                                      <div class="chat-audio">
                                      <div className="audio-player" id={`audio${index}`}>
                                        <div className="play-pause-btn" onClick={() => togglePlayPause(`audio${index}`)}></div>
                                        <div className="progress-bar">


                                          <input type="range" min="0" max="100" value="0" step="1" onChange={() => seekTo(`audio${index}`)} />



                                          <div className="time-display">
                                            <span className="current-time">0:00</span> / <span className="total-time">0:00</span>
                                          </div>
                                        </div>
                                        <audio className={`audio${index}`} preload controls style={{ display: 'none' }}>
                                          <source src={`data:audio/wav;base64,${message.audio_path}`} />
                                        </audio>
                                      </div>
                                    </div>
                                    )}
                                  </div>
                                </div>
                                <div className="user_time_sr">
                                <label>{spouse}</label><span>{formatTime(message.created_at)}</span>
                                </div>
                              </div>
                            </>

                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </div>


                {spouse ?(
                <div className="chat_form_input">
                  <input
                    className="form-control"
                    placeholder="Send message.."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="chat_form_input_btncnrl">
                    <div className="chat_form_input_btncnrlRight">
                      {record && (
                        <>
                          {message ? (
                            <button onClick={submit}>
                              <img src={sendImage} alt="protected" />
                            </button>
                          ) : (
                            <button onClick={startRecording}>
                              <img src={SendAudioImage} alt="protected" />
                            </button>
                          )}
                        </>
                      )}
                      {audioImage ? (
                        <>
                          {recorder && (
                            <>
                              <p className='timing_recoder'>{`0:${elapsedTime.toString().padStart(2, '0')}`}</p>
                              <button onClick={pauseRecording} >
                                <img src={WaveSendAudioImage} alt="protected" />
                              </button>
                              <button className='sendAudio_btn' onClick={sendAudioMessage}>Send Response</button>
                            </>
                          )}

                        </>
                      ) : (
                        <>
                          {recordedAudio && (
                            <>
                              <p className='timing_recoder'>{`0:${elapsedTime.toString().padStart(2, '0')}`}</p>
                              <button onClick={startRecording}>
                                <img src={SendAudioImage} alt="protected" />
                              </button>
                              <button className='sendAudio_btn' onClick={sendAudioMessage}>Send Response</button>
                            </>
                          )}
                        </>
                      )}
                      {sendAudio && (
                        <>
                          <div className='RecordedAnswer_recorder'>
                            <audio controls className="custom-audio">
                              <source src={`data:audio/wav;base64,${sendAudio}`} type="audio/wav" />
                            </audio>
                            <button className='stop_reco_btn no-background' onClick={startRecording}> <img src={Record} alt="protected" /></button>

                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                ):(

                  <div className="chat_form_input">
                  <input
                    className="form-control"
                    placeholder="Send message.."
                    value={message}
                   
                  />
                  <div className="chat_form_input_btncnrl">
                    <div className="chat_form_input_btncnrlRight">
                      {record && (
                        <>
                          {message ? (
                            <button>
                              <img src={sendImage} alt="protected" />
                            </button>
                          ) : (
                            <button >
                              <img src={SendAudioImage} alt="protected" />
                            </button>
                          )}
                        </>
                      )}
                      {audioImage ? (
                        <>
                          {recorder && (
                            <>
                              <p className='timing_recoder'>{`0:${elapsedTime.toString().padStart(2, '0')}`}</p>
                              <button  >
                                <img src={WaveSendAudioImage} alt="protected" />
                              </button>
                            </>
                          )}

                        </>
                      ) : (
                        <>
                          {recordedAudio && (
                            <>
                              {/* <p className='timing_recoder'>{`0:${elapsedTime.toString().padStart(2, '0')}`}</p> */}
                              <button >
                                <img src={SendAudioImage} alt="protected" />
                              </button>
                              <button className='sendAudio_btn' >Send Response</button>
                            </>
                          )}
                        </>
                      )}
                      {sendAudio && (
                        <>
                          <div className='RecordedAnswer_recorder'>
                            <audio controls className="custom-audio">
                              <source src={`data:audio/wav;base64,${sendAudio}`} type="audio/wav" />
                            </audio>
                            <button className='stop_reco_btn no-background' > <img src={Record} alt="protected" /></button>

                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                )}


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildChat;



