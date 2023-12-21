import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecordRTC from 'recordrtc';
import ParentalSwitch from '../../images/Home.png';
import Record from '../../images/Record button.png';
import WaveSendAudioImage from '../../images/Ongoing Recording.png';
import WaveSendAudioImage1 from '../../images/Paused Recording.png';
import AuthUser from '../AuthUser';
import axios from 'axios';
import Replay from '../../images/Replay Audio.png'
import SharePopup from './share_popup';
import Share from '../../images/Share 3.png';
import Sharebtn from '../../images/Share.png';
const RecordedAnswer = () => {
  const { token } = AuthUser();
  const { http } = AuthUser();
  const setChildID = sessionStorage.getItem('setChildID');
  const storyId = sessionStorage.getItem('childStory');
  const { user } = AuthUser();

  const [questions, setQuestions] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(localStorage.getItem('question'));
  const [elapsedTime, setElapsedTime] = useState(0);
  const [recorder, setRecorder] = useState(null);
  const [show, setShow] = useState(true);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [sendAudio, setSendAudio] = useState(null);
  const [currentaudio, setAudio] = useState();
  const [showReplayButton, setShowReplayButton] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
const [ currentQuestion,setCurrentQuestion]=useState(0);
  const addBodyClass = () => {
    document.body.classList.add('popup_active');
  };

  const removeBodyClass = () => {
    document.body.classList.remove('popup_active');
  };
  const handleShare = () => {
    setShowSharePopup(true);
    addBodyClass();
  }

  const handleCloseSharePopup = () => {

    setShowSharePopup(false);
    removeBodyClass();
  };
  const handleAudioEnded = () => {
    // Show the replay button when the audio ends
    setShowReplayButton(true);
  };
  const handleReplay = () => {
    // Hide the replay button and replay the audio
    setShowReplayButton(false);
    let audio = new Audio(currentaudio);
    audio.play();
    audio.addEventListener('ended', handleAudioEnded);

  };
  // useEffect(() => {
  //   // Play audio only once when the page loads
  //   let audio = new Audio(currentaudio);
  //   audio.play();

  //   // Add event listener to handle audio ended
  //   audio.addEventListener('ended', handleAudioEnded);

  //   // Clean up the audio element and remove event listener when the component unmounts
  //   return () => {
  //     audio.removeEventListener('ended', handleAudioEnded);
  //     audio = null;
  //   };
  // }, [currentaudio]);
  useEffect(() => {
    if (currentQuestionIndex === localStorage.getItem('question')) {
      let audio = new Audio(currentaudio);
      audio.play();
      audio.addEventListener('ended', handleAudioEnded);
      return () => {
        audio.removeEventListener('ended', handleAudioEnded);
      };
    }
  }, [currentaudio, currentQuestionIndex]);
  
  const fetchData = async () => {
    const x = localStorage.getItem('question');
    setCurrentQuestionIndex(x);
    try {
      const response = await axios.get('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/stories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      
  
      const x = sessionStorage.getItem('sid');
      const y = sessionStorage.getItem('childStory');
      console.log("Y",y);
      console.log("X",x);
      const storyId =y;
      console.log("Response data",response.data);
      const selectedStory = response.data.find(story => story.id === parseInt(storyId, 10));

      console.log("Storyid",storyId);
      console.log("Data", selectedStory);
  
      if (selectedStory) {
        const mcqData = selectedStory.story_mcq;
        const questionArray = mcqData.split('-');
        setQuestions(questionArray);
  console.log("KJHSDKJFHKSLJDHFKJLSHDSKJF",currentQuestionIndex);
        const audioData = selectedStory.question_audio.split(',');
        const audioUrl = audioData[currentQuestionIndex].trim();
        setAudio(audioUrl);
        console.log("AUDIO",audioUrl);
  
        // Set other states or perform additional logic as needed
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // const fetchQuestions = async () => {
  //   try {
  //     const response = await axios.get('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/stories', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const x = sessionStorage.getItem('sid');
  //     const y = sessionStorage.getItem('childStory');
  //     const storyId = x?x:y;
  //     const selectedStory = response.data.find(story => story.id === storyId);
  //     console.log("question data", selectedStory);

  //     if (selectedStory) {
  //       const mcqData = selectedStory.story_mcq;
  //       const questionArray = mcqData.split('-');
  //       setQuestions(questionArray);

  //       const audioData = selectedStory.question_audio.split(',');
  //       const audioUrl = audioData[currentQuestionIndex].trim();
  //       setAudio(audioUrl);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching questions:', error);
  //   }
  // };

  // const fetchStories = async () => {
  //   const x = localStorage.getItem('question');
  //   setQuestion(x);
  //   try {
  //     const response = await axios.get('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/stories', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const storyId = sessionStorage.getItem('childStory');
  //     console.log(storyId);
  //     setData(response.data.find(story => story.id === parseInt(storyId, 10)));
  //     console.log("Story data", data);
  //     const audiodata = data.question_audio.split(',');
  //     const audioUrl = audiodata[question].trim();
  //     // Assuming setQuestions and questions are properly defined
  //     data.forEach((item, index) => {
  //       if (item.id == storyId) {
  //         const MCQ = item.story_mcq;
  //         console.log(MCQ);
  //         const arry = [];
  //         var answ = MCQ.split('-');
  //         arry.push(answ);
  //         // Assuming setQuestions is a state-setting function
  //         setQuestions(answ);
  //         console.log('Questions', questions);
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error fetching stories:', error);
  //   }
  // };
  useEffect(() => {
    const x = localStorage.getItem('question');
    setCurrentQuestion(x);
    fetchData();
  }, [token, currentQuestionIndex]);
  

  const startRecording = async () => {
    setShow(null);
    setRecordedAudio(null);
    setRecorder(null);
    setSendAudio(null);

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

  const sendAudioMessage = () => {

    setElapsedTime(0);
    const username = user.name.split(' ')[0];
    const senderId = setChildID;
    const receiverId = user.id;
    const spouse = user.spouse;

    if (recordedAudio) {
      const audioFile = new File([recordedAudio], 'audio.wav', { type: 'audio/wav' });
      const reader = new FileReader();

      reader.readAsDataURL(audioFile);
      reader.onloadend = function () {
        const base64Audio = reader.result.split(',')[1];
        const formData = new FormData();
        formData.append('audio', base64Audio);
        formData.append('question', questions[currentQuestionIndex]);


        http.post('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/audio-messages-question', {
          username,
          senderId,
          receiverId,
          spouse,
          base64Audio,
          question_voice_answer: questions[currentQuestionIndex],
          total_second:elapsedTime,
        })
          .then((data) => {
            console.log('si message sent:', data.message);
            console.log('Audio message data:', data.data);
          })
          .catch((error) => {
            console.error('Error sending audio message:', error);
          });

        setRecordedAudio(null);
        setRecorder(null);
        setSendAudio(base64Audio);
      };
    }
  };
  const pauseRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const audioBlob = recorder.getBlob();
        setRecordedAudio(audioBlob);
        setRecorder(null);
      });
    }
  };

  const handleNextQuestion = () => {
    // var audiodata = "https://phplaravel-1142377-3976235.cloudwaysapps.com/stories/audio/Story_1-1.wav,https://phplaravel-1142377-3976235.cloudwaysapps.com/stories/audio/Story_1-2.wav,https://phplaravel-1142377-3976235.cloudwaysapps.com/stories/audio/Story_1-3.wav,https://phplaravel-1142377-3976235.cloudwaysapps.com/stories/audio/Story_1-4.wav,https://phplaravel-1142377-3976235.cloudwaysapps.com/stories/audio/Story_1-5.wav"
    // var audioArray = audiodata.split(',');
console.log("CurrentQuestionIndex",currentQuestionIndex);
console.log("Total Questions",questions.length-1);
const x = localStorage.getItem('question');
setCurrentQuestionIndex(x);
if (currentQuestion < questions.length - 1) {
  localStorage.setItem("question",parseInt(currentQuestion,10)+ 1);
  setCurrentQuestionIndex(localStorage.getItem('question'));
  update();
  const audiodata = data?.question_audio?.split(',') || [];
  console.log("AUDIO DATA", audiodata);
  const audioUrl = audiodata[currentQuestionIndex + 1]?.trim();
  setAudio(audioUrl);
  setRecordedAudio(null);
  setRecorder(null);
  setSendAudio(null);
  setShow(true);
  // setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  console.log(audioUrl);
  console.log("currentQuestionIndex", currentQuestionIndex);
} else {
  localStorage.setItem('question',0);
      update();
      // Redirect to "/all-activity" when the last question is answered
      setTimeout(() => {
        window.location.href = "/all-activity";


      }, 2000);
    }
  };
const [question,setQuestion]=useState(0);
  const [data, setData] = useState();
  

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

  const update = () => {
    const a = sessionStorage.getItem('setChildID');
    const b = sessionStorage.getItem('childId');
    const chid = a?a:b;
    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const x = localStorage.getItem("question");
    const memberData = {
      current_question: x.toString(),
    };
    axios.patch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-current-question/${chid}`, memberData, { headers })
      .then(response => {
        console.log("response", response.data);
      })
      .catch(error => {
        console.log("Error updating the field");
      });
  }


  return (
    <>
      <div className='chosen-story-section all_activity_sr'>

        <Link className="nav-link top_navbtnsr" to="/Kids-view"><img src={ParentalSwitch} alt='' /></Link>
        {showReplayButton && (
          <button className='replay_btn no-background' onClick={handleReplay}>
            <img src={Replay} />
          </button>
        )}


        <button className='close-button Share_btn_sr' onClick={handleShare}>
          <Link className="nav-link"><img src={Sharebtn} /> </Link>
        </button>
        {showSharePopup && (
          <SharePopup onClose={handleCloseSharePopup} />
        )}
        <div className='all_activity_sr_inner'>
          <div className='feedback-container-story'>
            <h2>{questions[currentQuestion]}</h2>
            <p>Press play and record your response</p>
            <div className='record-section'>
              <div className="chat_form_input_btncnrlRight">
                {show && (
                  <button className='no-background' onClick={startRecording}>
                    <img src={Record} alt="protected" />
                  </button>
                )}
                {recorder && (
                  <>
                    <div className='RecordedAnswer_recorder'>
                      <p className='timing_recoder'>{`0:${elapsedTime.toString().padStart(2, '0')}`}</p>
                      <button className='stop_reco_btn no-background' onClick={pauseRecording}>
                        <img src={WaveSendAudioImage} alt="protected" />
                      </button>
                    </div>
                  </>
                )}
                {recordedAudio && (
                  <>
                    <div className='RecordedAnswer_recorder'>
                      <p className='timing_recoder'>{`0:${elapsedTime.toString().padStart(2, '0')}`}</p>
                      <button className='stop_reco_btn no-background' onClick={startRecording}>
                        <img src={WaveSendAudioImage1} alt="protected" />
                      </button>
                      <button className='sendAudio_btn no-background' onClick={sendAudioMessage}>
                        Send Response
                      </button>
                    </div>
                  </>
                )}
                {sendAudio && (
                  <>
                    <div className='RecordedAnswer_recorder'>
                      <div className="audio-player" id="audio">
                        <div className="play-pause-btn" onClick={() => togglePlayPause()}></div>
                        <div className="progress-bar">
                          <input type="range" min="0" max="100" value="0" step="1" onChange={() => seekTo()} />
                          <div className="time-display">
                            <span className="current-time">0:00</span> / <span className="total-time">0:00</span>
                          </div>
                        </div>
                        <audio className="audio" preload controls style={{ display: 'none' }}>
                          <source src={`data:audio/wav;base64,${sendAudio}`} />
                        </audio>
                      </div>
                      <button className='stop_reco_btn no-background' onClick={startRecording}>
                        <img src={Record} alt="protected" />
                      </button>
                      <button className='next_question sendAudio_btn no-background' onClick={handleNextQuestion}>
                        Next
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordedAnswer;
