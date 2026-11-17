
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import {
  IoPersonOutline,
  IoBookOutline,
  IoCloudUploadOutline,
  IoBagHandleOutline,
} from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Edit from "../components/Edit";
import UploadBook from "../components/UploadBook";
import UploadBookStatus from "../components/UploadBookStatus";
import Purchase from "../components/Purchase";

function Profile() {
  const [tab, setTabValue] = useState(1);
  const [user, setUser] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const userId = parsedUser._id || parsedUser.id;

      if (userId && id !== userId) {
        navigate(`/profile/${userId}`, { replace: true });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      navigate("/login");
    }
  }, [id, navigate]);

  if (!user) {
    return null;
  }

  const profilePicture =
    user.picture ||
    user.profilePicture ||
    "https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small/a-person-icon-on-a-transparent-background-png.png";

  const tabs = [
    {
      id: 1,
      label: "My Uploads",
      icon: <IoBookOutline />,
    },
    {
      id: 2,
      label: "Upload Status",
      icon: <IoCloudUploadOutline />,
    },
    {
      id: 3,
      label: "Purchase History",
      icon: <IoBagHandleOutline />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white/80">
      <Header />

      <main className="max-w-7xl mx-auto px-5 md:px-10 pb-20">

        <div className="h-[180px] md:h-[230px] bg-[#171717] rounded-b-3xl relative overflow-hidden">
          <div className="absolute -right-10 -top-20 w-80 h-80 border border-white/5 rounded-full" />
          <div className="absolute -right-2 -top-12 w-64 h-64 border border-white/5 rounded-full" />

          <div className="absolute bottom-7 right-7 md:right-12">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              Book Museum / Account
            </p>
          </div>
        </div>

        <section className="relative px-5 md:px-12 -mt-12 md:-mt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <img
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover bg-[#222] border-4 border-[#0a0a0a]"
                src={profilePicture}
                alt={`${user.name || user.username || "User"} profile`}
              />

              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-['Fraunces'] text-2xl md:text-3xl text-white">
                    {user.name || user.username || "User"}
                  </h2>
                  <FaCheckCircle className="text-blue-400 text-sm" />
                </div>

                <p className="text-sm text-white/45 mt-2">
                  {user.email}
                </p>

                <p className="text-xs text-white/30 mt-2 break-all">
                  ID: {user._id || user.id || "Not available"}
                </p>
              </div>
            </div>

            <div className="md:pb-2">
              <Edit />
            </div>

          </div>
        </section>

        <section className="mt-12 mx-0 md:mx-12 bg-[#151515] rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <IoPersonOutline className="text-white/40" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              About me
            </p>
          </div>

          <p className="text-sm md:text-base text-white/65 leading-8">
            {user.about ||
              "Welcome to your profile! You can manage your uploaded books and view your purchase history here."}
          </p>
        </section>

        <section className="mt-16">
          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.25em] text-white/35 mb-3">
              Your activity
            </p>
            <h2 className="font-['Fraunces'] text-3xl md:text-4xl text-white">
              Your library.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
            {tabs.map((item) => (
              <button
                key={item.id}
                onClick={() => setTabValue(item.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm transition ${
                  tab === item.id
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-8 bg-[#111111] rounded-2xl p-4 md:p-7 min-h-[250px]">
            {tab === 1 && <UploadBook />}
            {tab === 2 && <UploadBookStatus />}
            {tab === 3 && <Purchase />}
          </div>
        </section>

        <footer className="mt-24 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-3">
          <p className="font-['Fraunces'] text-lg text-white/70">
            Book Museum.
          </p>
          <p className="text-xs text-white/30">
            Discover stories. Explore knowledge.
          </p>
        </footer>

      </main>
    </div>
  );
}

export default Profile;
