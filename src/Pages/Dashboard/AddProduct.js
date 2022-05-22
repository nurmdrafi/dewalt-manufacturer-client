import React from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const imageStorageKey = "d98b6ff521ce422ac940b964ee517658";

  const handleAddProduct = async (data) => {
    const image = data.image[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    console.log(formData)
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
          fetch("http://localhost:5000/add-product", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if(inserted.insertedId){
                  console.log(inserted)
                //   Show toast message
              }
            });
        }
      });
  };
  return (
    <div className="flex justify-center items-center">
      <div className="card w-96 bg-base-100 drop-shadow-lg">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold">Add A Product</h2>
          <form
            onSubmit={handleSubmit(handleAddProduct)}
            className=" flex flex-col gap-3"
          >
            {/* Name */}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1">Name</label>
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
                <p className="text-error text-left  pt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Image */}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1">Image</label>
              <input
                type="file"
                className={`input input-bordered w-full ${
                  errors.image && "input-error"
                }`}
                {...register("image", {
                  required: "Please upload image",
                })}
              />
              {/* Error Message */}
              {errors.image?.type === "required" && (
                <p className="text-error text-left  pt-2">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1">Description</label>
              <textarea
                type="text"
                className={`textarea textarea-bordered w-full ${
                  errors.name && "textarea-error"
                }`}
                {...register("description", {
                  required: "Please enter product description",
                })}
              />
              {/* Error Message */}
              {errors.description?.type === "required" && (
                <p className="text-error text-left  pt-2">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Minimum Quantity */}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1">Minimum Quantity</label>
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
                <p className="text-error text-left pt-2">
                  {errors.minimumQuantity.message}
                </p>
              )}
            </div>

            {/* Available Quantity */}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1">Available Quantity</label>
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
                <p className="text-error text-left pt-2">
                  {errors.availableQuantity.message}
                </p>
              )}
            </div>

            {/* Price Per Unit */}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1">Price Per Unit</label>
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
                <p className="text-error text-left pt-2">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Add Product Button */}
            <button
              type="submit"
              className="btn btn-primary uppercase min-w-[350px]"
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
