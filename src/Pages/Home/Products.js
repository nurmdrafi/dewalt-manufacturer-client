import React from "react";

const Products = ({ product, refetch }) => {
  refetch();
  return (
    <div className="card max-w-[400px] bg-white shadow-xl">
      <div className="card-body text-center">
        <h2 className="text-xl font-bold text-secondary">{product.name}</h2>
        <div className="flex justify-center">
          <img src={product.img} alt={product.name} className="max-w-[300px]"/>
        </div>
        
        <p className="text-left">
          <span className="font-bold text-3xl">${product.price}</span>
          <span className="font-semibold text-slate-500"> / Per Unit</span>{" "}
        </p>
        <p className="text-left">
          <span className="font-bold text-2xl">{product.minimumQuantity} Units</span>{" "}
          <span className="font-semibold text-slate-500">Minimum Order</span>
        </p>
        <p className="text-justify"><span className="font-bold">Description: </span>{product.description}</p>
        <div className="card-actions justify-center">
            <button className="btn bg-primary rounded-none text-black hover:text-white w-full border-0">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Products;
