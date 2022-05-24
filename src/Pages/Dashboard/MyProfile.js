import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";

const MyProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [user] = useAuthState(auth);

  const handleUpdateProfile = async (data) => {
    console.log(data);
    reset();
  };
  console.log(errors);
  return (
    <div>
      <h1 className="text-3xl text-center py-5 font-bold">
        Welcome to Dashboard
      </h1>
      <h2 className="text-center font-bold text-2xl my-4">My Profile</h2>
      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className=" flex flex-col gap-3"
      >
        {/* Name */}
        <div className="form-control lg:w-[500px] min-w-[350px]">
          <label className="text-left pb-1">Name</label>
          <input
            type="text"
            className={"input input-bordered w-full"}
            defaultValue={user?.displayName}
            readOnly
          />
        </div>

        {/* Email */}
        <div className="form-control lg:w-[500px] min-w-[350px]">
          <label className="text-left pb-1">Email</label>
          <input
            type="email"
            className={"input input-bordered w-full"}
            defaultValue={user?.email}
            readOnly
          />
        </div>

        {/* Education */}
        <div className="form-control lg:w-[500px] min-w-[350px]">
          <label className="text-left pb-1">Education</label>
          <input
            type="text"
            className={`input input-bordered w-full ${
              errors.education && "input-error"
            }`}
            {...register("education", {
              required: "Please enter your education level",
            })}
          />
          {/* Error Message */}
          {errors.education?.type === "required" && (
            <p className="text-error text-left  pt-2">
              {errors.education.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="form-control lg:w-[500px] min-w-[350px]">
          <label className="text-left pb-1">Location</label>
          <input
            type="text"
            className={`input input-bordered w-full ${
              errors.location && "input-error"
            }`}
            {...register("location", {
              required: "Please enter your location",
            })}
          />
          {/* Error Message */}
          {errors.location?.type === "required" && (
            <p className="text-error text-left  pt-2">
              {errors.location.message}
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
              required: "Please enter your number",
            })}
          />
          {/* Error Message */}
          {errors.number?.type === "required" && (
            <p className="text-error text-left pt-2">{errors.number.message}</p>
          )}
        </div>

        {/* Linkedin Profile Link */}
        <div className="form-control lg:w-[500px] min-w-[350px]">
          <label className="text-left pb-1">Linkedin Profile Link</label>
          <input
            type="text"
            className={`input input-bordered w-full ${
              errors.linkedin && "input-error"
            }`}
            {...register("linkedin", {
              required: "Please enter your linkedin profile link",
              pattern: {
                value:
                  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                message: "Please enter valid url",
              },
            })}
          />
          {/* Error Message */}
          {errors.linkedin?.type === "required" && (
            <p className="text-error text-left pt-2">
              {errors.linkedin.message}
            </p>
          )}
          {errors.linkedin?.type === "pattern" && (
            <p className="text-error text-left pt-2">
              {errors.linkedin.message}
            </p>
          )}
        </div>

        {/* Add Product Button */}
        <button
          type="submit"
          className="btn btn-primary uppercase min-w-[350px]"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
