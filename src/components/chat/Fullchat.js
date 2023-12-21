import React, { useEffect, useState,useRef } from "react";
import Pusher from "pusher-js";
import AuthUser from "../AuthUser";
import sendImage from "../../images/sendVector.png";
import { Link, Navigate } from "react-router-dom";
import PaperClipImage from "../../images/paper-clip.png";
import EmojiImage from "../../images/Emoji_icon.png";
import SendAudioImage from "../../images/Send-audio-message.png";
import WaveSendAudioImage from "../../images/Waveform001.gif";
import { useParams } from "react-router-dom";
import RecordRTC from "recordrtc";
import Calendar from "react-calendar";
import ChatPopup from "./ChatPopup";
import { useNavigate } from "react-router-dom";
import ForwardPopup from "../Dashboard/forward_Popup";
import Facebook from "../../images/Facebook_Icon.png";
import Whatsapp from "../../images/whatsapp_Icon.png";
import Copy from "../../images/Copy_Link.png";
import axios from "axios";
import Copy_small from "../../images/Copy.png";
import Chat_hide from "../../images/chat-hide-icon.png";

import TenBack from '../../images/TenBack.png';
import TenForward from '../../images/Tenforward.png';


import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Chat from "./Chat";
import { Scrollbars } from 'react-custom-scrollbars-2';
import CurrentlyReading from "../Dashboard/CurrentlyReading";
const Fullchat = ({ selectedDate, dataId }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  const [members, setMembers] = useState([]);
  const [Audio, setAudio] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [username, setUsername] = useState(null);
  const [isParentalSwitchActive, setIsParentalSwitchActive] = useState(false);
  const { http } = AuthUser();
  const { user } = AuthUser();
  const [userId, setUserId] = useState("");
  const [link, setLink] = useState("https://link.kidzconnect.xxxxx");
  const [isCopied, setIsCopied] = useState(false);
  const [displayedMembers, setDisplayedMembers] = useState([]);
  const [more, setMore] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedDate1, setSelectedDate] = useState(null);
  const [chatsForDate, setChatsForDate] = useState([]);
  const userInfo = sessionStorage.getItem('user');
  const userInfoDetail = JSON.parse(userInfo);
  const spouse = userInfoDetail.spouse;
  const userId1 = userInfoDetail.id;
  const dataId1 = sessionStorage.getItem('setChildID');
  const d = sessionStorage.getItem('DATE');
  const [parsedSelectedDate,setParsedSelectedDate]= useState();
  const navigate = useNavigate();
  const [datetoggle, setDatetoggle] = useState(false);
  const [day, setDay] = useState();
  const [highlightDay, setHighlightDay] = useState([]);
  const [childName, setChildName] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime2, setElapsedTime2] = useState(0);
const [parent,setParent]=useState('');
  useEffect(() => {
    let interval;
    if(elapsedTime == elapsedTime2){
      setElapsedTime2(elapsedTime);
    }else{if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime2((prevTime) => prevTime + 1);
      }, 1000);
    }}
    

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/messagesActivity/${userId1}/${dataId1}/${spouse}`);
        const messagesFromApi = response.data;
        console.log('messagesFromApi', messagesFromApi);
        setHighlightDay(messagesFromApi);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId1, dataId1, spouse]);


  useEffect(() => {
    setChildName(sessionStorage.getItem('setChildName'));
    console.log("childName", childName);
    console.log("childName", childName);
  }, [childName])
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
  const [selectedDates, setSelectedDates] = useState([]);
  useEffect(() => {
   fetchAudio();
   
  }, [sessionStorage.getItem('DATE')]);
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  const [taudio,setTaudio]=useState(false);
  const handleDateChange = (date) => {
   
    sessionStorage.setItem('DATE',date);
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
    sessionStorage.setItem("selectedDate",JSON.stringify(selected));
    console.log("selectedDate",selectedDate);
    console.log("selectedDate",selectedDate);
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
 useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const user = JSON.parse(storedUser);
    const { id } = user;
    setUserId(id);
    setUsername(user.name);
    console.log(user);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.spouse) {
        setSelectedItem(user.spouse);
      }
    }
    fetchAudio();
    fetchMembers();
  }, []);
  const extractDay = (dateTimeString) => {
    const dateObject = new Date(dateTimeString);
    const day = dateObject.getDate();
    return day;
  };
  const [question,setQuestion]=useState('');
  const [totalSeconds,setTotalseconds]=useState(0);
  const playAudio = (audioSrc, isAutoplay, question,sum) => {
    setTotalseconds(sum);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const audioElement = document.getElementById('src');
       setQuestion(question);
        if (audioElement) {
          audioElement.src = `data:audio/wav;base64,${audioSrc}`;
          audioElement.type = 'audio/wav';
          audioElement.controls = true;
          audioElement.onended = () => {
            audioElement.onended = null; // Remove the previous 'onended' event handler
            resolve(); // Resolve the promise when audio ends
          };
          if (isAutoplay) {
            audioElement.play(); // Start playing the audio only if isAutoplay is true
          }
        } else {
          reject('Audio element not found');
        }
      }, 1000);
      
    });
  };
  const [ length,setLength]=useState(0);
const fetchAudio = async () => {
    try {
      const response = await http.get(`/messages-audio/${userId1}/${dataId1}/${spouse}`);
      
      const audioFromApi = response.data;
      
      const selectedDay = new Date(d);
      var dataaudio = [];
      var question = [];
      var seconds = [];
      if (Array.isArray(audioFromApi)) {
        audioFromApi.forEach(item => {
          const itemDate = new Date(item.created_at);
          if (
            item.audio_path !== null &&
            itemDate.getDate() === selectedDay.getDate() &&
            itemDate.getMonth() === selectedDay.getMonth() &&
            itemDate.getFullYear() === selectedDay.getFullYear()
          ) {
            dataaudio.push(item.audio_path);
            question.push(item.question_voice_answer);
            seconds.push(item.total_second);

            console.log("!", dataaudio);
          } else if (
            item.voice_answer !== null &&
            itemDate.getDate() === selectedDay.getDate() &&
            itemDate.getMonth() === selectedDay.getMonth() &&
            itemDate.getFullYear() === selectedDay.getFullYear()
          ) {
            dataaudio.push(item.voice_answer);
            question.push(item.question_voice_answer);
            seconds.push(item.total_second);

            console.log("!1", dataaudio);
          }
        });
      } else {
        const itemDate = new Date(audioFromApi.created_at);
        if (
          audioFromApi.audio_path !== null &&
          itemDate.getDate() === selectedDay.getDate() &&
          itemDate.getMonth() === selectedDay.getMonth() &&
          itemDate.getFullYear() === selectedDay.getFullYear()
        ) {
          dataaudio.push(audioFromApi.audio_path);
          question.push(audioFromApi.question_voice_answer);
          seconds.push(audioFromApi.total_second);


        } else if (
          audioFromApi.voice_answer !== null &&
          itemDate.getDate() === selectedDay.getDate() &&
          itemDate.getMonth() === selectedDay.getMonth() &&
          itemDate.getFullYear() === selectedDay.getFullYear()
        ) {
          dataaudio.push(audioFromApi.voice_answer);
          question.push(audioFromApi.question_voice_answer);
          seconds.push(audioFromApi.total_second);


        }
      }
      setLength(seconds.length);
      let sum = length;
      for (let i= 0; i<seconds.length;i++){

        sum+=seconds[i];
      }

      if (dataaudio.length > 0) {
        sessionStorage.setItem("TOGGLE",false);
        setTaudio(true);
      } else {
        sessionStorage.setItem("TOGGLE",true);

        setTaudio(false);
      }
  
      for (let i = 0; i < dataaudio.length; i++) {
        let audioFile = dataaudio[i];
        const isAutoplay = i > 0;
        await playAudio(dataaudio[i], isAutoplay,question[i],sum);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };
  
  const handleCopyClick = () => {
    const linkInput = document.getElementById("link-input");
    linkInput.select();
    document.execCommand("copy");
    setIsCopied(true);
  };
  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        `https://phplaravel-1142377-3976235.cloudwaysapps.com/api/members/${userId}`
      );
      const membersData = response.data;
      setMembers(membersData);
      setDisplayedMembers(membersData.slice(0, 2));
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };
  const [hidden, setHidden] = useState(false);
  const remainingMembersCount = members.length - displayedMembers.length;
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [hide, setHide] = useState(true);
  const handleShowAllMembersClick = () => {
    setShowAllMembers(true);
    setHide(false);
    setHidden(true);
  };
  const handleHideClick = () => {
    setHidden(false);
    setShowAllMembers(false);
    setHide(true);
  };
  const colours = [
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6'
  ];
  // *****************************Audio Player*************************************
  const [isPlaying, setIsPlaying] = useState({});
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;
  useEffect(() => {
    const audioPlayers = document.querySelectorAll('.audio-player');
    for (const player of audioPlayers) {
      const audio = player.querySelector('audio');
      setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: false }));
      updateCurrentTime(player, audio);
    }
  }, [isPlayingRef]);
  const togglePlayPause = (playerId) => {
    const audioPlayer = document.getElementById(playerId);
    const audio = audioPlayer.querySelector('audio');
    const addclass = audioPlayer.querySelector('.play-pause-btn');
    if (audio.paused) {
      audio.play();
      addclass.classList.remove('pause');
      addclass.classList.add('play');
    } else {
      addclass.classList.remove('play');
      addclass.classList.add('pause');
      audio.pause();
    }
    handleStartStop();

    setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [playerId]: !audio.paused }));
    updatePlayPauseButton(playerId);
  };
  const updatePlayPauseButton = (playerId) => {
    const playPauseBtn = document.getElementById(playerId).querySelector('.play-pause-btn');
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
    // currentTimeDisplay.textContent = formattedTime;
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    if (isFinite(totalSeconds)) {
    const formattedTotalTime = `/ ${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
      // totalTimeDisplay.textContent = formattedTotalTime;
    }
  };
useEffect(()=>{
  const storedSelectedDate = sessionStorage.getItem('selectedDate');
 setParsedSelectedDate (storedSelectedDate ? new Date(JSON.parse(storedSelectedDate)) : null);
},[sessionStorage.getItem('selectedDate')])

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
     <div className="fullconver_chat">
        {taudio ? (<><div className="audio_fullcon audio_fullcon-cstm">
          {question?(<>
          <marquee>{question}</marquee>
          </>):(<>Daisy's Response</>)}
		            

          <div className="audio-player" id="audio">
            <div className="audio-player_inner">
              <img src={TenBack}/>
              <div className="play-pause-btn" onClick={() => togglePlayPause("audio")}></div>
              <img src={TenForward}/>
            </div>
            <div className="progress-bar">
              <input type="range" min="0" max="100" value="0" step="1" onChange={() => seekTo("audio")} />
              <div className="time-display">
                <span>{formatTime(elapsedTime2)}</span> / <span >{formatTime(totalSeconds)}</span>
              </div>
            </div>
            <audio className="audio" id="src" src='' controls style={{ display: 'none' }} />
          </div>
        </div></>) : (<>No Recordings for this day</>)}
        <span className={`profile_type_letters_outer ${hide ? "" : "space"}`}>



        {taudio ? (
          <>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip">{`${spouse} `}</Tooltip>}
            >
              <span className={`profile_type_letter ${colours[0]}`}>

                <span>
                  {spouse ? spouse.charAt(0) : ""}
                </span>
              </span>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip">{`${childName} `}</Tooltip>}
            >
              <span className={`profile_type_letter ${colours[1]}`}>
                <span>
                  {typeof childName === 'string' && childName.length > 0 ? childName.charAt(0) : ""}
                </span>

              </span>
            </OverlayTrigger>
          </>
        ):(
          <></>
        )}

          {/* {remainingMembersCount > 0 && hide && (
            <>
              <span className="hide_more profile_type_letter"
                onClick={handleShowAllMembersClick}
              >
                {`+ ${remainingMembersCount}`}
              </span>
            </>
          )} */}
          {/* {hidden && (<span className="hide_more profile_type_letter" onClick={handleHideClick}><img src={Chat_hide} /></span>
          )} */}
        </span>
        {hide === "false" ? <></> : <></>}
        <div className="social_icons">
          <a
            className="social_icons_item"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              link
            )}`}
            target="_blank"
          >
            <img src={Facebook} alt="Facebook" />
            <span>Facebook</span>
          </a>
          <a
            className="social_icons_item"
            href="https://web.whatsapp.com/send?text= Please Visit https://link.kidzconnect.xxxxx"
            target="_blank"
          >
            <img src={Whatsapp} />
            <span>Whatsapp</span>
          </a>
          <div className="social_icons_item">
            <img
              src={Copy}
              alt="Copy Small"
              onClick={handleCopyClick}
              style={{ cursor: "pointer" }}
            />
            <span onClick={handleCopyClick} style={{ cursor: "pointer" }}>
              {isCopied ? "Link Copied!" : "Copy Link"}
            </span>
          </div>
        </div>
        <div className="copylink">
          <input
            style={{ display: "none" }}
            type="text"
            id="link-input"
            value={link}
            readOnly
          />
        </div>
        <Calendar  onChange={handleDateChange} value={parsedSelectedDate} tileClassName={tileClassName} />
      </div>
    </>
  );
};
export default Fullchat;