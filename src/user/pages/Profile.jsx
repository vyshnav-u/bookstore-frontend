
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Edit from "../components/Edit";
import UploadBook from "../components/UploadBook";
import UploadBookStatus from "../components/UploadBookStatus";
import Purchase from "../components/Purchase";

function Profile() {
  const [tab, setTabValue] = useState(1);
  const [user, setUser] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const userId = parsedUser._id || parsedUser.id;

      // Ensure the URL contains the logged-in user's ID
      if (userId && id !== userId) {
        navigate(`/profile/${userId}`, { replace: true });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      navigate("/login");
    }
  }, [id, navigate]);

  if (!user) {
    return null;
  }

  const profilePicture =
    user.picture ||
    user.profilePicture ||
    "https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small/a-person-icon-on-a-transparent-background-png.png";

  return (
    <>
      <Header />

      {/* Black cover */}
      <div className="bg-black h-[200px]"></div>

      {/* Profile image */}
      <div className="px-5">
        <img
          className="w-[200px] h-[200px] rounded-full object-cover bg-white -mt-[100px] border-4 border-black"
          src={profilePicture}
          alt={`${user.name || user.username || "User"} profile`}
        />
      </div>

      {/* Username and Edit */}
      <div className="md:flex justify-between px-5 mt-4">
        <div>
          <div className="flex items-center">
            <h1 className="text-2xl font-black md:text-3xl">
              {user.name || user.username || "User"}
            </h1>

            <FaCheckCircle className="text-blue-700 ms-3" />
          </div>

          <p className="text-gray-500 mt-1">{user.email}</p>

          <p className="text-sm text-gray-400 mt-1 break-all">
            User ID: {user._id || user.id || "Not available"}
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <Edit />
        </div>
      </div>

      {/* About */}
      <p className="text-justify md:px-20 px-5 my-5">
        {user.about ||
          "Welcome to your profile! You can manage your uploaded books and view your purchase history here."}
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 md:gap-10 justify-center">
        <button
          onClick={() => setTabValue(1)}
          className={`p-2 border-gray-200 border-t border-l cursor-pointer ${
            tab === 1 ? "font-bold border-b-2 border-b-black" : ""
          }`}
        >
          Upload Books
        </button>

        <button
          onClick={() => setTabValue(2)}
          className={`p-2 border-gray-200 border-t border-l cursor-pointer ${
            tab === 2 ? "font-bold border-b-2 border-b-black" : ""
          }`}
        >
          Upload Books Status
        </button>

        <button
          onClick={() => setTabValue(3)}
          className={`p-2 border-gray-200 border-t border-l cursor-pointer ${
            tab === 3 ? "font-bold border-b-2 border-b-black" : ""
          }`}
        >
          Purchase History
        </button>
      </div>

      {/* Tab content */}
      <div className="p-5">
        {tab === 1 && <UploadBook />}
        {tab === 2 && <UploadBookStatus />}
        {tab === 3 && <Purchase />}
      </div>
    </>
  );
}

export default Profile;