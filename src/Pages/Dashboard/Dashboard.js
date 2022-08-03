import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import Footer from "../../Pages/Shared/Footer";
import { CgProfile } from "react-icons/cg";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { GrHostMaintenance } from "react-icons/gr";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineRateReview } from "react-icons/md";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);

  return (
    <div>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-sidebar"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col items-center ">
          {/* <!-- Page content here --> */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
          <ul className="menu w-80 overflow-y-auto bg-base-100 p-4 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              <Link
                to="/dashboard"
                className="hover:bg-primary focus:bg-primary"
              >
                {" "}
                <CgProfile className="text-2xl" /> My Profile
              </Link>
            </li>
            {!admin && (
              <>
                <li>
                  <Link
                    to="/dashboard/my-order"
                    className="hover:bg-primary focus:bg-primary"
                  >
                    <RiShoppingCartLine className="text-2xl" /> My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/add-review"
                    className="hover:bg-primary focus:bg-primary"
                  >
                    <MdOutlineRateReview className="text-2xl" /> Add A Review
                  </Link>
                </li>
              </>
            )}

            {admin && (
              <>
                <li>
                  <Link
                    to="/dashboard/manage-orders"
                    className="hover:bg-primary focus:bg-primary"
                  >
                    {" "}
                    <MdOutlineProductionQuantityLimits className="text-2xl" />{" "}
                    Manage All Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/add-product"
                    className="hover:bg-primary focus:bg-primary"
                  >
                    <AiOutlineFolderAdd className="text-2xl" /> Add A Product
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/manage-products"
                    className="hover:bg-primary focus:bg-primary"
                  >
                    <GrHostMaintenance className="text-2xl" /> Manage Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/make-admin"
                    className="hover:bg-primary focus:bg-primary"
                  >
                    <GrUserAdmin className="text-2xl" /> Make Admin
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(Dashboard);
