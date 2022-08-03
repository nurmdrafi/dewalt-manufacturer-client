import React, { useState } from "react";
import { useQuery } from "react-query";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
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
    data: orders,
    refetch,
  } = useQuery("orders", () =>
    fetch(`https://delware-manufacturer.herokuapp.com/orders`, {
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

  //   handle Delete Button
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
          toast.success("Order deleted successfully", {
            id: "delete success",
          });
        }
      });

    closeModal();
  };

  const handleDelivery = (id) => {
    fetch(`https://delware-manufacturer.herokuapp.com/delivery/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Order delivered successfully", {
            id: "delivered success",
          });
          refetch();
        }
      });
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="my-4 text-center text-2xl font-bold">Manage All Orders</h2>
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
                Payment Status
              </th>
              <th className="mx-2 bg-primary p-3 text-center">
                Delivery Status
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
                  <td className="text-center">
                    <button
                      className={`btn btn-xs text-white ${
                        order.deliveryStatus === "pending" && "btn-warning"
                      } ${order.deliveryStatus === "shipped" && "bg-success"}`}
                    >
                      {order.deliveryStatus}
                    </button>
                  </td>
                  <td className="text-center">
                    {order.paymentStatus === "unpaid" && (
                      <button
                        className="btn btn-error btn-xs text-white"
                        onClick={() => {
                          openModal();
                          setSelectedId(order._id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                    {order.paymentStatus === "paid" &&
                      order.deliveryStatus === "pending" && (
                        <button
                          className="btn btn-success btn-xs text-white"
                          onClick={() => {
                            handleDelivery(order._id);
                          }}
                        >
                          Make Delivery
                        </button>
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
            Do you really want to delete this order? This process cannot be
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

export default ManageOrders;
