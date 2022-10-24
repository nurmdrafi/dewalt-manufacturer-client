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
    return <p className="text-center text-4xl font-bold">Loading...</p>;
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
      <h2 className="my-4 text-center text-2xl font-bold">Make Admin</h2>
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th className="bg-primary text-center">No.</th>
              <th className="bg-primary text-center">Email</th>
              <th className="bg-primary text-center">Role</th>
              <th className="bg-primary text-center">Action</th>
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
                        className="btn btn-warning btn-xs"
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
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            ✕
          </label>
          <div>
            <h3 className="my-4 text-center text-3xl text-slate-900">
              Are You Sure?
            </h3>
            <p className="flex-grow-0 text-center font-semibold text-slate-500">
              Do you really want to give this user role as an Admin? This
              process cannot be undone.
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
              onClick={handleMakeAdmin}
              type="submit"
              className="btn btn-error rounded-none px-8 text-white"
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
