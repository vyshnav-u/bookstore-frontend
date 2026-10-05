
import React, { useState } from "react";
import { FaUserAlt, FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAPI } from "../services/allAPI";

function Auth({ insideRegister }) {
  const navigate = useNavigate();

  const [togglePassword, setTogglePassword] = useState(false);

  const handleLogin = async (userData) => {
    try {
      console.log("Login data:", userData);

      const result = await loginAPI(userData);

      console.log("Login response:", result);

      if (result.status === 200) {
        toast.success("Successfully logged in!");

        sessionStorage.setItem("token", result.data.token);

        sessionStorage.setItem(
          "user",
          JSON.stringify(result.data.user)
        );

        setTimeout(() => {
          if (result.data.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1500);
      }
    } catch (err) {
      console.log("Login error:", err);

      if (err.response) {
        toast.error(err.response.data.message || "Login failed");
      } else {
        toast.error("Server connection failed");
      }
    }
  };

  const handleRegister = async (userData) => {
    try {
      const result = await axiosInstance.post("/register", userData);

      console.log(result.data);

      toast.success("Registration Successful");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return true;
    } catch (err) {
      console.log(err);

      if (err.response) {
        toast.error(err.response.data.message || "Registration Failed");
      } else {
        toast.error("Server connection failed");
      }

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
            .min(3, "Must be at least 3 characters")
            .required("Username is required")
        : Yup.string(),

      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      console.log("Form submitted:", values);

      if (insideRegister) {
        const success = await handleRegister(values);

        if (success) {
          resetForm();
        }
      } else {
        console.log("LOGIN API CALL");

        await handleLogin(values);
      }
    },
  });

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="w-full min-h-screen flex justify-center items-center bg-[url('/login.png')] bg-cover bg-center">
        <div className="p-10">
          <h1 className="text-center font-bold text-3xl">
            BOOKSTORE
          </h1>

          <div
            style={{ width: "400px" }}
            className="bg-blue-900 text-white p-5 py-8 flex rounded justify-center items-center flex-col my-5"
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
              }}
              className="border mb-5 flex justify-center items-center"
            >
              <FaUserAlt className="text-3xl" />
            </div>

            <h1 className="text-3xl">
              {insideRegister ? "Register" : "Login"}
            </h1>

            <form
              onSubmit={formik.handleSubmit}
              className="my-5 w-full"
            >
              {insideRegister && (
                <>
                  <input
                    className="bg-white p-2 w-full rounded mt-5 text-blue-900"
                    type="text"
                    placeholder="UserName"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.username &&
                    formik.errors.username && (
                      <p className="text-red-400 text-sm mt-1">
                        {formik.errors.username}
                      </p>
                    )}
                </>
              )}

              <input
                className="bg-white p-2 w-full rounded mt-5 text-blue-900"
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.email &&
                formik.errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}

              <div className="relative mt-5">
                <input
                  className="bg-white p-2 w-full rounded text-blue-900"
                  type={togglePassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {togglePassword ? (
                  <FaEye
                    onClick={() => setTogglePassword(false)}
                    className="text-gray-400 cursor-pointer absolute right-3 top-3"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setTogglePassword(true)}
                    className="text-gray-400 cursor-pointer absolute right-3 top-3"
                  />
                )}
              </div>

              {formik.touched.password &&
                formik.errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}

              <div className="flex justify-between pt-5">
                <p>Don't share the password</p>

                {!insideRegister && (
                  <p className="underline text-blue-300 cursor-pointer">
                    Forgot Password?
                  </p>
                )}
              </div>

              <div className="flex justify-center pt-7">
                <button
                  type="submit"
                  className="bg-green-600 w-full text-2xl text-amber-50 rounded-md py-1"
                >
                  {insideRegister ? "Register" : "Log In"}
                </button>
              </div>

              {!insideRegister && (
                <div>
                  <p className="text-center py-2 text-white/50">
                    -----or-----
                  </p>

                  <button
                    type="button"
                    className="bg-green-600 w-full text-2xl text-amber-50 rounded-md py-1"
                  >
                    Google Login
                  </button>
                </div>
              )}

              {insideRegister ? (
                <p className="text-center pt-3">
                  Already a user?{" "}
                  <Link
                    to="/login"
                    className="underline text-blue-400"
                  >
                    Login
                  </Link>
                </p>
              ) : (
                <p className="text-center pt-3">
                  New user?{" "}
                  <Link
                    to="/register"
                    className="underline text-blue-400"
                  >
                    Register
                  </Link>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;

