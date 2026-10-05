import React, { useState } from "react";
import { FaPencilAlt, FaCamera } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

function Edit() {
  const [offCanvas, setOffCanvas] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setBio("");
  };

  const handleUpdate = () => {
    console.log({
      username,
      password,
      confirmPassword,
      bio,
    });

    setOffCanvas(false);
  };

  return (
    <div>
      <button
        onClick={() => setOffCanvas(true)}
        className="bg-black text-white px-4 py-2 flex items-center rounded border border-black hover:bg-white hover:text-black"
      >
        <FaPencilAlt className="me-2" />
        Edit
      </button>

      {offCanvas && (
        <div>
          <div
            onClick={() => setOffCanvas(false)}
            className="fixed inset-0 bg-gray-400/75 z-40"
          ></div>

          <div className="bg-white h-full w-[360px] max-w-full z-50 fixed top-0 left-0 overflow-y-auto">
            <div className="bg-black text-white px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-semibold">
                Update Your Profile
              </h1>

              <FaX
                onClick={() => setOffCanvas(false)}
                className="cursor-pointer text-xl"
              />
            </div>

            <div className="p-5">
              <div className="flex justify-center mb-6">
                <label className="relative cursor-pointer">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small/a-person-icon-on-a-transparent-background-png.png"
                    alt="user"
                    className="w-32 h-32 rounded-full object-cover border"
                  />

                  <div className="absolute bottom-1 right-1 bg-black text-white w-9 h-9 rounded-full flex justify-center items-center">
                    <FaCamera />
                  </div>

                  <input
                    type="file"
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
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
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
      )}
    </div>
  );
}

export default Edit;