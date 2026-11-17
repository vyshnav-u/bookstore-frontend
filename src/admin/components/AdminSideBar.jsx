
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartBar,
  FaDatabase,
  FaGear,
} from "react-icons/fa6";
import { IoBookSharp } from "react-icons/io5";

function AdminSideBar() {
  const location = useLocation();

  const adminLinks = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <FaChartBar />,
    },
    {
      title: "Collections",
      path: "/admin/resources",
      icon: <FaDatabase />,
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: <FaGear />,
    },
  ];

  const adminName = JSON.parse(sessionStorage.getItem("user") || "{}")?.username || "Admin";

  return (
    <aside className="bg-[#0a0a0a] text-white md:min-h-screen h-full border-r border-white/10 py-8 px-5">

      <div className="flex flex-col items-center">

        <div className="w-24 h-24 rounded-full border border-white/15 p-1">
          <img
            className="w-full h-full rounded-full object-cover"
            src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
            alt="Admin"
          />
        </div>

        <h3 className="font-['Fraunces'] text-xl mt-4">
          {adminName}
        </h3>

        <p className="text-[9px] text-white/35 uppercase tracking-[0.3em] mt-1">
          Administrator
        </p>

      </div>

      <div className="mt-12">

        <p className="text-[9px] text-white/30 uppercase tracking-[0.25em] px-3 mb-4">
          Main Menu
        </p>

        <nav className="flex flex-col gap-2">
          {adminLinks.map((link) => {
            const isActive =
              location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition duration-300 ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-base">
                  {link.icon}
                </span>

                <span>{link.title}</span>

                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-black"></span>
                )}
              </Link>
            );
          })}
        </nav>

      </div>

      <div className="mt-16 pt-6 border-t border-white/10">
        <div className="flex items-center justify-center gap-2 text-white/25">
          <IoBookSharp />
          <span className="text-[9px] tracking-[0.2em] uppercase">
            Book Museum
          </span>
        </div>
      </div>

    </aside>
  );
}

export default AdminSideBar;
