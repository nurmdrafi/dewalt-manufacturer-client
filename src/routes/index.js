import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import RequireAuth from "../components/Auth/RequireAuth";
import NotFound from "../pages/NotFound";

const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const MyOrders = React.lazy(() => import("../components/Dashboard/MyOrders"));
const AddReview = React.lazy(() => import("../components/Dashboard/AddReview"));
const MyProfile = React.lazy(() => import("../components/Dashboard/MyProfile"));
const MakeAdmin = React.lazy(() => import("../components/Dashboard/MakeAdmin"));
const ManageOrders = React.lazy(() =>
  import("../components/Dashboard/ManageOrders")
);
const AddProduct = React.lazy(() =>
  import("../components/Dashboard/AddProduct")
);
const ManageProducts = React.lazy(() =>
  import("../components/Dashboard/ManageProducts")
);
const Purchase = React.lazy(() => import("../pages/Purchase"));
const Payment = React.lazy(() => import("../components/Dashboard/Payment.js"));
const Products = React.lazy(() => import("../pages/Products"));
const Blogs = React.lazy(() => import("../pages/Blogs"));

const Index = () => {
  return (
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
          <Route path="manage-products" element={<ManageProducts />}></Route>
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Suspense>
  );
};

export default Index;
