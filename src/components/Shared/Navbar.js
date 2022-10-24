import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import logo from "../../assets/images/DeWalt_Logo.svg.png";
import { HashLink } from "react-router-hash-link";

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
        <Link to="/home" className="font-semibold">
          Home
        </Link>
      </li>

      <li>
        <HashLink to="home/#reviews" className="font-semibold">
          Reviews
        </HashLink>
      </li>
      <li>
        <Link to="/products" className="font-semibold">
          Products
        </Link>
      </li>
      <li>
        <Link to="/blogs" className="font-semibold">
          Blogs
        </Link>
      </li>
      {user ? (
        <>
          <li>
            <Link to="/dashboard" className="font-semibold">
              Dashboard
            </Link>
          </li>
          <li>
            <HashLink
              to="home/#contact"
              className="whitespace-nowrap font-semibold"
            >
              Contact Us
            </HashLink>
          </li>
          <li>
            <button className="btn btn-ghost" onClick={logout}>
              Sign Out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <HashLink
              to="home/#contact"
              className="whitespace-nowrap font-semibold"
            >
              Contact Us
            </HashLink>
          </li>
          <li>
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <nav className="navbar relative mx-auto flex max-w-7xl justify-between bg-primary">
      {/* Logo */}
      <Link to="/home" className="order-2 lg:order-first">
        <div className="w-[150px]">
          <img src={logo} alt="DeWalt_Logo" />
        </div>
      </Link>

      {/* Menu Container */}
      <div className="order-3 lg:order-last">
        {/* Small Menu */}
        <div className="dropdown dropdown-end">
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
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            {MenuItems}
          </ul>
        </div>
      </div>

      {/* Large Menu */}
      <div className="absolute right-10 hidden lg:navbar-end lg:flex">
        <ul className="menu menu-horizontal p-0">{MenuItems}</ul>
      </div>
      {/* Dashboard Sidebar */}
      {user && window.location.href.includes("dashboard") && (
        <>
          <div className="order-1 lg:order-none lg:hidden">
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
        </>
      )}
    </nav>
  );
};

export default Navbar;
