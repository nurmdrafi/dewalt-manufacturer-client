import React from "react";
import { useQuery } from "react-query";
import Product from "../Home/Product";
import Footer from "../Shared/Footer";

const Products = () => {
  const { isLoading, data: products } = useQuery("products", () =>
    fetch("https://delware-manufacturer.herokuapp.com/product").then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <div></div>;
  }
  return (
    <div>
      <div className="max-w-7xl mx-auto my-16">
        <h2 className="text-center font-bold text-3xl my-16">Tools</h2>
        <div className="flex flex-wrap justify-center gap-5">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
