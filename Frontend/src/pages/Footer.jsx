import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <p className="text-lg font-semibold">SKILL EDUCATION</p>
          <p>Empowering students, professionals, and organizations</p>
        </div>

        {/* Social Media Icons Section */}
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-600">
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        <div className="text-sm">
          <p>&copy; {new Date().getFullYear()} Skill Education. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
