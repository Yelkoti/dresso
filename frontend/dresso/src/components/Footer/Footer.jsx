import React from "react";

const Footer = () => {
  const currYear = new Date().getFullYear();

  return (
    <div className="text-center my-6">
      <p>Jabbo &copy; {currYear}</p>
    </div>
  );
};

export default Footer;
