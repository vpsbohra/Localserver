import React from 'react'

import Playful1 from '../images/playful_kids_01.png';
import Playful2 from '../images/playful_kids_02.png';
import Playful3 from '../images/playful_kids_03.png';
import promote_img from '../images/promote-img.png';
import promote_eff from '../images/promote_effect.png';
import promote_eff2 from '../images/promote_effect2.png';
import promote_eff3 from '../images/promote_effect3.png';
export default function PlayFulSection() {
    return(
       <>
        <section className="playful">
        <div className="container">
            <div className="row">
                <h2>A playful way for kids to learn about the world that surrounds them and express themselves</h2>
            </div>
        </div>
        </section>
        <section className="grid-section-2">
        <div className="container">
            <div className="row grid-section_itemrow grid-section_itemrow_oneSR">
                <div className="left-section col-6">
                    <img src={promote_img} alt="Promote the development" /> 
                    <h2><img src={promote_eff} alt="Promote the development" /> Promote and expand the development of your child’s linguistic and cognitive skills.</h2>
                </div>
                <div className="right-section col-6">
                    <img className='promote-main_img' src={Playful1} alt="Description of the" />    
                </div>
            </div>
            <div className="row grid-section_itemrow grid-section_itemrow_two">
                <div className="left-section col-6">
                    <img className='promote-main_img' src={Playful2} alt="Description of the" />    
                </div>
                <div className="right-section col-6">
                    <h2><img src={promote_eff2} alt="Promote the development" /> Stimulate imagination and creativity through interactive stories and activities with our adorable characters.</h2>
                </div>
            </div>
            <div className="row grid-section_itemrow">
                <div className="left-section col-6">
                    <h2><img src={promote_eff3} alt="Promote the development" /> Nurture curiosity and critical thinking with self-directed learning, exploring essential real-life scenarios.
</h2>
                </div>
                <div className="right-section col-6">
                    <img className='promote-main_img' src={Playful3} alt="Description of the" />
                </div>
            </div>
        </div>
        </section>
        </>
    )
}
