import React, { useState } from "react";
import { useQuery } from "react-query";
import Modal from "react-modal";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";

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

const ManageProducts = () => {
  const [selectedId, setSelectedId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: products,
    refetch,
  } = useQuery("products", () =>
    fetch("http://localhost:5000/product").then((res) => res.json())
  );
  if (isLoading) {
    return <p className="text-center font-bold text-4xl">Loading...</p>;
  }

  // Modal Functions
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedId("");
  }

  //   handle Delete Button
  const handleDelete = () => {
    fetch(`http://localhost:5000/product/${selectedId}`, {
      method: "DELETE",
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
      .then((result) => {
        if (result.deletedCount) {
          refetch();
          // show toast message
        } else {
          // show toast message
        }
      });

    closeModal();
  };
  // refetch();
  return (
    <div>
      <h2 className="text-center font-bold text-2xl my-4">Manage Products</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th className="text-center bg-primary">No.</th>
              <th className="text-center bg-primary">Product Name</th>
              <th className="text-center bg-primary">Available Quantity</th>
              <th className="text-center bg-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index}>
                  <td className="font-bold">{index + 1}</td>
                  <td className="flex items-center">
                    <img
                      className="w-16 mr-4 rounded"
                      src={product.img}
                      alt={product.name}
                    />
                    {product.name}
                  </td>
                  <td className="text-center">{product.availableQuantity}</td>
                  <td>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => {
                        openModal();
                        setSelectedId(product._id);
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

export default ManageProducts;
