import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

const Payment = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const { isLoading, error, data, refetch } = useQuery("order", () =>
    fetch(`http://localhost:5000/order/${_id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
        return res.json();
      })
      .then((result) => {
        setProduct(result);
      })
  );
  if (isLoading) {
    return <p className="text-center font-bold text-4xl">Loading...</p>;
  }

  return (
    <div>
      <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
        <div className="card-body">
          <p className="text-success font-bold">Hello, {product?.userName}</p>
          <h2 className="card-title">Please Pay for {product?.productName}</h2>
          <p>
            <span className="font-semibold">Total Amount"</span>: $
            {product.price}
          </p>
        </div>
      </div>
      <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          {/* <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements> */}
        </div>
      </div>
    </div>
  );
};

export default Payment;
