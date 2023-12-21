import React from 'react';
import Slider from 'react-slick';
import Modal from 'react-modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Stany from "../../images/Character/Character1.png";
import Stefy from "../../images/Character/Character2.png";
import Booboo from "../../images/Character/Character4.png";
import Balam from "../../images/Character/Balam.png";
import Giovanni from "../../images/Character/Character3.png";
import Kaplnga from "../../images/Character/Kaplnga.png";
import Cindy from "../../images/Character/Cindy.png";
import Songa from "../../images/Character/Songa.png";
import Gregory from "../../images/Character/Gregory.png";
import Filoo from "../../images/Character/Filoo.png";
import Karima from "../../images/Character/Karima.png";
import Martin from "../../images/Character/Martin.png";
import Mom from "../../images/Character/Mom.png";
import Dad from "../../images/Character/Dad.png";
import Stock from "../../images/Character/Stock.png";
import Rodrigo from "../../images/Character/Rodrigo.png";
import Stock2 from "../../images/Character/Stock2.png";
import Bradford from "../../images/Character/Bradford.png";
import Thomas from "../../images/Character/Thomas.png";
import Simon from "../../images/Character/Simon.png";
import Phil from "../../images/Character/Phil.png";
import Sherif from "../../images/Character/Sherif.png";
import Isaac from "../../images/Character/Isaac.png";
import David from "../../images/Character/David.png";
import close from '../../images/Close.png';


class KidzBottomNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedImage: null,
      selectedName: null,
    };
  }

  openModal = (image, name) => {
    this.setState({ isModalOpen: true, selectedImage: image, selectedName: name });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, selectedImage: null, selectedName: null });
  };

  render() {
    const responsiveSettings = [
      {
        breakpoint: 767, // For mobile devices
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ];
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: responsiveSettings,
    };


    const imageDataArray = [
      Stany,
      Stefy,
      Giovanni,
      Booboo,
      Filoo,
      Kaplnga,
      Cindy,
      Songa,
      Gregory,
      Balam,
      Martin,
      Karima,
      David,
      Isaac,
      Phil,
      Simon,
      Thomas,
      Sherif,
      Stock,
      Rodrigo,
      Stock2,
      Bradford,
      Mom,
      Dad,
    ];

    const slideNames = [
      'Stany',
      'Stefy',
      'Giovanni',
      'Booboo',
      'Filoo',
      'Kapinga',
      'Cindy',
      'Dr. Songa',
      'Gregory',
      'Balum Balum',
      'Mr. Martin',
      'Karima',
      'Mrs. David',
      'Mr.Isaac',
      'Uncle Phil',
      'Mrs. Simon',
      'Thomas',
      'Sheriff',
      'Mr.Stock',
      'Rodrigo',
      'Mrs. Stock',
      'Mr.Bradford',
      'Mom' ,
      'Dad',
    ];
    return (
      <>
        <div className='slider_btmNav_mainsr'>
          <Slider {...settings}>
            {imageDataArray.map((image, index) => (
              <div className='btmNav_mainsr' key={index}>
                <img
                  src={image}
                  onClick={() => this.openModal(image, slideNames[index])} // Pass the name here
                  alt={` ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        </div>
        <Modal className='kidz_profile_popupsr'
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Image Modal'
        >
          <div className='kidz_profile_popupsr_inner'>
            <div className='kidz_profile_popupsr_content'>
              {this.state.selectedImage && (
                <img
                  src={this.state.selectedImage}
                  alt='Selected Image'
                  className='modal-image'
                />
              )}
              <h3>{this.state.selectedName}</h3>
            </div>
            <button onClick={this.closeModal}><img src={close} alt="protected" /></button>
          </div>
        </Modal>
      </>
    );
  }
}

export default KidzBottomNav;