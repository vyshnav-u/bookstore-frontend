
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
        id: user._id || "",
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
          picture:
            result.data?.picture ||
            existingPicture,
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
          />

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
                    src={
                      preview ||
                      existingPicture ||
                      "https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small/a-person-icon-on-a-transparent-background-png.png"
                    }
                    alt="user"
                    className="w-32 h-32 rounded-full object-cover border"
                  />

                  <div className="absolute bottom-1 right-1 bg-black text-white w-9 h-9 rounded-full flex justify-center items-center">
                    <FaCamera />
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePictureChange}
                  />
                </label>
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Username"
                  value={userDetails.username}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      username: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded p-2 outline-none focus:border-black"
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  placeholder="New Password (optional)"
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded p-2 outline-none focus:border-black"
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={userDetails.cPassword}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      cPassword: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded p-2 outline-none focus:border-black"
                />
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Bio"
                  value={userDetails.bio}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      bio: e.target.value,
                    })
                  }
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