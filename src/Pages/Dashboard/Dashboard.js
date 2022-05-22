import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center ">
        {/* <!-- Page content here --> */}
        <h1 className="text-3xl py-5 font-bold">Welcome to Dashboard</h1>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link to="/dashboard">My Orders</Link>
          </li>
          <li>
            <Link to="/dashboard/add-review">Add A Review</Link>
          </li>
          <li>
            <Link to="/dashboard/my-profile">My Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/make-admin">Make Admin</Link>
          </li>
          <li>
            <Link to="/dashboard/manage-orders">Manage All Orders</Link>
          </li>
          <li>
            <Link to="/dashboard/add-product">Add A Product</Link>
          </li>

          <li>
            <Link to="/dashboard/manage-products">Manage Products</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
