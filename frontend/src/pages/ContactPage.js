import React from 'react';
import ContactForm from '../components/ContactForm';
import Carousel from '../components/Carousel';
import './contactPage.css';


const ContactPage = () => {
    return (
        <div className="contact-page-container">
            <div className="carousel-container">
                <Carousel />
            </div>
            <ContactForm />
        </div>
    );
};

export default ContactPage; 