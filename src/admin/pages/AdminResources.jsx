
import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import {
    getAllBooksAPI,
    getAllUsersAPI,
    approveBookAPI,
} from "../../services/allAPI";

function AdminResources() {
    const [tab, setTabValue] = useState(1);
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [booksLoading, setBooksLoading] = useState(false);
    const [usersLoading, setUsersLoading] = useState(false);
    const [error, setError] = useState("");
    const [approvingId, setApprovingId] = useState(null);

    const fetchBooks = async () => {
        setBooksLoading(true);
        setError("");

        try {
            const response = await getAllBooksAPI();

            if (response.status >= 400) {
                setError(response.data?.message || "Failed to load books");
                return;
            }

            const bookData = Array.isArray(response.data)
                ? response.data
                : response.data?.data || [];

            setBooks(bookData);
        } catch (err) {
            setError(
                err.response?.data?.message || "Unable to load books"
            );
        } finally {
            setBooksLoading(false);
        }
    };

    const fetchUsers = async () => {
        setUsersLoading(true);
        setError("");

        try {
            const response = await getAllUsersAPI();

            if (response.status >= 400) {
                setError(
                    response.data?.message || "Failed to load users"
                );
                return;
            }

            const userData = Array.isArray(response.data)
                ? response.data
                : response.data?.data || [];

            setUsers(userData);
        } catch (err) {
            setError(
                err.response?.data?.message || "Unable to load users"
            );
        } finally {
            setUsersLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleApprove = async (bookId) => {
        setApprovingId(bookId);
        setError("");

        try {
            const response = await approveBookAPI(bookId);

            if (response.status >= 400 || response.data?.success === false) {
                setError(
                    response.data?.message || "Book approval failed"
                );
                return;
            }

            setBooks((previousBooks) =>
                previousBooks.map((book) =>
                    book._id === bookId
                        ? { ...book, status: "approved" }
                        : book
                )
            );
        } catch (err) {
            setError(
                err.response?.data?.message || "Unable to approve this book"
            );
        } finally {
            setApprovingId(null);
        }
    };

    const handleTabChange = (selectedTab) => {
        setTabValue(selectedTab);

        if (selectedTab === 2) {
            fetchUsers();
        } else {
            setError("");
        }
    };

    return (
        <>
            <AdminHeader />

            <div className="md:grid md:grid-cols-[1fr_4fr]">
                <div>
                    <AdminSideBar />
                </div>

                <div className="min-w-0 p-5 md:p-10">
                    <h1 className="text-3xl font-bold">Admin Resources</h1>

                    <div className="my-8 flex justify-center gap-8 border-b">
                        <button
                            onClick={() => handleTabChange(1)}
                            className={`border-b-2 px-5 py-3 ${
                                tab === 1
                                    ? "border-blue-600 font-bold text-blue-600"
                                    : "border-transparent text-gray-600"
                            }`}
                        >
                            Books ({books.length})
                        </button>

                        <button
                            onClick={() => handleTabChange(2)}
                            className={`border-b-2 px-5 py-3 ${
                                tab === 2
                                    ? "border-blue-600 font-bold text-blue-600"
                                    : "border-transparent text-gray-600"
                            }`}
                        >
                            Users ({users.length})
                        </button>
                    </div>

                    {error && (
                        <div className="mb-5 rounded bg-red-100 p-3 text-red-700">
                            {error}
                        </div>
                    )}

                    {tab === 1 && (
                        <div>
                            {booksLoading ? (
                                <p className="py-10 text-center">
                                    Loading books...
                                </p>
                            ) : books.length === 0 ? (
                                <p className="py-10 text-center text-gray-500">
                                    No books found.
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {books.map((book) => (
                                        <div
                                            key={book._id}
                                            className="overflow-hidden rounded-md bg-white p-4 shadow-lg"
                                        >
                                            <img
                                                className="h-[300px] w-full rounded object-cover"
                                                src={
                                                    book.imageURL ||
                                                    "https://placehold.co/300x400?text=No+Book+Image"
                                                }
                                                alt={book.title || "Book cover"}
                                            />

                                            <div className="mt-4 text-center">
                                                <h2 className="text-xl font-bold text-blue-600">
                                                    {book.author || "Unknown Author"}
                                                </h2>

                                                <h3 className="mt-1 text-lg font-semibold">
                                                    {book.title || "Untitled Book"}
                                                </h3>

                                                <p className="mt-1 font-bold text-red-500">
                                                    ₹{book.discountPrice ?? book.price ?? 0}
                                                </p>

                                                <p className="mt-2 text-sm text-gray-500">
                                                    Seller:{" "}
                                                    {typeof book.sellerMail === "string"
                                                        ? book.sellerMail
                                                        : book.sellerMail?.email ||
                                                          book.sellerMail?.userMail ||
                                                          "Unknown"}
                                                </p>

                                                <p className="mt-2 text-sm">
                                                    Status:{" "}
                                                    <span
                                                        className={
                                                            book.status === "approved"
                                                                ? "font-semibold text-green-600"
                                                                : book.status === "pending"
                                                                  ? "font-semibold text-orange-500"
                                                                  : "font-semibold text-gray-600"
                                                        }
                                                    >
                                                        {book.status || "pending"}
                                                    </span>
                                                </p>

                                                {book.status !== "approved" && (
                                                    <button
                                                        onClick={() =>
                                                            handleApprove(book._id)
                                                        }
                                                        disabled={approvingId === book._id}
                                                        className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        {approvingId === book._id
                                                            ? "APPROVING..."
                                                            : "APPROVE"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {tab === 2 && (
                        <div>
                            {usersLoading ? (
                                <p className="py-10 text-center">
                                    Loading users...
                                </p>
                            ) : users.length === 0 ? (
                                <p className="py-10 text-center text-gray-500">
                                    No users found.
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                    {users.map((user, index) => (
                                        <div
                                            key={user._id || user.id || index}
                                            className="rounded-md bg-blue-50 p-4 shadow-md"
                                        >
                                            <p className="break-all text-sm font-bold text-red-500">
                                                ID: {user._id || user.id || index + 1}
                                            </p>

                                            <div className="mt-3 flex items-center">
                                                <img
                                                    width="80"
                                                    height="80"
                                                    className="h-20 w-20 shrink-0 rounded-full object-cover"
                                                    src={
                                                        user.profileImage ||
                                                        user.picture ||
                                                        "https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small/a-person-icon-on-a-transparent-background-png.png"
                                                    }
                                                    alt="User profile"
                                                />

                                                <div className="ml-3 min-w-0">
                                                    <h4 className="break-words font-bold text-blue-600">
                                                        {user.username ||
                                                            user.name ||
                                                            user.fullName ||
                                                            "Unnamed User"}
                                                    </h4>

                                                    <p className="break-all text-xs text-gray-600">
                                                        {user.email ||
                                                            user.userMail ||
                                                            user.mail ||
                                                            "No email"}
                                                    </p>

                                                    <p className="mt-1 text-sm capitalize text-gray-500">
                                                        Role: {user.role || "user"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminResources;
