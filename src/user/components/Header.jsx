
import React, { useEffect, useState } from "react";
import {
  IoBookSharp,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoMenu,
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoChevronDown,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [toggle, setToggle] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const token = sessionStorage.getItem("token");
      const storedUser = sessionStorage.getItem("user");

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Unable to read user:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener("storage", loadUser);
    window.addEventListener("authChanged", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("authChanged", loadUser);
    };
  }, []);

  const userId = user?._id || user?.id;

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    setUser(null);
    setDropdown(false);

    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  const handleProfile = () => {
    setDropdown(false);

    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      console.error("User ID not found in sessionStorage");
    }
  };

  const authMenu = (
    <div className="relative">
      {user ? (
        <>
          <button
            onClick={() => setDropdown((prev) => !prev)}
            className="flex items-center gap-2 border px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black"
          >
            {user.picture || user.profilePicture ? (
              <img
                src={user.picture || user.profilePicture}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <IoPersonCircleOutline className="text-2xl" />
            )}

            <span className="max-w-28 truncate">
              {user.name || user.username || "My Account"}
            </span>

            <IoChevronDown />
          </button>

          {dropdown && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-md bg-white text-gray-800 shadow-lg border z-50 overflow-hidden">
              {/* User Details */}
              <div className="px-4 py-3 border-b">
                <p className="font-semibold truncate">
                  {user.name || user.username || "User"}
                </p>

                <p className="text-sm text-gray-500 truncate">
                  {user.email || "No email available"}
                </p>

                <p className="text-xs text-gray-400 mt-1 break-all">
                  ID: {userId || "Not available"}
                </p>
              </div>

              {/* View Profile */}
              <button
                onClick={handleProfile}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 text-left"
              >
                <IoPersonCircleOutline className="text-xl" />
                View Profile
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 text-left text-red-600"
              >
                <IoLogOutOutline className="text-xl" />
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <Link
          to="/login"
          className="border px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black"
        >
          Log In
        </Link>
      )}
    </div>
  );

  return (
    <div>
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-3 items-center px-10 py-4">
        <div className="text-4xl">
          <IoBookSharp />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold">Bookstore</h1>
        </div>

        <div className="flex justify-end items-center gap-3">
          <IoLogoFacebook className="text-xl" />
          <IoLogoTwitter className="text-xl" />
          <IoLogoInstagram className="text-xl" />
          {authMenu}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex md:hidden justify-between items-center px-5 py-3">
        <button
          onClick={() => setToggle((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <IoMenu className="text-4xl" />
        </button>

        <h1 className="text-xl font-bold">Bookstore</h1>

        {authMenu}
      </div>

      {/* Navigation */}
      <nav className="bg-black text-white">
        <ul
          className={`${
            toggle ? "flex" : "hidden"
          } md:flex flex-col items-start md:flex-row justify-center gap-4 md:gap-6 p-3`}
        >
          <li
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
              setToggle(false);
            }}
          >
            HOME
          </li>

          <li
            className="cursor-pointer"
            onClick={() => {
              navigate("/books");
              setToggle(false);
            }}
          >
            BOOKS
          </li>

          <li
            className="cursor-pointer"
            onClick={() => {
              navigate("/contact");
              setToggle(false);
            }}
          >
            CONTACT
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;