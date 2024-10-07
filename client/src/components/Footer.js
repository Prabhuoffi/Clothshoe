// Importing necessary libraries and components
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// Defining the Footer component
function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-8">
      <div className="container mx-auto px-4 flex flex-wrap justify-between">
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <h2 className="text-2xl font-bold mb-4">Our Company</h2>
          <p className="text-gray-200">
            At our shoe store, we are committed to providing the best shoes of various styles, ensuring that each pair meets the highest standards of quality and craftsmanship.
          </p>
        </div>
        <div className="w-full lg:w-1/3  mb-8 lg:mb-0">
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2"><Link to="/" className="text-gray-200 hover:text-white">Home</Link></li>
            <li className="mb-2"><Link to="/collection" className="text-gray-200 hover:text-white">Shop</Link></li>
            <li className="mb-2"><Link to="/about" className="text-gray-200 hover:text-white">About Us</Link></li>
            <li className="mb-2"><Link to="/faqs" className="text-gray-200 hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <div className="flex justify-center lg:justify-start space-x-4 mt-4">
            <Link to="#" className="text-gray-200 hover:text-white">
              <FaFacebookF />
            </Link>
            <Link to="#" className="text-gray-200 hover:text-white">
              <FaTwitter />
            </Link>
            <Link to="#" className="text-gray-200 hover:text-white">
              <FaInstagram />
            </Link>
            <Link to="#" className="text-gray-200 hover:text-white">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center pt-4 border-t border-gray-500 mt-8">
        <p className="text-gray-200">&#10084;Prabhu Fullstack WebDeveloper</p>
      </div>
    </footer>
  );
}

export default Footer; 
