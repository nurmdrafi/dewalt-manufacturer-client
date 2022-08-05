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

  const { isLoading } = useQuery(
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
    return <p className="text-center text-4xl font-bold">Loading...</p>;
  }

  return (
    <div className="flex h-[90vh] flex-col justify-between">
      <div className="my-16 flex flex-col items-center">
        <div className="card my-12 w-[400px] bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="font-bold text-success">Hello, {product?.userName}</p>
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
          <div className="card w-[400px] bg-base-100 shadow-2xl">
            <div className="card-body">
              <Elements stripe={stripePromise}>
                <CheckoutForm product={product} />
              </Elements>
            </div>
          </div>
        )}
      </div>
      <p className="text-center mb-5 text-gray-600 font-bold">
       Test Card Number: 4242 4242 4242 4242
        <br />
      </p>
      <Footer />
    </div>
  );
};

export default Payment;
