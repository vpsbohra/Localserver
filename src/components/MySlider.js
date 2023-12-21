import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Daisy_Img from '../images/Daisy_img.png';

class MySlider extends React.Component {
    render() {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      }; 
  
      return (
        <>
        <Slider {...settings}>
          <div>
            <h3>Lorem ipsum dolor sit amet consectetur. Quis pulvinar enim adipiscing viverra pulvinar amet commodo. Erat gravida sed amet cursus tincidunt egestas a. Eu et mauris sit nec. Ut mollis turpis interdum lectus aliquam.</h3>
            <div className='review_slider_img-tile'>
              <span className='review_title'>Daisy Jones</span>
              <img src={Daisy_Img}/>
            </div>
          </div>
          <div>
            <h3>Lorem ipsum dolor sit amet consectetur. Quis pulvinar enim adipiscing viverra pulvinar amet commodo. Erat gravida sed amet cursus tincidunt egestas a. Eu et mauris sit nec. Ut mollis turpis interdum lectus aliquam.</h3>
            <div className='review_slider_img-tile'>
              <span className='review_title'>Daisy Jones</span>
              <img src={Daisy_Img}/>
            </div>
          </div>
          <div>
            <h3>Lorem ipsum dolor sit amet consectetur. Quis pulvinar enim adipiscing viverra pulvinar amet commodo. Erat gravida sed amet cursus tincidunt egestas a. Eu et mauris sit nec. Ut mollis turpis interdum lectus aliquam.</h3>
            <div className='review_slider_img-tile'>
              <span className='review_title'>Daisy Jones</span>
              <img src={Daisy_Img}/>
            </div>
          </div>
        </Slider>
        <p>READ ALL REVIEWS</p>
        </>
      );
    }
  }
  
  export default MySlider;