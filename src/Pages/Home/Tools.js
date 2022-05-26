import React from "react";
import { useQuery } from "react-query";
import Products from "./Products";

const Tools = () => {
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
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-center font-bold text-3xl my-16">Tools</h2>
      <div className="flex flex-wrap justify-center gap-5">
        {products.map((product) => (
          <Products
            key={product._id}
            product={product}
          ></Products>
        ))}
      </div>
    </div>
  );
};

export default Tools;
