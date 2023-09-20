import React from 'react';
import './scss/footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div id="footer-about">
        <p className="footer-headings">About</p>
        <p className="footer-details">
          This is a hobby project. It is a dummy food website. I am not earning anything with this website.
          If i got your copyrighted things please write me at elravisingh@gmail.com and I will remove it.
        </p>
      </div>
      <div id="footer-links">
        <p className="footer-headings">Connect with us</p>
        <div className="footer-links-box">
          <Link to="" target="_blank">
            <img
              src={require('./images/whatsapp_icon.png')}
              alt="whatsapp_icon"
            />
          </Link>
          <Link to="" target="_blank">
            <img
              src={require('./images/instagram_icon.png')}
              alt="instagram_icon"
            />
          </Link>
          <Link to="" target="_blank">
            <img
              src={require('./images/messenger_icon.png')}
              alt="messenger_icon"
            />
          </Link>
        </div>
      </div>
      <div id="footer-contact">
        <p className="footer-headings">Contact us</p>
        <p id="contact-number">+91 1432 6582 91</p>
      </div>
    </footer>
  );
};

export default Footer;
