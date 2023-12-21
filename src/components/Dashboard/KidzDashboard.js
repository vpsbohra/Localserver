//rendering mathced stories but showing for every child

import React, { useState, useEffect } from 'react';
import KidsNav from '../../navbar/kidzNav';
import KidzBottomNav from './KidzBottomNav';
import Modal from 'react-modal';

import axios from 'axios';
import AuthUser from '../AuthUser';
import KidzSlider from './KidzSlider';
import Brother from '../../images/Story/brother.png';
import Gaming1 from '../../images/Games/Games.png';
import Gaming2 from '../../images/Character/Characters.png';
import Story1 from '../../images/Story/stories_kids01.png';
import Story2 from '../../images/Story/stories_kids02.png';
import Story3 from '../../images/Story/stories_kids03.png';
import ChildChat from '../chat/ChildChat';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Previous_ButtonImg from  '../../images/Previous_Button.png';

export default function KidzDashboard() {
  const StoryId = String(sessionStorage.getItem('childStory'));
  const ChildId = String(sessionStorage.getItem('childId'));
  const [userid, setuserid] = useState('');
  const [story1, setstory1] = useState(false);
  const [story2, setstory2] = useState(false);
  const [story3, setstory3] = useState(false);
  const [story4, setstory4] = useState(false);
  const [story5, setstory5] = useState(false);
  const [infinite, setinfinite] = useState(false);
  const [stories, setStories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const[chid,setChid]=useState();




  const truncateText = (text, maxLength) => {



    const words = text.split(' ');
    if (words.length <= maxLength) {
      return text;
    }
    const truncatedText = words.slice(0, maxLength).join(' ');
    return truncatedText + '...';
  };


  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleHoverExit = () => {
    setHoveredIndex(-1);
  };


  // Manage the fetched data here
  const [fdata, setFdata] = useState([]);

  useEffect(() => {
    const userInformation = sessionStorage.getItem('user');
    const user = JSON.parse(userInformation);
    const { id } = user;
    setuserid(String(id));

    fetchreadedstory();
  }, [userid]); // Depend on userid

  const responsiveSettings = {
    breakpoint: 767, // For mobile devices
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  };

  const settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    arrows: true,
    responsive: [responsiveSettings],
  };
  if (infinite == true) {
    settings.infinite = true;
  }


  const { token } = AuthUser();

  const fetchreadedstory = async () => {
    try {
      const response = await axios.get('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/readedstory', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Response:', response.data);
  
      if (response.data) {
        const fdataWithNumberStoryIds = response.data.map(item => ({
          ...item,
          story_id: parseInt(item.story_id, 10),
        }));
        setFdata(fdataWithNumberStoryIds);
      }
    } catch (error) {
      console.error('Error fetching readedstory data:', error);
    }
  };
  




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




  useEffect(() => {

    // if (fdata.some((data) => data.child_id === ChildId)) {
    fetchStories();
    // console.log("child id of session and fdata are matching");
// }
    console.log("fdata is here", fdata);
    console.log("stories are here", stories);
    console.log("ChildId",ChildId);
    if (
      fdata.some((readStory) =>
        readStory.user_id === userid &&
        readStory.child_id === ChildId &&
        readStory.story_id === '1'
      )
    ) {
      setstory1(true);
      // console.log("story1set");

    }


    if (
      fdata.some((readStory) =>
        readStory.user_id === userid &&
        readStory.child_id === ChildId &&
        readStory.story_id === '4'
      )
    ) {
      setstory2(true);
      // console.log("story2set");


    }

    if (
      fdata.some((readStory) =>
        readStory.user_id === userid &&
        readStory.child_id === ChildId &&
        readStory.story_id === '2'
      )
    ) {
      setstory3(true);
      // console.log("story3set");


    }


    if (
      fdata.some((readStory) =>
        readStory.user_id === userid &&
        readStory.child_id === ChildId &&
        readStory.story_id === '3'
      )
    ) {
      setstory4(true);
      // console.log("story4set");


    }

    if (story1 && story2 && story3 && story4) {
      setinfinite(true);
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    }


  }, [fdata, userid, ChildId]);



 
const matchingStories = stories.filter(story => {
  return fdata.some(readStory => {
    return (
      readStory.child_id === ChildId && 
      readStory.user_id===userid &&
      readStory.story_id === story.id
    );
  });
});





  const openModal = (story) => {
    setIsModalOpen(true);
    setSelectedStory(story);
  };

  const closeModal = () => {
     setIsModalOpen(false);
  };
  const nextModal = (index, data1) => {
    console.log(index);
    let d = index-1;
    console.log(stories[d]);
  let data =  JSON.stringify(stories[d])
    sessionStorage.setItem('childStory', index);
    sessionStorage.setItem('childStoryText', data1);
    sessionStorage.setItem('childStorydata', data);
    // useNavigate('/chosenstory');
  };
  

  const setCurrentstory = async ()=>{
    console.log("current story",selectedStory.id);
    try {
      const data ={
        currenty_reading :JSON.stringify(selectedStory.id),
          // id :chid,
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


console.log("matchingStories",matchingStories);
 
return (
  <>
    <div className="kidzdashboard">
      <div className="container-fluidss display-tabless">
        <KidsNav />
        <div className="main-content kidzdashboard_mainsr">
          <div className="page_ttl">
            {/* <h1>Story of the Day</h1> */}
          </div>

          <div className='kids_view_mainSlider'>
            <KidzSlider />
          </div>
        </div>

        <div className="main-content">

          {/* <KidzOnGoingStory /> */}
          <div className="Main_Gaming_Sec">
            <div className="gaming-section games_item">
              <div className='games_section'>
                <div className='games_section_item'><img height={150} width={150} className='game_img' src={Gaming1} /></div>
                <div className='games_section_item'><img height={150} width={150} className='game_img' src={Gaming1} /></div>
                <div className='games_section_item'><img height={150} width={150} className='game_img' src={Gaming1} /></div>
                <div className='games_section_item'><img height={150} width={150} className='game_img' src={Gaming1} /></div>
              </div>
              <button className='all_games'><span className='all_games_span'>BROWSE ALL GAMES </span></button>
            </div>

            <div className="gaming-section colouring_item">
              <Link to="/allcharacters">
                <img src={Gaming2} />
                {/* <h3 className='colouring_ttl'>Characters</h3> */}
              </Link>
            </div>

          </div>

        </div>


        <div className='gaming-section_outer'>
          <div className="main-content">
            <div className='gaming-section_title'>
              <img src={Brother} /><span>STORIES READ</span>
            </div>
            <div className='slider_mainsr kids_stories_slider'>
              <Slider {...settings}>
                {matchingStories.map((story, index) => {
                  return (
                    <div
                      className='slide_mainsr'
                      style={hoveredIndex === index ? { border: '2px solid red' } : {}}
                      key={index}
                      onMouseEnter={() => handleHover(index)}
                      onMouseLeave={handleHoverExit}
                    >
                      <img
                        src={story.cover_image}
                        onClick={() => openModal(story)}
                        alt={`Story ${index + 1}`}
                      />
                      <h3 className='stories_slider_heading'>{story.title}</h3>
                    </div>
                  );
                })}
              </Slider>
              <Modal
                className='Story_Day_popupsr'
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel='Story Modal'
              >
                {selectedStory && (
                  <div className='Story_Day_outer'>
                    <div className='Story_Day_outer_left'>
                      <img src={selectedStory.cover_image} alt='Story' />
                    </div>
                    <div className='Story_Day_outer_right'>
                      <h2>{selectedStory.title}</h2>
                      <p>{truncateText(selectedStory.description, 15)}</p>
                      <p>{selectedStory.personnages}</p>
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
                )}
              </Modal>
            </div>
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





