import React from 'react'

function Purchase() {
    return (
        <div>
            <div className="p-10 my-15 shadow rounded">

                {/* Duplicate div for books */}
                <div className="p-5 rounded mt-4 bg-blue-100">

                    <div className="md:grid grid-cols-[3fr_1fr]">

                        {/* Book Details */}
                        <div className="px-4">

                            <h1 className="text-4xl">
                                Title
                            </h1>

                            <h2 className="text-2xl">
                                Author
                            </h2>

                            <h3 className="text-lg text-blue-700">
                                $ Discount Price
                            </h3>

                            <p className="text-justify">
                                Abstract
                            </p>

                            {/* Status of the book */}
                            <div className="flex my-3">

                                <img
                                    width="120px"

                                    src="https://thumbs.dreamstime.com/b/purchase-stamp-round-sign-label-transparent-background-352589731.jpg"
                                    alt="Pending"
                                />

                        

                            </div>

                        </div>


                        {/* Book Image */}
                        <div className="px-4 mt-4 md:mt-0">

                            <img
                                className="w-full"
                                src="https://images.designerpeople.com/wp-content/uploads/2020/02/illustrated-design-book-cover-1.jpg"
                                alt="Book"
                            />

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Purchase
