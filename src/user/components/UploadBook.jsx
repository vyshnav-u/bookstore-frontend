import React from "react";
import { FaPlus } from "react-icons/fa6";

function UploadBook() {
  return (
    <div className="bg-gray-100 p-5 px-10 rounded">

      <h2 className="text-black text-2xl font-bold mb-5">
        Upload Book
      </h2>

      <div className="md:grid grid-cols-2 gap-10">

        {/* Left Side */}
        <div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Author"
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Book Cover Image URL"
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Book Title"
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Total Pages"
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Original Price"
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Discount Price"
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <textarea
              placeholder="Abstract"
              className="w-full p-2 rounded bg-white border border-gray-300"
            ></textarea>
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Publisher"
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="ISBN"
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Language"
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Category"
              className="w-full p-2 rounded bg-white border border-gray-300"
            />
          </div>

        </div>


        {/* Right Side */}
        <div>

          {/* Upload Book Image */}
          <div className="mb-8 flex justify-center items-center">

            <label
              htmlFor="bookImage"
              className="cursor-pointer"
            >
              <input
                type="file"
                id="bookImage"
                hidden
              />

              <img
                width="200px"
                height="200px"
                src="https://www.freeiconspng.com/uploads/upload-icon-15.png"
                alt="Book File not Found"
              />

            </label>

          </div>


          {/* Preview of uploaded books */}
          <div>

            <h3 className="text-lg font-semibold mb-4 text-center">
              Preview of Uploaded Books
            </h3>

            <div className="flex justify-center items-center">

              <img
                width="70px"
                height="70px"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjLrxmeL57QLa0WWLe_Fic8cssSTTs8ATrS9JNYxfw8s-I0"
                alt="Book Image"
              />

              <label
                htmlFor="bookUpload"
                className="cursor-pointer"
              >
                <input
                  type="file"
                  id="bookUpload"
                  hidden
                />

                <FaPlus className="text-3xl ms-2" />

              </label>

            </div>

          </div>

        </div>

      </div>


      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-8">

        <button className="bg-gray-500 text-white px-4 py-2 rounded">
          Reset
        </button>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Upload
        </button>

      </div>

    </div>
  );
}

export default UploadBook;