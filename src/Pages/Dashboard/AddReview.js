import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStars } from "stars-rating-react-hooks";
import auth from "../../firebase.init";
import toast, { Toaster } from "react-hot-toast";

const AddReview = () => {
  const [user] = useAuthState(auth);
  // Star Ratings Config
  const config = {
    totalStars: 5,
    initialSelectedValue: 2,
    renderFull: "★",
    renderEmpty: "☆",
  };
  const {
    stars,
    getStarProps,
    getStarWrapperProps,
    selectingValue,
    selectedValue,
  } = useStars(config);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  //   handleReviewButton
  const handleAddReview = (data) => {
    const review = {
      name: data.name,
      email: data.email,
      ratings: selectedValue,
      location: data.location,
      description: data.description,
    };
    fetch("https://delware-manufacturer.herokuapp.com/add-review", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(review),
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
          toast.success("Successfully add a review", {
            id: "add success",
          });
        } else {
          toast.error("Failed to add a review", {
            id: "add error",
          });
        }
      });
    reset();
  };

  return (
    <div className="my-16 flex items-center justify-center">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="card bg-slate-50 drop-shadow-lg">
        <div className="card-body items-center text-center">
          <h2 className="mb-4 text-center text-2xl font-bold">Add A Review</h2>
          <form onSubmit={handleSubmit(handleAddReview)}>
            {/* Name */}
            <div className="--input-control my-4">
              <label className="pb-1 text-left">Name</label>
              <input
                type="text"
                className={"input input-bordered w-full"}
                {...register("name")}
                value={user?.displayName}
                readOnly
              />
            </div>

            {/* Email */}
            <div className="--input-control my-4">
              <label className="pb-1 text-left">Email</label>
              <input
                type="email"
                className={"input input-bordered w-full"}
                {...register("email")}
                value={user?.email}
                readOnly
              />
            </div>

            {/* Location */}
            <div className="--input-control">
              <label className="pb-1 text-left">Location</label>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.location && "input-error"
                }`}
                {...register("location", {
                  required: "Please enter your location",
                })}
              />
              {/* Error Message */}
              {errors.location?.type === "required" && (
                <p className="pt-2 text-left  text-error">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Ratings */}
            <div className="--input-control my-4">
              <span
                className="flex items-center"
                {...getStarWrapperProps({
                  style: {
                    cursor: "pointer",
                  },
                })}
              >
                <label className="mr-4 pt-2 text-left lg:mr-24">
                  Ratings: {selectingValue}/5
                </label>
                {stars?.map((star, i) => (
                  <span
                    key={i}
                    {...getStarProps(i, {
                      style: {
                        fontSize: "40px",
                        color: "gold",
                      },
                      onClick: (event, ratedValue) => {
                        // alert(`You just rated ${ratedValue} Stars!!`);
                      },
                    })}
                  >
                    {star}
                  </span>
                ))}
              </span>
            </div>
            {/* Description */}
            <div className="--input-control">
              <label className="pb-1 text-left">Description</label>
              <textarea
                type="text"
                className={`textarea textarea-bordered w-full ${
                  errors.name && "textarea-error"
                }`}
                {...register("description", {
                  required: "Please enter description",
                })}
              />
              {/* Error Message */}
              {errors.description?.type === "required" && (
                <p className="pt-2 text-left text-error">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="my-4 flex justify-center">
              <button
                type="submit"
                className="btn btn-primary rounded-none hover:bg-black hover:text-white"
              >
                Add Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
