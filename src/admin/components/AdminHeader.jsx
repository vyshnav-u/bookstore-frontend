
import React from "react";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="flex justify-between items-center p-3 md:px-20">
        <div className="flex items-center">
          <img
            width="50px"
            height="50px"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTa8aURiprjEz3oPg7cqmFzwle7GZCs0DtKL_ZdbRzqmOqXD3xRnxIWK-8s"
            alt="Icon"
          />

          <h1 className="text-2xl font-bold ms-2">
            BOOKSTORE
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center px-3 py-2 bg-black text-white rounded border border-black hover:bg-white hover:text-black"
        >
          Logout
          <FaPowerOff className="ms-2" />
        </button>
      </div>

      <div className="w-full p-3 bg-black text-white">
        <marquee>
          Welcome Admin, You are all set to manage and monitor the System.
          Let's get into work!!!
        </marquee>
      </div>
    </>
  );
}

export default AdminHeader;