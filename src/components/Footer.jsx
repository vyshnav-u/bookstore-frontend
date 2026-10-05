import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaEnvelope,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-12 lg:px-20 pt-12 pb-5">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* About Us */}
        <div>
          <h2 className="text-xl font-bold mb-6">About US</h2>

          <p className="text-lg leading-7 text-justify">
            We believe books are more than just pages — they are windows into
            new worlds, teachers of wisdom, and companions for life. Our journey
            began with a passion for storytelling and a mission to make reading
            accessible, enjoyable, and inspiring for everyone.
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-bold mb-6">NEWS LETTER</h2>

          <p className="text-lg mb-6">
            Stay updated with our latest trends
          </p>

          <div className="flex max-w-sm">
            <input
              type="email"
              placeholder="E Mail"
              className="w-full bg-white text-black px-3 py-3 outline-none"
            />

            <button className="bg-yellow-500 px-4 text-white text-xl">
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="text-xl font-bold mb-6">FOLLOW US</h2>

          <p className="text-lg mb-6">Let us be social</p>

          <div className="flex items-center gap-7 text-xl">
            <FaFacebookF />
            <FaInstagram />
            <FaXTwitter />
            <FaEnvelope />
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="flex justify-center items-center flex-wrap mt-16 text-center text-lg">
        <span>
          Copyright © 2026 All rights reserved | This website is made with
        </span>

        <FaHeart className="mx-1" />

        <span>By Luminar Technolab</span>
      </div>

    </footer>
  );
}

export default Footer;