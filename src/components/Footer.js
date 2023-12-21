import React from 'react';
import { Link } from 'react-router-dom';
import SocialIconfb from '../images/fb-icon.png';
import SocialIconinsta from '../images/insta-icon.png';

export default function Footer() {
    return(
        <>
         <footer className="bg-light text-center text-lg-start">
        <div className="container p-4">
            <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h2 className="">KidzConnect</h2>
        
                <ul className="social_icon_sr list-unstyled mb-0">
                <li>
                <Link to="/" className="text-dark"><img src={SocialIconinsta} alt="SocialIconinsta" /></Link>
                   
                </li>
                <li>
                <Link to="/" className="text-dark"><img src={SocialIconfb} alt="SocialIconfb" /></Link>
                </li>
                </ul>
            </div>
        
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                
            </div>
        
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Brand</h5>
        
                <ul className="list-unstyled mb-0">
                <li>
                    <Link to="/about" className="text-dark">About Us</Link>
                </li>
                <li>
                    <Link to="#" className="text-dark">Brand Ambassador</Link>
                </li>
                <li>
                    <Link to="/T&C" className="text-dark">Term of Service</Link>
                </li>
                
                <li>
                    <Link to="/Privacy_policy" className="text-dark">Privacy Policy</Link>
                </li>
                </ul>
            </div>
        
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-0">Quick Links</h5>
        
                <ul className="list-unstyled">
                <li>
                    <Link to="/faq" className="text-dark">Frequently Asked Questions</Link>
                </li>
                <li>
                    <Link to="/contact-us" className="text-dark">Contact Us</Link>
                </li>
                <li>
                    <Link to="/subscription" className="text-dark">Pricing</Link>
                </li>
                {/* <li>
                    <Link to="/suggest-features" className="text-dark">Suggest Features</Link>
                </li> */}
                </ul>
            </div>
            </div>
        </div>
        </footer>
        </>
    )
}
