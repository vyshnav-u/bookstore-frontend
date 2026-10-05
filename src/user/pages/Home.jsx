import React from 'react'
import Header from '../components/Header'
import { IoSearch } from 'react-icons/io5'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Header />
      {/* Hero section */}
      <div className='h-120 flex flex-col gap-6 justify-center items-center bg-cover bg-[url("https://i.pinimg.com/1200x/c9/89/b4/c989b44e1db6336fd0a22f8cfa721d7e.jpg")]'>
        <div className='text-white'>
          <h1 className='text-6xl py-2 underline underline-offset-4 font-bold italic'>Wonderful Books</h1>
          <p className='pl-3 italic text-white/80'>gift your family,friend a book</p>
        </div>
        <div className='flex gap-5 items-center'>
          <input placeholder='search here..' className='bg-white px-5 italic border-black/50 rounded-3xl w-120 h-10' type="text" />
          <IoSearch className='text-white text-3xl' />
        </div>
      </div>
      {/* NEW ARRIVALS */}
      <section className="my-16 px-5 md:px-10">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">NEW ARRIVALS</h1>
          <p className="text-xl mt-2">Explore Our Latest Collection</p>
        </div>

        {/* Books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Book 1 */}
          <div className="shadow-lg rounded-md p-4">
            <img
              className="w-full h-[300px] object-cover rounded"
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f"
              alt="Book"
            />

            <div className="text-center mt-4">
              <h2 className="text-blue-600 font-bold text-xl">Author</h2>
              <h3 className="text-lg mt-1">Book Title</h3>
              <p className="font-bold text-red-500 mt-1">₹499</p>
            </div>
          </div>

        </div>
        <div className='text-center'>
          <Link to={'/books'} className="px-3 py-2 bg-amber-950 text-white rounded-xl">explore more</Link>

        </div>
      </section>
      {/* Authors section */}
      <section className='md:grid grid-cols-2 gap-10 p-5 '>
        <div className='pl-5'>
          <div className='py-3'>
            <h1 className='text-4xl font-bold'>Featured Authors</h1>
            <h3 className='text-xl '>Captivate with every word</h3>
          </div>
          <div className='flex flex-col py-2 gap-4 italic text-justify'>
            <p>
              Welcome to the Author Spotlight section of our bookstore website! This feature is designed to celebrate writers, showcase their creative journeys, and help readers discover the minds behind their favorite books.

            </p>
            <p>
              Our Author Features include:

            </p>
            <p>
              <span className='font-semibold'>✨ Author Profiles :</span> Get to know each author through detailed profiles that highlight their biography, writing style, achievements, and personal inspirations.

            </p>
            <p>
              <span className='font-semibold'>📖 Published Works :</span> Explore a curated list of books written by the author with quick access to book details, reviews, and purchase options.

            </p>
            <p>
              <span className='font-semibold'>🎤 Interviews & Insights :</span> Exclusive interviews, behind-the-scenes stories, and writing tips that offer a deeper look into the author’s creative world.

            </p>
          </div>

        </div>
        <div className='flex justify-center'>
          <img className='rounded-2xl h-150' src="https://i.pinimg.com/736x/b8/08/96/b808965299205b6b34837e683cefaa2b.jpg" alt="" />
        </div>
      </section>
      {/* TESTIMONIAL */}
      <section className="py-10 px-5">

        <h1 className="text-2xl font-bold underline text-center mb-6">
          TESTIMONIAL
        </h1>

        <div className="max-w-md mx-auto text-center rounded-lg p-6">

          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Customer"
            className="w-30 rounded-full mx-auto object-cover"
          />

          <h2 className="font-bold text-lg mt-3">
            Rahul
          </h2>

          <p className="text-yellow-500 my-2">
            ★★★★★
          </p>

          <p className="text-gray-600">
            "A wonderful bookstore with an amazing collection of books.
            I really enjoyed my experience."
          </p>

        </div>

      </section>
    </div>
  )
}

export default Home
