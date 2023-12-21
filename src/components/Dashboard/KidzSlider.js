import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Modal from 'react-modal';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';  // Import useNavigate directly
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AuthUser from '../AuthUser';
import axios from 'axios';
import Previous_ButtonImg from '../../images/Previous_Button.png';
import Play_ButtonImg from '../../images/play_btn.png';

function triggerButtonClick() {
  var buttons1 = document.getElementsByClassName('next_btn_sr');
  var buttons2 = document.getElementsByClassName('previous_btn_sr');
  if (buttons1.length > 0 || buttons2.length > 0 ) {
    buttons1[0].click();
    buttons2[0].click();
  }
}
 function resuneStory(){
  setTimeout(function(){
    console.log('testnew');
    // alert('testlast oage');
    triggerButtonClick();
  },2000);
 }



const truncateText = (text, maxLength) => {
  const words = text.split(' ');
  if (words.length <= maxLength) {
    return text;
  }
  const truncatedText = words.slice(0, maxLength).join(' ');
  return truncatedText + '...';
};

const KidzSlider = () => {
  const [chid, setChid] = useState();
  const [stories, setStories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const { user } = AuthUser();
  const [currntlyreading, setCurrentyReading] = useState();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const responsiveSettings = [
    {
      breakpoint: 767, // For mobile devices
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024, // For tablets
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: true,
    centerMode: true,
    responsive: responsiveSettings,
  };
  const { token } = AuthUser();
  useEffect(() => {
    fetchChildData();
    console.log(currntlyreading);
    const x = sessionStorage.getItem("setChildID");
    const y = sessionStorage.getItem("childId");
    const cid = x ? x : y;
    setChid(cid);
    fetchStories();
  }, [currntlyreading]);

  const fetchStories = async () => {
    try {
      const response = await axios.get('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/stories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStories(response.data);
      sessionStorage.setItem("StoryData", response);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const openModal = (story) => {
    setIsModalOpen(true);
    setSelectedStory(story);
    
    // Store selectedStory in session storage
    sessionStorage.setItem('selectedStory', JSON.stringify(story));
  
    // Navigate to /playStory
    navigate(`/playStory`);
  };
  
  

  const closeModal = () => {
    setIsModalOpen(false);
  };
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

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleHoverExit = () => {
    setHoveredIndex(-1);
  };
  const setCurrentstory = async () => {
    const x = sessionStorage.getItem("setChildID");
    const y = sessionStorage.getItem("childId");
    const cid = x ? x : y;
    console.log("current story", selectedStory.id);
    try {
      const data = {
        currenty_reading: JSON.stringify(selectedStory.id),
        // id :chid,
      }
      await axios.patch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-child-account/${cid}`, data, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
    } catch (error) {
      console.error('Error updating child data:', error);
    }
  }
  const fetchChildData = async () => {

    try {
      const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/child-profiles?user_id=${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const abc = response.data;
      const x = sessionStorage.getItem('setChildID');
      const y = sessionStorage.getItem('childId');
      const cid =  y;
      console.log("session child id", cid);
      const child = abc.find((n) => n.id === parseInt(cid, 10));
      if (child) {
        console.log('test123' + child.currenty_reading
        );
        setCurrentyReading(child.currenty_reading);
        sessionStorage.setItem("sid", child.currenty_reading);
      }

      console.log("Children123", response.data);
    } catch (error) {
      console.error('Error fetching child data:', error);
    }
  };


  return (
    <div className='slider_mainsr'>
      {currntlyreading ? (
        <>
          {stories.map((story, index) => (
            <>
              {story.id == currntlyreading && (
                <div className='ongoin-story-section'>
                  <div className='online-story-container'>
                    <div className='story-image-section'>
                      <img src={story.image_path} alt={`Story ${story.id}`} />
                    </div>
                    <div className='story-content-section'>
                      <h2 className='story-title'>{story.title}</h2>
                      <p className='story-discription'>{truncateText(story.description, 15)}</p>
                      <span className='story-personagers'>{story.personnages}</span>
                      <Link style={{ textDecoration: 'none' }} to={`/openbook`}
                      >
                        <button className='story-play-button' onClick={resuneStory()}>
                          Resume Story
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </>
      ) : (
        <>
          <Slider {...settings}>
            {stories.map((story, index) => (
              <div
                className='slide_mainsr'
                style={hoveredIndex === index ? { border: '2px solid red' } : {}}
                key={index}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={handleHoverExit}
              >
                <div className='slide_mainsr_img'>
                  <div className='slide_mainsr_img_inn'>
                    <img
                      src={story.image_path}
                      onClick={() => openModal(story)}
                      alt={`Story ${index + 1}`}
                    />
                  </div>
                </div>
                <p>{story.title}</p>
              </div>
            ))}
          </Slider>
        </>
       )} 
      
    </div>
  );
};

export default KidzSlider;