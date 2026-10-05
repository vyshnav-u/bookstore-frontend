import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function Books() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Header />
      {/* Grid - Filter & Book Card */}
      <div className="md:grid grid-cols-4 p-5 md:px-40 mb-10">

        {/* Filter */}
        <div className="col-span-1">

          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Filter</h1>

            <button
              onClick={() => setToggle(!toggle)}
              className="font-bold text-2xl md:hidden"
            >
              <FaBars />
            </button>
          </div>

          {/* Filter Category */}
          <div className={toggle ? "block" : "hidden md:block"}>

            <div className="mt-3">
              <input
                type="radio"
                name="filter"
                id="no-filter"
              />

              <label
                htmlFor="no-filter"
                className="ms-3"
              >
                All
              </label>
            </div>

            <div className="mt-3">
              <input
                type="radio"
                name="filter"
                id="filter"
              />

              <label
                htmlFor="filter"
                className="ms-3"
              >
                Book Category
              </label>
            </div>

          </div>
        </div>

        {/* Books */}
        <div className="col-span-3 mt-5 md:mt-0">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Book 1 */}
            <div className="border border-gray-200 rounded p-4 shadow">
              <img
                src="https://covers.openlibrary.org/b/isbn/9780140449136-L.jpg"
                alt="Book"
                className="w-full h-72 object-contain"
              />

              <h2 className="text-xl font-bold mt-3">
                Crime and Punishment
              </h2>

              <p className="text-gray-600 mt-1 mb-4">
                Fyodor Dostoevsky
              </p>

              <Link to={'/books/id'} className="bg-blue-800 text-white px-4 py-2 mt-3 rounded">
                View Book
              </Link>
            </div>



          </div>
        </div>

      </div>
    </>
  );
}

export default Books;