import React, { useState } from "react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
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
  },
};

const MyProfile = () => {
  const [currentUser] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modalIsOpen, setIsOpen] = useState(false);

  // Update Profile
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const email = currentUser?.email;

  // React Query
  const {
    isLoading,
    data: user,
    refetch,
  } = useQuery(
    "user",
    () =>
      email &&
      fetch(`https://delware-manufacturer.herokuapp.com/user/${email}`, {
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

  // console.log(user);

  // Modal
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleUpdateProfile = async (data) => {
    const profile = {
      name: data.name,
      education: data.education,
      location: data.location,
      number: data.number,
      linkedin: data.linkedin,
    };
    await updateProfile({ displayName: data.name });
    await fetch(
      `https://delware-manufacturer.herokuapp.com/update-user/${email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(profile),
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
        if (result.modifiedCount) {
          refetch();
          toast.success("Successfully updated!", {
            id: "update success",
          });
        }
      });
    // console.log(data);
    closeModal();
  };
  if (!user) {
    refetch();
  }

  // Updating
  if (updating) {
    return <p className="text-center text-4xl font-bold">Loading...</p>;
  }
  if (updateError) {
    toast.error(updateError.message, {
      id: "update error",
    });
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="py-5 text-center text-3xl font-bold">
        Welcome to Dashboard
      </h1>

      {/* Card */}
      <div className="card min-w-[350px] bg-base-100 shadow-xl lg:w-[500px]">
        <div className="card-body space-y-3">
          <h2 className="my-4 text-center text-2xl font-bold">My Profile</h2>
          <h3>
            <span className="font-bold">Name: </span>
            {currentUser?.displayName}
          </h3>
          <h3>
            <span className="font-bold">Email:</span> {currentUser?.email}
          </h3>
          <h3>
            <span className="font-bold">Education:</span>{" "}
            {user?.education || "N/A"}
          </h3>
          <h3>
            <span className="font-bold">Location:</span>{" "}
            {user?.location || "N/A"}
          </h3>
          <h3>
            <span className="font-bold">Phone Number:</span>{" "}
            {user?.number || "N/A"}
          </h3>
          <h3>
            <span className="font-bold">Linkedin Profile Link:</span>{" "}
            {user?.linkedin || "N/A"}
          </h3>
          <div className="justify-stat card-actions">
            <button className="btn btn-primary w-full" onClick={openModal}>
              Edit
            </button>
          </div>
        </div>
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
        {/* Form */}
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className=" flex flex-col gap-3"
        >
          {/* Name */}
          <div className="--input-control">
            <label className="pb-1 text-left">Name</label>
            <input
              type="text"
              className={"input input-bordered w-full"}
              {...register("name", {
                required: "Please enter your name",
              })}
              defaultValue={currentUser?.displayName}
            />
          </div>

          {/* Email */}
          <div className="--input-control">
            <label className="pb-1 text-left">Email</label>
            <input
              type="email"
              className={"input input-bordered w-full bg-slate-200"}
              defaultValue={currentUser?.email}
              readOnly
            />
          </div>

          {/* Education */}
          <div className="--input-control">
            <label className="pb-1 text-left">Education</label>
            <input
              type="text"
              className={"input input-bordered w-full"}
              {...register("education")}
              defaultValue={user?.education}
            />
          </div>

          {/* Location */}
          <div className="--input-control">
            <label className="pb-1 text-left">Location</label>
            <input
              type="text"
              className={"input input-bordered w-full"}
              {...register("location")}
              defaultValue={user?.location}
            />
          </div>

          {/* Phone Number */}
          <div className="--input-control">
            <label className="pb-1 text-left">Phone Number</label>
            <input
              type="number"
              className={"input input-bordered w-full"}
              {...register("number")}
              defaultValue={user?.number}
            />
          </div>

          {/* Linkedin Profile Link */}
          <div className="--input-control">
            <label className="pb-1 text-left">Linkedin Profile Link</label>
            <input
              type="text"
              className={`input input-bordered w-full ${
                errors.linkedin && "input-error"
              }`}
              {...register("linkedin", {
                pattern: {
                  value:
                    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                  message: "Please enter valid url",
                },
              })}
              defaultValue={user?.linkedin}
            />
            {/* Error Message */}
            {errors.linkedin?.type === "pattern" && (
              <p className="pt-2 text-left text-error">
                {errors.linkedin.message}
              </p>
            )}
          </div>

          {/* Add Product Button */}
          <button
            type="submit"
            className="btn btn-primary min-w-[350px] uppercase"
          >
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default MyProfile;
