import React, { useState } from "react";
import { useQuery } from "react-query";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useStars } from "stars-rating-react-hooks";

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
  const [modalIsOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  // Modal
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //   handleReviewButton
  const handleAddReview = (data) => {
    const review = {
      user: "Unknown",
      ratings: selectedValue,
      date: new Date().toDateString().slice(4),
      description: data.description,
    };
    console.log(review);
    reset();
    closeModal()
  };

  return (
    <div>
      <h2 className="text-center font-bold text-2xl mb-4">Add A Review</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th className="text-center bg-primary">No.</th>
              <th className="text-center bg-primary">Product Name</th>
              <th className="text-center bg-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              refetch();
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
                  <td>
                    <button
                      onClick={openModal}
                      className="btn btn-xs btn-success"
                    >
                      Add Review
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
        contentLabel="Review Modal"
        ariaHideApp={false}
      >
        <label
          onClick={closeModal}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <form onSubmit={handleSubmit(handleAddReview)}>
          {/* Ratings */}
          <div className="form-control lg:w-[500px] min-w-[350px]">
            <label className="text-left pb-1">Ratings {selectingValue}</label>
          </div>
          <span
            {...getStarWrapperProps({
              style: {
                cursor: "pointer",
              },
            })}
          >
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
      </Modal>
    </div>
  );
};

export default AddReview;
