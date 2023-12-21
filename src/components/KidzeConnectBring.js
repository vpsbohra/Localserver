import React from 'react';
import KidzeConnectImg from '../images/Family_Photo01.png';
import KidzeConnectImg1 from '../images/Kidzconnect_eff1.png';
import KidzeConnectImg2 from '../images/Kidzconnect_eff2.png';
import KidzeConnectImg3 from '../images/Kidzconnect_eff3.png';
import KidzeConnectImg4 from '../images/Kidzconnect_eff4.png';
import KidzeConnectImg5 from '../images/Kidzconnect_eff501.png';
import KidzeConnectImg6 from '../images/Kidzconnect_eff6.png';


export default function KidzeConnectBring() {
    return(
        <section className="section-kidzeconnect-bring">
            <div className="container">
                <div className="row">
                    <div className="kidzeconnect_bring_header">
                        <h2>How Kidzconnect brings it all together</h2>
                        <p>Capture cherished moments with a sound gallery that preserves memories just like a photo album</p>
                   </div>
                   </div>
                   <div className="row kidzeconnect_bring_content">
                        <div className="bringleft col-6">
                            <img src={KidzeConnectImg} alt="testiimonial-right" />
                        </div>
                        <div className="bringright col-6"> 
                            <ul>
                                <li><img src={KidzeConnectImg1} alt="KidzeConnectImg1" />Capture enduring moments through our Voice Gallery: craft timeless memories by recording interactions, uniting parents, kids, and all family members</li>
                                <li><img src={KidzeConnectImg2} alt="KidzeConnectImg2" />Easily share content and memories with other family members</li>
                                <li><img src={KidzeConnectImg3} alt="KidzeConnectImg3" />Facilitate tracking progress with the parental space</li>
                                <li><img src={KidzeConnectImg4} alt="KidzeConnectImg4" />Reminisce your child's thoughts from their younger years</li>
                                <li><img src={KidzeConnectImg5} alt="KidzeConnectImg5" />Contributes to a shared and enriching learning experience for your child’s education</li>
                                <li><img src={KidzeConnectImg6} alt="KidzeConnectImg6" />Strengthen family bonds through parent-child interaction</li>
                            </ul>
                    </div>
                    <div className="row kidzeconnect_bring_btn">
                        <button className='kidzeconnect_btn' type='button'>Start your 14 day free trial</button>
                    </div>
                </div>
            </div>
        </section>
    )
}