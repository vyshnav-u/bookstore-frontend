import React, { useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { FaEye, FaBackward, FaCamera } from "react-icons/fa6";

function View() {
  const [modal,setModal] = useState(false)
  return (
    <div>
      <Header />

      <div className="md:m-10 m-5">
        <div className="border p-5 shadow border-gray-400">
          <div className="md:grid grid-cols-4 gap-x-10">

            {/* Image Book */}
            <div className="col-span-1">
              <img
                className="w-full"
                src="https://covers.openlibrary.org/b/isbn/9780140449136-L.jpg"
                alt="Crime and Punishment"
              />
            </div>

            {/* Book Details */}
            <div className="col-span-3">

              <div className="flex justify-between mt-5 md:mt-0">
                <h3 className="text-2xl font-bold">
                  Crime and Punishment
                </h3>

                <button onClick={()=>setModal(true)} className="text-gray-400">
                  <FaEye />
                </button>
              </div>

              <h2 className="text-blue-800 font-bold text-xl my-5">
                Fyodor Dostoevsky
              </h2>

              <div className="md:grid grid-cols-3 gap-5 my-10">
                <p className="font-bold">
                  Publisher : Penguin Classics
                </p>

                <p className="font-bold">
                  Language : English
                </p>

                <p className="font-bold">
                  No. Of Pages : 720
                </p>

                <p className="font-bold">
                  Category : Fiction
                </p>

                <p className="font-bold">
                  ISBN : 9780140449136
                </p>

                <p className="font-bold">
                  Seller : Penguin
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg">
                  Abstract:
                </h4>

                <p className="mt-2">
                  Crime and Punishment follows the story of a young man
                  struggling with guilt and the consequences of his actions.
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
                  Buy $230
                </button>

              </div>

            </div>
          </div>
          {/* Modal */}
          {
          modal &&
            <div onClick={()=>setModal(false)} className="relative z-10 overflow-y-auto">
            <div className="bg-gray-500/75 fixed inset-0">

              <div className="flex justify-center items-center min-h-screen">

                <div className="bg-white rounded-2xl md:w-250 w-100">

                  {/* Modal Title */}
                  <div className="bg-black text-white p-3">
                    <h3>Book Images</h3>
                  </div>

                  {/* Modal Body */}
                  <div className="relative p-5">

                    <p className="text-blue-600 flex items-center">
                      <FaCamera className="me-2" />
                      Camera clicks of the book
                    </p>

                    <div className="md:flex flex-wrap my-4">

                      {/* Duplicate Image */}
                      <img
                        className="md:w-75 w-25 md:me-2 md:mt-0 mb-3"
                        src="https://blog-cdn.reedsy.com/directories/gallery/473/large_18701508f01e85184136629bb2479cfa.jpg"
                        alt="Book"
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default View;