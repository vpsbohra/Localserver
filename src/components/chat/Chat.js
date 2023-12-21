import React, { useEffect, useState, useRef } from 'react';
import Pusher from 'pusher-js';
import AuthUser from '../AuthUser';
import sendImage from '../../images/sendVector.png';
import { Link, Navigate } from 'react-router-dom';
import PaperClipImage from '../../images/paper-clip.png';
import EmojiImage from '../../images/Emoji_icon.png';
import SendAudioImage from '../../images/Send-audio-message.png';
import WaveSendAudioImage from '../../images/Waveform001.gif';
import { useParams } from 'react-router-dom';
import RecordRTC from 'recordrtc';
import Calendar from 'react-calendar';
import ChatPopup from './ChatPopup';
import { useNavigate } from "react-router-dom";
import InputEmoji from 'react-input-emoji'
import Picker from 'emoji-picker-react';
import Play_audio from '../../images/Play_audio_message.png';
import Pause_audio from '../../images/pause_btn.png';
import axios from "axios";

const Chat = ({ dataId, userId }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileMessage, setFileMessage] = useState('');
  const [imageToShow, setImageToShow] = useState(null);
  const [T, setT] = useState(true);
  const [progressRange, setProgressRange] = useState(0);
  const [activeAudioPlayer, setActiveAudioPlayer] = useState(null);
  const [day, setDay] = useState();
  const [highlightDay, setHighlightDay] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // start();
//  fetchData();
    let timer;

    if (recorder) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [recorder]);
  const pauseRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const audioBlob = recorder.getBlob();
        setRecordedAudio(audioBlob);
        setRecorder(null);
      });
    }
  };
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

  const onEmojiClick = (event, emojiObject) => {
    setMessage(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false);
    console.log("emojiObject.emoji", emojiObject.emoji);
    console.log("emojiObject", emojiObject);

  };

  const handleDateChange = (date) => {
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
    navigate(`/parent-dashboard?datetoggle=${datetoggle}&selectedDate=${selectedDate}`);
    const chatsForSelectedDate = messages.filter((message) => {
      const messageDate = new Date(message.created_at).toDateString();
      const selectedDateStr = date.toDateString();
      return messageDate === selectedDateStr;
    });
    setSelectedDate(date);
    sessionStorage.setItem('DATE',date);
    console.log("selectedDate", selectedDate)
    setChatsForDate(chatsForSelectedDate);
    setShowPopup(true);
    console.log("Date11", date);


    // Assuming 'date' is a Date object
    const selectedDatee = new Date(date);

    // Format the date as "December 8, 2023"
    const formattedDate = selectedDatee.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    // Store the formatted date in sessionStorage
    sessionStorage.setItem('selectedDate', `"${formattedDate}"`);

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
    const audioPlayers = document.querySelectorAll('.audio-player');

    for (const player of audioPlayers) {
      const audio = player.querySelector('audio');
      setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: audio.paused }));

      audio.addEventListener('loadedmetadata', () => {
        updateCurrentTime(player, audio);
      });

      audio.addEventListener('play', () => {
        setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: true }));
      });

      audio.addEventListener('pause', () => {
        setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: false }));
      });
    }

    return () => {
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
      console.log("messages", response.data);
      setMessages(messagesFromApi);
      console.log(messagesFromApi);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  const fetchUserDetail = () => {
    setUserdetail(user);
    setUsername(user.name.split(' ')[0]);
  };
  const [url, setUrl] = useState('');
  const submit = async () => {
    console.log('attached_file_type:', fileMessage)
    const senderId = userdetail.id;
    const receiverId = dataId;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('message', message);
    formData.append('senderId', senderId);
    formData.append('receiverId', receiverId);
    formData.append('spouse', spouse);
    formData.append('attached_file', selectedImage);
    formData.append('attached_file_type', fileMessage);
    formData.append('total_second', 0);

    http.post('/messages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(async (response) => {
        setFname(null);
        setMessage('');
        setFileMessage('');
        setSelectedImage(null);
        setSelectedFile(null);
        console.log('Message saved:', response.data);
        await fetchMessages();
        setSelectedImage(null);
        setFileMessage('');
        setSelectedFile(null);
      })
      .catch((error) => {
        console.error('Error saving message:', error);
      });

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
        setRecorder(null);

      });
    }
  };
  const sendAudioMessage = () => {
    setElapsedTime(0);

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
          .post('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/audio-messages', { username, senderId, message, receiverId, spouse, base64Audio,total_second:elapsedTime?elapsedTime: 0 })
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
  const [fname, setFname] = useState();
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result.split(',')[1];
        const fileExtension = file.name.split('.').pop();
        setFname(file.name);
        setSelectedFile(file);
        setFileMessage(`${fileExtension}`);
        // const imageUrl = URL.createObjectURL(response.data);
        setSelectedImage(base64Image);
        console.log("selected file", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    console.log(chosenEmoji, "currentEmoji");
  }, [chosenEmoji]);


  // *****************************Audio Player*************************************
  const [isPlaying, setIsPlaying] = useState({});
  const updateCurrentTime = (player, audio) => {
    console.log("AUDIO",audio);
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
    // alert(audio.duration);
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

  // const seekTo = (playerId) => {
  //   console.log("seek");
  //   const player = document.getElementById(playerId);
  //   const audio = player.querySelector('audio');
  //   const progressRange = player.querySelector('input[type="range"]');
  //   const seekTime = (progressRange.value / 100) * audio.duration;
  //   audio.currentTime = seekTime;
  //   updateCurrentTime(player, audio);
  // };

  //*************************Dynamic circle letter */
  // console.log("spouse",spouse);
  const firstCharacterP = spouse.charAt(0);
  // console.log("firstCharacter",firstCharacterP);


  const ChildName = sessionStorage.getItem('setChildName');
  const firstCharChild = ChildName.charAt(0);

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
                          <strong className="mb-1">{firstCharChild}</strong>
                        </div>
                        <div className={`right-side-user col-10 mb-1 small user_message_sr ${message.senderId == userId ? 'sent-by-user-message' : ''
                          }`}>

                          {message.message ? (
                            <div key={index}>
                              <p>{message.message}</p>

                            </div>
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
                                  {message.voice_answer == "NULL" ? (
                                    // Display base64 image here
                                    <img src={`data:image/png;base64,${message.image}`} alt="Attached" />
                                  ) : (
                                    <>
                                      <p>{message.question_voice_answer}</p>

                                      <div class="chat-audio">
                                        <div className="audio-player" id={`audio${index}`}>
                                          <div className="play-pause-btn" onClick={() => togglePlayPause(`audio${index}`)}></div>
                                          <div className="progress-bar">
                                            <input type="range" min="0" max="100" value={progressRange} step="1" />
                                            <div className="time-display2">
                                              <span className="current-time">0:00</span>  <span className="total-time"> </span>
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
                            </>
                          )}
                        </div>
                      </div>
                      <div className="user_time_sr">
                        <label>{ChildName}</label> <span>{formatTime(message.created_at)}</span>
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
                              {message.message ? (<>
                                <p>{message.message}</p>
                              </>
                              ) : (
                                <>
                                  {message.audio_path ? (
                                    <div class="chat-audio">
                                      <div className="audio-player" id={`audio${index}`}>
                                        <div className="play-pause-btn" onClick={() => togglePlayPause(`audio${index}`)}></div>
                                        <div className="progress-bar">
                                          <input type="range" min="0" max="100" value={progressRange} step="1" />
                                          <div className="time-display3">
                                            <span className="current-time">0:00</span>  <span className="total-time"></span>
                                          </div>
                                        </div>
                                        <audio className={`audio${index}`} preload controls style={{ display: 'none' }}>
                                          <source src={`data:audio/wav;base64,${message.audio_path}`} />
                                        </audio>
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
                          </div>
                          <div className="user_time_sr">
                            <label>{ChildName}</label> <span>{formatTime(message.created_at)}</span>
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

                              <div className={`chat-audio-main col-10 mb-1 small user_message_sr ${message.senderId == userId ? 'sent-by-user-message' : ''}`}>
                                {message.message ? (
                                  <>
                                    <p>{message.message}</p>
                                  </>
                                ) : (
                                  <>
                                    {message.attached_file && (
                                      <>
                                        {console.log("File Type:", message.attached_file_type)}
                                        {console.log("Base64 Data:", message.attached_file)}

                                        {message.attached_file_type === "jpg" || message.attached_file_type === "png" || message.attached_file_type === "gif" ? (
                                          <img
                                            src={`data:image/${message.attached_file_type};base64,${message.attached_file}`}
                                            alt="Attached"
                                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                                          />
                                        ) : null}

                                        {message.attached_file_type === "mp4" ? (
                                          <video controls style={{ maxWidth: '100%', maxHeight: '200px' }}>
                                            <source src={`data:video/mp4;base64,${message.attached_file}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                          </video>
                                        ) : null}

                                        {message.attached_file_type === "mp3" ? (
                                          <audio controls>
                                            <source src={`data:audio/mp3;base64,${message.attached_file}`} type="audio/mp3" />
                                            Your browser does not support the audio tag.
                                          </audio>
                                        ) : null}

                                        {message.attached_file_type === "pdf" ? (
                                          <>
                                            Attachment : PDF
                                            <a href={`data:application/pdf;base64,${message.attached_file}`} download="attached.pdf">
                                              (Download)
                                            </a>
                                          </>
                                        ) : null}

                                        {message.attached_file_type === "docx" ? (
                                          <>
                                            Attachment : DOCX
                                            <a href={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${message.attached_file}`} download="attached.docx">
                                              (Download)
                                            </a>
                                          </>
                                        ) : null}

                                        {message.attached_file_type === "txt" ? (
                                          <>
                                            Attachment : ${fname}
                                            <a
                                              href={`data:text/plain;base64,${message.attached_file}`}
                                              download="attached.txt"
                                            >
                                              (Download)
                                            </a></>
                                        ) : null}
                                      </>
                                    )}
                                    {message.audio_path ? (
                                      <div class="chat-audio">
                                        <div className="audio-player" id={`audio${index}`}>
                                          <div className="play-pause-btn" onClick={() => togglePlayPause(`audio${index}`)}></div>
                                          <div className="progress-bar">
                                            <input type="range" min="0" max="100" value={progressRange} step="1" />
                                            <div className="time-display4">
                                              <span className="current-time">0:00</span>  <span className="total-time"> </span>
                                            </div>
                                          </div>
                                          <audio className={`audio${index}`} preload controls style={{ display: 'none' }}>
                                            <source src={`data:audio/wav;base64,${message.audio_path}`} />
                                          </audio>
                                        </div>
                                      </div>

                                    ) : (
                                      <>
                                        {message.voice_answer == "NULL" ? (<></>
                                        ) : (<></>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                              <div className="d-flex w-100 align-items-center justify-content-between user_name_label">
                                <strong className="mb-1">{firstCharacterP}</strong>
                              </div>
                            </div>
                            <div className="user_time_sr">
                              <label>{spouse}</label><span>{formatTime(message.created_at)}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>

        <div className="chat_form_input cht-new">

          <input
            className="form-control"
            placeholder={fname ? `Attached file : ${fname}` : "Write a message"}

            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="chat_form_input_btncnrl">
            <div className="chat_form_input_btncnrlLeft" >
              <div style={{ position: 'relative' }}>
                <button className="confirm">
                  <img src={PaperClipImage} alt="protected" />
                </button>
                <input
                  className='file_choise_profile'
                  type="file"
                  onChange={handleFileChange}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                />

              </div>
              <div><img
                className="emoji-icon"
                src={EmojiImage}
                onClick={() => setShowPicker(val => !val)} />
                {showPicker && <Picker
                  pickerStyle={{ width: '100%' }}
                  onEmojiClick={onEmojiClick} />}
              </div>
            </div>
            <div className={isPickerVisible ? 'd-block' : 'd-none'}>
              {/* <Picker onEmojiClick={onEmojiClick} /> */}
            </div>
            <div className="chat_form_input_btncnrlRight chat_form_input_btncnrlRight-parrent">
              <button onClick={submit}>
                <img src={sendImage} alt="protected" />
              </button>
              <button onClick={startRecording}>
                <img src={SendAudioImage} alt="protected" />
              </button>
              {recorder && (
                <>
                  <img src={WaveSendAudioImage} alt="protected" />
                  <button className='stop_reco_btn' onClick={stopRecording}>{`0:${elapsedTime.toString().padStart(2, '0')}`} Stop</button>
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
          <Calendar onChange={handleDateChange} value={selectedDate} tileClassName={tileClassName} />
        </div>
      </div>

    </>
  );
};

export default Chat;