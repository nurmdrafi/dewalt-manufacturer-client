import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const {
    register,
    handleSubmit,
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
    <div className="mb-16 flex items-center justify-center">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="card bg-base-100">
        <h2 className="--heading">Contact Us</h2>
        {/* Start Form */}
        <form
          onSubmit={handleSubmit(handleSubmitEmail)}
          className=" flex flex-col gap-3 p-2"
        >
          {/* Name */}
          <div className="--input-control">
            <label className="pb-1 text-left">Name</label>
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
              <p className="pt-2 text-left text-error">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="--input-control">
            <label className="pb-1 text-left">Email</label>
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
              <p className="pt-2 text-left text-error">
                {errors.email.message}
              </p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="text-danger py-2 text-left text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="--input-control">
            <label className="pb-1 text-left">Phone Number</label>
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
              <p className="pt-2 text-left text-error">
                {errors.number.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="--input-control">
            <label className="pb-1 text-left">Message</label>
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
              <p className="pt-2 text-left  text-error">
                {errors.message.message}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary min-w-[350px] uppercase"
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
