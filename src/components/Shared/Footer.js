import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full flex-col bg-primary py-4 ">
      <p className="text-center font-bold">
        All Rights Reserved By © DEWALT | {currentYear}
      </p>
      <p className="text-center font-bold">
        Developed by{" "}
        <a
          className="link link-hover"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/nurmdrafi"
        >
          Nur Mohamod Rafi
        </a>
      </p>
    </footer>
  );
};

export default Footer;
