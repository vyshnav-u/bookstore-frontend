
import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaCamera } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { toast } from "react-toastify";
import { userUpdateAPI } from "../../services/allAPI";

function Edit() {
  const [offCanvas, setOffCanvas] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    bio: "",
    picture: "",
    role: "",
    id: "",
  });

  const [existingPicture, setExistingPicture] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      setUserDetails((prevDetails) => ({
        ...prevDetails,
        username: user.username || "",
        role: user.role || "",
        bio: user.bio || "",
        id: user._id || user.id || "",
        picture: "",
      }));

      setExistingPicture(user.picture || "");
    }
  }, []);

  const handleReset = () => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      username: "",
      password: "",
      cPassword: "",
      bio: "",
      picture: "",
    }));

    setPreview("");
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        picture: file,
      }));

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    const { username, password, cPassword, bio, id } = userDetails;

    if (!username || !bio) {
      toast.info("Please fill the required fields");
      return;
    }

    if (password || cPassword) {
      if (!password || !cPassword) {
        toast.info("Please enter and confirm your password");
        return;
      }

      if (password !== cPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }

    if (!id) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    try {
      const reqBody = new FormData();

      reqBody.append("username", username);
      reqBody.append("bio", bio);
      reqBody.append("role", userDetails.role);

      if (password) {
        reqBody.append("password", password);
      }

      if (userDetails.picture) {
        reqBody.append("picture", userDetails.picture);
      } else {
        reqBody.append("picture", existingPicture);
      }

      const result = await userUpdateAPI(id, reqBody);

      if (result.status >= 200 && result.status < 300) {
        toast.success("Profile updated successfully");

        const storedUser = JSON.parse(
          sessionStorage.getItem("user") || "{}"
        );

        const updatedUser = {
          ...storedUser,
          username,
          bio,
          picture: result.data?.picture || existingPicture,
        };

        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        setExistingPicture(updatedUser.picture);

        setUserDetails((prevDetails) => ({
          ...prevDetails,
          password: "",
          cPassword: "",
          picture: "",
        }));

        setPreview("");
        setOffCanvas(false);
      } else {
        toast.error(result.response?.data || "Profile update failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  const inputStyle =
    "w-full bg-[#171717] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40 transition";

  return (
    <div>
      <button
        onClick={() => setOffCanvas(true)}
        className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm hover:bg-white/80 transition"
      >
        <FaPencilAlt className="text-xs" />
        Edit Profile
      </button>

      {offCanvas && (
        <div className="fixed inset-0 z-[100]">

          <div
            onClick={() => setOffCanvas(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          <div className="absolute top-0 right-0 h-full w-full max-w-[440px] bg-[#0d0d0d] border-l border-white/10 overflow-y-auto shadow-2xl">

            <div className="sticky top-0 z-10 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/10 px-6 py-5 flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 mb-1">
                  Book Museum / Account
                </p>

                <h2 className="font-['Fraunces'] text-2xl text-white">
                  Edit Profile<span className="text-white/40">.</span>
                </h2>
              </div>

              <button
                onClick={() => setOffCanvas(false)}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white hover:text-black transition"
              >
                <FaX className="text-sm" />
              </button>
            </div>

            <div className="p-6 md:p-8">

              <div className="mb-9">
                <p className="text-xs text-white/40 mb-5">
                  Update your profile picture
                </p>

                <div className="flex items-center gap-5">
                  <label className="relative cursor-pointer group">
                    <img
                      src={
                        preview ||
                        existingPicture ||
                        "https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small/a-person-icon-on-a-transparent-background-png.png"
                      }
                      alt="User profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-white/10 bg-[#222]"
                    />

                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                      <FaCamera />
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePictureChange}
                    />
                  </label>

                  <div>
                    <p className="text-sm text-white">
                      Profile Photo
                    </p>
                    <p className="text-xs text-white/35 mt-1">
                      Click the image to upload a new photo
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">

                <div>
                  <label className="block text-xs text-white/45 mb-2">
                    Username
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={userDetails.username}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        username: e.target.value,
                      })
                    }
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/45 mb-2">
                    New Password
                  </label>

                  <input
                    type="password"
                    placeholder="Leave empty to keep current password"
                    value={userDetails.password}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/45 mb-2">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    placeholder="Confirm your new password"
                    value={userDetails.cPassword}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        cPassword: e.target.value,
                      })
                    }
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/45 mb-2">
                    About Me
                  </label>

                  <textarea
                    rows="4"
                    placeholder="Write something about yourself..."
                    value={userDetails.bio}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        bio: e.target.value,
                      })
                    }
                    className={`${inputStyle} resize-none`}
                  />
                </div>

              </div>

              <div className="flex gap-3 mt-9 pt-6 border-t border-white/10">

                <button
                  onClick={handleReset}
                  className="flex-1 border border-white/15 text-white/65 rounded-full py-3 text-sm hover:bg-white/5 transition"
                >
                  Reset
                </button>

                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-white text-black rounded-full py-3 text-sm font-medium hover:bg-white/80 transition"
                >
                  Save Changes
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
