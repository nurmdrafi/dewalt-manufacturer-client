import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useStars } from "stars-rating-react-hooks";

const AddReview = () => {
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

  //   handleReviewButton
  const handleAddReview = (data) => {
    const review = {
      name: data.name,
      email: data.email,
      ratings: selectedValue,
      location: data.location,
      description: data.description,
    };
    fetch("http://localhost:5000/add-review",{
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
    .then(res => res.json())
    .then(result =>{
      if(result.insertedId){
        console.log(result)
        // show success message
      } else{
        // show error message
      }

    })
    reset();
  };

  return (
    <div className="flex justify-center items-center my-16">
      <div className="card bg-slate-50 drop-shadow-lg">
        <div className="card-body items-center text-center">
          <h2 className="text-center font-bold text-2xl mb-4">Add A Review</h2>
          <form onSubmit={handleSubmit(handleAddReview)}>
            {/* Name */}
            <div className="form-control lg:w-[500px] min-w-[350px] my-4">
              <label className="text-left pb-1">Name</label>
              <input
                type="text"
                className={"input input-bordered w-full"}
                {...register("name")}
              />
            </div>

            {/* Email */}
            <div className="form-control lg:w-[500px] min-w-[350px] my-4">
              <label className="text-left pb-1">Email</label>
              <input
                type="email"
                className={"input input-bordered w-full"}
                {...register("email")}
              />
            </div>

            {/* Location */}
            <div className="form-control lg:w-[500px] min-w-[350px]">
              <label className="text-left pb-1">Location</label>
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
                <p className="text-error text-left  pt-2">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Ratings */}
            <div className="form-control lg:w-[500px] min-w-[350px] my-4">

              <span className="flex items-center"
                {...getStarWrapperProps({
                  style: {
                    cursor: "pointer",
                  },
                })}
              >
                <label className="text-left pt-2 mr-4 lg:mr-24">Ratings: {selectingValue}/5</label>
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
            <div className="form-control lg:w-[500px] min-w-[350px]">
              <label className="text-left pb-1">Description</label>
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
                <p className="text-error text-left pt-2">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex justify-center my-4">
              <button
                type="submit"
                className="btn btn-primary hover:bg-black hover:text-white rounded-none"
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