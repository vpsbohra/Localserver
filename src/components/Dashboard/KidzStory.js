import React, { useEffect, useState } from 'react';

import KidsNav from '../../navbar/kidzNav';
import KidzBottomNav from './KidzBottomNav';
import Slide4 from '../../images/Story/Image.png';
import Slide1 from '../../images/Previous Button.png';

const KidzStory = () => {

  return (
    <div className='ongoin-story-section'>
      <KidsNav />
      <img src={Slide1} />
        <div className='online-story-container'>
        <div className='container storysection'>
            <div className='story-image-section'>
            <img src={Slide4} />
            </div>
            <div>
                <h2 className='story-title'>Course Interdite a Connectville</h2>
                <p className='story-discription'>Attachez vos ceintures pour un récit passionnant où nos amis découvrent l'importance d'avoir un permis de conduire avant de prendre la route.</p>
                <span className='story-personagers'>Personnages: Stany, Rodrigo, Stefy</span>
                <button className='story-play-button'>PLAY</button>
            </div>
        </div>
        </div>
        <div className="bottom-nav">
            <KidzBottomNav />
          </div>
    </div>
  );
};             

export default KidzStory;
