import React, { useState } from "react";
import { useQuery } from "react-query";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
    maxWidth: "450px",
  },
};

const ManageOrders = () => {
  const [selectedId, setSelectedId] = useState("");
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  // Modal
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedId("");
  }
  const {
    isLoading,
    error,
    data: orders,
    refetch,
  } = useQuery("orders", () =>
    fetch(`http://localhost:5000/orders`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
      return res.json();
    })
  );
  if (isLoading) {
    return <p className="text-center font-bold text-4xl">Loading...</p>;
  }
  return (
    <div>
      <h2 className="text-center font-bold text-2xl my-4">Manage All Orders</h2>
      <div>
        <table className="table-auto border-separate">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th className="text-center bg-primary p-3 mx-2">No.</th>
              <th className="text-center bg-primary p-3 mx-2">Product Name</th>
              <th className="text-center bg-primary p-3 mx-2">QTY</th>
              <th className="text-center bg-primary p-3 mx-2">Amount</th>
              <th className="text-center bg-primary p-3 mx-2">
                Payment Status
              </th>
              <th className="text-center bg-primary p-3 mx-2">
                Delivery Status
              </th>
              <th className="text-center bg-primary p-3 mx-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => {
              return (
                <tr key={index}>
                  {/* Serial */}
                  <td className="font-bold text-center border-b-2">
                    {index + 1}
                  </td>
                  {/* Img & Name */}
                  <td className="flex items-center flex-wrap">
                    <img
                      className="w-16 mr-4 rounded"
                      src={order.img}
                      alt={order.productName}
                    />
                    <span>{order.productName}</span>
                  </td>

                  {/* QTY */}
                  <td className="text-center">{order.quantity}</td>

                  {/* Amount */}
                  <td className="text-center">{order.price}</td>

                  {/* Payment Status */}
                  <td className="text-center">
                    <button
                      className={`btn btn-xs text-white hover:bg-error border-0 ${
                        order.paymentStatus === "unpaid" && "bg-error"
                      } ${order.paymentStatus === "paid" && "bg-success"}`}
                    >
                      {order.paymentStatus}
                    </button>
                  </td>
                  <td className="text-center">
                    <button className={`btn btn-xs text-white ${order.deliveryStatus === "pending" && "btn-warning"} ${order.deliveryStatus === "shipped" && "bg-success"}`}>{order.deliveryStatus}</button>
                  </td>
                  <td>
                    {order.paymentStatus === "unpaid" && (
                      <button
                        className="btn btn-xs btn-error text-white"
                        onClick={() => {
                          openModal();
                          setSelectedId(order._id);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
