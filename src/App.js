import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Navbar from "./Pages/Shared/Navbar";
import RequireAuth from "./Pages/Auth/RequireAuth";

const Login = React.lazy(() => import("./Pages/Auth/Login"));
const Register = React.lazy(() => import("./Pages/Auth/Register"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard/Dashboard"));
const MyOrders = React.lazy(() => import("./Pages/Dashboard/MyOrders"));
const AddReview = React.lazy(() => import("./Pages/Dashboard/AddReview"));
const MyProfile = React.lazy(() => import("./Pages/Dashboard/MyProfile"));
const MakeAdmin = React.lazy(() => import("./Pages/Dashboard/MakeAdmin"));
const ManageOrders = React.lazy(() => import("./Pages/Dashboard/ManageOrders"));
const AddProduct = React.lazy(() => import("./Pages/Dashboard/AddProduct"));
const ManageProducts = React.lazy(() =>
  import("./Pages/Dashboard/ManageProducts")
);
const Purchase = React.lazy(() => import("./Pages/Purchase/Purchase"));
const Payment = React.lazy(() => import("./Pages/Dashboard/Payment.js"));
const Products = React.lazy(() => import("./Pages/Products/Products"));
const Blogs = React.lazy(() => import("./Pages/Blogs/Blogs"));

function App() {
  return (
    <div>
      <div className="bg-primary">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route
          path="blogs"
          element={
            <Suspense fallback={<></>}>
              <Blogs />
            </Suspense>
          }
        ></Route>
        <Route
          path="products"
          element={
            <Suspense fallback={<></>}>
              <Products />
            </Suspense>
          }
        ></Route>
        <Route
          path="purchase/:_id"
          element={
            <RequireAuth>
              <Suspense fallback={<></>}>
                <Purchase />
              </Suspense>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="payment/:_id"
          element={
            <Suspense fallback={<></>}>
              <Payment />
            </Suspense>
          }
        ></Route>
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<></>}>
              <Dashboard />
            </Suspense>
          }
        >
          {/* Nested Routes */}
          <Route
            index
            element={
              <Suspense fallback={<></>}>
                <MyProfile />
              </Suspense>
            }
          ></Route>
          <Route
            path="my-order"
            element={
              <Suspense fallback={<></>}>
                <MyOrders />
              </Suspense>
            }
          ></Route>
          <Route
            path="add-review"
            element={
              <Suspense fallback={<></>}>
                <AddReview />
              </Suspense>
            }
          ></Route>
          <Route
            path="make-admin"
            element={
              <Suspense fallback={<></>}>
                <MakeAdmin />
              </Suspense>
            }
          ></Route>
          <Route
            path="manage-orders"
            element={
              <Suspense fallback={<></>}>
                <ManageOrders />
              </Suspense>
            }
          ></Route>
          <Route
            path="add-product"
            element={
              <Suspense fallback={<></>}>
                <AddProduct />
              </Suspense>
            }
          ></Route>
          <Route
            path="manage-products"
            element={
              <Suspense fallback={<></>}>
                <ManageProducts />
              </Suspense>
            }
          ></Route>
        </Route>
        <Route
          path="login"
          element={
            <Suspense fallback={<></>}>
              <Login />
            </Suspense>
          }
        ></Route>
        <Route
          path="register"
          element={
            <Suspense fallback={<></>}>
              <Register />
            </Suspense>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
