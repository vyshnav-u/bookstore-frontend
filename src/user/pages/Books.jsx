
import React, { useContext, useEffect, useState } from "react";
import {
  FaSearch,
  FaArrowRight,
  FaBookOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { getAllBooksAPI } from "../../services/allAPI";
import { searchContext } from "../../contextAPI/ShareContext";

function Books() {
  const { searchKey, setSearchKey } = useContext(searchContext);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllBooksAPI(searchKey || "");
        const data = response?.data;
        const booksData = Array.isArray(data) ? data : data?.data;

        if (!isActive) return;

        if (Array.isArray(booksData)) {
          setBooks(booksData);
        } else {
          setBooks([]);
          setError("Unexpected response from server.");
        }
      } catch (err) {
        if (!isActive) return;

        setError(
          err.response?.data?.message || "Unable to load books. Please try again."
        );
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchBooks();

    return () => {
      isActive = false;
    };
  }, [searchKey, refreshKey]);

  const categories = [
    ...new Set(
      books.map(book => book.category?.trim()).filter(Boolean)
    ),
  ];

  const filteredBooks = selectedCategory
    ? books.filter(
        book =>
          book.category?.toLowerCase() === selectedCategory.toLowerCase()
      )
    : books;

  const handleImageError = e => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      "https://placehold.co/300x400/222222/ffffff?text=Book+Cover";
  };

  return (
    <div className="min-h-screen bg-black text-white/80">

      <Header />

      <main className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">

        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-9 lg:gap-10">

          {/* LEFT SIDEBAR */}

          <aside className="lg:sticky lg:top-8 lg:self-start">

            <p className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-6">
              The Book Museum / Library
            </p>

            <h1 className="font-['Fraunces'] text-4xl md:text-5xl leading-tight text-white/90">
              The Collection<span className="italic text-white/40">.</span>
            </h1>

            <p className="text-sm text-white/60 leading-7 mt-5">
              Explore stories, discover ideas and find your next favourite read.
              Every book has a world waiting to be discovered.
            </p>

            {/* Search */}

            <div className="relative mt-8">

              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm" />

              <input
                type="text"
                value={searchKey}
                onChange={e => setSearchKey(e.target.value)}
                placeholder="Search books or authors..."
                className="w-full bg-[#151515] border border-white/10 rounded-xl pl-11 pr-4 py-4 text-sm text-white/80 outline-none focus:border-white/40 transition placeholder:text-white/30"
              />

            </div>

            {/* Categories */}

            <div className="mt-10">

              <div className="flex justify-between items-center mb-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                  Browse categories
                </p>

                <FaBookOpen className="text-white/30 text-sm" />
              </div>

              <div className="space-y-5">

                <button
                  onClick={() => setSelectedCategory("")}
                  className={`block text-sm transition ${
                    !selectedCategory
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  All books
                </button>

                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block text-sm transition ${
                      selectedCategory === category
                        ? "text-white"
                        : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}

              </div>

            </div>

            {/* Book count */}

            <div className="border-t border-white/10 mt-10 pt-5">

              <p className="text-xs text-white/50">
                {filteredBooks.length} books available
              </p>

              <p className="text-xs text-white/30 mt-2 leading-6">
                A good book is a journey you can revisit anytime.
              </p>

            </div>

          </aside>

          {/* RIGHT SIDE - BOOK COLLECTION */}

          <section className="min-w-0">

            {/* Collection heading */}

            <div className="flex justify-between items-center mb-8">

              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">
                  Carefully collected
                </p>

                <h2 className="font-['Fraunces'] text-2xl md:text-3xl text-white/90">
                  Explore books
                </h2>
              </div>

              <p className="text-xs text-white/40">
                {filteredBooks.length} results
              </p>

            </div>

            {/* Loading */}

            {loading ? (

              <div className="text-center py-28 text-sm text-white/50">
                Loading your collection...
              </div>

            ) : error ? (

              <div className="text-center py-24">

                <p className="text-sm text-red-400 mb-5">
                  {error}
                </p>

                <button
                  onClick={() => setRefreshKey(prev => prev + 1)}
                  className="text-sm text-white/80 underline underline-offset-4"
                >
                  Try again
                </button>

              </div>

            ) : filteredBooks.length === 0 ? (

              <div className="text-center py-28 bg-[#111111] rounded-2xl">

                <FaBookOpen className="mx-auto text-3xl text-white/30 mb-5" />

                <h3 className="font-['Fraunces'] text-2xl italic text-white/80">
                  Nothing found.
                </h3>

                <p className="text-sm text-white/40 mt-3">
                  {searchKey.trim()
                    ? `No results for "${searchKey}".`
                    : "No books available in this category."}
                </p>

              </div>

            ) : (

              /* Book grid */

              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 md:gap-x-6 gap-y-12">

                {filteredBooks.map((book, index) => (

                  <article
                    key={book._id}
                    className="group min-w-0"
                  >

                    <Link to={`/books/${book._id}`}>

                      {/* Book cover */}

                      <div className="relative aspect-[3/4] bg-[#151515] rounded-2xl overflow-hidden flex items-center justify-center p-5 md:p-7">

                        <img
                          src={book.imageURL}
                          alt={book.title || "Book cover"}
                          onError={handleImageError}
                          className="w-full h-full object-contain transition duration-700 group-hover:scale-105"
                        />

                        {book.discountPrice !== undefined &&
                          book.discountPrice !== null &&
                          book.discountPrice !== "" && (
                            <span className="absolute top-3 left-3 bg-white text-black px-3 py-1.5 rounded-full text-[9px] uppercase tracking-widest">
                              Offer
                            </span>
                          )}

                        <span className="absolute bottom-3 right-4 text-[10px] text-white/50">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                      </div>

                      {/* Book details */}

                      <div className="pt-4">

                        <div className="flex justify-between items-center gap-2 mb-2">

                          <p className="text-[10px] uppercase tracking-widest text-white/50 truncate">
                            {book.category || "Book"}
                          </p>

                          <p className="text-xs text-white/80 whitespace-nowrap">
                            ₹{book.discountPrice !== undefined &&
                            book.discountPrice !== null &&
                            book.discountPrice !== ""
                              ? book.discountPrice
                              : book.price}
                          </p>

                        </div>

                        <h3 className="font-['Fraunces'] text-base md:text-lg leading-snug truncate text-white/90 group-hover:text-white transition">
                          {book.title}
                        </h3>

                        <p className="text-xs text-white/50 mt-2 truncate">
                          {book.author}
                        </p>

                        {book.discountPrice !== undefined &&
                          book.discountPrice !== null &&
                          book.discountPrice !== "" && (
                            <p className="text-[10px] text-white/30 line-through mt-1">
                              ₹{book.price}
                            </p>
                          )}

                        <div className="flex justify-between items-center border-t border-white/10 mt-4 pt-3">

                          <span className="text-[10px] uppercase tracking-widest text-white/60">
                            Discover
                          </span>

                          <FaArrowRight className="text-xs text-white/40 group-hover:translate-x-1 group-hover:text-white/80 transition" />

                        </div>

                      </div>

                    </Link>

                  </article>

                ))}

              </div>

            )}

          </section>

        </div>

        {/* Bottom section */}

        <section className="mt-24 mb-10 bg-[#111111] rounded-3xl p-8 md:p-12">

          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-5">
            A little reminder
          </p>

          <h2 className="font-['Fraunces'] text-3xl md:text-5xl leading-tight text-white/90 max-w-xl">
            Between the pages,
            <span className="italic text-white/40"> find yourself.</span>
          </h2>

          <p className="text-sm text-white/50 mt-5 leading-7 max-w-md">
            Take your time. Explore something unfamiliar.
            Your next favourite story might be just one page away.
          </p>

          <a
            href="#top"
            className="inline-flex items-center gap-3 mt-8 text-xs uppercase tracking-widest text-white/70 hover:text-white transition"
          >
            Back to top
            <FaArrowRight />
          </a>

        </section>

        {/* Footer */}

        <footer className="border-t border-white/10 py-7 flex justify-between items-center">

          <p className="text-[10px] uppercase tracking-widest text-white/40">
            The Book Museum
          </p>

          <p className="text-[10px] text-white/40">
            Stories worth keeping.
          </p>

        </footer>

      </main>

    </div>
  );
}

export default Books;
