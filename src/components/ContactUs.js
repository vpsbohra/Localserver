import React, { useState } from 'react';
import Footer from './Footer';
import ContactForm from './ContactForm';
import Header from './Header';
const ContactUs = () => {
  const [showModal, setShowModal] = useState(false); 

  return (
    <>
    <Header />
    <div className="contact_page_sr">
      <div className="container mt-5">
        <div className="left-content">
          <h1 className="mb-3">Connect with Our Team!</h1>
          <p>Whether you have questions, feedback, or just want to say hi, we're all ears! Your thoughts and ideas matter to us, so don't hesitate to reach out. We can't wait to hear from you!</p>
        </div>
        <div className="right-content">
         <ContactForm setShowModal={setShowModal} />
        </div>

      </div>
    </div>
    <Footer />
    </>
  )
}
export default ContactUs