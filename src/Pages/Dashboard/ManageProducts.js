import React, { useState } from "react";
import { useQuery } from "react-query";
import Modal from "react-modal";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
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

const ManageProducts = () => {
  const [selectedId, setSelectedId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {
    isLoading,
    data: products,
    refetch,
  } = useQuery("products", () =>
    fetch("https://delware-manufacturer.herokuapp.com/product").then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <p className="text-center text-4xl font-bold">Loading...</p>;
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
    fetch(`https://delware-manufacturer.herokuapp.com/product/${selectedId}`, {
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
          toast.success("Product deleted successfully");
        }
      });

    closeModal();
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="my-4 text-center text-2xl font-bold">Manage Products</h2>
      <div>
        <table className="table-auto border-separate">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th className="mx-2 bg-primary p-3 text-center">No.</th>
              <th className="mx-2 bg-primary p-3 text-center">Product Name</th>
              <th className="mx-2 bg-primary p-3 text-center">
                Available Quantity
              </th>
              <th className="mx-2 bg-primary p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index}>
                  <td className="text-center font-bold">{index + 1}</td>
                  <td className="flex items-center">
                    <img
                      className="mr-4 w-16 rounded"
                      src={product.img}
                      alt={product.name}
                    />
                    {product.name}
                  </td>
                  <td className="text-center">{product.availableQuantity}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-error btn-xs"
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

export default ManageProducts;
