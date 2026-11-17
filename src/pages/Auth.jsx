
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowRight, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAPI } from "../services/allAPI";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Auth({ insideRegister }) {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log(decoded);
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  const handleLogin = async (userData) => {
    try {
      const result = await loginAPI(userData);

      if (result.status === 200) {
        toast.success("Successfully logged in!");

        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("user", JSON.stringify(result.data.user));

        window.dispatchEvent(new Event("authChanged"));

        setTimeout(() => {
          if (result.data.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1200);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to login. Please try again."
      );
    }
  };

  const handleRegister = async (userData) => {
    try {
      await axiosInstance.post("/register", userData);
      toast.success("Registration successful!");

      setTimeout(() => navigate("/login"), 1200);
      return true;
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
      return false;
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: insideRegister
        ? Yup.string()
          .min(3, "At least 3 characters required")
          .required("Username is required")
        : Yup.string(),

      email: Yup.string()
        .email("Enter a valid email address")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      if (insideRegister) {
        const success = await handleRegister(values);
        if (success) resetForm();
      } else {
        await handleLogin(values);
      }
    },
  });

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
        closeButton={false}
        theme="dark"
      />

      <div className="min-h-screen bg-[#080807] text-[#eee9d9] flex items-center justify-center px-5 py-12">

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-20">

          {/* Left — Literary Branding */}

          <div className="hidden md:flex flex-col justify-center">

            <Link to="/" className="font-['Fraunces'] text-2xl mb-20">
              Book Museum.
            </Link>

            <p className="text-[10px] tracking-[0.3em] uppercase text-[#a69b7d] mb-6">
              A World Of Literature
            </p>

            <h1 className="font-['Fraunces'] text-5xl lg:text-7xl leading-[1.15] mb-8">
              Every Book
              <br />
              Begins A
              <br />
              <span className="italic text-[#a69b7d]">Journey.</span>
            </h1>

            <p className="text-sm leading-8 text-[#aaa58f] max-w-md">
              Discover timeless stories, remarkable authors and
              extraordinary ideas. Your next literary journey
              begins with a single page.
            </p>

            <div className="w-12 h-px bg-[#a69b7d] mt-12 mb-5" />

            <p className="text-[10px] tracking-[0.25em] text-[#777366] uppercase">
              Preserving Stories · Celebrating Literature
            </p>

          </div>


          {/* Right — Authentication */}

          <div className="w-full max-w-md mx-auto">

            {/* Mobile Branding */}

            <Link
              to="/"
              className="md:hidden block text-center font-['Fraunces'] text-2xl mb-12"
            >
              Book Museum.
            </Link>

            <div className="mb-9">

              <p className="text-[10px] uppercase tracking-[0.3em] text-[#a69b7d] mb-5">
                {insideRegister ? "Join Our Library" : "Welcome Back"}
              </p>

              <h2 className="font-['Fraunces'] text-4xl md:text-5xl mb-4">
                {insideRegister ? "Create Account." : "Sign In."}
              </h2>

              <p className="text-xs leading-6 text-[#aaa58f]">
                {insideRegister
                  ? "Create an account and begin exploring our literary collection."
                  : "Sign in to continue your literary journey."}
              </p>

            </div>


            {/* Form */}

            <form onSubmit={formik.handleSubmit} className="space-y-6">

              {insideRegister && (
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#aaa58f] mb-3">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-transparent border-b border-[#494538] px-3 py-3 text-sm outline-none focus:border-[#c9b98f] transition placeholder:text-[#777366]"
                  />

                  {formik.touched.username && formik.errors.username && (
                    <p className="text-red-400 text-xs mt-2">
                      {formik.errors.username}
                    </p>
                  )}
                </div>
              )}


              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#aaa58f] mb-3">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-transparent border-b border-[#494538] px-3 py-3 text-sm outline-none focus:border-[#c9b98f] transition placeholder:text-[#777366]"
                />

                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-400 text-xs mt-2">
                    {formik.errors.email}
                  </p>
                )}
              </div>


              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#aaa58f] mb-3">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={togglePassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-transparent border-b border-[#494538] px-3 py-3 pr-10 text-sm outline-none focus:border-[#c9b98f] transition placeholder:text-[#777366]"
                  />

                  <button
                    type="button"
                    onClick={() => setTogglePassword(!togglePassword)}
                    className="absolute right-1 top-3 text-[#898174] hover:text-white"
                    aria-label="Toggle password visibility"
                  >
                    {togglePassword ? <FaEye /> : <FaEyeSlash />}
                  </button>

                </div>

                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-400 text-xs mt-2">
                    {formik.errors.password}
                  </p>
                )}
              </div>


              {!insideRegister && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-[11px] text-[#a69b7d] hover:text-white transition"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}


              {/* Submit */}

              <button
                type="submit"
                className="w-full flex justify-between items-center bg-[#eee9d9] text-[#171612] px-6 py-4 text-xs uppercase tracking-[0.15em] hover:bg-[#c9b98f] transition duration-300"
              >
                {insideRegister ? "Create Account" : "Sign In"}
                <FaArrowRight />
              </button>


              {/* Google Login */}

              {!insideRegister && (
                <div className="pt-2">

                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-px bg-[#38352d] flex-1" />
                    <span className="text-[10px] text-[#777366] uppercase tracking-widest">
                      Or continue with
                    </span>
                    <div className="h-px bg-[#38352d] flex-1" />
                  </div>

                  <div className="flex justify-center">
                    <GoogleLogin
                      onSuccess={handleGoogleLogin}
                      onError={() => toast.error("Google login failed")}
                      theme="filled_black"
                      shape="rectangular"
                      width="100%"
                    />
                  </div>

                </div>
              )}

            </form>


            {/* Switch Authentication */}

            <div className="mt-9 pt-6 border-t border-[#38352d] text-center">

              <p className="text-xs text-[#aaa58f]">

                {insideRegister
                  ? "Already have an account?"
                  : "New to Book Museum?"}

                <Link
                  to={insideRegister ? "/login" : "/register"}
                  className="text-[#c9b98f] ml-2 hover:text-white transition"
                >
                  {insideRegister ? "Sign In" : "Create Account"}
                  {" ↗"}
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Auth;
