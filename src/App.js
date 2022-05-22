import { Route, Routes } from "react-router-dom";
import "./App.css";
import Blogs from "./Pages/Blogs/Blogs";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import MyPortfolio from "./Pages/MyPortfolio/MyPortfolio";
import Navbar from "./Pages/Shared/Navbar";
import MyOrders from "./Pages/Dashboard/MyOrders";
import AddReview from "./Pages/Dashboard/AddReview";
import MyProfile from "./Pages/Dashboard/MyProfile";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin";
import ManageOrders from "./Pages/Dashboard/ManageOrders";
import AddProduct from "./Pages/Dashboard/AddProduct";
import ManageProducts from "./Pages/Dashboard/ManageProducts";

function App() {
  return (
    <div>
      <div className="bg-primary">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="blogs" element={<Blogs />}></Route>
        <Route path="my-portfolio" element={<MyPortfolio />}></Route>
        <Route path="dashboard" element={<Dashboard />}>
          {/* Nested Route */}
          <Route index element={<MyOrders />}></Route>
          <Route path="add-review" element={<AddReview />}></Route>
          <Route path="my-profile" element={<MyProfile />}></Route>
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
