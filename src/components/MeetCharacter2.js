import React from 'react';
import MySlider from './MySlider';
import TestimonialImage from '../images/Testimonial_img01.png';

export default function MeetCharacter1() {
    return(
        <section className="section-meet-character2">
            <div className="container">
                <div className="row">
                    <div className="left col-6"><MySlider /></div>
                    <div className="right col-6"> 
                    <img src={TestimonialImage} alt="testiimonial-right" />
                    </div>
                </div>
            </div>
        </section>
    )
}