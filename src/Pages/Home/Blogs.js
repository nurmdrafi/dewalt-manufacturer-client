import React from "react";
import { Link } from "react-router-dom";
import image1 from "../../assets/images/portfolio-image-1.jpg";
import image2 from "../../assets/images/portfolio-image-2.jpg";
import image3 from "../../assets/images/portfolio-image-3.jpg";
import logo1 from "../../assets/images/portfolio-logo-1.png";
import logo2 from "../../assets/images/portfolio-logo-2.png";
import logo3 from "../../assets/images/portfolio-logo-3.png";

const Blogs = () => {
  return (
    <section className="mt-16">
      <h2 className="--heading">Blogs</h2>
      {/* portfolio 1 */}
      <div className="flex w-full flex-col md:flex-row">
        {/* image */}
        <div className="h-[300px] w-full md:h-[500px]">
          <div
            style={{ backgroundImage: `url(${image1})` }}
            className="h-full w-full bg-cover bg-center md:bg-right-bottom"
          ></div>
        </div>
        {/* card */}
        <div className="flex items-center bg-primary md:w-[60%]">
          {/* white */}
          <div className="relative bottom-20 mx-auto flex h-[420px] w-[420px] flex-col items-start justify-center bg-white p-10 md:bottom-0 md:right-48">
            <figure className="max-w-[200px] bg-primary">
              <img src={logo1} alt="" />
            </figure>
            <p className="flex-grow-0 font-bold">20V MAX* XR® Tools</p>
            <h2 className="text-dark py-3 text-4xl font-bold uppercase md:text-5xl">
              EXPERIENCE POWER™
            </h2>
            <Link to="/blogs">
              <button className="btn rounded-none bg-black text-white hover:border-0 hover:bg-primary hover:text-black">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* portfolio 2 */}
      <div className="flex w-full flex-col md:flex-row">
        {/* card */}
        <div className="order-1 flex items-center bg-primary md:order-none md:w-[60%]">
          {/* white */}
          <div className="relative bottom-20 mx-auto flex h-[420px] w-[420px] flex-col items-start justify-center bg-white p-10 md:bottom-0 md:left-48">
            <figure className="max-w-[200px] bg-primary">
              <img src={logo2} alt="" />
            </figure>
            <p className="flex-grow-0 font-bold">
              NEW ELITE SERIES™ ACCESSORIES
            </p>
            <h2 className="text-dark py-3 text-4xl font-bold uppercase md:text-5xl">
              BUILT TO LAST™
            </h2>
            <Link to="/blogs">
              <button className="btn rounded-none bg-black text-white hover:border-0 hover:bg-primary hover:text-black">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        {/* image */}
        <div className="h-[300px] w-full md:h-[500px]">
          <div
            style={{ backgroundImage: `url(${image2})` }}
            className="h-full w-full bg-cover bg-center md:bg-left-bottom"
          ></div>
        </div>
      </div>

      {/* portfolio 3 */}
      <div className="flex w-full flex-col md:flex-row">
        {/* image */}
        <div className="h-[300px] w-full md:h-[500px]">
          <div
            style={{ backgroundImage: `url(${image3})` }}
            className="h-full w-full bg-cover bg-center md:bg-right-bottom"
          ></div>
        </div>
        {/* card */}
        <div className="flex items-center bg-primary md:w-[60%]">
          {/* white */}
          <div className="relative bottom-20 mx-auto flex h-[420px] w-[420px] flex-col items-start justify-center bg-white p-10 md:bottom-0 md:right-48">
            <figure className="max-w-[200px] bg-white">
              <img src={logo3} alt="" />
            </figure>
            <p className="flex-grow-0 font-bold">PRO-TRUSTED PERFORMANCE</p>
            <h2 className="text-dark py-3 text-4xl font-bold uppercase md:text-5xl">
              BATTERY-POWERED OUTDOOR EQUIPMENT
            </h2>
            <Link to="/blogs">
              <button className="btn rounded-none bg-black text-white hover:border-0 hover:bg-primary hover:text-black">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
