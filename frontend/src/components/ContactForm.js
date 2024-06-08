import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';
import emailjs from 'emailjs-com';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './contactForm.css';

const ContactForm = () => {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter your name.'),
        email: Yup.string()
            .email('Please enter a valid email address.')
            .required('Email is required.'),
        countryCode: Yup.string()
        .matches(/^\d{3}$/, 'Please enter a valid country code.')
        .notRequired(),// Make country code optional 
        phone: Yup.string()
            .matches(/^\d{10}$/, 'Please enter a valid phone number.')
            .notRequired(),
        country: Yup.string().required('Please enter your country.'),
    
        city: Yup.string().required('Please enter your city.'),
        query: Yup.string()
            .min(25, 'Query must be at least 25 characters.')
            .max(4000, 'Query length cannot exceed 4000 characters.')
            .required('Query is required.'),
    });
    
        const handleSubmit = async (values, {resetForm}) => {
            
            try {
                    const serviceId = 'service_j70yu38';
                    const templateId = 'template_k66edcn';
                    const publicKey = 'BqjgqexYfJqNT7287';

                    await emailjs.send(serviceId, templateId, values, publicKey);

                    alert('Form submitted successfully');
                    resetForm();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Failed to submit form. Please try again later.');
            }
        };
            
  
      return (
          <div className='contact-form-container'>
              
              <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        countryCode: '',
                        phone: '',
                        country: '',
                        city: '',
                        query: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit} >
                {({ values, setFieldValue, isSubmitting}) => (
                    <Form className='contact-form'>
                    <div className='form-group'>
                      <h2>Talk to Us</h2>  
                      <label htmlFor="name" className='form-label'>Name:</label>
                      <Field
                          type="text"
                          id="name"
                          name="name"
                          className = "form-input"
                      />
                      <ErrorMessage name="name" component="div" style = {{ color: 'red'}} />
                  </div>
                  <div className='form-group'>
                      <label htmlFor="email" className='form-label'>Email:</label>
                      <Field
                          type="email"
                          id="email"
                          name="email"    
                          className = "form-input"            
                      />
                      <ErrorMessage name="email" component="div" style = {{ color: 'red'}} />
                  </div>
                  <div className="form-group">
                            <div className='form-row'>
                                <label htmlFor="countryCode" className='form-label'>Country Code:</label>
                                
                                <PhoneInput
                                    
                                    defaultCountry="IN"
                                    // value={values.phone}
                                    onChange={(value) => setFieldValue('phone', value)}
                                    className="form-input"
                                    name="countryCode"
                                />                                
                                <ErrorMessage name="countryCode" component="div" style={{ color: 'red' }} />
                            
                    
                            <label htmlFor="phone" className='form-label'>Phone:</label>
                                <Field
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className = "form-input"
                                />
                                <ErrorMessage name="phone" component="div"  className='form-error'style={{ color: 'red' }} />
                            </div>
                    </div>
         

                  <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="country" className='form-label'>Country:</label>
                                <Field type="text" id="country" name="country" />
                                <ErrorMessage name="country" component="div" style={{ color: 'red' }} />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="city" className='form-label'>City:</label>
                                <Field type="text" id="city" name="city" />
                                <ErrorMessage name="city" component="div" style={{ color: 'red' }} />
                            </div>
                    </div>
                  <div className='form-group'>
                      <label htmlFor="query" className='form-label'>Query:</label>
                      <Field as ="textarea"
                          id="query"
                          name="query"
                          className = "form-input"
                      />
                      <ErrorMessage name="query" component="div" style = {{ color: 'red'}} />
                  </div>
                  <div className="button-container">
                            
                            <button type="submit" disabled={isSubmitting} className="send-btn">Send</button>
                            <Link to="/" className="home-button">Homepage</Link>
                    </div>
                  
                  </Form>
                )}
                </Formik>
            </div>
        );
    };
  
export default ContactForm;