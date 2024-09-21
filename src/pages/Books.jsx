import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomBreadcrumbs from "../components/CustomBreadcrumbs";
import { SearchIcon } from "../components/SearchIcon";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Spinner,
} from "@nextui-org/react";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://api-dosto-club-2.onrender.com/books"
        );
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data); 
      } catch (error) {
        console.error("Error fetching books", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const results = books.filter((book) =>
      book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(results);
  }, [searchTerm, books]);

  const handleSearch = () => {
    // La lógica de búsqueda ya está en el useEffect que filtra por searchTerm
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="default" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2  border-b border-[#1F352C]">
        {/* col 1 */}
        <div className="hidden lg:flex items-center border-r border-[#1F352C]">
          <div className="mx-4">
            <CustomBreadcrumbs />
          </div>
        </div>

        {/* col 2 */}
        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name..."
            className="ms-2 py-3 w-full "
          />
          <button
            onClick={handleSearch}
            className="w-[50px] h-[50px] bg-[#1F352C] text-white font-semibold transition-colors duration-300 flex items-center justify-center"
          >
            <SearchIcon className="text-white flex-shrink-0" />
          </button>
        </div>
      </div>
      <div className="mt-6 border-b border-[#1F352C]">
        <h1 className="text-2xl mx-4 my-5">
          ALL BOOKS ({filteredBooks.length})
        </h1>
      </div>
      <div>
        {filteredBooks.length === 0 ? (
          <p className="text-center my-8 text-gray-500">Sorry, We don't have this book.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-0 ">
            {filteredBooks.map((book) => (
              <div
                className="border-r border-b border-[#1F352C]"
                key={book._id}
              >
                <Link
                  to={`/book/${book._id}`}
                  className="block h-full w-full bg-white hover:bg-[#1F352C] transition-colors duration-300 group p-2"
                >
                  <div className="flex justify-between mx-1">
                    <p className="group-hover:text-white my-2 text-xs">
                      {book.originalName}
                    </p>

                    <Button
                      isIconOnly
                      className="bg-transparent hover:bg-transparent"
                      style={{ border: "none", boxShadow: "none" }}
                    >
                      <i
                        className={`bx bx-heart bx-xs text-[#1f352c] group-hover:text-white`}
                      ></i>
                    </Button>
                  </div>
                  <div className="w-full max-w-[220px] m-auto cursor-pointer">
                    <img
                      alt={book.titulo}
                      className="w-full px-1 h-[320px] object-cover"
                      src={
                        book.imagePath
                          ? `https://api-dosto-club-2.onrender.com/${book.imagePath}`
                          : "https://nextui.org/images/card-example-4.jpeg"
                      }
                    />
                  </div>
                  <div className="p-3">
                    <h2 className="font-cinzel text-customGreen text-xs font-medium group-hover:text-white">
                      {book.titulo}
                    </h2>
                    <small className="font-cinzel text-customGreen text-xs group-hover:text-white">
                      {book.autor}
                    </small>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Books;
