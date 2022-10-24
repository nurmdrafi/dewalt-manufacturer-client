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

        <p className="flex-grow-0 text-left">
          <span className="text-3xl font-bold">${product.price}</span>
          <span className="font-semibold text-slate-500"> / Per Unit</span>
        </p>
        <p className="flex-grow-0 text-left">
          <span className="mr-2 text-2xl font-bold">
            {product.minimumQuantity} Units
          </span>
          <span className="font-semibold text-slate-500">
            Minimum Order Quantity
          </span>
        </p>
        <p className="flex-grow-0 text-left">
          <span className="mr-2 text-2xl font-bold">
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
            className="btn mt-3 w-full rounded-none border-0 bg-primary text-black hover:text-white"
            onClick={() => !admin && navigate(`/purchase/${product._id}`)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Product);
