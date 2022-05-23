import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../src/assets/images/dewalt-logo.png";

const Navbar = () => {
  const MenuItems = (
    <>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>

      <li>
        <Link to="/my-portfolio">My Portfolio</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>

      <li>
        <button className="btn btn-ghost">Sign Out</button>
      </li>
    </>
  );
  return (
    <nav className="navbar bg-primary max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {MenuItems}
          </ul>
        </div>
        <Link to="/home">
          <div className="w-[150px]">
            <img src={logo} alt="DeWalt Logo" />
          </div>
        </Link>
      </div>
      <div className="lg:navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{MenuItems}</ul>
      </div>
      <div className="navbar-end lg:hidden lg:flex">
      <label htmlFor="dashboard-sidebar" className="btn btn-primary drawer-button lg:hidden">
      <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
      </label>
      </div>
      
    </nav>
  );
};

export default Navbar;