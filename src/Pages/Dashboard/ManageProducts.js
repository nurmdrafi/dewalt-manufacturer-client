import React from "react";
import { useQuery } from "react-query";

const ManageProducts = () => {
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
    <div>
      <h1 className="text-center font-bold text-2xl mb-4">Manage Products</h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th className="text-center bg-primary">No.</th>
              <th className="text-center bg-primary">Product Name</th>
              <th className="text-center bg-primary">Available Quantity</th>
              <th className="text-center bg-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              refetch();
              return (
                <tr key={index}>
                  <td className="font-bold">{index + 1}</td>
                  <td className="flex items-center">
                    <img
                      className="w-16 mr-4 rounded"
                      src={product.img}
                      alt={product.name}
                    />
                    {product.name}
                  </td>
                  <td className="text-center">{product.availableQuantity}</td>
                  <td>
                    <button className="btn btn-xs btn-error">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
