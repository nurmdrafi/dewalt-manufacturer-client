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
    return <p className="text-center text-4xl font-bold">Loading...</p>;
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
      <h2 className="my-4 text-center text-2xl font-bold">My Orders</h2>
      <div>
        <table className="table-auto border-separate">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th className="mx-2 bg-primary p-3 text-center">No.</th>
              <th className="mx-2 bg-primary p-3 text-center">Product Name</th>
              <th className="mx-2 bg-primary p-3 text-center">QTY</th>
              <th className="mx-2 bg-primary p-3 text-center">Amount</th>
              <th className="mx-2 bg-primary p-3 text-center">
                Transaction Id
              </th>
              <th className="mx-2 bg-primary p-3 text-center">
                Payment Status
              </th>
              <th className="mx-2 bg-primary p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => {
              return (
                <tr key={index}>
                  {/* Serial */}
                  <td className="border-b-2 text-center font-bold">
                    {index + 1}
                  </td>
                  {/* Img & Name */}
                  <td className="flex flex-wrap items-center">
                    <img
                      className="mr-4 w-16 rounded"
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
                      className={`btn btn-xs border-0 text-white hover:bg-error ${
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
                          className="btn btn-success btn-xs whitespace-nowrap text-white"
                          onClick={() => navigate(`/payment/${order._id}`)}
                        >
                          Pay Now
                        </button>
                        <button
                          className="btn btn-error btn-xs text-white"
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
          className="btn btn-circle btn-sm absolute right-2 top-2"
        >
          ✕
        </label>
        <div>
          <h3 className="my-4 text-center text-3xl text-slate-900">
            Are You Sure?
          </h3>
          <p className="flex-grow-0 text-center font-semibold text-slate-500">
            Do you really want to delete this item? This process cannot be
            undone.
          </p>
        </div>
        <div className="my-4 flex justify-center gap-12">
          <button
            onClick={closeModal}
            type="submit"
            className="btn rounded-none border-0 bg-warning text-black hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            type="submit"
            className="btn btn-error rounded-none text-white"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyOrders;
