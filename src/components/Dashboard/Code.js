import React, { useEffect, useState ,useRef} from 'react';
import ParentalSwitch from '../../images/Home.png';
import KidzBottomNav from './KidzBottomNav';
import axios from 'axios';
import AuthUser from '../AuthUser';
import { Link } from 'react-router-dom';
import PNLeft_arrow from '../../images/PN_Arrow_Left.png';
import PNRight_arrow from '../../images/PNArrow_right.png';
import Play_Story_Button from '../../images/Play_Story_Button.png';
import btn from '../../images/Pause_Story_Button.png';

const AudioPlayer = () => {
  const [stories, setStories] = useState([]);
  const [currentaudio, setAudio] = useState();
  const [currentImage, setcurrentImage] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentAudioIndex, setCurrentAudioIndex] = useState("0");
  const StoryId = sessionStorage.getItem('childStory');
  const ChildId = sessionStorage.getItem('childId');
  const [userid, setuserid] = useState();
  const [fdata, setFdata] = useState([]);
  const { token } = AuthUser();
  const audio = useRef(new Audio(currentaudio));
  const [highlightTimeout, sethighlightTimeout] = useState(null);
  const [x, setX] = useState(true);

 
  const handleNextPage = () => {
    pause();
    if (currentPage < totalPages - 1) {
      setAudio(audioArray[currentPage + 1]);
      setcurrentImage(coverImgDataArray[currentPage + 1]);
      setCurrentAudioIndex(currentPage + 1);
      setCurrentPage(currentPage + 1);
      localStorage.removeItem('highlightStep');
    } else {
      window.location.href = '/donewithbook';
    }
  };

  const handlePrevPage = () => {
    pause();
    if (currentPage > 0) {
      setAudio(audioArray[currentPage - 1]);
      setcurrentImage(coverImgDataArray[currentPage - 1]);
      setCurrentAudioIndex(currentPage - 1);
      setCurrentPage(currentPage - 1);
      localStorage.removeItem('highlightStep');
    }
  };
  
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

    function updateHighlighting() {
      if (step < words.length ) {
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
        setX(true);
      }
    }
    updateHighlighting();
  };

  const pause = () => {
    setX(true);
    const audioElement = audio.current;
    audioElement.pause();
    console.log("highlight", highlightTimeout);
    clearTimeout(highlightTimeout);
  };


  useEffect(()=>{
    setTimeout(() => {
      play();
    }, 2000);
  },[currentPage])

  useEffect(()=>{
    fetchData();
  },[])
  const updateAudio = () => {
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
      audio.current.addEventListener('ended', handleNextPage);
    }
  };
  const fetchData = async () => {
    await fetchStories();
    await fetchreadedstory();
    const userInformation = sessionStorage.getItem('user');
    const user = JSON.parse(userInformation);
    const { id } = user;
    setuserid(id);
  };

  
  useEffect(() => {
    const handleAudioEnd = () => {
      handleNextPage();
      localStorage.removeItem('highlightStep');
    };
    updateAudio();
  
    return () => {
      audio.current.removeEventListener('ended', handleAudioEnd);
    };
  }, [ currentAudioIndex, currentPage]);
  
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
  const totalPages = Math.ceil(stories[0]?.audio_text?.split('*').length / paragraphsPerPage);
  console.log(totalPages);
  const audioData = stories[0]?.english_audio_part[0] || '';
  const audioArray = audioData.split(',');
  const coverImgData = stories[0]?.cover_image || '';
  const coverImgDataArray = coverImgData.split(',');
  
 
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
  return (
    <div className='chosen-story-section openbook_page_kidz'>
      <Link className="nav-link" to="/kids-view"><img src={ParentalSwitch} alt='' /></Link>
      <div className="top-nav">
        <KidzBottomNav />
      </div>
      {stories.map((story, index) => (
        <div className='story-open-container' key={index}>
          {story.id == StoryId &&
            <div className='openbook_section_sr'>
              <div className='openbook_section_left'>
                <img src={currentImage} alt='' />
              </div>
              <div className='openbook_section_right'>
              <button className='Play_Storys_sr' onClick={x ? play : pause} ><img src={x ? Play_Story_Button : btn} /></button>

                <div className='openbook_section_right_inner'>
                  {story.audio_text.split("*").slice(currentPage * paragraphsPerPage, (currentPage + 1) * paragraphsPerPage).map((paragraph, pIndex) => (
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
    </div>
  );
};

export default AudioPlayer;