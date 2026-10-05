import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Header from "../components/Header";
import Edit from "../components/Edit";
import UploadBook from "../components/UploadBook";
import UploadBookStatus from "../components/UploadBookStatus";
import Purchase from "../components/Purchase";

function Profile() {
  const [tab, setTabValue] = useState(1)
  return (
    <>
      <Header />

      {/* Black cover */}
      <div className="bg-black h-[200px]"></div>

      {/* Profile image */}
      <div className="px-5">
        <img
          className="w-[200px] h-[200px] rounded-full object-cover bg-white -mt-[100px] border-4 border-black"
          src="https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small/a-person-icon-on-a-transparent-background-png.png"
          alt="user"
        />
      </div>

      {/* Username */}
      <div className="md:flex justify-between px-5 mt-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-black md:text-3xl">
            UserName
          </h1>

          <FaCheckCircle className="text-blue-700 ms-3" />
        </div>

        <div>
          <Edit/>
        </div>
      </div>

      {/* About */}
      <p className="text-justify md:px-20 px-5 my-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Numquam quam a consectetur ullam eveniet saepe amet fugiat
        rerum eaque ipsam, reiciendis excepturi minima corrupti eos
        exercitationem, nemo praesentium aut tempore? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Numquam quam
        a consectetur ullam eveniet saepe amet fugiat rerum eaque
        ipsam, reiciendis excepturi minima corrupti eos exercitationem,
        nemo praesentium aut tempore? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Numquam quam a consectetur ullam
        eveniet saepe amet fugiat rerum eaque ipsam, reiciendis excepturi
        minima corrupti eos exercitationem, nemo praesentium aut tempore?
      </p>
      {/* tabs */}
      <div className="flex gap-10 justify-center">
        <p onClick={() => setTabValue(1)} className="p-2 mx-5 border-gray-200 border-t border-l cursor-pointer">Upload Books</p>
        <p onClick={() => setTabValue(2)} className="p-2 mx-5 border-gray-200 border-t border-l cursor-pointer">Upload Books Status</p>
        <p onClick={() => setTabValue(3)} className="p-2 mx-5 border-gray-200 border-t border-l cursor-pointer">Purchase History</p>
      </div>
      {/* tab content */}
      {
        tab == 1 &&
        <div><UploadBook/></div>
        
      }
      {
        tab ==2 &&
        <div><UploadBookStatus/></div>

      }
      {
        tab ==3 &&
        <div><Purchase/></div>
      }
    </>
  );
}

export default Profile;