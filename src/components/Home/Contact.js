import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Map from "./Map";

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
    <section id="contact" className="bg-white w-full">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="--heading pt-10">Contact Us</h2>
      <div className="grid grid-flow-row md:grid-flow-col md:grid-cols-2">
        {/* Start Form */}
        <div className="flex items-center justify-center bg-white md:order-2">
          <div className="card rounded-none bg-white">
            <form
              onSubmit={handleSubmit(handleSubmitEmail)}
              className=" flex flex-col gap-3 p-2"
            >
              {/* Name */}
              <div className="--input-control">
                <label className="pb-1 text-left">Name</label>
                <input
                  type="text"
                  className={`input w-full rounded-none border-0 border-b-4 border-primary bg-transparent focus:outline-none ${
                    errors.name && "input-error"
                  }`}
                  {...register("name", {
                    required: "Please enter your name",
                  })}
                />
                {/* Error Message */}
                {errors.name?.type === "required" && (
                  <p className="pt-2 text-left text-error">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="--input-control">
                <label className="pb-1 text-left">Email</label>
                <input
                  type="email"
                  className={`input w-full rounded-none border-0 border-b-4 border-primary bg-transparent focus:outline-none ${
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
                  className={`input w-full rounded-none border-0 border-b-4 border-primary bg-transparent focus:outline-none ${
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
                  className={`textarea w-full rounded-none border-0 border-b-4 border-primary bg-transparent focus:outline-none ${
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
                className="btn btn-primary mb-5 min-w-[350px] border-none uppercase hover:bg-black hover:text-white md:mb-0"
              >
                Submit
              </button>
            </form>
            {/* Form End */}
          </div>
        </div>

        {/* Map */}
        <div className=" md:order-1">
          <Map />
        </div>
      </div>
    </section>
  );
};

export default Contact;
