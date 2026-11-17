
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaBookOpen, FaSyncAlt } from "react-icons/fa";
import { getUserBookAPI, deleteBookAPI } from "../../services/allAPI";

function UploadBookStatus() {
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getHeaders = () => {
    const token = sessionStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchUserBooks = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getUserBookAPI(getHeaders());

      const result = Array.isArray(response.data)
        ? response.data
        : response.data.data;

      setUserBooks(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Error fetching user books:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load your uploaded books."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBooks();
  }, []);

  const handleDelete = async (bookId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    try {
      await deleteBookAPI(bookId, getHeaders());

      setUserBooks((previousBooks) =>
        previousBooks.filter((book) => book._id !== bookId)
      );
    } catch (err) {
      console.error("Error deleting book:", err);

      alert(
        err.response?.data?.message ||
          "Unable to delete this book."
      );
    }
  };

  const getStatusStyle = (status) => {
    const currentStatus = (status || "pending").toLowerCase();

    const statusStyles = {
      pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      approved: "bg-green-500/10 text-green-400 border-green-500/20",
      sold: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    };

    return (
      statusStyles[currentStatus] ||
      statusStyles.pending
    );
  };

  const getBookImage = (book) => {
    if (book.imageURL) {
      return book.imageURL;
    }

    if (book.uploadImages?.[0]) {
      return `${import.meta.env.VITE_API_BASE_URL}/uploads/${book.uploadImages[0]}`;
    }

    return "https://placehold.co/400x500/222222/ffffff?text=No+Book+Image";
  };

  if (loading) {
    return (
      <div className="bg-[#111111] rounded-2xl border border-white/10 p-12 text-center">
        <FaSyncAlt className="animate-spin text-white/40 text-xl mx-auto mb-4" />
        <p className="text-sm text-white/40">
          Loading your uploaded books...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#111111] rounded-2xl border border-white/10 p-12 text-center">
        <p className="text-sm text-red-400">{error}</p>

        <button
          onClick={fetchUserBooks}
          className="mt-5 px-5 py-2.5 rounded-full bg-white text-black text-sm hover:bg-white/80 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] rounded-2xl p-5 md:p-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 mb-2">
            Book Museum / Contributions
          </p>

          <h2 className="font-['Fraunces'] text-3xl text-white">
            My Uploaded Books<span className="text-white/40">.</span>
          </h2>

          <p className="text-xs text-white/40 mt-2">
            Track and manage the books you've shared.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-2.5 w-fit">
          <FaBookOpen className="text-white/40 text-sm" />
          <span className="text-sm text-white">
            {userBooks.length}
          </span>
          <span className="text-xs text-white/40">
            {userBooks.length === 1 ? "Book" : "Books"}
          </span>
        </div>
      </div>

      {userBooks.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-2xl py-16 px-5 text-center">
          <FaBookOpen className="text-3xl text-white/20 mx-auto mb-4" />

          <h3 className="font-['Fraunces'] text-xl text-white/80">
            No books uploaded yet
          </h3>

          <p className="text-sm text-white/35 mt-2">
            Your uploaded books will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {userBooks.map((book) => (
            <div
              key={book._id}
              className="bg-[#171717] border border-white/10 rounded-2xl p-5 md:p-6 hover:border-white/20 transition"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_170px] gap-6">

                <div className="flex flex-col justify-between">

                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full border text-[10px] uppercase tracking-wider font-medium ${getStatusStyle(book.status)}`}
                      >
                        {book.status || "Pending"}
                      </span>

                      {book.category && (
                        <span className="text-[10px] uppercase tracking-wider text-white/35">
                          {book.category}
                        </span>
                      )}
                    </div>

                    <h3 className="font-['Fraunces'] text-2xl md:text-3xl text-white">
                      {book.title}
                    </h3>

                    <p className="text-sm text-white/45 mt-2">
                      By {book.author}
                    </p>

                    <p className="text-sm text-white/55 leading-7 mt-5 line-clamp-3">
                      {book.abstract}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-white/10">

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-white/35 mb-1">
                        Listed Price
                      </p>

                      <p className="text-lg text-white font-medium">
                        ₹{book.discountPrice ?? book.price ?? 0}
                      </p>

                      {book.discountPrice != null &&
                        book.price != null &&
                        Number(book.discountPrice) < Number(book.price) && (
                          <p className="text-xs text-white/30 line-through">
                            ₹{book.price}
                          </p>
                        )}
                    </div>

                    <button
                      onClick={() => handleDelete(book._id)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-red-500/20 text-red-400 text-xs hover:bg-red-500/10 transition"
                    >
                      <FaTrashAlt />
                      Delete Book
                    </button>

                  </div>
                </div>

                <div className="h-[220px] md:h-[240px] bg-[#222222] rounded-xl overflow-hidden border border-white/10">
                  <img
                    className="w-full h-full object-contain"
                    src={getBookImage(book)}
                    alt={book.title}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        "https://placehold.co/400x500/222222/ffffff?text=No+Book+Image";
                    }}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default UploadBookStatus;
