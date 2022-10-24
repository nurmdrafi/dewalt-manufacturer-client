import React from "react";
import { useQuery } from "react-query";
import Product from "../components/Home/Product";
import Footer from "../components/Shared/Footer";

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
      <div className="mx-auto my-16 max-w-7xl">
        <h2 className="--heading">Products</h2>
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
