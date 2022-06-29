import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Navbar from "./Pages/Shared/Navbar";
import MyOrders from "./Pages/Dashboard/MyOrders";
import AddReview from "./Pages/Dashboard/AddReview";
import MyProfile from "./Pages/Dashboard/MyProfile";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin";
import ManageOrders from "./Pages/Dashboard/ManageOrders";
import AddProduct from "./Pages/Dashboard/AddProduct";
import ManageProducts from "./Pages/Dashboard/ManageProducts";
import Purchase from "./Purchase/Purchase";
import Payment from "./Pages/Dashboard/Payment.js";
import RequireAuth from "./Pages/Auth/RequireAuth";
import Products from "./Pages/Products/Products";

function App() {
  return (
    <div>
      <div className="bg-primary">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="products" element={<Products/>}></Route>
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
    </div>
  );
}

export default App;
