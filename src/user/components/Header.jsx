import React, { useState } from "react";
import {
  IoBookSharp,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoMenu,
} from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Header() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate()

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

          <Link to={"/login"} className="border px-2 py-1 rounded-md">
            Log In
          </Link>
        </div>

      </div>

      {/* Mobile Header */}
      <div className="flex md:hidden justify-between items-center px-5 py-3">

        <button onClick={() => setToggle(!toggle)}>
          <IoMenu className="text-4xl" />
        </button>

        <h1 className="text-xl font-bold">Bookstore</h1>

        <Link to={"/login"} className="border px-2 py-1 rounded-md">
          Log In
        </Link>

      </div>

      {/* Navigation */}
      <nav className="bg-black text-white">

        <ul
          className={`${toggle ? "flex" : "hidden"
            } md:flex flex-col items-start md:flex-row justify-center  gap-4 md:gap-6 p-3`}
        >
          <li onClick={()=>navigate("/")}>HOME</li>
          <li onClick={()=>navigate("/books")}>BOOKS</li>
          <li onClick={()=>navigate("/contact")}>CONTACT</li>
        </ul>

      </nav>
    </div>
  );
}

export default Header;