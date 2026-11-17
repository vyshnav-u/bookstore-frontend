
import React from "react";
import { FaCheckCircle, FaShoppingBag } from "react-icons/fa";

function Purchase() {
  const purchasedBooks = [
    {
      id: 1,
      title: "The Design of Everyday Things",
      author: "Don Norman",
      price: 450,
      abstract:
        "An exploration of how design affects our everyday lives, explaining the principles of usability and human-centered design.",
      image:
        "https://images.designerpeople.com/wp-content/uploads/2020/02/illustrated-design-book-cover-1.jpg",
      status: "Purchased",
    },
  ];

  return (
    <div className="bg-[#111111] rounded-2xl p-5 md:p-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 mb-2">
            Book Museum / Orders
          </p>

          <h2 className="font-['Fraunces'] text-3xl text-white">
            Purchase History<span className="text-white/40">.</span>
          </h2>

          <p className="text-xs text-white/40 mt-2">
            Books you've purchased from the collection.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-2.5 w-fit">
          <FaShoppingBag className="text-white/40 text-sm" />
          <span className="text-sm text-white">
            {purchasedBooks.length}
          </span>
          <span className="text-xs text-white/40">
            {purchasedBooks.length === 1 ? "Purchase" : "Purchases"}
          </span>
        </div>
      </div>

      {purchasedBooks.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-2xl py-16 px-5 text-center">
          <FaShoppingBag className="text-3xl text-white/20 mx-auto mb-4" />

          <h3 className="font-['Fraunces'] text-xl text-white/80">
            No purchases yet
          </h3>

          <p className="text-sm text-white/35 mt-2">
            Your purchased books will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {purchasedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-[#171717] border border-white/10 rounded-2xl p-5 md:p-6 hover:border-white/20 transition"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_170px] gap-6">

                <div className="flex flex-col justify-between">

                  <div>
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-[10px] uppercase tracking-wider">
                        <FaCheckCircle />
                        {book.status}
                      </span>
                    </div>

                    <h3 className="font-['Fraunces'] text-2xl md:text-3xl text-white">
                      {book.title}
                    </h3>

                    <p className="text-sm text-white/45 mt-2">
                      By {book.author}
                    </p>

                    <p className="text-sm text-white/55 leading-7 mt-5 line-clamp-3">
                      {book.abstract}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10">
                    <p className="text-[10px] uppercase tracking-wider text-white/35 mb-1">
                      Purchase Price
                    </p>

                    <p className="text-xl text-white font-medium">
                      ₹{book.price}
                    </p>
                  </div>

                </div>

                <div className="h-[220px] md:h-[240px] bg-[#222222] rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-contain"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        "https://placehold.co/400x500/222222/ffffff?text=No+Book+Image";
                    }}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Purchase;
