import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const Purchase = () => {
  const { _id } = useParams();
  const {
    isLoading,
    error,
    data: product,
  } = useQuery("product", () =>
    fetch(`http://localhost:5000/product/${_id}`).then((res) => res.json())
  );
  if (isLoading) {
    return <p className="text-center font-bold text-4xl">Loading...</p>;
  }
  const { name, img, description, availableQuantity, minimumQuantity, price } =
    product[0];
  return (
    <div className="card lg:card-side bg-base-100">
      <figure className="lg:w-1/2">
        <img src={img} alt="Album" />
      </figure>
      <div className="card-body lg:w-1/2">
        <h2 className="card-title text-4xl my-2">{name}</h2>
        <p className="flex-grow-0 text-xl my-2"><span className="font-bold">Description: </span>{description}</p>
        <p className="text-left flex-grow-0 my-2">
          <span className="font-bold text-3xl">${price}</span>
          <span className="font-semibold text-slate-500"> / Per Unit</span>
        </p>
        <p className="text-left flex-grow-0 my-2">
          <span className="font-bold text-2xl mr-2">
            {minimumQuantity} Units
          </span>
          <span className="font-semibold text-slate-500">Minimum Order</span>
        </p>
        <p className="text-left flex-grow-0 my-2">
          <span className="font-bold text-2xl mr-2">
            {availableQuantity} Units
          </span>
          <span className="font-semibold text-slate-500">Available</span>
        </p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary rounded-none w-2/4 hover:bg-black hover:text-white my-6">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
