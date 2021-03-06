import React from "react";
import { Link } from "react-router-dom";
import img404 from "../../assets/images/404.jpg";
import Footer from "../../Pages/Shared/Footer";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-between h-[90vh]">
      <div className="flex justify-center items-center h-screen bg-[#F6F6F6] py-16">
        <div>
          <img src={img404} alt="" />
          <div className="flex justify-center">
            <Link to="/home">
              <button type="button" className="btn btn-primary">
                Back to homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default NotFound;
