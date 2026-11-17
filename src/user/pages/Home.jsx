
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { IoArrowForward, IoBookSharp } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { getHomeBooksAPI } from '../../services/allAPI'
import { searchContext } from '../../contextAPI/ShareContext'
import { toast, ToastContainer } from 'react-toastify'

function Home() {
  const navigate = useNavigate()

  const { searchKey, setSearchKey } = useContext(searchContext)

  const [homeBooks, setHomeBooks] = useState([])

  const handleSearch = () => {
    if (!searchKey.trim()) {
      toast.warning('Please input a search value')
    } else if (!sessionStorage.getItem('token')) {
      toast.warning('Please login to view books')
    } else {
      navigate('/books')
    }
  }

  useEffect(() => {
    const getHomeBooks = async () => {
      try {
        const result = await getHomeBooksAPI()

        if (result.status === 200) {
          setHomeBooks(result.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getHomeBooks()
  }, [])

  return (
    <div
      className="bg-[#080807] text-[#eee9d9] min-h-screen overflow-hidden"
      style={{
        fontFamily: "'Bodoni Moda', 'Didot', 'Times New Roman', serif"
      }}
    >

      <ToastContainer position="top-center" autoClose={2000} />

      {/* HERO */}

      <section className="bg-[#080807]">

        <Header />

        <div className="bg-black text-[#efe9d8] px-5 pt-10 pb-14 md:pt-14 md:pb-20 text-center flex flex-col items-center">

          {/* Museum emblem */}

          <div className=" mb-7 max-w-[160px]">

          </div>


          {/* Title */}

          <h1 className="mt-8 md:mt-10 uppercase font-normal leading-[1.02] tracking-[0.01em] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Ohno Museum of
            <br />
            Great Normal Things
          </h1>

        </div>

        {/* Hero artwork */}

        <div className="bg-black px-4 md:px-10 pb-10">

          <div
            className="relative h-[380px] md:h-[580px] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-cover bg-center flex items-center justify-center text-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=85&w=1800&auto=format&fit=crop')"
            }}
          >

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 max-w-2xl px-6">

              <p className="text-[10px] tracking-[0.5em] uppercase text-[#e0d5bb] mb-6">
                A World Beyond Pages
              </p>

              <h2 className="text-4xl md:text-6xl uppercase leading-tight">
                Every Page
                <br />
                Opens A New World.
              </h2>

              <p className="text-sm leading-7 text-white/80 mt-6 max-w-lg mx-auto">
                Discover timeless classics, inspiring ideas and
                stories that take you somewhere unexpected.
              </p>

              <Link
                to="/books"
                className="inline-flex items-center gap-3 mt-9 px-8 py-4 rounded-full bg-[#eee9d9] text-[#29271f] text-xs uppercase tracking-widest hover:bg-[#c4b795] transition"
              >
                Explore Books <IoArrowForward />
              </Link>

            </div>

          </div>

        </div>

      </section>



      {/* NEW ARRIVALS */}



      {/* AUTHOR SPOTLIGHT */}



      <section className=" bg-black text-white/80 px-5 md:px-12 lg:px-20 py-16 md:py-24 fraunces">

        <div className="max-w-7xl mx-auto">

          {/* TOP EDITORIAL SECTION */}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">

            {/* Left Text */}

            <div className="md:col-span-4 md:pt-16">

              <p className="text-[10px] uppercase text-center tracking-[0.2em] text-[#82796d] mb-5">
                The Mind Behind The Words
              </p>

              <p className="text-xs md:text-sm leading-[1.9] text-[#777064] max-w-md">
                Franz Kafka, one of literature's most extraordinary voices,
                explored the complexities of human existence through haunting
                stories and unforgettable characters. His works take readers
                into worlds where reality meets imagination.
              </p>

              <div className="w-10 h-px bg-[#a69b7d] my-7"></div>

              <p className="text-xs md:text-sm leading-[1.9] text-[#777064] max-w-md">
                Discover the mind behind timeless masterpieces, where every
                page reveals a new perspective on life, identity and the
                human condition.
              </p>

            </div>


            {/* Center Image */}

            <div className="md:col-span-4 md:mt-12">

              <div className="overflow-hidden">
                <img
                  src="/kafka.png"
                  alt="Franz Kafka portrait"
                  className="w-full h-[300px] md:h-[480px] object-contain"
                />
              </div>

              <p className="text-[10px] md:text-xs tracking-wide text-[#777064] mt-4 text-center">
                FRANZ KAFKA — 1883–1924
              </p>

            </div>


            {/* Right Text */}

            <div className="md:col-span-4 md:pt-16">

              <p className="text-[10px] uppercase tracking-[0.2em] leading-relaxed text-[#82796d] mb-5">
                Explore The Collection
              </p>

              <h2 className="text-3xl md:text-4xl lg:text-5xl uppercase leading-[1.15] font-normal">
                Stories
                <br />
                That
                <br />
                Stay
                <br />
                Forever.
              </h2>

              <div className="w-12 h-px bg-[#a69b7d] mt-7 mb-7"></div>

              <p className="text-xs md:text-sm leading-[1.9] text-[#777064]">
                From the unsettling world of <span className="italic">The Metamorphosis</span>
                to the mysterious journey of <span className="italic">The Trial</span>,
                explore a carefully curated collection of Kafka's greatest works.
              </p>

              <p className="text-xs md:text-sm leading-[1.9] text-[#777064] mt-5">
                Find timeless classics, remarkable authors and exceptional
                literary works, all waiting to become part of your next read.
              </p>

            </div>

          </div>


          {/* BOTTOM SECTION */}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mt-24 md:mt-32 items-center">

            {/* Characteristics */}

            <div className="md:col-span-6">

              {/* Decorative Artwork */}

              <div className=" mb-7 max-w-[260px]">
                <img
                  src="/logo.png"
                  alt="Decorative museum ornament"
                  className="w-full h-auto object-contain"
                />
              </div>

              <h2 className="text-3xl md:text-5xl uppercase leading-none mb-8">
                Characteristics
              </h2>

              {/* Details */}

              <div className="grid grid-cols-2 gap-x-8 gap-y-7 max-w-lg">

                <div>
                  <p className="text-xs text-[#898174] mb-2">
                    Collection
                  </p>
                  <p className="text-sm">
                    Art & Culture
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#898174] mb-2">
                    Classification
                  </p>
                  <p className="text-sm leading-relaxed">
                    Contemporary
                    <br />
                    Artistic Expression
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#898174] mb-2">
                    Period
                  </p>
                  <p className="text-sm">
                    Timeless
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#898174] mb-2">
                    Medium
                  </p>
                  <p className="text-sm">
                    Mixed Media
                  </p>
                </div>

              </div>

              {/* Tags */}

              <div className="mt-9">

                <p className="text-xs mb-4">
                  Characteristics & Details
                </p>

                <div className="flex flex-wrap gap-2">

                  <span className="border border-[#a69b7d] rounded-full px-4 py-2 text-[10px] uppercase tracking-wider">
                    Exhibition
                  </span>

                  <span className="border border-[#a69b7d] rounded-full px-4 py-2 text-[10px] uppercase tracking-wider">
                    Artwork
                  </span>

                  <span className="border border-[#a69b7d] rounded-full px-4 py-2 text-[10px] uppercase tracking-wider">
                    Collection
                  </span>

                </div>

              </div>

              <p className="text-xs leading-7 text-[#777064] mt-8 max-w-lg">
                Every object carries a story beyond its appearance.
                Through form, movement and thoughtful composition,
                ordinary things become extraordinary experiences.
                Discover the details that make each collection
                worth remembering.
              </p>

            </div>


            {/* Final Artwork with Measurements */}

            <div className="md:col-span-6 md:pl-8 flex flex-col justify-center">
              <div>
                <img className='w-full' src="/letter.png" alt="" />
              </div>

              <p className="text-xs md:text-sm leading-8 text-center text-[#777064] max-w-full mb-8">
                Discover a world of timeless literature, remarkable authors
                and stories that transcend generations. Browse our curated
                collection, explore different genres and find books that
                inspire, challenge and stay with you long after the final page.
              </p>

              <Link
                to="/books"
                className="inline-flex items-center justify-between gap-10 px-7 py-4 w-fit text-[10px] uppercase tracking-[0.2em] hover:bg-[#a69b7d] hover:text-white transition-all duration-300"
              >
                Explore Collection
                <span className="text-base">↗</span>
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default Home
