import React, { Suspense } from "react";
import {Route, Routes } from "react-router-dom";
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
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="blogs" element={<Blogs />}></Route>
            <Route path="products" element={<Products />}></Route>
            <Route
              path="purchase/:_id"
              element={
                <RequireAuth>
                  <Purchase />
                </RequireAuth>
              }
            ></Route>
            <Route path="payment/:_id" element={<Payment />}></Route>
            <Route path="dashboard" element={<Dashboard />}>
              {/* Nested Routes */}
              <Route index element={<MyProfile />}></Route>
              <Route path="my-order" element={<MyOrders />}></Route>
              <Route path="add-review" element={<AddReview />}></Route>
              <Route path="make-admin" element={<MakeAdmin />}></Route>
              <Route path="manage-orders" element={<ManageOrders />}></Route>
              <Route path="add-product" element={<AddProduct />}></Route>
              <Route
                path="manage-products"
                element={<ManageProducts />}
              ></Route>
            </Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Suspense>
    </div>
  );
}

export default App;
