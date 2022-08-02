import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";

const Product = ({ product }) => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const navigate = useNavigate();
  return (
    <div className="card max-w-[400px] bg-white shadow-xl">
      <div className="card-body text-center">
        <h2 className="text-xl font-bold text-secondary">{product.name}</h2>
        <div className="flex justify-center">
          <img src={product.img} alt={product.name} className="max-w-[300px]" />
        </div>

        <p className="text-left flex-grow-0">
          <span className="font-bold text-3xl">${product.price}</span>
          <span className="font-semibold text-slate-500"> / Per Unit</span>
        </p>
        <p className="text-left flex-grow-0">
          <span className="font-bold text-2xl mr-2">
            {product.minimumQuantity} Units
          </span>
          <span className="font-semibold text-slate-500">Minimum Order Quantity</span>
        </p>
        <p className="text-left flex-grow-0">
          <span className="font-bold text-2xl mr-2">
            {product.availableQuantity} Units
          </span>
          <span className="font-semibold text-slate-500">Available</span>
        </p>
        <p className="text-justify">
          <span className="font-bold">Description: </span>
          {product.description}
        </p>
        <div className="card-actions justify-center">
          <button
            className="btn bg-primary rounded-none mt-3 text-black hover:text-white w-full border-0"
            onClick={() => !admin && navigate(`/purchase/${product._id}`)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
