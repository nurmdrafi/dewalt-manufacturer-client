import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { signOut } from "firebase/auth";
import auth from "../firebase.init";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "react-modal";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../Pages/Shared/Footer";

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

const Purchase = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  // Modal
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { isLoading, data: product } = useQuery("product", () =>
    fetch(`https://delware-manufacturer.herokuapp.com/product/${_id}`, {
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

  const {
    name: productName,
    img,
    description,
    availableQuantity,
    minimumQuantity,
    price,
  } = product[0];

  const handleBooking = async (data) => {
    if (parseInt(data.quantity) < minimumQuantity) {
      setError("quantity", {
        type: "minQty",
        message: `You cannot order less than ${minimumQuantity} unit`,
      });
    } else if (parseInt(data.quantity) > availableQuantity) {
      setError("quantity", {
        type: "maxQty",
        message: `You cannot order more than available unit`,
      });
    } else {
      const order = {
        productName: productName,
        img: img,
        userName: data.name,
        userEmail: data.email,
        quantity: data.quantity,
        price: `${data.quantity * price}`,
        address: data.address,
        contact: data.contact,
        paymentStatus: "unpaid",
        deliveryStatus: "pending",
      };
      await fetch(`https://delware-manufacturer.herokuapp.com/add-order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(order),
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
          if (result.insertedId) {
            closeModal();
            toast.success("Successfully booked!");
          }
        });
    }
  };
  return (
    <div className="bg-white">
      {/* Product + Booking Information */}
      <div className="card lg:card-side">
        <Toaster position="top-right" reverseOrder={false} />
        <figure className="lg:w-1/2">
          <img src={img} alt="Album" className="w-[400px]" />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-4xl my-2">{productName}</h2>
          <p className="flex-grow-0 text-xl my-2">
            <span className="font-bold">Description: </span>
            {description}
          </p>
          <div className="flex justify-between">
            <p className="text-left flex-grow-0 my-2">
              <span className="font-bold text-3xl block">${price}</span>
              <span className="font-semibold text-slate-500 block">
                {" "}
                / Per Unit
              </span>
            </p>
            <p className="text-left flex-grow-0 my-2">
              <span className="font-bold text-2xl mr-2 block">
                {minimumQuantity} Units
              </span>
              <span className="font-semibold text-slate-500 block">
                Minimum Order
              </span>
            </p>
            <p className="text-left  flex-grow-0 my-2">
              <span className="font-bold text-2xl mr-2 block">
                {availableQuantity} Units
              </span>
              <span className="font-semibold text-slate-500 block">
                Available
              </span>
            </p>
          </div>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary rounded-none w-2/4 hover:bg-black hover:text-white my-6"
              onClick={openModal}
            >
              Book Now
            </button>
            <button
              className="btn btn-success rounded-none w-2/4 text-black my-6 hover:bg-black hover:text-white border-0"
              onClick={() => navigate("/dashboard/my-order")}
            >
              My Orders
            </button>
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
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          {/* Form */}
          <form
            onSubmit={handleSubmit(handleBooking)}
            className=" flex flex-col mx-auto gap-3"
          >
            <h2 className="font-bold text-2xl text-center">
              Booking Information
            </h2>
            {/* User Name */}
            <div className="--input-control">
              <label className="text-left pb-1">Name</label>
              <input
                type="text"
                className="input input-bordered w-full bg-slate-100"
                {...register("name")}
                defaultValue={user?.displayName}
                readOnly
              />
            </div>

            {/* Email */}
            <div className="--input-control">
              <label className="text-left pb-1">Email</label>
              <input
                type="email"
                className="input input-bordered w-full bg-slate-100"
                {...register("email")}
                defaultValue={user?.email}
                readOnly
              />
            </div>

            {/* Minimum Quantity */}
            <div className="--input-control">
              <label className="text-left pb-1">Quantity</label>
              <input
                type="number"
                className={`input input-bordered w-full ${
                  errors.quantity && "input-error"
                }`}
                {...register("quantity", {
                  required: "Please enter quantity",
                })}
                defaultValue={minimumQuantity}
              />
              {/* Error Message */}
              {errors.quantity?.type === "required" && (
                <p className="text-error text-left pt-2">
                  {errors.quantity.message}
                </p>
              )}
              {errors.quantity?.type === "minQty" && (
                <p className="text-error text-left pt-2">
                  {errors.quantity.message}
                </p>
              )}
            </div>
            {errors.quantity?.type === "maxQty" && (
              <p className="text-error text-left pt-2">
                {errors.quantity.message}
              </p>
            )}

            {/* Available Quantity */}
            <div className="--input-control">
              <label className="text-left pb-1">Available Quantity</label>
              <input
                type="number"
                className={`input input-bordered w-full ${
                  errors.availableQuantity && "input-error"
                }`}
                {...register("availableQuantity", {
                  required: "Please enter available quantity",
                })}
                defaultValue={availableQuantity}
              />
              {/* Error Message */}
              {errors.availableQuantity?.type === "required" && (
                <p className="text-error text-left pt-2">
                  {errors.availableQuantity.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="--input-control">
              <label className="text-left pb-1">Address</label>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.address && "input-error"
                }`}
                {...register("address", {
                  required: "Please enter your address",
                })}
              />
              {/* Error Message */}
              {errors.address?.type === "required" && (
                <p className="text-error text-left pt-2">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Contact No. */}
            <div className="--input-control">
              <label className="text-left pb-1">Contact No.</label>
              <input
                type="number"
                className={`input input-bordered w-full ${
                  errors.contact && "input-error"
                }`}
                {...register("contact", {
                  required: "Please enter your contact no.",
                })}
              />
              {/* Error Message */}
              {errors.contact?.type === "required" && (
                <p className="text-error text-left pt-2">
                  {errors.contact.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary rounded-none w-2/4 hover:bg-black hover:text-white my-6"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default Purchase;
