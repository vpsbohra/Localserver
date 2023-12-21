import React, { useEffect, useState, useRef } from 'react';
import ParentalSwitch from '../../images/Home.png';
import KidzBottomNav from './KidzBottomNav';
import axios from 'axios';
import AuthUser from '../AuthUser';
import { Link, useNavigate } from 'react-router-dom';
import PNLeft_arrow from '../../images/PN_Arrow_Left.png';
import PNRight_arrow from '../../images/PNArrow_right.png';
import Play_Story_Button from '../../images/Play_Story_Button.png';
import Pause_Story_Button from '../../images/Pause_Story_Button.png';
import Replay from '../../images/Replay Audio.png'
const OpenStory = () => {
  const navigate = useNavigate();
  const [rep, setRep] = useState(false);
  const [x, setX] = useState(true);
  const [stories, setStories] = useState([]);
  const [currentaudio, setAudio] = useState();
  const [currentImage, setcurrentImage] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentAudioIndex, setCurrentAudioIndex] = useState("0");
  const StoryId = sessionStorage.getItem('childStory');
  const a = sessionStorage.getItem('setChildID');
  const b = sessionStorage.getItem('childId');
  const setChildID = a ? a : b;
  const [userid, setuserid] = useState();
  const [fdata, setFdata] = useState([]);
  const { token } = AuthUser();
  const audio = useRef(new Audio(currentaudio));
  const [highlightTimeout, sethighlightTimeout] = useState(null);
  const { user } = AuthUser();
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchChildData();
  }, [])

  useEffect(() => {
    fetchStories();
    fetchreadedstory();
    const userInformation = sessionStorage.getItem('user');
    const user = JSON.parse(userInformation);
    const { id } = user;
    setuserid(id);
    localStorage.removeItem('highlightStep');
  }, [currentaudio]);
  useEffect(() => {
    if (stories.length > 0 && currentAudioIndex >= 0) {
      const selectedStory = stories[0];
      const audioParts = selectedStory.english_audio_part.split(',');
      const audioUrl = audioParts[currentPage].trim();
      console.log("Audio URL:", audioUrl);
      const imageParts = selectedStory.book_cover_images.split(',');
      const imageUrl = imageParts[currentPage].trim();
      setcurrentImage(imageUrl);
      console.log("Image Url", imageUrl);
      audio.current = new Audio(audioUrl);
    }
  }, [stories, currentAudioIndex]);

  const play = () => {
    setX(false);
    const audioElement = audio.current;
    const durationInSeconds = audioElement.duration * 1000;
    console.log('Audio duration:', durationInSeconds);
    audioElement.play();
    const textElement = document.getElementById('textToHighlight');
    console.log(textElement);
    const originalText = textElement.textContent;
    const words = originalText.split(' ');
    let step = localStorage.getItem('highlightStep') || 0;
    const duration = durationInSeconds - step * (durationInSeconds / words.length);
    const interval = duration / (words.length - step);
    function clearHighlight() {
      // Remove existing highlight spans
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(/<span class="highlight">|<\/span>/g, '');
      }
      textElement.innerHTML = words.join(' ');
    }


    function updateHighlighting() {
      if (step < words.length && x == true) {
        for (let i = step - 1; i >= 0; i--) {
          if (!words[i].includes('<span class="highlight">')) {
            words[i] = '<span class="highlight">' + words[i] + '</span>';
          } else {
            break;
          }
        }
        if (!words[step].includes('<span class="highlight">')) {
          words[step] = '<span class="highlight">' + words[step] + '</span>';
          textElement.innerHTML = words.join(' ');
        }
        step++;
        localStorage.setItem('highlightStep', step);

        sethighlightTimeout(setTimeout(updateHighlighting, interval));
      } else {
        localStorage.removeItem('highlightStep');
        setRep(true);
        // setX(true);
      }
    }
    // clearHighlight(); 
    updateHighlighting();
  };
  const pause = () => {
    setX(true);
    const audioElement = audio.current;
    audioElement.pause();
    console.log("highlight", highlightTimeout);
    clearTimeout(highlightTimeout);
  };

  const fetchStories = async () => {
    try {
      const response = await axios.get('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/stories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const selectedStory = response.data.find(story => story.id === parseInt(StoryId, 10));
      console.log("Story data", selectedStory);
      if (selectedStory) {
        const audioParts = selectedStory.english_audio_part.split(',');
        const imageParts = selectedStory.book_cover_images.split(',');
        console.log("Audio Parts", audioParts);
        console.log(audioParts[currentPage]);
        setStories([selectedStory]);
        setCurrentAudioIndex(0);
        setAudio(audioParts[0]);
        console.log("Audio", audio);
        setcurrentImage(imageParts[currentPage]);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };
  const paragraphsPerPage = 1;
  const totalPages = Math.ceil(stories[0]?.description?.split('*').length / paragraphsPerPage);
  console.log(totalPages);
  const audioData = stories[0]?.english_audio_part[0] || '';
  const audioArray = audioData.split(',');
  const coverImgData = stories[0]?.cover_image || '';
  const coverImgDataArray = coverImgData.split(',');
  const handleNextPage = () => {
    setRep(false);
    pause();
    if (currentPage < totalPages - 1) {
      const nextPage = parseInt(currentPage, 10) + 1;
      setAudio(audioArray[nextPage]);
      setcurrentImage(coverImgDataArray[nextPage]);
      setCurrentAudioIndex(nextPage);
      setCurrentPage(nextPage);
      localStorage.removeItem('highlightStep');
      localStorage.setItem("page", nextPage);
    } else {
      localStorage.setItem("page", 0);
      update();
      setCurrentstory();
      setTimeout(() => {
        window.location.href = '/donewithbook';
      }, 2000);
    }
  };

  const setCurrentstory = async () => {
    const a = sessionStorage.getItem('setChildID');
    const b = sessionStorage.getItem('childId');
    const chid = a ? a : b;
    try {
      const data = {
        currenty_reading: null,
      }
      await axios.patch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-child-account/${chid}`, data, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
    } catch (error) {
      console.error('Error updating child data:', error);
    }
  }
  const handlePrevPage = () => {
    setRep(false);
    pause();
    if (currentPage > 0) {
      setAudio(audioArray[currentPage - 1]);
      setcurrentImage(coverImgDataArray[currentPage - 1]);
      setCurrentAudioIndex(currentPage - 1);
      setCurrentPage(currentPage - 1);
      localStorage.removeItem('highlightStep');
      localStorage.setItem("page", currentPage - 1);
    }
  };
  const fetchreadedstory = async () => {
    try {
      const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/readedstory`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      setFdata(response.data);
    } catch (error) {
      console.error('Error fetching readedstory data:', error);
    }
  };
  const update = () => {
    console.log("setChildID", setChildID);
    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const x = localStorage.getItem("page");
    const memberData = {
      currently_reading_page: x.toString(),
    };
    axios.patch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-currently-reading-page/${setChildID}`, memberData, { headers })
      .then(response => {
        console.log("response", response.data);
        navigate('/kids-view');
      })
      .catch(error => {
        console.log("Error updating the field");
      });
  }
  const fetchChildData = async () => {
    console.log("hellllo");
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
        console.log('test123' + child.currently_reading_page);
        localStorage.setItem("page", parseInt(child.currently_reading_page, 10));

        const p = localStorage.getItem("page");
        setAudio(audioArray[p]);
        setcurrentImage(coverImgDataArray[p]);
        setCurrentAudioIndex(p);
        setCurrentPage(p);
        setPage(p);
      }
    } catch (error) {
      console.error('Error fetching child data:', error);
    }
  };
  return (
    <div className='chosen-story-section openbook_page_kidz'>
      <Link className="nav-link" onClick={update}><img src={ParentalSwitch} alt='' /></Link>
      <div className="top-nav">
        <KidzBottomNav />
      </div>
      {stories.map((story, index) => (
        <div className='story-open-container' key={index}>
          {story.id == StoryId &&
            <div className='openbook_section_sr'>
              <div className='openbook_section_left'>
                <img src={currentImage} alt='' onClick={openModal} />
              </div>
              <div className='openbook_section_right'>
                {rep ? (<><button className='Play_Storys_sr' onClick={() => { play(); setRep(false) }} >
                  <img src={Replay} /></button> </>)
                  :
                  (<><button className='Play_Storys_sr' onClick={x ? play : pause} >
                    <img src={x ? Play_Story_Button : Pause_Story_Button} />
                  </button></>)}
                <div className='openbook_section_right_inner'>
                  {story.description.split("*").slice(currentPage * paragraphsPerPage, (currentPage + 1) * paragraphsPerPage).map((paragraph, pIndex) => (
                    <p id='textToHighlight' key={pIndex} style={{ whiteSpace: 'pre-line' }}>
                      {paragraph.trim().length > 0 ? paragraph.replace(/\\/g, '\n') : null}
                    </p>
                  ))}
                </div>
              </div>
              <div className="pagination">
                <button className='previous_btn_sr Np_btn_sr' onClick={handlePrevPage} disabled={currentPage === 0}><img src={PNLeft_arrow} alt='' /></button>
                <button className='next_btn_sr Np_btn_sr' onClick={handleNextPage}><img src={PNRight_arrow} alt='' /></button>
              </div>
            </div>
          }
        </div>
      ))}
      {isModalOpen && (
                <div className="inagepopupdiv modal">
                  <div className="modal-content">
                    <span className="close" onClick={closeModal}><svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="42" height="42" rx="21" fill="#F28A35" />
              <path d="M26.3915 29.3632C27.7645 30.8073 29.9308 28.5609 28.5578 27.0848L23.1574 21.4048L28.5578 15.7249C29.9308 14.2808 27.795 12.0024 26.3915 13.4785L20.9911 19.1585L15.5907 13.4785C14.2178 12.0024 12.0515 14.2808 13.455 15.7249C15.2551 17.6182 17.0247 19.5115 18.8554 21.4048L13.455 27.0848C12.0515 28.5289 14.2178 30.8073 15.5907 29.3632L20.9911 23.6832L26.3915 29.3632Z" fill="white" />
            </svg></span>
                <div className="inagepopupdiv_modal_IMG">
                    <img src={currentImage} alt='' />
                </div>
                  </div>
                </div>
              )}
    </div>
  );
};

export default OpenStory;