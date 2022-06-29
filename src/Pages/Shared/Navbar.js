import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import logo from "../../assets/images/DeWalt_Logo.svg.png"

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const MenuItems = (
    <>
      <li>
        <Link to="/home" className="font-semibold">Home</Link>
      </li>
      {user ? (
        <>
          <li>
            <Link to="/dashboard" className="font-semibold">Dashboard</Link>
          </li>
          <li>
            <button className="btn btn-ghost" onClick={logout}>
              Sign Out
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>
        </li>
      )}
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
            <img src={logo} alt="DeWalt_Logo" />
          </div>
        </Link>
      </div>
      <div className="lg:navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{MenuItems}</ul>
      </div>
      <div className="navbar-end lg:hidden lg:flex">
        <label
          htmlFor="dashboard-sidebar"
          className="btn btn-primary drawer-button lg:hidden"
        >
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
