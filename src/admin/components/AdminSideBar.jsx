import React from "react";
import { Link } from "react-router-dom";
import { FaChartBar, FaDatabase, FaGear } from "react-icons/fa6";

function AdminSideBar() {
  return (
    <div className="bg-blue-100 md:min-h-screen h-fit py-10">

      {/* Image */}
      <div className="flex justify-center">
        <img
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
          }}
          src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
          alt="Admin"
        />
      </div>

      {/* Name */}
      <h3 className="text-xl font-bold my-5 text-center">
        Name
      </h3>

      {/* Links */}
      <div className="mt-10 flex flex-col justify-center items-center">

        <div className="mt-3">
          <Link
            to="/admin"
            className="flex items-center"
          >
            <FaChartBar className="me-2" />
            Dashboard
          </Link>
        </div>

        <div className="mt-3">
          <Link
            to="/admin/resources"
            className="flex items-center"
          >
            <FaDatabase className="me-2" />
            Collections
          </Link>
        </div>

        <div className="mt-3">
          <Link
            to="/admin/settings"
            className="flex items-center"
          >
            <FaGear className="me-2" />
            Settings
          </Link>
        </div>

      </div>

    </div>
  );
}

export default AdminSideBar;