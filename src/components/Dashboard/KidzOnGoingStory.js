import React, { useEffect, useState } from 'react';
import KidsNav from '../../navbar/kidzNav';
import KidzBottomNav from './KidzBottomNav';
// import KidzOnGoingStory from './KidzOnGoingStory';
import KidzSlider from './KidzSlider';
import Gaming1 from '../../images/Games/Games.png';
import Gaming2 from '../../images/Character/Characters.png';

import Slide4 from '../../images/Story/Story3.png';
const KidzOnGoingStory = () => {

  return (
    <div className="kidzdashboard">
        <div className="container-fluid display-table">
          <KidsNav />
          <div className="main-content">
    <div className='ongoin-story-section'>
        <div className='online-story-container'>
            <div className='story-image-section'>
                <img src={Slide4} />
            </div>
            <div className='story-content-section'>
                <h2 className='story-title'>Course Interdite a Connectville</h2>
                <p className='story-discription'>Attachez vos ceintures pour un récit passionnant où nos amis découvrent l'importance d'avoir un permis de conduire avant de prendre la route.</p>
                <span className='story-personagers'>Personnages: Stany, Rodrigo, Stefy</span>
                <button className='story-play-button'>Resume Story</button>
            </div>
        </div>
    </div>
    <div className="Main_Gaming_Sec">
              <div className="gaming-section games_item">
                <div className='games_section'>
                <img height={150} width={150} className='game_img' src={Gaming1} />
                <img height={150} width={150} className='game_img' src={Gaming1} />
                <img height={150} width={150} className='game_img' src={Gaming1} />
                <img height={150} width={150} className='game_img' src={Gaming1} />
                </div>
                <button className='all_games'>BROWSE ALL GAMES</button>
              </div>
              <div className="gaming-section colouring_item">
                 <img src={Gaming2} />
                 {/* <h3 className='colouring_ttl'>Characters</h3> */}
              </div>
            </div>
          </div>

          <div className="bottom-nav">
            <KidzBottomNav />
          </div>
        </div>
      </div>
  );
};             

export default KidzOnGoingStory;
