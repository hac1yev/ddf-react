import React, { useEffect, useState } from "react";
import "../assets/css/Contact.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import fb from "../img/fb.svg";
import insta from "../img/insta.svg";
import linkedin from "../img/in.svg";
import axios from "axios";
import { fetchData } from "../assets/api/dataFetching";
import Swal from 'sweetalert2';
import { useFormik } from "formik";
import { contactSchema } from '../schema/contactSchema';
import { useSelector } from "react-redux";
import tel from "../img/tel.png";

const Contact = () => {

  // Post request atılması üçün istifadə edilən funksiya
  let handleSubmitForm = async (e) => {
    axios.post(`http://api-ddf.asdfghjkl.gov.az/api/${lang}/contact`, data)
    .then(function (response) {
      Swal.fire(
        `${!lang ? 'Mesajınız Göndərildi': 'Your Message Has Been Sent'}`,
        '',
        'success'
      )
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title:`${!lang ? 'Xəta Baş Verdi': 'An Error Occurred'}`,
        text: ''
      })
    });
    return false;
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      phone: "",
      email: "",
      name: "",
      address: "",
      type: "",
      subject: "",
      message: ""
    },
    validationSchema: contactSchema,
    onSubmit: handleSubmitForm
  });


  // POST request zamanı dataları göndərmək üçün inputlardan yığılan məlumatların saxlanıldığı state-lər

  const lang = useSelector(state => state.langReducer.lang);
  const [contactData , setContactData] = useState([]);
  const [socialData , setSocialData] = useState([]);

  // Yığılan dataların vahid bir obyektə yığılması
  let data = new FormData();
  data.append('name',values.name);
  data.append('type',values.type);
  data.append('message',values.message);
  data.append('address',values.address);
  data.append('subject',values.subject);
  data.append('email',values.email);
  data.append('phone',values.phone);

  useEffect(() => {
    fetchData(`${lang}/address`)
    .then((data) => setContactData(data.data));
    fetchData('az/socicalMedia').then(data => setSocialData(data.data[0]))
  },[lang])

  return (
    <div>
      <div className="heading-all">
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={!lang ? 'Əlaqə' : 'Contact'} />
        </div>
      </div>
      <div className="container contact-container">
        <div className="row contact-row">
          <div
            className="col-lg-4"
            data-aos="zoom-in-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="1000"
          >
            <div className="contact-left-information">
              {contactData.map((item, i) => (
                <div key={i}>
                  <h1 className="contact-h1">{lang === 'az' ? 'Əlaqə məlumatları:' : 'Contact information:'}</h1>
                  <p className="contact-details">{lang === 'az' ? 'Ünvan:' : 'Address:'} <b>{item.address}</b></p>
                  {/* <h1 className="contact-h1">{lang === 'az' ? 'Əlaqə nömrələri:' : 'Contact numbers:'}</h1> */}
                  {item.phone.map((i, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                      <img src={tel} alt="" className="contact-img" /><span className="contact-details">{i}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div className="social-link">
                <ul>
                  <li>
                    <a target={'_blank'} rel="noreferrer" href={socialData.fb}>
                      <img alt="icon" src={fb} />
                    </a>
                  </li>
                  <li>
                    <a target={'_blank'} rel="noreferrer" href={socialData.instagram}>
                      <img alt="icon" src={insta} />
                    </a>
                  </li>
                  <li>
                    <a target={'_blank'} rel="noreferrer" href={socialData.linkedin}>
                      <img alt="icon" src={linkedin} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="col-lg-7"
            data-aos="zoom-in-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="1000"
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{!lang ? 'Ad, Soyad, Ata adı (*):' : 'Name, Surname, Father name (*):'}</label>
                <input
                  type="text"
                  className={errors.name && touched.name ? "form-control input-error" : "form-control"}
                  id="name"
                  name="name"
                  placeholder={!lang ? "Ad və soyadınızı daxil edin!" : "Enter your name and surname!"}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && <p className="error">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">{!lang ? 'Telefon nömrəniz:' : 'Phone Number:'}</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className={errors.phone && touched.phone ? "form-control input-error" : "form-control"} 
                  placeholder="+994xxxxxxxxx" 
                  value={values.phone} 
                  onBlur={handleBlur} 
                  onChange={handleChange}  
                />
                {errors.phone && touched.phone && <p className="error">{errors.phone}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">{!lang ? 'Email (*):' : 'Email (*):'}</label>
                <input
                  type="text"
                  className={errors.email && touched.email ? "form-control input-error" : "form-control"}
                  id="email"
                  name="email"
                  placeholder={!lang ? "Email-nizi daxil edin!" : "Enter your email!"}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="address">{!lang ? 'Ünvan (*):' : 'Address (*):'}</label>
                <input
                  type="text"
                  className={errors.address && touched.address ? "form-control input-error" : "form-control"}
                  id="address"
                  name="address"
                  placeholder={!lang ? "Ünvanınızı daxil edin!" : "Enter your address!"}
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address && <p className="error">{errors.address}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="type">{!lang ? 'Müraciətin növü (*):' : 'Type of Application:'}</label>
                <input
                  type="text"
                  className={errors.type && touched.type ? "form-control input-error" : "form-control"}
                  id="type"
                  name="type"
                  placeholder="-"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.type && touched.type && <p className="error">{errors.type}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="subject">{!lang ? 'Müraciətin mövzusu (*):' : 'Subject:'}</label>
                <input
                  type="text"
                  className={errors.subject && touched.subject ? "form-control input-error" : "form-control"}
                  id="subject"
                  name="subject"
                  placeholder="-"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.subject && touched.subject && <p className="error">{errors.subject}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="message">{!lang ? 'Mesajınız (*):' : 'Your message (*):'}</label>
                <textarea
                  type="text"
                  rows={5}
                  className={errors.message && touched.message ? "form-control input-error" : "form-control"}
                  id="message"
                  name="message"
                  placeholder={!lang ? "Mesajınızı daxil edin!" : "Enter your message!"}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
                {errors.message && touched.message && <p className="error">{errors.message}</p>}
              </div>
              <div
                style={{ marginTop: "22px" }}
                className="d-flex justify-content-center align-center"
              >
                <button type="submit" className="btn contact-send">
                {!lang ? 'Göndər:' : 'Send:'}
                </button>
              </div>
            </form>
          </div>
          <div
            className="col-lg-12 contact-map"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="1000"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12132.206644420661!2d46.06636042165081!3d40.51834920492261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403f666d7287bc41%3A0xb58ad3e666d71486!2sDashkasan%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1670399687931!5m2!1sen!2s"
              style={{ border: "0", width: "100%", height: "470px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="example iFrame Equalize Digital Home Page"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="section-footer-bg pd-b">
        <div className="container custom-container">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Contact;
