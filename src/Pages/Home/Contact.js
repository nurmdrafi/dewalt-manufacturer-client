import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import auth from "../../firebase.init";

const Contact = () => {
  const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();
  const handleSubmitEmail = (data) => {
    if (data) {
      toast.success("Email submitted successfully");
      reset();
    }
  };

  return (
    <div className="flex justify-center items-center my-16">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="card bg-base-100">
        {/* Start Form */}
        <form
          onSubmit={handleSubmit(handleSubmitEmail)}
          className=" flex flex-col gap-3"
        >
          <h2 className="text-center font-bold text-3xl">Contact Us</h2>
          {/* Name */}
          <div className="form-control lg:w-[500px] min-w-[350px]">
            <label className="text-left pb-1">Name</label>
            <input
              type="text"
              className={`input input-bordered w-full ${
                errors.name && "input-error"
              }`}
              {...register("name", {
                required: "Please enter your name",
              })}
            />
            {/* Error Message */}
            {errors.name?.type === "required" && (
              <p className="text-error text-left pt-2">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control lg:w-[500px] min-w-[350px]">
            <label className="text-left pb-1">Email</label>
            <input
              type="email"
              className={`input input-bordered w-full ${
                errors.email && "input-error"
              }`}
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please provide a valid email",
                },
              })}
            />
            {/* Error Message */}
            {errors.email?.type === "required" && (
              <p className="text-error text-left pt-2">
                {errors.email.message}
              </p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="text-danger text-left text-red-500 py-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="form-control lg:w-[500px] min-w-[350px]">
            <label className="text-left pb-1">Phone Number</label>
            <input
              type="number"
              className={`input input-bordered w-full ${
                errors.number && "input-error"
              }`}
              {...register("number", {
                required: "Phone number required",
              })}
            />
            {/* Error Message */}
            {errors.number?.type === "required" && (
              <p className="text-error text-left pt-2">
                {errors.number.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="form-control lg:w-[500px] min-w-[350px]">
            <label className="text-left pb-1">Message</label>
            <textarea
              type="text"
              className={`textarea textarea-bordered w-full ${
                errors.message && "textarea-error"
              }`}
              {...register("description", {
                required: "Please enter message",
              })}
            />
            {/* Error Message */}
            {errors.message?.type === "required" && (
              <p className="text-error text-left  pt-2">
                {errors.message.message}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary uppercase min-w-[350px]"
          >
            Submit
          </button>
        </form>
        {/* Form End */}
      </div>
    </div>
  );
};

export default Contact;
