
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { addBookAPI } from "../../services/allAPI";

function UploadBook() {
  // Stores all book details entered by the user
  const [bookDetails, setBookDetails] = useState({
    author: "",
    imageURL: "",
    title: "",
    pages: "",
    price: "",
    discountPrice: "",
    abstract: "",
    publisher: "",
    isbn: "",
    language: "",
    category: "",
  });

  // Stores the selected additional book images
  const [bookImages, setBookImages] = useState([]);

  // Stores preview URLs for the selected images
  const [imagePreviews, setImagePreviews] = useState([]);

  // Tracks whether the book is being uploaded
  const [loading, setLoading] = useState(false);

  // Updates book details when an input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookDetails((previousDetails) => ({
      ...previousDetails,
      [name]: value,
    }));
  };

  // Selects additional images and creates their previews
  const handleImagesChange = (e) => {
    const selectedImages = Array.from(e.target.files || []);

    // Allows a maximum of three image files
    const validImages = selectedImages
      .filter((image) => image.type.startsWith("image/"))
      .slice(0, 3);

    if (selectedImages.length > 3) {
      alert("Please select a maximum of 3 images.");
    }

    if (validImages.length !== selectedImages.length &&
        selectedImages.length <= 3) {
      alert("Please select valid image files only.");
    }

    setBookImages(validImages);
  };

  // Creates and cleans up preview URLs
  useEffect(() => {
    const previewURLs = bookImages.map((image) =>
      URL.createObjectURL(image)
    );

    setImagePreviews(previewURLs);

    return () => {
      previewURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [bookImages]);

  // Clears the form and selected images
  const handleReset = () => {
    setBookDetails({
      author: "",
      imageURL: "",
      title: "",
      pages: "",
      price: "",
      discountPrice: "",
      abstract: "",
      publisher: "",
      isbn: "",
      language: "",
      category: "",
    });

    setBookImages([]);
    setImagePreviews([]);

    const fileInput = document.getElementById("bookUpload");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // Validates and uploads the book
  const handleUpload = async () => {
    // Checks whether any book detail is empty
    if (
      Object.values(bookDetails).some(
        (value) => !String(value).trim()
      )
    ) {
      alert("Please fill in all book details.");
      return;
    }

    // Checks that the cover URL is valid
    try {
      const coverURL = new URL(bookDetails.imageURL);

      if (!["http:", "https:"].includes(coverURL.protocol)) {
        alert("Please enter a valid book cover image URL.");
        return;
      }
    } catch {
      alert("Please enter a valid book cover image URL.");
      return;
    }

    // Requires at least one additional image
    if (bookImages.length === 0) {
      alert("Please select at least one additional book image.");
      return;
    }

    // Gets the authentication token
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Please login before uploading a book.");
      return;
    }

    // Creates FormData for text fields and image files
    const formData = new FormData();

    Object.entries(bookDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Uses the field name expected by Multer
    bookImages.forEach((image) => {
      formData.append("uploadImages", image);
    });

    setLoading(true);

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      // Sends book details and image files to the backend
      const response = await addBookAPI(formData, reqHeader);

      if (response.status === 200 || response.status === 201) {
        alert("Book uploaded successfully!");
        handleReset();
      } else {
        alert("The book could not be uploaded. Please try again.");
      }
    } catch (error) {
      console.error("Book upload error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to upload book. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-5 px-10 rounded">
      <h2 className="text-black text-2xl font-bold mb-5">
        Upload Book
      </h2>

      <div className="md:grid grid-cols-2 gap-10">
        {/* Left side: book details */}
        <div>
          <div className="mb-3">
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={bookDetails.author}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="url"
              name="imageURL"
              placeholder="Book Cover Image URL"
              value={bookDetails.imageURL}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={bookDetails.title}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              min="1"
              name="pages"
              placeholder="Total Pages"
              value={bookDetails.pages}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              min="0"
              name="price"
              placeholder="Original Price"
              value={bookDetails.price}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              min="0"
              name="discountPrice"
              placeholder="Discount Price"
              value={bookDetails.discountPrice}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <textarea
              name="abstract"
              placeholder="Abstract"
              value={bookDetails.abstract}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="publisher"
              placeholder="Publisher"
              value={bookDetails.publisher}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="isbn"
              placeholder="ISBN"
              value={bookDetails.isbn}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="language"
              placeholder="Language"
              value={bookDetails.language}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={bookDetails.category}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>
        </div>

        {/* Right side: cover preview and additional images */}
        <div>
          <div className="mb-8 flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold mb-3">
              Book Cover Preview
            </h3>

            <img
              className="w-[200px] h-[250px] object-contain rounded"
              src={
                bookDetails.imageURL ||
                "https://placehold.co/200x250?text=Book+Cover"
              }
              alt="Book cover preview"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/200x250?text=Invalid+Image+URL";
              }}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">
              Preview of Uploaded Books
            </h3>

            <div className="flex flex-wrap justify-center items-center gap-3">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  className="w-[70px] h-[70px] object-cover rounded border"
                  src={preview}
                  alt={`Additional book image ${index + 1}`}
                />
              ))}

              <label
                htmlFor="bookUpload"
                className="cursor-pointer p-3"
              >
                <input
                  type="file"
                  id="bookUpload"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImagesChange}
                />

                <FaPlus className="text-3xl ms-2" />
              </label>
            </div>

            <p className="text-gray-500 text-sm text-center mt-3">
              Select up to 3 additional images.
            </p>
          </div>
        </div>
      </div>

      {/* Reset and Upload buttons */}
      <div className="flex justify-end gap-3 mt-8">
        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={handleUpload}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}

export default UploadBook;
