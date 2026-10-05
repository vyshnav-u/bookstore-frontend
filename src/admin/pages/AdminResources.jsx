import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";

function AdminResources() {
  const [tab, setTabValue] = useState(1);

  return (
    <>
      <AdminHeader />

      <div className="md:grid md:grid-cols-[1fr_4fr]">

        <div>
          <AdminSideBar />
        </div>

        <div className="p-10">

          <h1 className="text-3xl font-bold">
            Admin Resources
          </h1>

          {/* Tabs */}
          <div className="flex gap-10 justify-center my-8">

            <p
              onClick={() => setTabValue(1)}
              className={`p-2 mx-5 border-t border-l cursor-pointer ${
                tab === 1
                  ? "text-blue-600 font-bold"
                  : "border-gray-200"
              }`}
            >
              Books
            </p>

            <p
              onClick={() => setTabValue(2)}
              className={`p-2 mx-5 border-t border-l cursor-pointer ${
                tab === 2
                  ? "text-blue-600 font-bold"
                  : "border-gray-200"
              }`}
            >
              Users
            </p>

          </div>

          {/* BOOKS */}
          {tab === 1 && (
            <div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                <div className="shadow-lg rounded-md p-4">

                  <img
                    className="w-full h-[300px] object-cover rounded"
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f"
                    alt="Book"
                  />

                  <div className="text-center mt-4">

                    <h2 className="text-blue-600 font-bold text-xl">
                      Author
                    </h2>

                    <h3 className="text-lg mt-1">
                      Book Title
                    </h3>

                    <p className="font-bold text-red-500 mt-1">
                      ₹499
                    </p>

                    <button className="px-3 mt-2 py-1 bg-green-600 rounded-lg text-white">
                      APPROVE
                    </button>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* USERS */}
          {tab === 2 && (
            <div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">

                {/* User 1 */}
                <div className="shadow-md rounded p-2 bg-blue-100">

                  <p className="text-red-500 font-bold text-md">
                    ID : 1
                  </p>

                  <div className="flex mt-3 items-center">

                    <img
                      width="80px"
                      height="80px"
                      className="rounded-full object-cover"
                      src="https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small/a-person-icon-on-a-transparent-background-png.png"
                      alt="user"
                    />

                    <div className="flex flex-col ml-3 w-full">

                      <h4 className="text-blue-600 font-bold text-md">
                        Username
                      </h4>

                      <p className="text-xs">
                        Mail
                      </p>

                    </div>

                  </div>

                </div>


                {/* User 2 */}
                <div className="shadow-md rounded p-2 bg-blue-100">

                  <p className="text-red-500 font-bold text-md">
                    ID : 2
                  </p>

                  <div className="flex mt-3 items-center">

                    <img
                      width="80px"
                      height="80px"
                      className="rounded-full object-cover"
                      src="https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small/a-person-icon-on-a-transparent-background-png.png"
                      alt="user"
                    />

                    <div className="flex flex-col ml-3 w-full">

                      <h4 className="text-blue-600 font-bold text-md">
                        Username
                      </h4>

                      <p className="text-xs">
                        Mail
                      </p>

                    </div>

                  </div>

                </div>


                {/* User 3 */}
                <div className="shadow-md rounded p-2 bg-blue-100">

                  <p className="text-red-500 font-bold text-md">
                    ID : 3
                  </p>

                  <div className="flex mt-3 items-center">

                    <img
                      width="80px"
                      height="80px"
                      className="rounded-full object-cover"
                      src="https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small/a-person-icon-on-a-transparent-background-png.png"
                      alt="user"
                    />

                    <div className="flex flex-col ml-3 w-full">

                      <h4 className="text-blue-600 font-bold text-md">
                        Username
                      </h4>

                      <p className="text-xs">
                        Mail
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default AdminResources;