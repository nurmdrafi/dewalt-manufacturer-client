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

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: users,
    refetch,
  } = useQuery("users", () =>
    fetch("https://delware-manufacturer.herokuapp.com/users", {
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

  // Modal
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setEmail("");
  }
  // Handle Make Admin
  const handleMakeAdmin = () => {
    fetch(`https://delware-manufacturer.herokuapp.com/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
      refetch();
      return res.json();
    });
    closeModal();
  };
  return (
    <div>
      <h2 className="text-center font-bold text-2xl my-4">Make Admin</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th className="text-center bg-primary">No.</th>
              <th className="text-center bg-primary">Email</th>
              <th className="text-center bg-primary">Role</th>
              <th className="text-center bg-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="font-bold">{index + 1}</td>

                  <td className="text-center">{user?.email}</td>
                  <td className="text-center">
                    {user?.role ? user.role : "user"}
                  </td>
                  <td>
                    {!user.role && (
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => {
                          openModal();
                          setEmail(user?.email);
                        }}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

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
              Do you really want to give this user role as an Admin? This
              process cannot be undone.
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
              onClick={handleMakeAdmin}
              type="submit"
              className="btn btn-error text-white rounded-none px-8"
            >
              YES
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MakeAdmin;
