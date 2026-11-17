
import React, { useState, useEffect } from "react";
import { FaPlus, FaCloudUploadAlt, FaImage } from "react-icons/fa";
import { addBookAPI } from "../../services/allAPI";

function UploadBook() {
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

  const [bookImages, setBookImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookDetails((previousDetails) => ({
      ...previousDetails,
      [name]: value,
    }));
  };

  const handleImagesChange = (e) => {
    const selectedImages = Array.from(e.target.files || []);

    const validImages = selectedImages
      .filter((image) => image.type.startsWith("image/"))
      .slice(0, 3);

    if (selectedImages.length > 3) {
      alert("Please select a maximum of 3 images.");
    }

    if (
      validImages.length !== selectedImages.length &&
      selectedImages.length <= 3
    ) {
      alert("Please select valid image files only.");
    }

    setBookImages(validImages);
  };

  useEffect(() => {
    const previewURLs = bookImages.map((image) =>
      URL.createObjectURL(image)
    );

    setImagePreviews(previewURLs);

    return () => {
      previewURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [bookImages]);

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

  const handleUpload = async () => {
    if (
      Object.values(bookDetails).some(
        (value) => !String(value).trim()
      )
    ) {
      alert("Please fill in all book details.");
      return;
    }

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

    if (bookImages.length === 0) {
      alert("Please select at least one additional book image.");
      return;
    }

    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Please login before uploading a book.");
      return;
    }

    const formData = new FormData();

    Object.entries(bookDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });

    bookImages.forEach((image) => {
      formData.append("uploadImages", image);
    });

    setLoading(true);

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

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

  const inputStyle =
    "w-full bg-[#171717] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40 transition";

  return (
    <div className="bg-[#111111] rounded-2xl p-5 md:p-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 mb-2">
            Book Museum / Contribution
          </p>

          <h2 className="font-['Fraunces'] text-3xl text-white">
            Upload a Book<span className="text-white/40">.</span>
          </h2>

          <p className="text-xs text-white/40 mt-2">
            Share your favourite books with the community.
          </p>
        </div>

        <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <FaCloudUploadAlt className="text-white/60 text-lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">

        <div className="space-y-5">

          <div>
            <label className="block text-xs text-white/45 mb-2">
              Book Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter book title"
              value={bookDetails.title}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className="block text-xs text-white/45 mb-2">
              Author
            </label>
            <input
              type="text"
              name="author"
              placeholder="Enter author name"
              value={bookDetails.author}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className="block text-xs text-white/45 mb-2">
              Book Cover Image URL
            </label>
            <input
              type="url"
              name="imageURL"
              placeholder="https://example.com/book-cover.jpg"
              value={bookDetails.imageURL}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/45 mb-2">
                Total Pages
              </label>
              <input
                type="number"
                min="1"
                name="pages"
                placeholder="Pages"
                value={bookDetails.pages}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block text-xs text-white/45 mb-2">
                Language
              </label>
              <input
                type="text"
                name="language"
                placeholder="Language"
                value={bookDetails.language}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/45 mb-2">
                Original Price
              </label>
              <input
                type="number"
                min="0"
                name="price"
                placeholder="Original price"
                value={bookDetails.price}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block text-xs text-white/45 mb-2">
                Discount Price
              </label>
              <input
                type="number"
                min="0"
                name="discountPrice"
                placeholder="Discount price"
                value={bookDetails.discountPrice}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/45 mb-2">
              Publisher
            </label>
            <input
              type="text"
              name="publisher"
              placeholder="Enter publisher name"
              value={bookDetails.publisher}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/45 mb-2">
                ISBN
              </label>
              <input
                type="text"
                name="isbn"
                placeholder="ISBN number"
                value={bookDetails.isbn}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block text-xs text-white/45 mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                placeholder="Book category"
                value={bookDetails.category}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/45 mb-2">
              Book Abstract
            </label>
            <textarea
              name="abstract"
              rows="5"
              placeholder="Write a short description about the book..."
              value={bookDetails.abstract}
              onChange={handleChange}
              className={`${inputStyle} resize-none`}
            />
          </div>

        </div>

        <div className="space-y-7">

          <div className="bg-[#171717] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <FaImage className="text-white/40" />
              <h3 className="text-sm text-white">
                Cover Preview
              </h3>
            </div>

            <div className="flex justify-center">
              <div className="w-[190px] h-[260px] bg-[#222222] rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                <img
                  className="w-full h-full object-contain"
                  src={
                    bookDetails.imageURL ||
                    "https://placehold.co/200x280/222222/ffffff?text=Book+Cover"
                  }
                  alt="Book cover preview"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/200x280/222222/ffffff?text=Invalid+Image";
                  }}
                />
              </div>
            </div>

            <p className="text-center text-xs text-white/30 mt-4">
              Your book cover will appear here.
            </p>
          </div>

          <div className="bg-[#171717] border border-white/10 rounded-2xl p-5">
            <h3 className="text-sm text-white mb-2">
              Additional Images
            </h3>

            <p className="text-xs text-white/40 mb-5">
              Upload up to 3 additional book images.
            </p>

            <div className="flex flex-wrap gap-3">
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="w-[75px] h-[85px] rounded-lg overflow-hidden border border-white/10"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={preview}
                    alt={`Additional book image ${index + 1}`}
                  />
                </div>
              ))}

              {bookImages.length < 3 && (
                <label
                  htmlFor="bookUpload"
                  className="w-[75px] h-[85px] rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition"
                >
                  <FaPlus className="text-white/60 mb-2" />
                  <span className="text-[10px] text-white/40">
                    Add image
                  </span>

                  <input
                    type="file"
                    id="bookUpload"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleImagesChange}
                  />
                </label>
              )}
            </div>

            <p className="text-xs text-white/30 mt-4">
              {bookImages.length} of 3 images selected
            </p>
          </div>

        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-9 pt-6 border-t border-white/10">

        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="px-6 py-3 rounded-full border border-white/15 text-white/65 text-sm hover:bg-white/5 transition disabled:opacity-50"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={handleUpload}
          disabled={loading}
          className="px-7 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/80 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Book"}
        </button>

      </div>
    </div>
  );
}

export default UploadBook;
