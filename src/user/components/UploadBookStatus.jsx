
import React, { useEffect, useState } from "react";
import { getUserBookAPI, deleteBookAPI } from "../../services/allAPI";

function UploadBookStatus() {
  // Stores all books uploaded by the logged-in user
  const [userBooks, setUserBooks] = useState([]);

  // Stores loading state while fetching books
  const [loading, setLoading] = useState(true);

  // Stores an error message if an operation fails
  const [error, setError] = useState("");

  // Gets the authentication token from sessionStorage
  const getHeaders = () => {
    const token = sessionStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // Fetches books uploaded by the logged-in user
  const fetchUserBooks = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getUserBookAPI(getHeaders());

      // Supports either an array response or { data: [...] }
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

  // Fetches books when the component loads
  useEffect(() => {
    fetchUserBooks();
  }, []);

  // Deletes a selected book
  const handleDelete = async (bookId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    try {
      await deleteBookAPI(bookId, getHeaders());

      // Removes the deleted book from the screen
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

  // Displays the appropriate status image
  const getStatusImage = (status) => {
    const currentStatus = (status || "pending").toLowerCase();

    const statusImages = {
      pending:
        "https://t4.ftcdn.net/jpg/15/42/78/73/360_F_1542787314_EjF9an3UH9Nd8BvShQ6VSKkYgaS0ByuS.png",
      approved:
        "https://static.vecteezy.com/system/resources/previews/024/382/871/non_2x/approved-sign-symbol-icon-label-stamp-green-round-design-transparent-background-free-png.png",
      sold:
        "https://cdn-icons-png.flaticon.com/512/6188/6188726.png",
    };

    return statusImages[currentStatus] || statusImages.pending;
  };

  if (loading) {
    return (
      <div className="p-10 my-15 shadow rounded text-center">
        Loading your uploaded books...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 my-15 shadow rounded text-center">
        <p className="text-red-600">{error}</p>

        <button
          onClick={fetchUserBooks}
          className="mt-4 bg-blue-700 text-white p-2 rounded"
        >
          TRY AGAIN
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 my-15 shadow rounded">
      <h1 className="text-3xl font-semibold mb-6">
        My Uploaded Books
      </h1>

      {userBooks.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          You haven't uploaded any books yet.
        </p>
      ) : (
        userBooks.map((book) => (
          <div
            key={book._id}
            className="p-5 rounded mt-4 bg-blue-100"
          >
            <div className="md:grid grid-cols-[3fr_1fr]">
              {/* Book Details */}
              <div className="px-4">
                <h1 className="text-4xl font-semibold">
                  {book.title}
                </h1>

                <h2 className="text-2xl mt-2">
                  {book.author}
                </h2>

                <h3 className="text-lg text-blue-700 mt-2">
                  Discount Price: ₹
                  {book.discountPrice ?? book.price ?? 0}
                </h3>

                <p className="text-justify mt-3">
                  {book.abstract}
                </p>

                {/* Current Book Status */}
                <div className="flex flex-wrap items-center gap-3 my-4">
                  <img
                    className="w-[100px] h-[100px] object-contain"
                    src={getStatusImage(book.status)}
                    alt={book.status || "Pending"}
                    title={book.status || "Pending"}
                  />

                  <span className="capitalize font-semibold">
                    Status: {book.status || "pending"}
                  </span>
                </div>
              </div>

              {/* Book Image and Delete Button */}
              <div className="px-4 mt-4 md:mt-0">
                <img
                  className="w-full max-h-[300px] object-contain rounded"
                  src={
                    book.imageURL ||
                    (book.uploadImages?.[0]
                      ? `${
                          import.meta.env.VITE_API_BASE_URL
                        }/uploads/${book.uploadImages[0]}`
                      : "https://placehold.co/400x500?text=No+Book+Image")
                  }
                  alt={book.title}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      "https://placehold.co/400x500?text=No+Book+Image";
                  }}
                />

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-700 hover:bg-red-800 text-white p-2 rounded"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UploadBookStatus;
