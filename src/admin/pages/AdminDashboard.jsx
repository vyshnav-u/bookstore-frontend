import React from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";

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
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>
        </div>

      </div>
    </>
  );
}

export default AdminDashboard;