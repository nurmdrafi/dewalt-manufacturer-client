import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../api/axios";
import Footer from "../components/Shared/Footer";
import Loading from "../components/Shared/Loading";
import useAuthUserContext from "../context/AuthUserContext";
import FormErrorMessage from "../components/Shared/FormErrorMessage";

const Register = () => {
  const { isLoading, setIsLoading } = useAuthUserContext();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  // Navigate
  const navigate = useNavigate();

  // create new user
  const createNewUser = async (userInfo) => {
    const res = await axios.post("/auth/register", userInfo);
    return res.data;
  };

  // Handle Registration
  const handleRegistration = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "match",
        message: "Please confirm your password",
      });
    } else {
      // create new user / register
      const userInfo = {
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      try {
        setIsLoading(true);
        const res = await createNewUser(userInfo);
        if (res) {
          setIsLoading(false);
          navigate("/login");
        }
      } catch (err) {
        toast.error(err.response.data.message, {
          id: "signUp error",
        });
      } finally {
        reset();
        setIsLoading(false);
      }
    }
  };

  // Loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="my-8 flex min-h-[calc(100vh-200px)] items-center justify-center">
        <div className="card w-96 bg-base-100 drop-shadow-lg">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Registration</h2>
            {/* Form Start */}
            <form
              onSubmit={handleSubmit(handleRegistration)}
              className=" flex flex-col gap-3"
            >
              {/* Username */}
              <div className="form-control min-w-[350px]">
                <label className="pb-1  text-left">Username</label>
                <input
                  type="text"
                  className={`input-bordered input w-full ${
                    errors.username && "input-error"
                  }`}
                  {...register("username", {
                    required: "Please enter your username",
                    minLength: {
                      value: 3,
                      message: "Your username must have 3 characters",
                    },
                  })}
                />
                {/* Error Message */}
                <FormErrorMessage message={errors?.username?.message} />
              </div>

              {/* First Name & Last Name*/}
              <div className="form-control min-w-[350px]">
                <div className="flex gap-3">
                  <div className="flex flex-col items-start justify-center">
                    <label className="pb-1  text-left">First Name</label>
                    <input
                      type="text"
                      className={`input-bordered input w-full ${
                        errors.first_name && "input-error"
                      }`}
                      {...register("first_name", {
                        required: "Please enter your first name",
                        minLength: {
                          value: 3,
                          message: "Your first name must have 3 characters",
                        },
                      })}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <label className="pb-1">Last Name</label>
                    <input
                      type="text"
                      className={`input-bordered input w-full ${
                        errors.last_name && "input-error"
                      }`}
                      {...register("last_name", {
                        required: "Please enter your last name",
                        minLength: {
                          value: 3,
                          message: "Your last name must have 3 characters",
                        },
                      })}
                    />
                  </div>
                </div>
                {/* Error Message */}
                {errors?.first_name?.message || errors?.last_name?.message ? (
                  <FormErrorMessage message="Please enter your first name & last name" />
                ) : (
                  <></>
                )}
              </div>

              {/* Email */}
              <div className="form-control min-w-[350px]">
                <label className="pb-1 text-left">Email</label>
                <input
                  type="text"
                  className={`input-bordered input w-full ${
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
                <FormErrorMessage message={errors?.email?.message} />
              </div>

              {/* Password*/}
              <div className="form-control min-w-[350px]">
                <label className="pb-1 text-left">Password</label>
                <input
                  type="password"
                  className={`input-bordered input w-full  ${
                    errors.password && "input-error"
                  }`}
                  {...register("password", {
                    required: "Please enter your password",
                    minLength: {
                      value: 8,
                      message: "Your password must have 8 characters",
                    },
                    validate: {
                      whitespace: (v) =>
                        /^\S*$/.test(v) ||
                        "Your password must not contain whitespace",
                      oneUpperCase: (v) =>
                        /^(?=.*[A-Z]).*$/.test(v) ||
                        "Your password must have at least one uppercase character",
                      oneLowerCase: (v) =>
                        /^(?=.*[a-z]).*$/.test(v) ||
                        "Your password must have at least one lowercase character",
                      oneDigit: (v) =>
                        /^(?=.*[0-9]).*$/.test(v) ||
                        "Your password must have at least one digit",
                      oneSymbol: (v) =>
                        /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(
                          v
                        ) ||
                        "Your password must have at least one special symbol",
                    },
                  })}
                />
                {/* Error Message */}
                <FormErrorMessage message={errors?.password?.message} />
              </div>

              {/* Confirm Password */}
              <div className="form-control min-w-[350px]">
                <label className="pb-1 text-left">Confirm Password</label>
                <input
                  type="password"
                  className={`input-bordered input mb-2 w-full ${
                    errors.confirmPassword && "input-error"
                  }`}
                  {...register("confirmPassword", {
                    required: "Please enter your confirm password",
                  })}
                />
                {/* Error Message */}
                <FormErrorMessage message={errors?.confirmPassword?.message} />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn-primary btn min-w-[350px] uppercase"
              >
                Register
              </button>
            </form>
            {/* Form End */}
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-secondary underline"
              >
                Log In Here
              </Link>
            </p>

            {/* TODO: Implement Google Button with passport.js*/}
            {/* Divider */}
            {/* <div className="flex w-full flex-col border-opacity-50">
              <div className="divider">OR</div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
