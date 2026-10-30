
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { FaEye, FaBackward, FaCamera } from "react-icons/fa6";
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

    // Keep external image URLs unchanged.
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    // Build the URL for an image uploaded to your backend.
    return `${UPLOADS_BASE_URL}/${image.replace(/^\/+/, "")}`;
  };

  if (loading) {
    return (
      <div>
        <Header />
        <p className="m-10">Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <p className="m-10 text-red-600">{error}</p>
        <Link to="/books" className="ms-10 text-blue-800 underline">
          Back to books
        </Link>
      </div>
    );
  }

  const uploadedImages = Array.isArray(bookDetails.uploadImages)
    ? bookDetails.uploadImages
    : [];

  return (
    <div>
      <Header />

      <div className="md:m-10 m-5">
        <div className="border p-5 shadow border-gray-400">
          <div className="md:grid grid-cols-4 gap-x-10">
            <div className="col-span-1">
              <img
                className="w-full"
                src={getImageUrl(bookDetails.imageURL)}
                alt={bookDetails.title || "Book cover"}
              />
            </div>

            <div className="col-span-3">
              <div className="flex justify-between mt-5 md:mt-0">
                <h3 className="text-2xl font-bold">
                  {bookDetails.title}
                </h3>

                <button
                  onClick={() => setModal(true)}
                  className="text-gray-400"
                  aria-label="View other book images"
                >
                  <FaEye />
                </button>
              </div>

              <h2 className="text-blue-800 font-bold text-xl my-5">
                {bookDetails.author}
              </h2>

              <div className="md:grid grid-cols-3 gap-5 my-10">
                <p className="font-bold">
                  Publisher : {bookDetails.publisher || "N/A"}
                </p>

                <p className="font-bold">
                  Language : {bookDetails.language || "N/A"}
                </p>

                <p className="font-bold">
                  No. Of Pages : {bookDetails.pages || "N/A"}
                </p>

                <p className="font-bold">
                  Category : {bookDetails.category || "N/A"}
                </p>

                <p className="font-bold">
                  ISBN : {bookDetails.isbn || "N/A"}
                </p>

                <p className="font-bold">
                  Seller :{" "}
                  {typeof bookDetails.sellerMail === "string"
                    ? bookDetails.sellerMail
                    : bookDetails.sellerMail?.email || "N/A"}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg">Abstract:</h4>
                <p className="mt-2">
                  {bookDetails.abstract || "No abstract available."}
                </p>
              </div>

              <div className="flex justify-end mt-10">
                <Link
                  to="/books"
                  className="bg-blue-900 text-white p-2 font-black flex items-center"
                >
                  <FaBackward className="me-2" />
                  Back
                </Link>

                <button className="bg-green-900 text-white font-black ms-5 p-2">
                  Buy ₹{bookDetails.discountPrice || bookDetails.price || 0}
                </button>
              </div>
            </div>
          </div>

          {/* Modal displaying all additional uploaded images */}
          {modal && (
            <div
              onClick={() => setModal(false)}
              className="fixed inset-0 z-50 overflow-y-auto bg-gray-500/75"
            >
              <div className="flex justify-center items-center min-h-screen p-4">
                <div
                  onClick={(event) => event.stopPropagation()}
                  className="bg-white rounded-2xl w-full max-w-5xl overflow-hidden"
                >
                  <div className="bg-black text-white p-3 flex justify-between items-center">
                    <h3 className="font-bold">Book Images</h3>

                    <button
                      onClick={() => setModal(false)}
                      className="text-white text-xl"
                      aria-label="Close modal"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="relative p-5">
                    <p className="text-blue-600 flex items-center">
                      <FaCamera className="me-2" />
                      Camera clicks of the book
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
                      {uploadedImages.length > 0 ? (
                        uploadedImages.map((image, index) => (
                          <div key={`${image}-${index}`} className="border rounded-lg p-2">
                            <img
                              className="w-full h-64 object-contain"
                              src={getImageUrl(image)}
                              alt={`Additional image ${index + 1} of ${bookDetails.title}`}
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        ))
                      ) : (
                        <p className="col-span-full text-gray-500 py-6">
                          No additional images have been uploaded for this book.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default View;
