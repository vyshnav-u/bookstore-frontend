
import React from "react";
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa6";
import { IoArrowUp } from "react-icons/io5";
import Header from "../components/Header";

function Contact() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white/80">
      <Header />

      <main className="max-w-7xl mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-20">

        <section className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5">
            We'd love to hear from you
          </p>

          <h1 className="font-['Fraunces'] text-4xl md:text-6xl text-white">
            Let's start a <span className="text-white/40 italic">conversation.</span>
          </h1>

          <p className="text-sm md:text-base text-white/50 leading-8 mt-7">
            Lifelong companions, endless stories. Whether you have a question,
            suggestion or simply want to say hello, we're always happy to hear
            from fellow book lovers.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">

          <div className="bg-[#151515] rounded-2xl p-7 flex items-center gap-5">
            <div className="w-12 h-12 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-white/70">
              <FaLocationDot />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/35 mb-2">
                Find us
              </p>
              <p className="text-sm text-white/80">
                123 Main Street, 123456
              </p>
            </div>
          </div>

          <div className="bg-[#151515] rounded-2xl p-7 flex items-center gap-5">
            <div className="w-12 h-12 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-white/70">
              <FaPhone />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/35 mb-2">
                Call us
              </p>
              <p className="text-sm text-white/80">
                1234567890
              </p>
            </div>
          </div>

          <div className="bg-[#151515] rounded-2xl p-7 flex items-center gap-5">
            <div className="w-12 h-12 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-white/70">
              <FaEnvelope />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-widest text-white/35 mb-2">
                Email us
              </p>
              <p className="text-sm text-white/80 break-all">
                bookstore@gmail.com
              </p>
            </div>
          </div>

        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          <div className="bg-[#151515] rounded-3xl p-7 md:p-10">
            <p className="text-xs uppercase tracking-[0.25em] text-white/35 mb-4">
              Get in touch
            </p>

            <h2 className="font-['Fraunces'] text-3xl md:text-4xl text-white mb-3">
              Send us a message.
            </h2>

            <p className="text-sm text-white/45 leading-7 mb-9">
              Have something on your mind? Write to us and we'll be glad to
              connect with you.
            </p>

            <form onSubmit={(event) => event.preventDefault()}>

              <div className="mb-6">
                <label className="block text-xs text-white/50 mb-3">
                  Your name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-[#202020] border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40 transition"
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs text-white/50 mb-3">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#202020] border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40 transition"
                />
              </div>

              <div className="mb-8">
                <label className="block text-xs text-white/50 mb-3">
                  Your message
                </label>
                <textarea
                  rows="5"
                  placeholder="Tell us what's on your mind..."
                  className="w-full bg-[#202020] border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black rounded-full py-4 text-sm flex items-center justify-center gap-3 hover:bg-white/80 transition"
              >
                Send Message
                <FaPaperPlane />
              </button>

            </form>
          </div>

          <div className="bg-[#151515] rounded-3xl p-4 md:p-5 flex flex-col">
            <div className="px-3 pt-3 pb-5">
              <p className="text-xs uppercase tracking-[0.25em] text-white/35 mb-2">
                Our location
              </p>
              <h2 className="font-['Fraunces'] text-2xl text-white">
                Come find us.
              </h2>
            </div>

            <div className="flex-1 min-h-[350px] rounded-2xl overflow-hidden">
              <iframe
                title="Luminar Technolab Kochi location"
                src="https://www.google.com/maps?q=Luminar%20Technolab%20Kochi&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "350px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex justify-between items-center px-3 pt-5">
              <p className="text-xs text-white/40">
                Luminar Technolab, Kochi
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Luminar+Technolab+Kochi"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/70 hover:text-white flex items-center gap-2 transition"
              >
                Get directions <IoArrowUp />
              </a>
            </div>
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

export default Contact;
