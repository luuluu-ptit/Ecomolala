import React from "react";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import "./footer.scss";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container-footer">
          <div className="row">
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li>
                  <a>About us</a>
                </li>
                <li>
                  <a>Our service</a>
                </li>
                <li>
                  <a>Privacy policy</a>
                </li>
                <li>
                  <a>Affiliate program</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get help</h4>
              <ul>
                <li>
                  <a>FAQ</a>
                </li>
                <li>
                  <a>Shipping</a>
                </li>
                <li>
                  <a>Returns</a>
                </li>
                <li>
                  <a>Order status</a>
                </li>
                <li>
                  <a>Payment options</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Online shop</h4>
              <ul>
                <li>
                  <a>Watch</a>
                </li>
                <li>
                  <a>Bag</a>
                </li>
                <li>
                  <a>Shoes</a>
                </li>
                <li>
                  <a>Dress</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Follow us</h4>
              <div className="social-links">
                <a>
                  <FaFacebook />
                </a>
                <a>
                  <FaInstagramSquare />
                </a>
                <a>
                  <FaTwitterSquare />
                </a>
                <a>
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
