import logo from '../assets/nutrino-logo.png';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Newsletter from '../components/Newsletter';
import './Footer.css';  // Import a separate CSS file for styling

export default function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer-content">
          <img src={logo} className='logo' alt='Nutrino Logo' />
          <div className='footer-links'>
            <div className='link-group font-bold text-xl'>
              <Link to={"/"}>Homepage</Link>
              <Link to={"/signup"}>Sign Up</Link>
              <Link to={"/login"}>Login</Link>
            </div>
            <div className='link-group font-bold text-xl'>
              <Link to={"/recipe"}>Recipe</Link>
              <Link to={"/productscanner"}>Product Scanner</Link>
              <Link to={"/community"}>Community</Link>
            </div>
          </div>
          <Newsletter />
        </div>
      </div>
    </>
  );
}
