import React, { useState } from "react";
import { useQuery } from "react-query";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "react-modal";

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
    error,
    data: orders,
    refetch,
  } = useQuery(
    "orders",
    () =>
      email &&
      fetch(`http://localhost:5000/order/${email}`, {
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
  if(!orders){
    refetch()
  }
  console.log(orders)
  const handleDelete = () => {
    console.log(selectedId)
  };
  return (
    <div>
      <h2 className="text-center font-bold text-2xl my-4">My Orders</h2>
      <div className=" w-full">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th className="text-center bg-primary">No.</th>
              <th className="text-center bg-primary">Product Name</th>
              <th className="text-center bg-primary">Status</th>
              <th className="text-center bg-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => {
              return (
                <tr key={index}>
                  <td className="font-bold">{index + 1}</td>
                  <td className="flex items-center">
                    <img
                      className="w-16 mr-4 rounded"
                      src={order.img}
                      alt={order.productName}
                    />
                    {order.productName}
                  </td>
                  <td className="text-center"><p>{order.paymentStatus}</p></td>
                  <td>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => {
                        openModal();
                        setSelectedId(order._id);
                      }}
                    >
                      Delete
                    </button>
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
