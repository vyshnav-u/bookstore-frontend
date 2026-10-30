
import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { getAllBooksAPI } from "../../services/allAPI";
import { searchContext } from "../../contextAPI/ShareContext";

function Books() {
  const { searchKey, setSearchKey } = useContext(searchContext);

  const [toggle, setToggle] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [filterType, setFilterType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch books whenever the search text changes
  useEffect(() => {
    let isActive = true;

    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        // Pass the search text to the backend
        const response = await getAllBooksAPI(searchKey || "");

        const responseData = response?.data;

        const booksData = Array.isArray(responseData)
          ? responseData
          : responseData?.data;

        if (!isActive) return;

        if (Array.isArray(booksData)) {
          setBooks(booksData);
        } else {
          setBooks([]);
          setError("Unexpected response from the server.");
        }
      } catch (err) {
        if (!isActive) return;

        console.error("Error fetching books:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load books. Please try again."
        );
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      isActive = false;
    };
  }, [searchKey]);

  // Get unique categories from the fetched books
  const categories = [
    ...new Set(
      books
        .map((book) => book.category?.trim())
        .filter(Boolean)
    ),
  ];

  // Apply the category filter to the search results
  const filteredBooks =
    filterType === "category" && selectedCategory
      ? books.filter(
          (book) =>
            book.category?.toLowerCase() ===
            selectedCategory.toLowerCase()
        )
      : books;

  // Show a fallback image if a cover is missing or invalid
  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      "https://placehold.co/300x400?text=Book+Cover";
  };

  return (
    <>
      <Header />

      {/* Search bar */}
      <div className="px-5 md:px-40 py-6">
        <div className="relative max-w-2xl mx-auto">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            type="text"
            placeholder="Search books..."
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-800"
          />
        </div>
      </div>

      {/* Filter and book cards */}
      <div className="md:grid grid-cols-4 p-5 md:px-40 mb-10">

        {/* Filter section */}
        <div className="col-span-1">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Filter</h1>

            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="font-bold text-2xl md:hidden"
              aria-label="Toggle filters"
              aria-expanded={toggle}
            >
              <FaBars />
            </button>
          </div>

          <div className={toggle ? "block" : "hidden md:block"}>

            {/* Show all search results */}
            <div className="mt-3">
              <input
                type="radio"
                name="filter"
                id="no-filter"
                checked={filterType === "all"}
                onChange={() => {
                  setFilterType("all");
                  setSelectedCategory("");
                }}
              />

              <label htmlFor="no-filter" className="ms-3">
                All
              </label>
            </div>

            {/* Filter by category */}
            <div className="mt-3">
              <input
                type="radio"
                name="filter"
                id="filter"
                checked={filterType === "category"}
                onChange={() => setFilterType("category")}
              />

              <label htmlFor="filter" className="ms-3">
                Book Category
              </label>
            </div>

            {filterType === "category" && (
              <div className="mt-3">
                <label
                  htmlFor="category-select"
                  className="block mb-2 text-sm font-medium"
                >
                  Select category
                </label>

                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded bg-white"
                >
                  <option value="">All categories</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Books section */}
        <div className="col-span-3 mt-5 md:mt-0">

          {loading ? (
            <p className="text-center py-10">Loading books...</p>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-600 mb-4">{error}</p>

              <button
                type="button"
                onClick={() => setSearchKey(searchKey)}
                className="bg-blue-800 text-white px-4 py-2 rounded"
              >
                Try Again
              </button>
            </div>
          ) : filteredBooks.length === 0 ? (
            <p className="text-center py-10 text-gray-500">
              {searchKey.trim()
                ? `No books found for "${searchKey}".`
                : books.length === 0
                  ? "No books are available yet."
                  : "No books found in this category."}
            </p>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                {filteredBooks.length} book
                {filteredBooks.length !== 1 ? "s" : ""} found
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredBooks.map((book) => (
                  <div
                    key={book._id}
                    className="border border-gray-200 rounded p-4 shadow"
                  >
                    <img
                      src={book.imageURL}
                      alt={book.title || "Book cover"}
                      onError={handleImageError}
                      className="w-full h-72 object-contain"
                    />

                    <h2 className="text-xl font-bold mt-3">
                      {book.title}
                    </h2>

                    <p className="text-gray-600 mt-1">
                      {book.author}
                    </p>

                    {book.category && (
                      <p className="text-sm text-gray-500 mt-1">
                        Category: {book.category}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-3 mb-4">
                      {book.discountPrice !== undefined &&
                      book.discountPrice !== null &&
                      book.discountPrice !== "" ? (
                        <>
                          <span className="font-bold text-lg">
                            ₹{book.discountPrice}
                          </span>

                          <span className="text-gray-500 line-through">
                            ₹{book.price}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-lg">
                          ₹{book.price}
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/books/${book._id}`}
                      className="inline-block bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
                    >
                      View Book
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Books;
