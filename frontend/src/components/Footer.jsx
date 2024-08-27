import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Branding and Description */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">JobFind.Com</h2>
            <p className="text-gray-400 text-sm max-w-xs">
              Your trusted partner in finding the right job. We bring you closer to your career aspirations.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-blue-500 transition duration-300">
              <i className="fab fa-facebook-f w-6 h-6"></i>
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-blue-400 transition duration-300">
              <i className="fab fa-twitter w-6 h-6"></i>
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-blue-700 transition duration-300">
              <i className="fab fa-linkedin-in w-6 h-6"></i>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-pink-500 transition duration-300">
              <i className="fab fa-instagram w-6 h-6"></i>
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center md:text-left">
          <div>
            <h4 className="text-lg font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm hover:text-gray-300 transition duration-300">About Us</a></li>
              <li><a href="/careers" className="text-sm hover:text-gray-300 transition duration-300">Careers</a></li>
              <li><a href="/contact" className="text-sm hover:text-gray-300 transition duration-300">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Support</h4>
            <ul className="space-y-2">
              <li><a href="/faq" className="text-sm hover:text-gray-300 transition duration-300">FAQ</a></li>
              <li><a href="/privacy-policy" className="text-sm hover:text-gray-300 transition duration-300">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="text-sm hover:text-gray-300 transition duration-300">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-sm hover:text-gray-300 transition duration-300">Blog</a></li>
              <li><a href="/guides" className="text-sm hover:text-gray-300 transition duration-300">Guides</a></li>
              <li><a href="/news" className="text-sm hover:text-gray-300 transition duration-300">News</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Subscribe</h4>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-3 py-2 text-black rounded-l-md focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center md:text-left">
          <p className="text-sm text-gray-500">© 2024 JobFind.Com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
