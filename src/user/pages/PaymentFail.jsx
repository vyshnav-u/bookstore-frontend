
import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { FaTimesCircle, FaRedoAlt, FaHome } from "react-icons/fa";

function PaymentFail() {
  return (
    <>
      <Header />

      <div className="min-h-[80vh] flex items-center justify-center px-5 py-10 bg-gray-50">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">

          <div className="flex justify-center mb-6">
            <FaTimesCircle className="text-red-500 text-7xl" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Payment Failed!
          </h1>

          <p className="text-gray-600 leading-7 mb-8">
            Unfortunately, your payment could not be completed.
            Please try again or choose another payment method.
            If money was deducted, check your payment status before retrying.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/books"
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              <FaRedoAlt />
              Try Again
            </Link>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-lg transition"
            >
              <FaHome />
              Home
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default PaymentFail;
