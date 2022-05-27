import React from "react";
import BannerImg from "../../assets/images/banner-bg.jpg";

const Banner = () => {
  const BannerBackground = {
    background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BannerImg})`,
    minHeight: "90vh",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center left",
  };
  return (
    <section className="hero min-h-screen max-w-full" style={BannerBackground}>
      <div className="hero-content flex-col">
        <div>
          <h1 className="text-5xl font-bold text-white uppercase">
            THE NEXT DIMENSION IN POWER™
          </h1>
          <p className="py-6 text-white w-full lg:w-1/2 font-bold">
            We take extensive measures to ensure all our products are made to
            the very highest standards and meet all relevant industry
            regulations.
          </p>
          <button className="btn bg-primary text-black border-0 hover:text-primary hover:border-primary hover:border-2">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
