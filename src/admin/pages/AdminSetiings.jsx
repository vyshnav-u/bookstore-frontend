
import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { FaCamera, FaLock, FaUserEdit, FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

function AdminSetiings() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small/a-person-icon-on-a-transparent-background-png.png"
  );

  const inputStyle =
    "w-full bg-[#171717] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40 transition";

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setBio("");
  };

  const handleUpdate = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Profile updated successfully");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AdminHeader />

      <div className="md:grid md:grid-cols-[250px_1fr]">
        <AdminSideBar />

        <main className="min-w-0 p-5 md:p-8 lg:p-10">

          {/* Page Heading */}
          <div className="mb-9">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 mb-3">
              Book Museum / Administration
            </p>

            <h1 className="font-['Fraunces'] text-3xl md:text-4xl">
              Settings<span className="text-white/35">.</span>
            </h1>

            <p className="text-xs text-white/40 mt-2">
              Manage your administrator profile and account preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-6">

            {/* Information Section */}
            <section className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <IoSettingsOutline className="text-lg text-white/70" />
                </div>

                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 mb-3">
                  Administrator Workspace
                </p>

                <h2 className="font-['Fraunces'] text-2xl md:text-3xl leading-tight mb-5">
                  Welcome, Admin.
                  <br />
                  <span className="text-white/40">Your space, your control.</span>
                </h2>

                <p className="text-sm leading-7 text-white/50">
                  This is your personal administration space. Keep your
                  account information updated and maintain a secure,
                  personalized experience while managing the Book Museum
                  platform.
                </p>

                <div className="mt-9">
                  <h3 className="text-xs uppercase tracking-[0.18em] text-white/70 mb-5">
                    Account Management
                  </h3>

                  <div className="space-y-5">
                    <div className="flex gap-4 items-start">
                      <FaUserEdit className="mt-1 text-white/50" />
                      <div>
                        <p className="text-sm text-white/80">Profile Details</p>
                        <p className="text-xs text-white/35 mt-1">
                          Update your username and personal information.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <FaLock className="mt-1 text-white/50" />
                      <div>
                        <p className="text-sm text-white/80">Account Security</p>
                        <p className="text-xs text-white/35 mt-1">
                          Keep your account protected with a secure password.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <FaRegUser className="mt-1 text-white/50" />
                      <div>
                        <p className="text-sm text-white/80">Personal Identity</p>
                        <p className="text-xs text-white/35 mt-1">
                          Customize your profile image and administrator bio.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-10 pt-5 border-t border-white/10 text-[10px] text-white/25 uppercase tracking-widest">
                Book Museum — Administration Panel
              </p>
            </section>

            {/* Profile Form */}
            <section className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8">

              <div className="flex items-center justify-between mb-7">
                <div>
                  <h2 className="font-['Fraunces'] text-xl">
                    Your Profile
                  </h2>
                  <p className="text-xs text-white/35 mt-1">
                    Edit your account information.
                  </p>
                </div>

                <span className="text-[9px] uppercase tracking-wider border border-white/10 rounded-full px-3 py-2 text-white/40">
                  Admin
                </span>
              </div>

              {/* Profile Image */}
              <div className="flex flex-col items-center mb-8">
                <label className="relative cursor-pointer group">
                  <img
                    src={profileImage}
                    alt="Admin profile"
                    className="w-28 h-28 rounded-full object-cover border border-white/15 p-1"
                  />

                  <div className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center border-4 border-[#111111] group-hover:bg-white/80 transition">
                    <FaCamera className="text-xs" />
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>

                <p className="text-[10px] text-white/35 mt-3">
                  Click to change profile picture
                </p>
              </div>

              {/* Username */}
              <div className="mb-5">
                <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-2">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputStyle}
                />
              </div>

              {/* Bio */}
              <div className="mb-5">
                <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-2">
                  About You
                </label>

                <textarea
                  placeholder="Write something about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className={`${inputStyle} resize-none`}
                />
              </div>

              <div className="border-t border-white/10 my-7" />

              {/* Password */}
              <div className="mb-5">
                <h3 className="text-xs text-white/80 mb-4">
                  Change Password
                </h3>

                <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div className="mb-8">
                <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputStyle}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-full border border-white/15 text-white/60 text-xs hover:bg-white/5 hover:text-white transition"
                >
                  Reset
                </button>

                <button
                  onClick={handleUpdate}
                  className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/80 transition"
                >
                  Save Changes
                </button>
              </div>

            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminSetiings;
