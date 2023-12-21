import React from 'react';
import Footer from './Footer';
import About_headerImg from '../images/about_header_img01.png';
import education_fun from '../images/Education_fun.png';
import strengthening_bonds from '../images/strengthening_bonds.png';
import future_vision from '../images/future_vision.png';
import about_right_eff from '../images/about_right_eff.png';
import about_left_eff from '../images/about_left_eff.png';
import Header from './Header';



export default function Faq() {

  return (
 
    <>
       <Header />
      <div className="main-container about_page">

        <div className="about_page_header">
          <img src={About_headerImg} />
        </div>

        <div className="container">
          <div className="about_page_inner">
            <div className="about_page_head">
              <h1>About Us</h1>
              <p>At KidzConnect, we're parents, just like you. We've encountered the same challenge that many 21st-century parents face: screens. We've been on a mission to transform screen time into a valuable and enjoyable experience that not only educates but also strengthens family bonds. And from this mission, KidzConnect was born.</p>
            </div>
            <div className='about_page_content'>
              <div className='about_content_item'>
                <div className='about_content_item_img about_content_item_img_orange'>
                  {/* <img src={education_fun} /> */}
                  <h3>Education and Fun</h3>
                </div>
                <p>KidzConnect isn't just an app; it's an interactive educational tool designed to provide a positive alternative to conventional screen usage. We offer a platform where your child can read or listen to educational stories, answer questions (including yours), and engage in various activities that impart crucial life lessons.</p>
              </div>

              <div className='about_content_item'>
                <div className='about_content_item_img about_item_imgRight'>
                  {/* <img src={strengthening_bonds} /> */}
                  <h3>Strengthening Family Bonds</h3>
                </div>
                <p>KidzConnect goes beyond learning; it fosters real-world 'Parent-Child' communication. The conversations that begin on the screen continue around the dinner table or during car rides, turning ordinary moments into meaningful dialogues. As a parent, you'll have the joy of discovering different aspects of your child's personality and creativity.</p>
              </div>

              <div className='about_content_item'>
                <div className='about_content_item_img about_content_item_img_green'>
                  {/* <img src={future_vision} /> */}
                  <h3>Our Vision of the Future</h3>
                </div>
                <p>Yet, what truly sets KidzConnect apart is its ability to capture and preserve these precious exchanges through voice recordings. We believe these compilations of voices will become as treasured as family photo albums, capturing not just images but also the voices, laughter, discoveries, and thoughts of your children.</p>
                <p>Imagine your family in the future, your children all grown up, listening not only to their own childhood voices but also to those of their parents. They'll be sharing these timeless memories with their own children.</p>
              </div>

              <div className='about_content_item'>     
                <p>We firmly believe that KidzConnect has the potential to become your family's cherished sound album, preserving the voices and stories that define your family. Join us in this exciting and innovative journey of learning, communication, and memory preservation. Together, let's transform every interaction into a precious memory for the entire family.</p>
                <p>Welcome to the KidzConnect universe!</p>
              </div>


            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}