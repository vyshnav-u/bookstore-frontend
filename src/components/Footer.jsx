
import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaEnvelope,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#080807] text-[#eee9d9] px-6 md:px-12 lg:px-20 pt-12 pb-6">

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">

          {/* Brand */}

          <div>
            <h2 className="font-['Fraunces'] text-2xl mb-3">
              Book Museum.
            </h2>

            <p className="text-xs leading-7 text-[#aaa58f] max-w-xs">
              A place for timeless stories, remarkable authors
              and the beauty of literature.
            </p>
          </div>


          {/* Navigation */}

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#a69b7d] mb-5">
              Explore
            </p>

            <div className="flex flex-col gap-3 text-xs text-[#aaa58f]">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <Link to="/books" className="hover:text-white transition">Books</Link>
              <Link to="/about" className="hover:text-white transition">About Us</Link>
              <Link to="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>


          {/* Socials */}

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#a69b7d] mb-5">
              Stay Connected
            </p>

            <p className="text-xs text-[#aaa58f] mb-5">
              Follow our journey through literature.
            </p>

            <div className="flex gap-4 text-sm text-[#aaa58f]">
              <a href="#" aria-label="Instagram" className="hover:text-white transition">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-white transition">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="X" className="hover:text-white transition">
                <FaXTwitter />
              </a>
              <a href="mailto:" aria-label="Email" className="hover:text-white transition">
                <FaEnvelope />
              </a>
            </div>
          </div>

        </div>


        {/* Bottom */}

        <div className="border-t border-[#38352d] pt-5 flex flex-col md:flex-row justify-between items-center gap-3">

          <p className="text-[10px] text-[#777366]">
            © 2026 Book Museum. All rights reserved.
          </p>

          <p className="text-[10px] text-[#777366]">
            A place for stories, always.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
