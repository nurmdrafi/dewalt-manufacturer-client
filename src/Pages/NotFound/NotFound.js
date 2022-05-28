import React from "react";
import { Link } from "react-router-dom";
import img404 from "../../assets/images/404.jpg";
const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#F6F6F6]">
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
  );
};

export default NotFound;
