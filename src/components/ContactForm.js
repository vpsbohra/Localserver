import emailjs from 'emailjs-com';
import React, { useState } from 'react';
const ContactForm = ({ setShowModal}) => {
  const [formStatus, setFormStatus] = React.useState('SEND MESSAGE');

  const sendEmail = (formData) => {
    const emailAddress = ['testmail@gmail.com'];  //PLEASE ENTER YOUR EMAIL ID HERE
    
    const templateParams = {
      message: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
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
            setFormStatus('Mail sent successfully');
            setShowModal(true);
          },
          (error) => {
            console.error('Email error:', error.text);
          }
        );
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Submitting...');

    const { name, email, message } = e.target.elements;
    const formData = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    sendEmail(formData);

  };
  return (
    <>
      
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Your Name
          </label>
          <input className="form-control" placeholder="Pierre" type="text" id="name" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Your Email
          </label>
          <input className="form-control" placeholder="Pierre@gmail.com" type="email" id="email" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="message">
            Your Message
          </label>
          <textarea className="form-control" placeholder="Write here..." id="message" required />
        </div>
        <button className="btn btn-danger" type="submit">
          {formStatus}
        </button>
      </form>
    </>
  )
}
export default ContactForm