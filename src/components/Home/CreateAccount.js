import React from "react";
import { Link } from "react-router-dom";
import createAcc from "../../assets/images/create-account.jpg";

const CreateAccount = () => {
  return (
    <section className="w-full">
      <div
        className="h-[250px] w-full bg-cover bg-center md:h-[550px]"
        style={{ backgroundImage: `url(${createAcc})` }}
      ></div>

      <div className="relative bottom-10 mx-auto w-[350px] sm:w-[550px] md:w-[750px] bg-white p-5 text-center">
        <h2 className="text-dark py-3 text-4xl font-bold uppercase md:text-5xl">
          MY DEWALT
        </h2>
        <p className="mb-3">
          Join MyDEWALT to register your tools and help protect your investment,
          rate and review products you love, and learn about the newest DEWALT
          tools and accessories.
        </p>
        <Link to="/register">
        <button className="btn rounded-none border-0 bg-primary text-black hover:bg-secondary hover:text-white">
          Create New Account
        </button>
        </Link>
      </div>
    </section>
  );
};

export default CreateAccount;
