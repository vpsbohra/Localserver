import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';

import img1 from '../images/Group(1).png';
import img2 from '../images/Group(4).png';
import img3 from '../images/Group(2).png';
import img4 from '../images/Group(3).png';
import Accordion from './Accordion';
export default function FrequentlyAskedQuestions() {
    
    return(
        <section className="section-FrequentlyAsked">
            <div className="container">
                <div className="row FrequentlyAsked_row">
                <div className="FrequentlyAsked_imgsec">
                   <img src={img1} className='frequentlyAskedimg frequentlyAsked_img1' alt="group-1" />
                   <img src={img2} className='frequentlyAskedimg frequentlyAsked_img2' alt="group-2" />
                   <img src={img3} className='frequentlyAskedimg frequentlyAsked_img3' alt="group-3" />
                   <img src={img4} className='frequentlyAskedimg frequentlyAsked_img4' alt="group-4" />
            </div>
                <div className="FrequentlyAsked_content">
                    <h2>Frequently Asked Questions</h2>
                    <ul>
                        <li> <Accordion title="What is KidzConnect?" content="KidzConnect, made by parents for parents, is a platform dedicated to providing an interactive and educational space for children while strengthening the parent-child bond. It offers a wide range of engaging stories, activities, and opportunities for kids to learn, be heard and have fun. Parents can join in, too, by sharing in their children's learning journey and creating lasting memories together. KidzConnect aims to innovate the way we preserve cherished moments by incorporating sound while making learning enjoyable, all while fostering meaningful family connections." /></li>
                        <li> <Accordion title="Is the KidzConnect environment safe and secure for children?" content="We understand how as a parent you’d have concerns about your children’s safety online. At KidzConnect, we prioritize the safety and security of children using our platform. We have implemented robust parental control solutions to create a secure environment where you will have complete control over your children's interactions and activity, ensuring their online safety." /></li>
                        <li> <Accordion title="How old do I have to be to use KidzConnect?" content="KidzConnect is designed for children aged 7 to 12 years old." /></li>
                        <li> <Accordion title="Can children listen to, read, or interact with KidzConnect content outside the website?" content="Currently, KidzConnect content is accessible only through our website." /></li>
                        <li> <Accordion title="What are KidzConnect's rules and policies regarding respect and safety?" content="KidzConnect has strict rules and policies in place to ensure a safe and respectful environment for all users. Please refer to our Terms of Use and Privacy Policy for more information." /></li>
                    </ul>
                </div>
                </div>
            </div>
        </section>
    )
}