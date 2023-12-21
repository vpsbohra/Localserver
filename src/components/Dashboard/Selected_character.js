/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import KidsNav from "../../navbar/kidzNav";
import Stany from "../../images/Character/Stany.png";
import Rectangle_82 from "../../images/Character/Rectangle_82.png";
import { Link } from "react-router-dom";
import Stany2 from "../../images/Character/Stanylg.png";
import Stefy2 from "../../images/Character/Stefyf.png";
import Booboo2 from "../../images/Character/Booboof.png";
import Balam2 from "../../images/Character/Balumf.png";
import Giovanni2 from "../../images/Character/Giovannif.png";
import Kaplnga2 from "../../images/Character/Kapingaf.png";
import Cindy2 from "../../images/Character/Cindyf.png";
import Songa2 from "../../images/Character/Songaf.png";
import Gregory2 from "../../images/Character/Gregoryf.png";
import Filoo2 from "../../images/Character/Filoof.png";
import Karima2 from "../../images/Character/Karimaf.png";
import Martin2 from "../../images/Character/Martinf.png";
import Mom2 from "../../images/Character/Momf.png";
import Dad2 from "../../images/Character/Dadf.png";
import Stock21 from "../../images/Character/Stockf.png";
import Rodrigo2 from "../../images/Character/Rodrigof.png";
import Stock22 from "../../images/Character/Stock2f.png";
import Bradford2 from "../../images/Character/Bradfordf.png";
import Thomas2 from "../../images/Character/Thomasf.png";
import Simon2 from "../../images/Character/Simonf.png";
import Phil2 from "../../images/Character/Philf.png";
import Sherif2 from "../../images/Character/Sherifff.png";
import Isaac2 from "../../images/Character/Isaacf.png";
import David2 from "../../images/Character/MrsDavidf.png";
import stany_1 from "../../images/Character/stany(1).png";
import stany_2 from "../../images/Character/stany(2).png";
import stany_3 from "../../images/Character/stany(3).png";
import stefy_1 from "../../images/Character/stefy(1).png";
import stefy_2 from "../../images/Character/stefy(2).png";
import stefy_3 from "../../images/Character/stefy(3).png";
import stefy_4 from "../../images/Character/stefy(4).png";
import stefy_5 from "../../images/Character/stefy(5).png";
import stefy_6 from "../../images/Character/stefy(6).png";
import Back from "../../images/BackButton.png";
import All_characters from "./All_characters";
import { useLocation } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export default function Selected_character() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const imagetoken = searchParams.get("imagetoken");
    const charname = searchParams.get("charname");
    const description = searchParams.get("description");
    const sliderImagesParam = searchParams.get("sliderImages");
    const sliderImages = sliderImagesParam ? sliderImagesParam.split(",") : [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const openModal = (index) => {
        setIsModalOpen(true);
        setSelectedImageIndex(index);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const responsiveSettings = [
        {
            breakpoint: 767, // For mobile devices
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1024, // For tablets
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ];
    const settings = {
        // dots: true,
        infinite: true,
        slidesToShow: 3.06,
        slidesToScroll: 1,
        centerMode: true,
        arrows: true,
        centerPadding: '10px',
        responsive: responsiveSettings,
    };
    return (
        <>
            <div className="kidzdashboard selected_character_main_Sr">
                <div className="container-fluid display-table"></div>
                <KidsNav />
                <div className="main-content selected_character_sr">
                    <div className="selected_character_sr-inr">
                        <Link to='/allcharacters' className="allcharacter_link"><img src={Back} /><h3>Back</h3></Link>
                    </div>
                    <div className="selected_character_sr_content">
                        <div className="selected_character_left">
                            <img src={imagetoken} />
                        </div>
                        <div className="selected_character_right selected_character_right_cstm">
                            <div>
                                <h1>{charname}</h1>
                                <p>{description}</p>
                            </div>
                            <div className='slider_mainsr'>
                                <Slider {...settings}>
                                    {sliderImages.map((image, index) => (
                                        <div key={index} className='slide_mainsr' onClick={() => openModal(index)}>
                                            <img src={image} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
                {isModalOpen && (
                    <div className="imagepopupdiv modal selected-popup">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="16" fill="#F28A35"/>
  <path d="M20.1074 22.3803C21.1535 23.4805 22.8039 21.769 21.7579 20.6444L17.6433 16.3168L21.7579 11.9892C22.8039 10.8889 21.1767 9.15301 20.1074 10.2777L15.9928 14.6053L11.8782 10.2777C10.8321 9.15301 9.18163 10.8889 10.251 11.9892C11.6225 13.4317 12.9708 14.8742 14.3655 16.3168L10.251 20.6444C9.18163 21.7446 10.8321 23.4805 11.8782 22.3803L15.9928 18.0527L20.1074 22.3803Z" fill="white"/>
</svg>
                            </span>
                            <img src={sliderImages[selectedImageIndex]} alt="" />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}