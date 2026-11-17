
import React, { useEffect, useState } from "react";
import {
  IoMenu,
  IoClose,
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoChevronDown,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [toggle, setToggle] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const token = sessionStorage.getItem("token");
      const storedUser = sessionStorage.getItem("user");

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    window.addEventListener("authChanged", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("authChanged", loadUser);
    };
  }, []);

  const userId = user?._id || user?.id;

  const closeMenu = () => {
    setToggle(false);
    setDropdown(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    closeMenu();
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  const handleProfile = () => {
    setDropdown(false);
    if (userId) navigate(`/profile/${userId}`);
  };

  return (
   <header className="bg-black text-white/80 relative z-50 font-['Fraunces']">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="h-16 md:h-[76px] flex items-center justify-between">

          <button
            onClick={() => setToggle(!toggle)}
            className="md:hidden text-2xl text-white/80"
            aria-label="Toggle navigation"
          >
            {toggle ? <IoClose /> : <IoMenu />}
          </button>

          <Link to="/" onClick={closeMenu}>
            <h1 className="font-['Fraunces'] text-2xl md:text-[28px] tracking-wide text-white/90">
              Book Museum.
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-9">
            <Link to="/" className="text-sm text-white/70 hover:text-white transition">
              Home
            </Link>

            <Link to="/books" className="text-sm text-white/70 hover:text-white transition">
              Collection
            </Link>

            <Link to="/contact" className="text-sm text-white/70 hover:text-white transition">
              Contact
            </Link>
          </nav>

          <div className="flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition"
                >
                  {user.picture || user.profilePicture ? (
                    <img
                      src={user.picture || user.profilePicture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <IoPersonCircleOutline className="text-2xl" />
                  )}

                  <span className="hidden sm:block text-sm">
                    {user.name || user.username || "Account"}
                  </span>

                  <IoChevronDown className="text-sm" />
                </button>

                {dropdown && (
                  <div className="absolute right-0 top-full mt-3 w-56 bg-[#eee9d9] text-[#29271f] shadow-xl">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium truncate">
                        {user.name || user.username}
                      </p>
                      <p className="text-xs text-[#777366] truncate">
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={handleProfile}
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#ddd5c1] text-sm"
                    >
                      <IoPersonCircleOutline className="text-lg" />
                      View Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#ddd5c1] text-sm text-red-700"
                    >
                      <IoLogOutOutline className="text-lg" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm text-white/80 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-white text-black px-5 py-2.5 text-sm hover:bg-white/80 transition"
                >
                  Register ↗
                </Link>
              </div>
            )}
          </div>
        </div>

        {toggle && (
          <nav className="md:hidden py-5 flex flex-col items-center gap-5 text-white/80">
            <Link to="/" onClick={closeMenu} className="text-sm">
              Home
            </Link>

            <Link to="/books" onClick={closeMenu} className="text-sm">
              Collection
            </Link>

            <Link to="/contact" onClick={closeMenu} className="text-sm">
              Contact
            </Link>

            {!user && (
              <div className="flex gap-5 pt-2">
                <Link to="/login" onClick={closeMenu} className="text-sm">
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="text-sm text-white"
                >
                  Register ↗
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
