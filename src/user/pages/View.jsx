
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { FaEye, FaArrowLeft, FaCamera } from "react-icons/fa6";
import { IoClose, IoBookOutline } from "react-icons/io5";
import { viewBooksAPI } from "../../services/allAPI";

const UPLOADS_BASE_URL = "http://localhost:3000/uploads";

function View() {
  const [modal, setModal] = useState(false);
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await viewBooksAPI(id);

        const responseData = result.data?.data ?? result.data;
        const book = Array.isArray(responseData)
          ? responseData[0]
          : responseData;

        if (!book) {
          setError("Book not found.");
          return;
        }

        setBookDetails(book);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Unable to load book details.");
      } finally {
        setLoading(false);
      }
    };

    getBookDetails();
  }, [id]);

  const getImageUrl = (image) => {
    if (!image) return "";

    if (/^https?:\/\//i.test(image)) {
      return image;
    }

    return `${UPLOADS_BASE_URL}/${image.replace(/^\/+/, "")}`;
  };

  const uploadedImages = Array.isArray(bookDetails.uploadImages)
    ? bookDetails.uploadImages
    : [];

  const price = bookDetails.discountPrice || bookDetails.price || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white/80">
        <Header />
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-32 text-center">
          <p className="font-['Fraunces'] text-2xl">Opening the collection...</p>
          <p className="text-white/40 text-sm mt-3">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white/80">
        <Header />
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-32 text-center">
          <IoBookOutline className="text-5xl mx-auto text-white/30 mb-5" />
          <h2 className="font-['Fraunces'] text-3xl">{error}</h2>
          <Link
            to="/books"
            className="inline-flex items-center gap-2 mt-8 text-sm text-white/60 hover:text-white transition"
          >
            <FaArrowLeft /> Back to collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white/80">
      <Header />

      <main className="max-w-7xl mx-auto px-5 md:px-10 pt-10 md:pt-16 pb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
              The Book Museum / Collection
            </p>
            <h2 className="font-['Fraunces'] text-3xl md:text-4xl text-white">
              Book Details<span className="text-white/30">.</span>
            </h2>
          </div>

          <Link
            to="/books"
            className="hidden sm:flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
          >
            <FaArrowLeft /> Back to collection
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">

          <div className="bg-[#151515] rounded-3xl p-6 md:p-10">
            <div className="aspect-[3/4] max-w-[360px] mx-auto overflow-hidden rounded-2xl bg-[#202020]">
              <img
                className="w-full h-full object-contain"
                src={getImageUrl(bookDetails.imageURL)}
                alt={bookDetails.title || "Book cover"}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>

            <button
              onClick={() => setModal(true)}
              className="mt-7 w-full flex items-center justify-center gap-3 border border-white/15 rounded-full py-3 text-sm text-white/70 hover:bg-white hover:text-black transition"
            >
              <FaEye />
              View additional images
            </button>

            <p className="text-center text-xs text-white/30 mt-4">
              {uploadedImages.length} additional images available
            </p>
          </div>

          <div className="pt-2">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-5">
              Featured book
            </p>

            <h1 className="font-['Fraunces'] text-4xl md:text-5xl lg:text-6xl leading-tight text-white">
              {bookDetails.title}
            </h1>

            <p className="font-['Fraunces'] text-xl md:text-2xl text-white/50 mt-5">
              by {bookDetails.author}
            </p>

            <div className="h-px bg-white/10 my-9" />

            <div className="grid grid-cols-2 gap-x-8 gap-y-7">
              {[
                ["Publisher", bookDetails.publisher],
                ["Language", bookDetails.language],
                ["Pages", bookDetails.pages],
                ["Category", bookDetails.category],
                ["ISBN", bookDetails.isbn],
                [
                  "Seller",
                  typeof bookDetails.sellerMail === "string"
                    ? bookDetails.sellerMail
                    : bookDetails.sellerMail?.email,
                ],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs uppercase tracking-widest text-white/35 mb-2">
                    {label}
                  </p>
                  <p className="text-sm md:text-base text-white/80 break-words">
                    {value || "Not available"}
                  </p>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/10 my-9" />

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">
                About this book
              </p>

              <p className="text-sm md:text-base leading-8 text-white/65 whitespace-pre-line">
                {bookDetails.abstract || "No abstract available for this book."}
              </p>
            </div>

            <div className="mt-12 bg-[#151515] rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/40 mb-2">
                  Available price
                </p>
                <p className="font-['Fraunces'] text-3xl text-white">
                  ₹{price}
                </p>
                {bookDetails.discountPrice && bookDetails.price && (
                  <p className="text-sm text-white/35 line-through mt-1">
                    ₹{bookDetails.price}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Link
                  to="/books"
                  className="flex items-center justify-center gap-2 border border-white/20 rounded-full px-5 py-3 text-sm hover:bg-white hover:text-black transition"
                >
                  <FaArrowLeft /> Back
                </Link>

                <button
                  type="button"
                  className="rounded-full bg-white text-black px-7 py-3 text-sm hover:bg-white/80 transition"
                >
                  Buy ↗
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-3">
          <p className="font-['Fraunces'] text-lg text-white/70">
            Book Museum.
          </p>
          <p className="text-xs text-white/30">
            Discover stories. Explore knowledge.
          </p>
        </div>
      </main>

      {modal && (
        <div
          onClick={() => setModal(false)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm overflow-y-auto"
        >
          <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
            <div
              onClick={(event) => event.stopPropagation()}
              className="bg-[#151515] border border-white/10 rounded-3xl w-full max-w-5xl overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40">
                    Gallery
                  </p>
                  <h3 className="font-['Fraunces'] text-2xl text-white mt-1">
                    Book Images
                  </h3>
                </div>

                <button
                  onClick={() => setModal(false)}
                  className="text-white/60 hover:text-white text-2xl"
                  aria-label="Close modal"
                >
                  <IoClose />
                </button>
              </div>

              <div className="p-6">
                <p className="text-sm text-white/50 flex items-center gap-2 mb-6">
                  <FaCamera />
                  Additional photographs of this book
                </p>

                {uploadedImages.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {uploadedImages.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="bg-[#202020] rounded-2xl p-3"
                      >
                        <img
                          className="w-full h-64 object-contain rounded-xl"
                          src={getImageUrl(image)}
                          alt={`Additional image ${index + 1} of ${bookDetails.title}`}
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-white/40 py-16">
                    No additional images have been uploaded for this book.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default View;
