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
    <section className="container">
      <h2 className="--heading">Products</h2>
      <div className="flex flex-wrap justify-center gap-5">
        {products.slice(0, 6).map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </section>
  );
};

export default Tools;
