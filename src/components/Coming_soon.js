import React ,{useState} from "react";
import Giovannirbg from '../images/Giovannirbg.png';
import Stephyrbg from '../images/stephyrbg.png';
import Stanyrbg from '../images/stanyrbg.png';
import Logologo from '../images/Logologo.png';
import Door from '../images/door.png';
import emailjs from 'emailjs-com';

const Coming_soon = ({ onDoorClick }) => {
    const [thankyou, setThankyou] = useState(false);
    const sendEmail = (formData) => {
        const emailAddress = ['contact@kidzconnect.online'];  

        const templateParams = {
            message: `Email: ${formData.email}`
        };
        emailAddress.forEach((emailAddress) => {
            templateParams.user_email = emailAddress;

            emailjs
                .send(
                    'service_oa10xs4',
                    'template_spdasds',
                    templateParams,
                    'I8VSSe2ScoovjjwRQ'
                )
                .then(
                    (result) => {
                        console.log('Email sent:', result.text);
                        document.getElementById('email').value = '';
                        setThankyou(true);
                    },
                    (error) => {
                        console.error('Email error:', error.text);
                    }
                );
        });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = {
            email: e.target.elements.email.value,

        };
        console.log("e.target.elements.email.value", e.target.elements.email.value);
        const emailInput = e.target.elements.email;
        const emailValue = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue.trim() === '' || !emailRegex.test(emailValue)) {

            alert('Please enter a valid email address');
        } else {

            sendEmail(formData);
        }
    };
    
    return (
        <div className="coming_soon_main_page">
        <div className="container">
            <div className="coming_soon_inner_page">
                <div className="coming_soon_left-img">
                    <img className="comsoon_img_one" src={Giovannirbg} />
                    <img className="comsoon_img_two" src={Stanyrbg} />
                    <img className="comsoon_img_three" src={Stephyrbg} />
                </div>

                <div className="coming_soon_content">
                    <div className="comingsoon_logo">
                        <img src={Logologo} />
                    </div>
                    <div className="coming_soon_content_custom">
                        <h3>Sit tight, stay warm, we're coming soon</h3>
                        <p> KidzConnect is getting ready to launch, bringing with it a unique world of family bonding. Join us on this exciting journey as we count down to the big day. Stay tuned!</p>
                    </div>
                    <form onSubmit={onSubmit}>
                        <input type="email" id="email" name="email" placeholder="Sign up for early access and updates on our launch" />
                        {thankyou ?(
                    <button type="submit" className="thankss" required disabled>THANK YOU !</button>
          
                ):(
                    <button type="submit" required>NOTIFY ME</button>
                )}
                    </form>

                    <div className="coming_soon_enter_button">
                        <button onClick={onDoorClick}><img src={Door} /></button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Coming_soon;