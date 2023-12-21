import React from 'react';
import Character1 from '../images/Meet-Our-Characters-Section.png';


export default function MeetCharacter1() {
    return(
        <section className="section-meet-character1">
                <div className="meet-inner">
                    <h2>Meet our characters</h2>
                    <img src={Character1} alt="meet-character-1" />
                </div>
        </section>
    )
}