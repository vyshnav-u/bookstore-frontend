
import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { FaBook, FaUser, FaUserShield } from "react-icons/fa";
import { getAllBooksAPI, getAllUsersAPI } from "../../services/allAPI";

function AdminDashboard() {
  const [stats, setStats] = useState({
    books: null,
    users: null,
    admins: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = sessionStorage.getItem("token");

        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };

        const [booksResponse, usersResponse] = await Promise.all([
          getAllBooksAPI(),
          getAllUsersAPI(reqHeader),
        ]);

        const booksData =
          booksResponse?.data?.data ||
          booksResponse?.data?.books ||
          booksResponse?.data ||
          booksResponse;

        const usersData =
          usersResponse?.data?.data ||
          usersResponse?.data?.users ||
          usersResponse?.data ||
          usersResponse;

        if (!Array.isArray(booksData) || !Array.isArray(usersData)) {
          throw new Error("Invalid dashboard data received from server");
        }

        const adminCount = usersData.filter(
          (user) => user.role?.toLowerCase() === "admin"
        ).length;

        setStats({
          books: booksData.length,
          users: usersData.length,
          admins: adminCount,
        });
      } catch (err) {
        console.error("Dashboard data error:", err);
        setError("Unable to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardStats = [
    {
      title: "Total Books",
      value: stats.books,
      icon: <FaBook />,
      description: "Books in your collection",
    },
    {
      title: "Registered Users",
      value: stats.users,
      icon: <FaUser />,
      description: "Total registered members",
    },
    {
      title: "Administrators",
      value: stats.admins,
      icon: <FaUserShield />,
      description: "System administrators",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AdminHeader />

      <div className="md:grid md:grid-cols-[250px_1fr]">
        <AdminSideBar />

        <main className="p-5 md:p-8 lg:p-10">

          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 mb-3">
              Overview / Dashboard
            </p>

            <h1 className="font-['Fraunces'] text-3xl md:text-4xl">
              Dashboard<span className="text-white/35">.</span>
            </h1>

            <p className="text-sm text-white/40 mt-2">
              Welcome back. Here's what's happening with your bookstore.
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-400 mb-5">
              {error}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {dashboardStats.map((stat) => (
              <div
                key={stat.title}
                className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-white/25 transition duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-white/70 text-lg">
                  {stat.icon}
                </div>

                <p className="text-sm text-white/45 mt-7">
                  {stat.title}
                </p>

                <h2 className="font-['Fraunces'] text-3xl mt-1">
                  {loading ? "..." : stat.value ?? "—"}
                </h2>

                <p className="text-[11px] text-white/30 mt-2">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <FaBook className="text-white/50" />

              <h2 className="font-['Fraunces'] text-xl">
                Book Museum Management
              </h2>
            </div>

            <p className="text-sm text-white/40 leading-7 max-w-2xl">
              Manage your book collection, monitor registered users,
              and keep your digital library organized from one central
              dashboard.
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
