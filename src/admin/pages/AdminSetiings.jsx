import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { FaCamera } from "react-icons/fa";

function AdminSetiings() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small/a-person-icon-on-a-transparent-background-png.png"
  );

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
    <>
      <AdminHeader />

      <div className="md:grid md:grid-cols-[1fr_4fr]">
        <div>
          <AdminSideBar />
        </div>

        <div className="p-10">
          <h1 className="text-3xl font-bold text-center mb-10 mt-5">
            Settings
          </h1>

          <div className="md:grid md:grid-cols-2 items-center gap-10">
            
            <div>
              <h2 className="text-xl mb-5 font-bold">
                Welcome, Admin 👋
              </h2>

              <p className="text-justify">
                This is your personal administration space where you can
                manage your account details, system preferences, and platform
                roles with ease. From here, you can update essential
                information such as your username, password, contact details,
                and notification preferences — ensuring your access remains
                secure and personalized.
              </p>

              <h4 className="text-lg my-5 font-medium">
                ✨ What You Can Manage in This Section:
              </h4>

              <ul>
                <li>
                  ✏️ Update personal details (name, email, role, profile picture)
                </li>
                <li>🔐 Change or reset your password</li>
                <li>📢 Configure notification and alert preferences</li>
                <li>🛡️ Manage permissions based on assigned access level</li>
                <li>⚙️ Customize dashboard visibility and layout</li>
              </ul>

              <p className="my-5 text-justify">
                Your profile settings help ensure your administrative tools
                work the way you need them to — securely, efficiently, and
                with complete control. Thank you for keeping the platform
                organized and running smoothly. Continue managing, updating,
                and improving the system — one step at a time. 🚀
              </p>
            </div>

            <div className="p-5">
              
              <div className="flex justify-center mb-6">
                <label className="relative cursor-pointer">
                  <img
                    src={profileImage}
                    alt="user"
                    className="w-32 h-32 rounded-full object-cover border"
                  />

                  <div className="absolute bottom-1 right-1 bg-black text-white w-9 h-9 rounded-full flex justify-center items-center">
                    <FaCamera />
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 outline-none focus:border-black"
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 outline-none focus:border-black"
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 outline-none focus:border-black"
                />
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleReset}
                  className="border border-black px-4 py-2 rounded hover:bg-gray-100"
                >
                  Reset
                </button>

                <button
                  onClick={handleUpdate}
                  className="bg-black text-white px-4 py-2 rounded border border-black hover:bg-white hover:text-black"
                >
                  Update
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSetiings;