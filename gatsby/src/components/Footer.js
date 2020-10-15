import React from 'react';

const Footer = () => {
  const currentDate = new Date().getFullYear();
  return (
    <footer>
      <p>&copy; Slick's Slices {currentDate}</p>
    </footer>
  );
};

export default Footer;
