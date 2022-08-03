import React from "react";
import { useQuery } from "react-query";
import Product from "./Product";

const Tools = () => {
  const { isLoading, data: products } = useQuery("products", () =>
    fetch("https://delware-manufacturer.herokuapp.com/product").then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <></>;
  }
  return (
    <section className="mx-auto max-w-7xl">
      <h2 className="--heading">Products</h2>
      <div className="flex flex-wrap justify-center gap-5">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </section>
  );
};

export default Tools;
