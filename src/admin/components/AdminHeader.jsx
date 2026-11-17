
import React from "react";
import { FaPowerOff } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-[#0a0a0a] text-white border-b border-white/10">

      <div className="flex justify-between items-center px-5 md:px-12 lg:px-20 py-4">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <IoBookSharp className="text-black text-xl" />
          </div>

          <div>
            <h1 className="font-['Fraunces'] text-xl md:text-2xl tracking-wide">
              BOOK MUSEUM
            </h1>
            <p className="text-[9px] text-white/35 uppercase tracking-[0.3em]">
              Admin Panel
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 text-white/80 text-xs hover:bg-white hover:text-black transition duration-300"
        >
          Logout
          <FaPowerOff className="text-[11px]" />
        </button>

      </div>

      <div className="border-t border-white/5 bg-[#111111] px-5 md:px-12 lg:px-20 py-3">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>

          <p className="text-[10px] md:text-xs text-white/45 tracking-wide">
            Welcome back, Admin.
            <span className="text-white/75 ml-1">
              Manage your collection and monitor the system.
            </span>
          </p>
        </div>
      </div>

    </header>
  );
}

export default AdminHeader;
