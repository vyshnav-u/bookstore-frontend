import React from "react";
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa6";
import Header from "../components/Header";

function Contact() {
  return (
    
    <div className="min-h-screen">
      <Header/>

      {/* Contact Heading */}
      <div className="text-center mt-10 px-5">
        <h1 className="text-4xl font-bold">
          Contact Us
        </h1>

        <p className="mt-5">
          Lifelong Companions: Unlike digital distractions, a good book
          remains a quiet, supportive friend at every stage of life.
        </p>
      </div>


      {/* Contact Details */}
      <div className="md:grid grid-cols-3 items-center md:px-40 p-5 mt-5 md:mt-0">

        {/* Location */}
        <div className="flex items-center my-5">
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
            className="flex items-center justify-center bg-gray-200"
          >
            <FaLocationDot />
          </div>

          <p className="ms-5">
            123 Main Street, 123456
          </p>
        </div>


        {/* Phone */}
        <div className="flex items-center my-5">
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
            className="flex items-center justify-center bg-gray-200"
          >
            <FaPhone />
          </div>

          <p className="ms-5">
            1234567890
          </p>
        </div>


        {/* Email */}
        <div className="flex items-center my-5">
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
            className="flex items-center justify-center bg-gray-200"
          >
            <FaEnvelope />
          </div>

          <p className="ms-5">
            bookstore@gmail.com
          </p>
        </div>

      </div>


      {/* Message And Map Section */}
      <div className="md:grid grid-cols-2 gap-10 my-5 p-5 md:px-40 items-center">

        {/* Message Form */}
        <div className="bg-gray-200 p-5 text-center">

          <h1 className="font-semibold text-2xl">
            Send Us Message!
          </h1>

          <form>

            {/* Name */}
            <div className="mb-5 my-10">
              <input
                type="text"
                placeholder="Name"
                className="bg-white w-full p-2 rounded"
              />
            </div>


            {/* Email */}
            <div className="mb-5 my-10">
              <input
                type="text"
                placeholder="Email"
                className="bg-white w-full p-2 rounded"
              />
            </div>


            {/* Message */}
            <div className="mb-5">
              <input
                type="text"
                placeholder="Message"
                className="bg-white w-full p-2 rounded"
              />
            </div>


            {/* Submit Button */}
            <div className="mb-5">
              <button
                type="submit"
                className="bg-black p-2 w-full text-white text-lg flex justify-center items-center rounded"
              >
                <FaPaperPlane className="me-2" />
                Submit
              </button>
            </div>

          </form>

        </div>


        {/* Google Map */}
        <div>
          <iframe
            src="https://www.google.com/maps?q=Luminar%20Technolab%20Kochi&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>

    </div>
  );
}

export default Contact;