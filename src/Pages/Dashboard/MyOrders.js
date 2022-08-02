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

const MyOrders = () => {
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
  const email = user?.email;
  const {
    isLoading,
    data: orders,
    refetch,
  } = useQuery(
    "orders",
    () =>
      email &&
      fetch(`https://delware-manufacturer.herokuapp.com/orders/${email}`, {
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
  if (!orders) {
    refetch();
  }
  const handleDelete = () => {
    fetch(
      `https://delware-manufacturer.herokuapp.com/delete-order/${selectedId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
        return res.json();
      })
      .then((result) => {
        if (result.deletedCount) {
          refetch();
          closeModal();
          toast.success("Order canceled successfully");
        }
      });
  };
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-center font-bold text-2xl my-4">My Orders</h2>
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
                Transaction Id
              </th>
              <th className="text-center bg-primary p-3 mx-2">
                Payment Status
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
                  <td className="text-center">
                    {order.transactionId || "N/A"}
                  </td>
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
                  <td>
                    {order.paymentStatus === "unpaid" && (
                      <div className="flex flex-col gap-2">
                        <button
                          className="btn btn-xs btn-success text-white whitespace-nowrap"
                          onClick={() => navigate(`/payment/${order._id}`)}
                        >
                          Pay Now
                        </button>
                        <button
                          className="btn btn-xs btn-error text-white"
                          onClick={() => {
                            setSelectedId(order._id);
                            openModal();
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Modal"
        ariaHideApp={false}
      >
        <label
          onClick={closeModal}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <div>
          <h3 className="text-slate-900 text-3xl text-center my-4">
            Are You Sure?
          </h3>
          <p className="flex-grow-0 text-center font-semibold text-slate-500">
            Do you really want to delete this item? This process cannot be
            undone.
          </p>
        </div>
        <div className="flex justify-center my-4 gap-12">
          <button
            onClick={closeModal}
            type="submit"
            className="btn bg-warning text-black hover:text-white border-0 rounded-none"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            type="submit"
            className="btn btn-error text-white rounded-none"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyOrders;
