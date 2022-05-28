import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Footer from "../../Pages/Shared/Footer";

const stripePromise = loadStripe(
  "pk_test_51L3eBnFxrq41hmwKbaVBe8In817a4jZNNny9EL2pEPBUX61ydtvWf6uy5SqUIZbrWR2Hoasv113XoPHhry9hOa0r005ZmYjqLd"
);

const Payment = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  const { isLoading, error, data, refetch } = useQuery(
    "order",
    () =>
      _id &&
      fetch(`https://delware-manufacturer.herokuapp.com/order/${_id}`, {
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
    <div className="flex flex-col justify-between h-[90vh]">
      <div className="flex flex-col items-center my-16">
        <div className="card w-[400px] bg-base-100 shadow-xl my-12">
          <div className="card-body">
            <p className="text-success font-bold">Hello, {product?.userName}</p>
            <h2 className="card-title">
              Please Pay for {product?.productName}
            </h2>
            <p>
              <span className="font-semibold">Total Amount</span>: $
              {product?.price}
            </p>
          </div>
        </div>
        {product && (
          <div className="card w-[400px] shadow-2xl bg-base-100">
            <div className="card-body">
              <Elements stripe={stripePromise}>
                <CheckoutForm product={product} />
              </Elements>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Payment;
