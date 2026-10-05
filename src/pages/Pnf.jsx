import React from "react";
import { Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa6";

function Pnf() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-5">

      <div className="text-center">

        <FaBookOpen className="text-blue-900 text-7xl mx-auto mb-5" />

        <h1 className="text-8xl font-bold text-blue-900">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3">
          Sorry, the page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-800"
        >
          Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Pnf;