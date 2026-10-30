
import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaBookOpen, FaHome } from "react-icons/fa";

function PaymentSucess() {
  return (
    <>
      <Header />

      <div className="min-h-[80vh] flex items-center justify-center px-5 py-10 bg-gray-50">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">

          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-green-500 text-7xl" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Payment Successful!
          </h1>

          <p className="text-gray-600 leading-7 mb-8">
            Thank you for your purchase. Your payment has been completed
            successfully. Enjoy reading your new book!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/books"
              className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              <FaBookOpen />
              Browse Books
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

export default PaymentSucess;
