import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useToken from "../../hooks/useToken";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../../Pages/Shared/Footer";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  // Navigate
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  // Create User With Email and Password
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // Update Profile
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  // Sign In With Google
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  // Handle Registration
  const handleRegistration = async (data) => {
    // Check White Space
    if (!/^\S*$/.test(data.password)) {
      setError("password", {
        type: "whitespace",
        message: "Your password must not contain Whitespaces",
      });
    }
    // Check at least One Uppercase
    else if (!/^(?=.*[A-Z]).*$/.test(data.password)) {
      setError("password", {
        type: "uppercase",
        message: "Your password must have at least one Uppercase Character",
      });
    }
    // Check at least One Lowercase
    else if (!/^(?=.*[a-z]).*$/.test(data.password)) {
      setError("password", {
        type: "lowercase",
        message: "Your password must have at least one Lowercase Character",
      });
    }
    // Check at least one digit
    else if (!/^(?=.*[0-9]).*$/.test(data.password)) {
      setError("password", {
        type: "digit",
        message: "Your password must contain at least one Digit",
      });
    }
    // Check at least one symbol
    else if (
      !/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(data.password)
    ) {
      setError("password", {
        type: "symbol",
        message: "Your password must contain at least one Special Symbol",
      });
    }
    // Check Minimum 8 characters
    else if (!/^.{10,16}$/.test(data.password)) {
      setError("password", {
        type: "length",
        message: "Your password must be 10-16 Characters Long",
      });
    } else if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "match",
        message: "Please confirm your password",
      });
    } else {
      await createUserWithEmailAndPassword(data.email, data.password);
      await updateProfile({ displayName: data.name });
      // await console.log(data);
      reset();
    }
  };

  const [token] = useToken(user || googleUser);
  // Navigate
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, token]);

  // Loading
  if (loading || googleLoading || updating) {
    return <p>Loading...</p>;
  }

  // Error
  if (error) {
    toast.error(error.message, {
      id: "signin error",
    });
  }
  if (googleError) {
    toast.error(googleError.message, {
      id: "google error",
    });
  }
  if (updateError) {
    toast.error(updateError.message, {
      id: "update error",
    });
  }

  return (
    <div>
      <div className="flex justify-center items-center my-16">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="card w-96 bg-base-100 drop-shadow-lg">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Registration</h2>

            {/* Form Start */}
            <form
              onSubmit={handleSubmit(handleRegistration)}
              className=" flex flex-col gap-3"
            >
              {/* Name */}
              <div className="form-control min-w-[350px]">
                <label className="text-left pb-1">Name</label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.name && "input-error"
                  }`}
                  {...register("name", {
                    required: "Please enter your name",
                    minLength: {
                      value: 5,
                      message: "Please enter at least 6 characters",
                    },
                  })}
                />
                {/* Error Message */}
                {errors.name?.type === "required" && (
                  <p className="text-error text-left pt-2">
                    {errors.name.message}
                  </p>
                )}
                {errors.name?.type === "minLength" && (
                  <p className="text-error text-left py-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="form-control min-w-[350px]">
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

              {/* Password*/}
              <div className="form-control min-w-[350px]">
                <label className="text-left pb-1">Password</label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.password && "input-error"
                  }`}
                  {...register("password", {
                    required: "Please enter your password",
                  })}
                />
                {/* Error Message */}
                {errors.password?.type === "required" && (
                  <p className="text-error text-left pt-2">
                    {errors.password.message}
                  </p>
                )}
                {errors.password?.type === "whitespace" && (
                  <p className="text-danger text-left text-red-500 py-2">
                    {errors.password.message}
                  </p>
                )}
                {errors.password?.type === "uppercase" && (
                  <p className="text-error text-left py-2">
                    {errors.password.message}
                  </p>
                )}
                {errors.password?.type === "lowercase" && (
                  <p className="text-error text-left py-2">
                    {errors.password.message}
                  </p>
                )}
                {errors.password?.type === "digit" && (
                  <p className="text-error text-left py-2">
                    {errors.password.message}
                  </p>
                )}
                {errors.password?.type === "symbol" && (
                  <p className="text-error text-left py-2">
                    {errors.password.message}
                  </p>
                )}
                {errors.password?.type === "length" && (
                  <p className="text-error text-left py-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-control min-w-[350px]">
                <label className="text-left pb-1">Confirm Password</label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.confirmPassword && "input-error"
                  }`}
                  {...register("confirmPassword")}
                />
                {/* Error Message */}
                {errors.confirmPassword?.type === "match" && (
                  <p className="text-error text-left py-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-primary uppercase min-w-[350px]"
              >
                Register
              </button>
            </form>
            {/* Form End */}

            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-secondary font-semibold underline"
              >
                Log In Here
              </Link>
            </p>

            {/* Divider */}
            <div className="flex flex-col w-full border-opacity-50">
              <div className="divider">OR</div>
            </div>

            {/* Google Button */}
            <button
              className="btn btn-outline uppercase min-w-[350px]"
              onClick={() => signInWithGoogle()}
            >
              Continue with google
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
