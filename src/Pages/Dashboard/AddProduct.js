import { signOut } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const imageStorageKey = "d98b6ff521ce422ac940b964ee517658";

  const handleAddProduct = async (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const product = {
            name: data.name,
            img: img,
            description: data.description,
            minimumQuantity: data.minimumQuantity,
            availableQuantity: data.availableQuantity,
            price: data.price,
          };
          fetch("https://delware-manufacturer.herokuapp.com/add-product", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
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
                reset();
                toast.success("Product added successfully", {
                  id: "add success",
                });
              } else {
                toast.error("Product didn't upload", {
                  id: "add error",
                });
              }
            });
        }
      });
  };
  return (
    <div className="flex items-center justify-center">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="card bg-base-100 drop-shadow-lg">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold">Add A Product</h2>
          <form
            onSubmit={handleSubmit(handleAddProduct)}
            className=" flex flex-col gap-3"
          >
            {/* Name */}
            <div className="--input-control">
              <label className="pb-1 text-left">Name</label>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.name && "input-error"
                }`}
                {...register("name", {
                  required: "Please enter product name",
                })}
              />
              {/* Error Message */}
              {errors.name?.type === "required" && (
                <p className="pt-2 text-left  text-error">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Image */}
            <div className="--input-control">
              <label className="pb-1 text-left">Image</label>
              <input
                type="file"
                className={`input input-bordered w-full file:mt-2 file:cursor-pointer file:rounded-lg file:border-0 file:bg-primary file:font-semibold
                 ${errors.image && "input-error"}`}
                {...register("image", {
                  required: "Please upload image",
                })}
              />
              {/* Error Message */}
              {errors.image?.type === "required" && (
                <p className="pt-2 text-left  text-error">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="--input-control">
              <label className="pb-1 text-left">Description</label>
              <textarea
                type="text"
                className={`textarea textarea-bordered w-full ${
                  errors.description && "textarea-error"
                }`}
                {...register("description", {
                  required: "Please enter product description",
                })}
              />
              {/* Error Message */}
              {errors.description?.type === "required" && (
                <p className="pt-2 text-left  text-error">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Minimum Quantity */}
            <div className="--input-control">
              <label className="pb-1 text-left">Minimum Order Quantity</label>
              <input
                type="number"
                className={`input input-bordered w-full ${
                  errors.minimumQuantity && "input-error"
                }`}
                {...register("minimumQuantity", {
                  required: "Please enter minimum quantity",
                })}
              />
              {/* Error Message */}
              {errors.minimumQuantity?.type === "required" && (
                <p className="pt-2 text-left text-error">
                  {errors.minimumQuantity.message}
                </p>
              )}
            </div>

            {/* Available Quantity */}
            <div className="--input-control">
              <label className="pb-1 text-left">Available Quantity</label>
              <input
                type="number"
                className={`input input-bordered w-full ${
                  errors.availableQuantity && "input-error"
                }`}
                {...register("availableQuantity", {
                  required: "Please enter available quantity",
                })}
              />
              {/* Error Message */}
              {errors.availableQuantity?.type === "required" && (
                <p className="pt-2 text-left text-error">
                  {errors.availableQuantity.message}
                </p>
              )}
            </div>

            {/* Price Per Unit */}
            <div className="--input-control">
              <label className="pb-1 text-left">Price Per Unit</label>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.price && "input-error"
                }`}
                {...register("price", {
                  required: "Please enter price",
                })}
              />
              {/* Error Message */}
              {errors.price?.type === "required" && (
                <p className="pt-2 text-left text-error">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Add Product Button */}
            <button
              type="submit"
              className="btn btn-primary min-w-[350px] uppercase"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
