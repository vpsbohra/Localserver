import React from 'react';
import KidsNav from '../../navbar/kidzNav';
import KidzBottomNav from './KidzBottomNav';
import KidzSlider from './KidzSlider';
import axios from 'axios';
import { useEffect } from 'react';
import AuthUser from '../AuthUser';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';

import { useState } from 'react';
import Previous_ButtonImg from '../../images/Previous_Button.png';



const truncateText = (text, maxLength) => {
  const words = text.split(' ');
  if (words.length <= maxLength) {
    return text;
  }
  const truncatedText = words.slice(0, maxLength).join(' ');
  return truncatedText + '...';
};

export default function PlayStory() {
  const [chid, setChid] = useState();
  const [stories, setStories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const { user } = AuthUser();
  const [currntlyreading, setCurrentyReading] = useState();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const { token } = AuthUser();
  useEffect(() => {
    console.log(currntlyreading);
    const x = sessionStorage.getItem("setChildID");
    const y = sessionStorage.getItem("childId");
    const cid = x ? x : y;
    setChid(cid);
  }, []);
  const closeModal = () => {
    navigate('/kids-view');
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
  useEffect(() => {
    const storedSelectedStory = sessionStorage.getItem('selectedStory');
    console.log('storedSelectedStory:', storedSelectedStory);

    if (storedSelectedStory) {
      setSelectedStory(JSON.parse(storedSelectedStory));
      console.log('setSelectedStory:', selectedStory);
      // setSelectedStory(parsedSelectedStory);
    } else {
      console.log(" Handle the case where storedSelectedStory is not available ");
    }
    // sessionStorage.removeItem('selectedStory');
  }, []);

  return (
    <>
      <div className="kidzdashboard kidzplay-cstm">
        <div className="container-fluidss display-tabless">
          <KidsNav />
          <div className="main-content">
            <div className="page_ttl"></div>
            <div className='kids_view_mainSlider'>
              <div className='slider_mainsr'>
                <div
                  className='Story_Day_popupsr'
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  contentLabel='Story Modal'
                >
                  <div className='Story_Day_outer'>
                    <div className='Story_Day_outer_left'>
                      {selectedStory !== null && (
                        <img src={selectedStory.cover_image} alt='Story' />
                      )}
                    </div>
                    <div className='Story_Day_outer_right'>
                      {selectedStory !== null && (
                        <h2>{selectedStory.title}</h2>
                      )}
                      {selectedStory !== null && (
                        <>
                          <p>{truncateText(selectedStory.description, 15)}</p>
                          <p>{selectedStory.personnages}</p>
                        </>
                      )}
                      <Link className='col'
                        to={`/chosenstory`}
                        onClick={() => { nextModal(selectedStory.id, selectedStory.audio_text); setCurrentstory(); }}
                      >  <button className='Play_btn_sr'>
                          Play
                        </button>
                      </Link>
                    </div>
                    <button className='Previous_Button' onClick={closeModal}>
                      <img src={Previous_ButtonImg} alt="protected" />
                    </button>
                  </div>
                </div>
              </div >
            </div>
          </div>
          <div className="bottom-nav">
            <KidzBottomNav />
          </div>
        </div>
      </div>
    </>
  );
}
