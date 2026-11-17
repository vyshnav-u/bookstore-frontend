
import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import {
  getAllBooksAPI,
  getAllUsersAPI,
  approveBookAPI,
} from "../../services/allAPI";
import { FaBook, FaUsers, FaCheckCircle, FaSyncAlt } from "react-icons/fa";

function AdminResources() {
  const [tab, setTabValue] = useState(1);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [booksLoading, setBooksLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState("");
  const [approvingId, setApprovingId] = useState(null);

  const fetchBooks = async () => {
    setBooksLoading(true);
    setError("");

    try {
      const response = await getAllBooksAPI();

      if (response.status >= 400) {
        setError(response.data?.message || "Failed to load books");
        return;
      }

      const bookData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setBooks(bookData);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load books");
    } finally {
      setBooksLoading(false);
    }
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    setError("");

    try {
      const response = await getAllUsersAPI();

      if (response.status >= 400) {
        setError(response.data?.message || "Failed to load users");
        return;
      }

      const userData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setUsers(userData);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load users");
    } finally {
      setUsersLoading(false);
    }
  };

  
useEffect(() => {
  fetchBooks();
  fetchUsers();
}, []);


  const handleApprove = async (bookId) => {
    setApprovingId(bookId);
    setError("");

    try {
      const response = await approveBookAPI(bookId);

      if (response.status >= 400 || response.data?.success === false) {
        setError(response.data?.message || "Book approval failed");
        return;
      }

      setBooks((previousBooks) =>
        previousBooks.map((book) =>
          book._id === bookId
            ? { ...book, status: "approved" }
            : book
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Unable to approve this book");
    } finally {
      setApprovingId(null);
    }
  };

  const handleTabChange = (selectedTab) => {
    setTabValue(selectedTab);

    if (selectedTab === 2) {
      fetchUsers();
    } else {
      setError("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AdminHeader />

      <div className="md:grid md:grid-cols-[250px_1fr]">
        <AdminSideBar />

        <main className="min-w-0 p-5 md:p-8 lg:p-10">

          {/* Heading */}
          <div className="mb-9">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 mb-3">
              Book Museum / Management
            </p>

            <h1 className="font-['Fraunces'] text-3xl md:text-4xl">
              Resources<span className="text-white/35">.</span>
            </h1>

            <p className="text-xs md:text-sm text-white/40 mt-2">
              Manage your book collection and registered members.
            </p>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-[#111111] border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60">
                <FaBook />
              </div>

              <div>
                <p className="text-[10px] text-white/40">Total Books</p>
                <h3 className="text-xl font-['Fraunces']">
                  {books.length}
                </h3>
              </div>
            </div>

            <div className="bg-[#111111] border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60">
                <FaUsers />
              </div>

              <div>
                <p className="text-[10px] text-white/40">Total Users</p>
                <h3 className="text-xl font-['Fraunces']">
                  {users.length}
                </h3>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-white/10 mb-7">
            <button
              onClick={() => handleTabChange(1)}
              className={`flex items-center gap-2 py-3 text-xs transition border-b-2 ${
                tab === 1
                  ? "border-white text-white"
                  : "border-transparent text-white/40 hover:text-white"
              }`}
            >
              <FaBook />
              Books ({books.length})
            </button>

            <button
              onClick={() => handleTabChange(2)}
              className={`flex items-center gap-2 py-3 text-xs transition border-b-2 ${
                tab === 2
                  ? "border-white text-white"
                  : "border-transparent text-white/40 hover:text-white"
              }`}
            >
              <FaUsers />
              Users ({users.length})
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Books */}
          {tab === 1 && (
            <div>
              {booksLoading ? (
                <div className="py-16 text-center text-white/40">
                  <FaSyncAlt className="animate-spin mx-auto mb-3 text-xl" />
                  <p className="text-xs">Loading books...</p>
                </div>
              ) : books.length === 0 ? (
                <div className="bg-[#111111] border border-white/10 rounded-2xl py-16 text-center">
                  <FaBook className="text-3xl text-white/20 mx-auto mb-4" />
                  <p className="text-sm text-white/50">No books found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {books.map((book) => (
                    <div
                      key={book._id}
                      className="overflow-hidden rounded-2xl bg-[#111111] border border-white/10 hover:border-white/20 transition"
                    >
                      <div className="h-[260px] bg-[#191919] p-3">
                        <img
                          className="h-full w-full rounded-xl object-contain"
                          src={
                            book.imageURL ||
                            "https://placehold.co/300x400/222222/ffffff?text=No+Book+Image"
                          }
                          alt={book.title || "Book cover"}
                        />
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[9px] uppercase tracking-wider text-white/35">
                            {book.category || "Book"}
                          </span>

                          <span
                            className={`text-[9px] px-2.5 py-1 rounded-full border ${
                              book.status === "approved"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : book.status === "pending"
                                  ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                  : "bg-white/5 text-white/50 border-white/10"
                            }`}
                          >
                            {book.status || "pending"}
                          </span>
                        </div>

                        <h2 className="font-['Fraunces'] text-lg text-white line-clamp-1">
                          {book.title || "Untitled Book"}
                        </h2>

                        <p className="text-xs text-white/40 mt-1">
                          {book.author || "Unknown Author"}
                        </p>

                        <p className="text-sm text-white mt-3">
                          ₹{book.discountPrice ?? book.price ?? 0}
                        </p>

                        <p className="text-[10px] text-white/30 mt-3 break-all">
                          Seller:{" "}
                          {typeof book.sellerMail === "string"
                            ? book.sellerMail
                            : book.sellerMail?.email ||
                              book.sellerMail?.userMail ||
                              "Unknown"}
                        </p>

                        {book.status !== "approved" && (
                          <button
                            onClick={() => handleApprove(book._id)}
                            disabled={approvingId === book._id}
                            className="w-full mt-4 flex items-center justify-center gap-2 bg-white text-black rounded-full py-2.5 text-[10px] uppercase tracking-wider font-semibold hover:bg-white/80 transition disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <FaCheckCircle />
                            {approvingId === book._id
                              ? "Approving..."
                              : "Approve Book"}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Users */}
          {tab === 2 && (
            <div>
              {usersLoading ? (
                <div className="py-16 text-center text-white/40">
                  <FaSyncAlt className="animate-spin mx-auto mb-3 text-xl" />
                  <p className="text-xs">Loading users...</p>
                </div>
              ) : users.length === 0 ? (
                <div className="bg-[#111111] border border-white/10 rounded-2xl py-16 text-center">
                  <FaUsers className="text-3xl text-white/20 mx-auto mb-4" />
                  <p className="text-sm text-white/50">No users found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {users.map((user, index) => (
                    <div
                      key={user._id || user.id || index}
                      className="bg-[#111111] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition"
                    >
                      <p className="text-[9px] uppercase tracking-wider text-white/25 break-all">
                        ID: {user._id || user.id || index + 1}
                      </p>

                      <div className="mt-4 flex items-center gap-4">
                        <img
                          className="h-16 w-16 shrink-0 rounded-full object-cover border border-white/10"
                          src={
                            user.profileImage ||
                            user.picture ||
                            "https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small/a-person-icon-on-a-transparent-background-png.png"
                          }
                          alt="User profile"
                        />

                        <div className="min-w-0">
                          <h3 className="font-['Fraunces'] text-lg text-white break-words">
                            {user.username ||
                              user.name ||
                              user.fullName ||
                              "Unnamed User"}
                          </h3>

                          <p className="text-[11px] text-white/40 break-all mt-1">
                            {user.email ||
                              user.userMail ||
                              user.mail ||
                              "No email"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center">
                        <span className="text-[10px] text-white/35 uppercase tracking-wider">
                          Account Role
                        </span>

                        <span className="text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/65 capitalize">
                          {user.role || "user"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default AdminResources;
