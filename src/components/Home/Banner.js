import React from "react";
import { Link } from "react-router-dom";
import BannerImg from "../../assets/images/banner-bg.webp";

const Banner = () => {
  const BannerBackground = {
    background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BannerImg})`,
    minHeight: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <section id="top" className="hero min-h-screen" style={BannerBackground}>
      <div className="hero-content flex-col">
        <div>
          <h1 className="text-5xl font-bold uppercase text-white">
            THE NEXT DIMENSION IN POWER™
          </h1>
          <p className="w-full py-6 font-bold text-white lg:w-1/2">
            We take extensive measures to ensure all our products are made to
            the very highest standards and meet all relevant industry
            regulations.
          </p>
          <Link to="/products">
            <button className="btn rounded-none border-0 bg-primary text-black hover:border-primary hover:text-white ">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
