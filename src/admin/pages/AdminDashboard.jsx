import React from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { FaBook, FaUser } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";

function AdminDashboard() {
  return (
    <>
      <AdminHeader />

      <div className="md:grid md:grid-cols-[1fr_4fr]">

        {/* Left Side */}
        <div>
          <AdminSideBar />
        </div>

        {/* Right Side */}
        <div className="p-10">
          <div className="md:grid grid-cols-3 gap-2">
            {/* card 1 */}
            <div className="bg-amber-200 rounded-2xl">
              <div className="flex flex-col items-center py-10 gap-2">
                <FaBook className="text-3xl"/>
                <h1 className="text-2xl">Books</h1>
                <h1 className="text-xl">100 +</h1>
  
              </div>
            </div>
            {/* card 2 */}
            <div className="bg-amber-200 rounded-2xl">
              <div className="flex flex-col items-center py-10 gap-2">
                <FaUser className="text-3xl"/>
                <h1 className="text-2xl">Users</h1>
                <h1 className="text-xl">100 +</h1>
  
              </div>
            </div>
            {/* card 3 */}
            <div className="bg-amber-200 rounded-2xl">
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <FaAddressCard className="text-3xl"/>
                <h1 className="text-2xl">Admin</h1>
                <h1 className="text-xl"></h1>
  
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default AdminDashboard;