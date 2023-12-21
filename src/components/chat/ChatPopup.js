
import React, { useEffect, useState } from 'react';
import CurrentlyReading from '../Dashboard/CurrentlyReading';
import AuthUser from '../../components/AuthUser';
import close_iconImage from '../../images/close_icon_sr.png';
import sendImage from '../../images/sendVector.png';
import sendblckImage from '../../images/sendVector01.png';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Link } from 'react-router-dom';
import SendAudioImage from '../../images/Send-audio-message.png';
import WaveSendAudioImage from '../../images/Waveform001.gif';
import PaperClipImage from '../../images/paper-clip.png';
import EmojiImage from '../../images/Emoji_icon.png';
import PaperClipblckImage from '../../images/paper-clip_blck.png';
import EmojiblckImage from '../../images/Emoji_icon_black.png';
import { useParams } from 'react-router-dom';
import RecordRTC from 'recordrtc';
import Calendar from 'react-calendar';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChatPopup = ({ chats, onClose, toggle, selectedDate }) => {
  const [imageToShow, setImageToShow] = useState(null);
  const [T, setT] = useState(true);
  const [progressRange, setProgressRange] = useState(0);
  const [activeAudioPlayer, setActiveAudioPlayer] = useState(null);
  const { user } = AuthUser();
  const [userdetail, setUserdetail] = useState({});
  // console.log(user);
  const dataId = sessionStorage.getItem('setChildID');
  //  console.log(dataId);
  const userInfo = sessionStorage.getItem('user');
  const userInfoDetail = JSON.parse(userInfo);
  const spouse = userInfoDetail.spouse;
  const userId = userInfoDetail.id;
  // console.log(userId);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { http } = AuthUser();

  const [username, setUsername] = useState('');
  const { childId } = useParams();
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [recorder, setRecorder] = useState(null);

  const [chatsForDate, setChatsForDate] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [parsedSelectedDate, setParsedSelectedDate] = useState();
  const [highlightDay, setHighlightDay] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDate1, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/messagesActivity/${userId}/${dataId}/${spouse}`);
        const messagesFromApi = response.data;
        console.log('messagesFromApi', messagesFromApi);
        setHighlightDay(messagesFromApi);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, dataId, spouse]);

  const apiResponse = highlightDay;
  const convertApiResponse = (apiResponse) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return Object.values(apiResponse).map(({ month, day }) => ({
      month: months[parseInt(month, 10) - 1], // Adjust month index
      day: parseInt(day, 10),
    }));
  };

  const convertedData = convertApiResponse(apiResponse);
  const highlightedDates = convertedData;

  const fetchMessages = async () => {
    try {
      const response = await http.get(`/messages/${userId}/${dataId}/${spouse}`);
      const messagesFromApi = response.data;
      //  console.log(response.data);
      setMessages(messagesFromApi);
      setChatsForDate(messagesFromApi);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const submit = () => {
    const senderId = userdetail.id;
    const receiverId = dataId;

    http
      .post('/messages', { username, message, senderId, receiverId, spouse })
      .then((response) => {
        // console.log('Message saved:', response.data);
      })
      .catch((error) => {
        // console.error('Error saving message:', error);
      });

    setMessage('');
  };
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
  const fetchUserDetail = () => {
    setUserdetail(userInfoDetail);
    setUsername(userInfoDetail.name.split(' ')[0]);
  };

  useEffect(() => {
    fetchUserDetail();
    fetchMessages();
  }, []);


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
            // console.log('si message sent:', data.message);
            // console.log('Audio message data:', data.data);
          })
          .catch((error) => {
            console.error('Error sending audio message:', error);
          });

        setRecordedAudio(null);
        setRecorder(null);
        fetchMessages();
      };
    }
  };

  function formatTime(dateTimeString) {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedTime = new Date(dateTimeString).toLocaleTimeString('en-US', options);
    return formattedTime;
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

  function extractDay(dateTimeString) {
    const dateObject = new Date(dateTimeString);
    const day = dateObject.getDate();
    return day;
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


  const navigate = useNavigate();
  const [datetoggle, setDatetoggle] = useState(false);
  const [day, setDay] = useState();
  const handleDateChange = (date) => {
    sessionStorage.setItem('DATE', date);
    setDatetoggle(true);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const selectedDay = date.getDate();
    setDay(selectedDay);
    const selectedMonthIndex = date.getMonth();
    const selectedMonth = monthNames[selectedMonthIndex];
    const selectedYear = date.getFullYear();
    const selectedDate = `${selectedMonth} ${selectedDay}${getOrdinalSuffix(selectedDay)}, ${selectedYear}`;
    function getOrdinalSuffix(day) {
      if (day === 1 || day === 21 || day === 31) {
        return 'st';
      } else if (day === 2 || day === 22) {
        return 'nd';
      } else if (day === 3 || day === 23) {
        return 'rd';
      } else {
        return 'th';
      }
    }
    const selected = `${selectedMonth} ${selectedDay},${selectedYear}`;
    sessionStorage.setItem("selectedDate", JSON.stringify(selected));
    console.log("selectedDate", selectedDate);
    console.log("selectedDate", selectedDate);
    navigate(`/parent-dashboard?datetoggle=${datetoggle}&selectedDate=${selectedDate}`);
    const chatsForSelectedDate = messages.filter((message) => {
      const messageDate = new Date(message.created_at).toDateString();
      const selectedDateStr = date.toDateString();
      return messageDate === selectedDateStr;
    });
    setChatsForDate(chatsForSelectedDate);
    console.log("selected", chatsForSelectedDate)
    setDay(extractDay(date.toISOString()));
    setSelectedDate(selectedDate);
  };


  // *****************************Audio Player*************************************

  const [isPlaying, setIsPlaying] = useState({});


  const updateCurrentTime = (player, audio) => {
    const currentTimeDisplay = player.querySelector('.current-time');
    const totalTimeDisplay = player.querySelector('.total-time');

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const formattedCurrentTime = formatTime(audio.currentTime);
    currentTimeDisplay.textContent = formattedCurrentTime;

    if (isFinite(audio.duration)) {
      const formattedTotalTime = ` / ${formatTime(audio.duration)}`;
      totalTimeDisplay.textContent = formattedTotalTime;


      if (audio.currentTime === audio.duration) {

        setT(true);
      }
    }
  };




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
    //  alert( audio.duration);
    // Pause the active audio player if it's different from the clicked player
    if (activeAudioPlayer && activeAudioPlayer !== playerId) {
      const activeAudio = document.getElementById(activeAudioPlayer).querySelector('audio');
      activeAudio.pause();
    }

    if (audio.paused && T) {
      audio.play();
      addclass.classList.remove('pause');
      addclass.classList.add('play');
      setActiveAudioPlayer(playerId);
    } else {
      setT(false);
      addclass.classList.remove('play');
      addclass.classList.add('pause');
      audio.pause();
      setActiveAudioPlayer(null);
    }

    setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [playerId]: !audio.paused }));

    // Update progress range based on audio timeupdate
    audio.addEventListener('timeupdate', () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgressRange(percent);
    });

    updatePlayPauseButton(playerId);
  };
  const updatePlayPauseButton = (playerId) => {
    const playPauseBtn = document.getElementById(playerId).querySelector('.play-pause-btn');
    // playPauseBtn.innerHTML = isPlaying[playerId] ? '&#9616;&#9616;' : '&#9654;';
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
        // progressRange.removeEventListener('input', () => seekTo(playerId));
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

  useEffect(() => {
    const storedSelectedDate = sessionStorage.getItem('selectedDate');
    console.log("storedSelectedDate", storedSelectedDate);
    setParsedSelectedDate(storedSelectedDate ? new Date(JSON.parse(storedSelectedDate)) : null);
  }, [day, selectedDate])

  useEffect(() => {

    function extractDay(dateTimeString) {
      const dateObject = new Date(dateTimeString);
      const day = dateObject.getDate();
      return day;
    }

    if (parsedSelectedDate) {
      console.log("karannnnnnnnnnnnnn");
      const chatsForSelectedDate = messages.filter((message) => {
        const messageDate = new Date(message.created_at).toDateString();
        const selectedDateStr = parsedSelectedDate.toDateString();
        return messageDate === selectedDateStr;
      });


      setChatsForDate(chatsForSelectedDate);
      console.log("selected", chatsForSelectedDate)
      setDay(extractDay(parsedSelectedDate.toISOString()));
      setSelectedDate(selectedDate);
    }

  }, [sessionStorage.getItem('selectedDate'), parsedSelectedDate]);
  console.log("parsedSelectedDate", parsedSelectedDate);
  console.log(" extractDay(message.created_at)", extractDay(message.created_at));
  console.log(" day", day);

  const handleDateChange1 = (date) => {
    // Your date change logic here
    // For example, you can toggle the date in the selectedDates array
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };
  const monthNameToNumber = {
    'January': 1,
    'February': 2,
    'March': 3,
    'April': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'August': 8,
    'September': 9,
    'October': 10,
    'November': 11,
    'December': 12,
  };

  const tileClassName = ({ date, view }) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const monthNumber = monthNameToNumber[month];

    // Check if the current date is in the highlightedDates array
    if (highlightedDates.some((highlightedDate) => highlightedDate.day === day && monthNumber === monthNameToNumber[highlightedDate.month])) {
      return 'highlightedDates';
    }
    return null;
  };

  return (

    <div className="chat-popup">
      <div className="chat-popup_inner">
        <div className="child_chat_messages_dashboard">
          <Scrollbars style={{ height: 250 }}>
            <div className="list-group user_list_sr_outer list-group-flush border-bottom scrollarea">

              {chatsForDate.map((message, index) => (
                <>
                  {message.senderId === userId ? (

                    <>
                      {console.log("message.senderId === userId = true")}
                      {day ? (
                        <>
                          {extractDay(message.created_at) === day ? (
                            <>

                              <div
                                key={index}
                                className={`list-group-item user_list_sr list-group-item-action py-3 lh-tight ${message.senderId === userId ? 'sent-by-user' : ''
                                  }`}
                              >
                                <div className="user_list_groupsr">

                                  <div className="d-flex w-100 align-items-center justify-content-between user_name_label">
                                    <strong className="mb-1">{message.username.charAt(0)}</strong>
                                  </div>

                                  <div className={`col-10 mb-1 small user_message_sr ${message.senderId === userId ? 'sent-by-user-message' : ''
                                    }`}>
                                    {message.message ? (
                                      <>
                                        <p>{message.message}</p>
                                        {/* <p>{day}</p> */}
                                      </>
                                    ) : (
                                      <>
                                        {message.audio_path ? (
                                          <div class="chat-audio">
                                            <div className="audio-player" id={`audio${index}`}>
                                              <div className="play-pause-btn" onClick={() => togglePlayPause(`audio${index}`)}></div>
                                              <div className="progress-bar">
                                                <input type="range" min="0" max="100" value={progressRange} step="1" />
                                                <div className="time-display1">
                                                  <span className="current-time">0:00</span>  <span className="total-time"></span>
                                                </div>
                                              </div>
                                              <audio className={`audio${index}`} preload controls style={{ display: 'none' }}>
                                                <source src={`data:audio/wav;base64,${message.audio_path}`} />
                                              </audio>
                                            </div>
                                          </div>
                                        ) : (
                                          <>
                                            <p>test</p>
                                            <div class="chat-audio">
                                              <div className="audio-player" id={`audio${index}`}>
                                                <div className="play-pause-btn" onClick={() => togglePlayPause(`audio${index}`)}></div>
                                                <div className="progress-bar">
                                                  <input type="range" min="0" max="100" value={progressRange} step="1" />
                                                  <div className="time-display1">
                                                    <span className="current-time">0:00</span>  <span className="total-time"></span>
                                                  </div>
                                                </div>
                                                <audio className={`audio${index}`} preload controls style={{ display: 'none' }}>
                                                  <source src={`data:audio/wav;base64,${message.audio_path}`} />
                                                </audio>
                                              </div>
                                            </div>
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
                            </>
                          ) : (
                            <>
                              <p>No1</p>
                            </>
                          )}
                        </>
                      ) : (<></>)}
                    </>
                  ) : (
                    <>
                      {extractDay(message.created_at) == day ? (
                        <>
                          {console.log("message.senderId === userId = treeue")}
                          {console.log(" extractDay(message.created_at)", extractDay(message.created_at))}
                          {console.log(" day", day)}
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
                                        <div class="chat-audio">
                                          <div className="audio-player" id={`audio${index}`}>
                                            <div className="play-pause-btn" onClick={() => togglePlayPause(`audio${index}`)}></div>
                                            <div className="progress-bar">
                                              <input type="range" min="0" max="100" value={progressRange} step="1" />
                                              <div className="time-display1">
                                                <span className="current-time">0:00</span>  <span className="total-time"></span>
                                              </div>
                                            </div>
                                            <audio className={`audio${index}`} preload controls style={{ display: 'none' }}>
                                              <source src={`data:audio/wav;base64,${message.audio_path}`} />
                                            </audio>
                                          </div>
                                        </div>
                                      ) : (
                                        <div class="chat-audio">
                                          <div className="audio-player" id={`audio${index}`}>
                                            <div className="play-pause-btn" onClick={() => togglePlayPause(`audio${index}`)}></div>
                                            <div className="progress-bar">
                                              <input type="range" min="0" max="100" value={progressRange} step="1" />
                                              <div className="time-display1">
                                                <span className="current-time">0:00</span>  <span className="total-time"></span>
                                              </div>
                                            </div>
                                            <audio className={`audio${index}`} preload controls style={{ display: 'none' }}>
                                              <source src={`data:audio/wav;base64,${message.audio_path}`} />
                                            </audio>
                                          </div>
                                        </div>
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

                                  <div className={`d-flex w-100 align-items-center justify-content-between user_name_label ${message.senderId !== dataId ? 'noone' : ''}`}>
                                    {message.senderId === dataId ? (
                                      <strong className="mb-1">P</strong>
                                    ) : (
                                      <div className='nooone'></div>
                                    )}
                                  </div>


                                  <div className={`col-10 mb-1 small user_message_sr ${message.senderId == userId ? 'sent-by-user-message chat-audio-main' : 'right-side-user'
                                    }`}>
                                    {message.message ? (
                                      <p>{message.message}</p>
                                    ) : (
                                      <>
                                        {message.audio_path ? (
                                          <div class="chat-audio">
                                            <div className="audio-player" id={`audio${index}`}>
                                              <div className="play-pause-btn" onClick={() => togglePlayPause(`audio${index}`)}></div>
                                              <div className="progress-bar">
                                                <input type="range" min="0" max="100" value={progressRange} step="1" />
                                                <div className="time-display1">
                                                  <span className="current-time">0:00</span>  <span className="total-time"></span>
                                                </div>
                                              </div>
                                              <audio className={`audio${index}`} preload controls style={{ display: 'none' }}>
                                                <source src={`data:audio/wav;base64,${message.audio_path}`} />
                                              </audio>
                                            </div>
                                          </div>
                                        ) : (
                                          <div class="chat-audio">
                                            <div className="audio-player" id={`audio${index}`}>
                                              <div className="play-pause-btn" onClick={() => togglePlayPause(`audio${index}`)}></div>
                                              <div className="progress-bar">
                                                <input type="range" min="0" max="100" value={progressRange} step="1" />
                                                <div className="time-display1">
                                                  <span className="current-time">0:00</span>  <span className="total-time"></span>
                                                </div>
                                              </div>
                                              <audio className={`audio${index}`} preload controls style={{ display: 'none' }}>
                                                <source src={`data:audio/wav;base64,${message.audio_path}`} />
                                              </audio>
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                  {message.senderId !== dataId ? (

                                    <div className="d-flex w-100 align-items-center justify-content-between user_name_label">
                                      {message.senderId !== dataId ? (
                                        <strong className="mb-1">{message.username.charAt(0)}</strong>
                                      ) : (
                                        <></>

                                      )}
                                    </div>
                                  ) : (<></>)}


                                </div>
                                <div className="user_time_sr">
                                  <span>{formatTime(message.created_at)}</span>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ) : (<></>)}
                    </>

                  )}
                </>
              ))}
            </div>
          </Scrollbars>
          <div className='main_send_message_container'>
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
                  <button onClick={submit}>
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
        </div>
      </div >
      {/* </div> */}
      < Calendar onChange={handleDateChange} value={parsedSelectedDate} tileClassName={tileClassName} />

    </div >
  );
};

export default ChatPopup;

 
