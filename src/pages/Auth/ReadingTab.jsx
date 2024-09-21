import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteIcon } from "../../components/DeleteIcon";
import {
  Button,
  Chip,
  Tooltip,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const ReadingTab = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [markedBooks, setMarkedBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (user) {
      const fetchMarkedBooks = async () => {
        try {
          setLoading(true); // Comienza a cargar
          const response = await fetch(
            `https://api-dosto-club-2.onrender.com/user/${user._id}/books`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();
          setMarkedBooks(data);
        } catch (error) {
          setError(error.message);
          console.error("Error fetching marked books:", error);
        } finally {
          setLoading(false); 
        }
      };

      fetchMarkedBooks();
    }
  }, [user, token]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const details = {};
        for (const book of markedBooks) {
          const response = await fetch(
            `https://api-dosto-club-2.onrender.com/book/${book.bookId}`
          );
          if (response.ok) {
            const bookData = await response.json();
            details[book.bookId] = bookData;
          } else {
            console.error(`Error fetching details for book ${book.bookId}`);
          }
        }
        setBookDetails(details);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    if (markedBooks.length > 0) {
      fetchBookDetails();
    }
  }, [markedBooks]);

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(
        `https://api-dosto-club-2.onrender.com/user/${user._id}/book/${bookId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      setMarkedBooks(markedBooks.filter((book) => book.bookId !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleMarkAsRead = async (bookId) => {
    try {
      const response = await fetch(
        `https://api-dosto-club-2.onrender.com/user/${user._id}/book/${bookId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "read" }), 
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const updatedBooks = markedBooks.map((book) =>
        book.bookId === bookId ? { ...book, status: "read" } : book
      );
      setMarkedBooks(updatedBooks);

      localStorage.removeItem(`epub-location-${bookId}`);
      localStorage.removeItem(`epub-font-size-${bookId}`);
    } catch (error) {
      console.error("Error marking book as read:", error);
    }
  };

  if (loading || error) {
    return (
      <div className="flex justify-center">
        <Spinner color="default" className="m-4" />
      </div>
    );
  }

  return (
    <>
      <div>
        {markedBooks.length === 0 ? (
          <p>No has marcado ningún libro.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
            {markedBooks.map((markedBook) => (
              <div key={markedBook._id}>
                {bookDetails[markedBook.bookId] && (
                  <div className="border-r border-b border-[#1F352C] bg-white hover:bg-[#1F352C] transition-colors duration-300 group p-2">
                    <div
                      key={bookDetails[markedBook.bookId]._id}
                      className="w-full m-auto cursor-pointer"
                    >
                      <div className="flex justify-end">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button isIconOnly className="bg-transparent p-2">
                              <i className="bx bx-dots-horizontal-rounded bx-sm group-hover:text-white"></i>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem
                              key="read"
                              onClick={() =>
                                handleMarkAsRead(markedBook.bookId)
                              }
                            >
                              <div className="flex items-center text-customGreen">
                                <i className="bx bx-check-circle text-customGreen"></i>
                                <span className="mx-1 text-customGreen">
                                  Mark as Read
                                </span>
                              </div>
                            </DropdownItem>
                            <DropdownItem
                              key="delete"
                              className="text-danger"
                              color="danger"
                              onClick={() =>
                                handleDeleteBook(markedBook.bookId)
                              }
                            >
                              <div className="flex items-center">
                                <DeleteIcon className="group-hover:text-white" />
                                <span className="mx-1 group-hover:text-white">
                                  Remove from library
                                </span>
                              </div>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                      <Link
                        to={
                          markedBook.status === "reading"
                            ? `/read/${markedBook.bookId}`
                            : `/book/${markedBook.bookId}`
                        }
                        className="block h-full w-full justify-start"
                      >
                        <img
                          alt={bookDetails[markedBook.bookId].titulo}
                          className="max-w-[200px] h-[300px] mx-auto object-cover mt-2"
                          src={
                            bookDetails[markedBook.bookId].imagePath
                              ? `https://api-dosto-club-2.onrender.com/${
                                  bookDetails[markedBook.bookId].imagePath
                                }`
                              : "https://nextui.org/images/card-example-4.jpeg"
                          }
                        />
                        <div className="m-2">
                          <h2 className="font-cinzel text-customGreen text-sm group-hover:text-white">
                            {bookDetails[markedBook.bookId].titulo}
                          </h2>
                          <small className="my-2 text-customGreen text-xs group-hover:text-white">
                            {bookDetails[markedBook.bookId].autor}
                          </small>
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <div className="m-1">
                            {markedBook.status === "reading" ? (
                              <Chip
                                color="warning"
                                className="my-2 group-hover:bg-white"
                                size="sm"
                              >
                                Reading
                              </Chip>
                            ) : markedBook.status === "read" ? (
                              <Chip
                                color="success"
                                className="my-2 group-hover:bg-white"
                                size="sm"
                              >
                                Read
                              </Chip>
                            ) : (
                              <span className="group-hover:text-white">
                                {markedBook.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ReadingTab;
