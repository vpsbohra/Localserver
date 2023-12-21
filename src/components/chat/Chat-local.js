import React, { useEffect, useState, useRef } from 'react';
import Pusher from 'pusher-js';
import AuthUser from '../AuthUser';
import sendImage from '../../images/sendVector.png'; 
import { Link, Navigate } from 'react-router-dom';
import PaperClipImage from '../../images/paper-clip.png';
import EmojiImage from '../../images/Emoji_icon.png';
import SendAudioImage from '../../images/Send-audio-message.png';
import WaveSendAudioImage from '../../images/Waveform001.gif';
import play from '../../images/Play_audio_message.png'
import ongoing from '../../images/ongoing_audio.png'

import { useParams } from 'react-router-dom';
import RecordRTC from 'recordrtc';
import Calendar from 'react-calendar';
import ChatPopup from './ChatPopup';
import { useNavigate } from "react-router-dom";
const Chat = ({ dataId, userId }) => {

  const { http } = AuthUser();
  const { user, token } = AuthUser();
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [userdetail, setUserdetail] = useState({});
  const [message, setMessage] = useState('');
  const { childId } = useParams();
  const userInfo = sessionStorage.getItem('user');
  const userInfoDetail = JSON.parse(userInfo);
  const spouse = userInfoDetail.spouse;
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [recorder, setRecorder] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [chatsForDate, setChatsForDate] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [datetoggle, setDatetoggle] = useState(false);
  const chatSectionRightRef = useRef(null);


  const handleDateChange=(date) => {
    setDatetoggle(true);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const selectedDay = date.getDate();
    const selectedMonthIndex = date.getMonth(); // Get the month index (0-11)
    const selectedMonth = monthNames[selectedMonthIndex];
  const selectedYear = date.getFullYear();

  // Prepare the date string in the desired format (e.g., 'DD-MM-YYYY')
  const selectedDate = `${selectedMonth} ${selectedDay}th,${selectedYear}`;

    navigate(`/parent-dashboard?datetoggle=${datetoggle}&selectedDate=${selectedDate}`);
    const chatsForSelectedDate = messages.filter((message) => {
      const messageDate = new Date(message.created_at).toDateString();
      const selectedDateStr = date.toDateString();
      return messageDate === selectedDateStr;
    });
    setSelectedDate(date);
    setChatsForDate(chatsForSelectedDate);
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
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
  useEffect(() => {
    fetchUserDetail();
    fetchMessages();
  }, [dataId]);


  
  useEffect(() => {


    if (chatSectionRightRef.current) {
      chatSectionRightRef.current.scrollTop = chatSectionRightRef.current.scrollHeight;
    }
  }, [spouse]);




  const fetchMessages = async () => {
    try {
      const response = await http.get(`/messages/${userId}/${dataId}/${spouse}`);
      const messagesFromApi = response.data;
      console.log(response.data);
      setMessages(messagesFromApi);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchUserDetail = () => {
    setUserdetail(user);
    setUsername(user.name.split(' ')[0]);
  };

  const submit = () => {
    const senderId = userdetail.id;
    const receiverId = dataId;

    http
      .post('/messages', { username, message, senderId, receiverId, spouse })
      .then((response) => {
        console.log('Message saved:', response.data);
      })
      .catch((error) => {
        console.error('Error saving message:', error);
      });

    setMessage('');
  };

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  function formatTime(dateTimeString) {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedTime = new Date(dateTimeString).toLocaleTimeString('en-US', options);
    return formattedTime;
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new RecordRTC(stream, {
        type: 'audio',
      });
      mediaRecorder.startRecording();
      setRecorder(mediaRecorder);
    } catch (error) {
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        console.error('Microphone permission denied. Please allow microphone access.');
      } else {
        console.error('Error accessing microphone:', error);
      }
    }
  };


  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const audioBlob = recorder.getBlob();
        setRecordedAudio(audioBlob);
      });
    }
  };


  const sendAudioMessage = () => {
    const senderId = userdetail.id;
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
        fetchMessages(dataId);
      };
    }
  };




  return (
    <>
      <div className="chat_section_sr">
        <div className="chat_section_sr_right" >
          <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" ref={chatSectionRightRef}>
            <div className="user_name_chat d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
              <input
                className="fs-5 fw-semibold"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="list-group user_list_sr_outer list-group-flush border-bottom scrollarea" >
              {messages.map((message, index) => (
                <>
                  {message.senderId == dataId ? (
                    <div
                      key={index}
                      className={`list-group-item user_list_sr list-group-item-action py-3 lh-tight ${message.senderId == userId ? 'sent-by-user' : ''
                        }`}
                    >
                      <div className="user_list_groupsr">
                        <div className="d-flex w-100 align-items-center justify-content-between user_name_label">
                          <strong className="mb-1">P</strong>
                        </div>
                        <div className={`col-10 mb-1 small user_message_sr ${message.senderId == userId ? 'sent-by-user-message' : ''
                          }`}>
                          {message.message ? (
                            message.message
                          ) : (
                            <>
                              {message.audio_path ? (
                               <div className='audio_message'>
                               <div className='audio_message_inner'>
                                 <button className='no-background'><img src={play}/></button>
                                 <div className='remaining_audio'>
                                 <span className='ongoing_contr'><img src={ongoing}/></span>
                                 <span className='audio_line_sr'></span>
                                 </div>
                               </div>
                             </div>

                              ) : (
                                <>
                                  <audio controls>

                                    <source src={`data:audio/wav;base64,${message.voice_answer}`} />
                                  </audio>
                                </>
                              )}
                            </>
                          )}
                        </div>



                      </div>
                      <div className="user_time_sr">
                        <span>{formatTime(message.created_at)}</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {message.voice_answer == "NULL" ? (
                        <div
                          key={index}
                          className={`list-group-item user_list_sr list-group-item-action py-3 lh-tight ${message.senderId == userId ? 'sent-by-user' : ''
                            }`}
                        >
                          <div className="user_list_groupsr">
                            <div className="d-flex w-100 align-items-center justify-content-between user_name_label">
                              <strong className="mb-1">P</strong>
                            </div>
                            <div className={`col-10 mb-1 small user_message_sr ${message.senderId == userId ? 'sent-by-user-message' : ''
                              }`}>
                              {message.message ? (
                                message.message
                              ) : (
                                <>
                                  {message.audio_path ? (
                                    <audio controls>
                                      <source src={`data:audio/wav;base64,${message.audio_path}`} />
                                    </audio>
                                  ) : (
                                    <audio controls>
                                      <source src={`data:audio/wav;base64,${message.voice_answer}`} />
                                    </audio>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                          <div className="user_time_sr">
                            <span>{formatTime(message.created_at)}</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div
                            key={index}
                            className={`list-group-item user_list_sr list-group-item-action py-3 lh-tight ${message.senderId == userId ? 'sent-by-user' : ''
                              }`}
                          >
                            <div className="user_list_groupsr">

                              <div className={`col-10 mb-1 small user_message_sr ${message.senderId == userId ? 'sent-by-user-message' : ''
                                }`}>
                                {message.message ? (
                                  message.message
                                ) : (
                                  <>
                                    {message.audio_path ? (
                                      <div className='audio_message'>
                                        <div className='audio_message_inner'>
                                          <button className='no-background'><img src={play}/></button>
                                          <div className='remaining_audio'>
                                          <span className='ongoing_contr'><img src={ongoing}/></span>
                                          <span className='audio_line_sr'></span>
                                          </div>
                                        </div>
                                      </div>

                                    ) : (
                                      <audio controls>
                                        <source src={`data:audio/wav;base64,${message.voice_answer}`} />
                                      </audio>
                                    )}
                                  </>
                                )}

                              </div>
                              <div className="d-flex w-100 align-items-center justify-content-between user_name_label">
                                <strong className="mb-1">{message.username.charAt(0)}</strong>
                              </div>
                            </div>
                            <div className="user_time_sr">
                              <span>{formatTime(message.created_at)}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              ))}
            </div >
          </div>
        </div>

        <div className="chat_form_input">
          <input
            className="form-control"
            placeholder="Write a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="chat_form_input_btncnrl">
            <div className="chat_form_input_btncnrlLeft">
              <Link className="confirm" to="#"><img src={PaperClipImage} alt="protected" /></Link>
              <Link className="confirm" to="#"><img src={EmojiImage} alt="protected" /></Link>
            </div>
            <div className="chat_form_input_btncnrlRight">
            <button onClick={(recordedAudio !== null || message !== '') ? submit : null}>
                <img src={sendImage} alt="protected" />
              </button>
              <button onClick={startRecording}>
                <img src={SendAudioImage} alt="protected" />
              </button>
              {recorder && (
                <>
                  <img src={WaveSendAudioImage} alt="protected" />
                  <button className='stop_reco_btn' onClick={stopRecording}> Stop</button>
                </>

              )}
              {recordedAudio && (
                <button className='sendAudio_btn' onClick={sendAudioMessage}>Send Audio</button>
              )}
            </div>
          </div>
        </div>

      </div> 
      <div className="chat_filter">
        <div className="calendar">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
      </div>
 
    </>
  );
};

export default Chat;
