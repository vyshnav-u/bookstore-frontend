
import apiService from "../api/apiService";

// Register a new user
export const registerAPI = async (userData) => {
    return await apiService("POST", "/register", userData);
};

// Login user
export const loginAPI = async (userData) => {
    return await apiService("POST", "/login", userData);
};

// Google login
export const goolgelogin = async (userData) => {
    return await apiService("POST", "/google-login", userData);
};

// Update user profile
export const userUpdateAPI = async (id, userData, reqHeader) => {
    return await apiService("PUT", `/user/${id}`, userData, reqHeader);
};

// Add a new book
export const addBookAPI = async (bookDetails, reqHeader) => {
    return await apiService("POST", "/book", bookDetails, reqHeader);
};

// Get the latest books
export const getHomeBooksAPI = async () => {
    return await apiService("GET", "/home-books", {});
};

// Get all books
export const getAllBooksAPI = async (searchKey = "") => {
    const encodedSearchKey = encodeURIComponent(searchKey);

    return await apiService(
        "GET",
        `/all-books?search=${encodedSearchKey}`,
        {}
    );
};

// Get books uploaded by the logged-in user
export const getUserBookAPI = async (reqHeader) => {
    return await apiService("GET", "/user-books", {}, reqHeader);
};

// Get books purchased by the logged-in user
export const getUserBroughtBookAPI = async (reqHeader) => {
    return await apiService("GET", "/user-brought-books", {}, reqHeader);
};

// Delete a book
export const deleteBookAPI = async (id, reqHeader) => {
    return await apiService("DELETE", `/book/${id}`, {}, reqHeader);
};

// View a particular book
export const viewBooksAPI = async (id) => {
    return await apiService("GET", `/view-book/${id}`, {});
};

// Get all registered users (requires a backend route)
export const getAllUsersAPI = async (reqHeader) => {
    return await apiService("GET", "/all-users", {}, reqHeader);
};

// Approve a book (requires a backend route)
export const approveBookAPI = async (id, reqHeader) => {
    return await apiService(
        "PUT",
        `/book/${id}/approve`,
        {},
        reqHeader
    );
};
