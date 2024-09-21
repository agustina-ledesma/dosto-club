import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteIcon } from "../../components/DeleteIcon";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";

export const FavoriteTab = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {
        console.log("Fetching favorite books..."); // Log
        setLoading(true);
        const response = await fetch(
          `https://api-dosto-club-2.onrender.com/favorites-user/${user._id}`,
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
        console.log("Favorite books data:", data); // Log
        setFavoriteBooks(data);
      } catch (error) {
        console.error("Error fetching favorite books:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFavoriteBooks();
    }
  }, [user, token]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        console.log("Fetching book details..."); // Log
        const details = {};
        for (const book of favoriteBooks) {
          const response = await fetch(
            `https://api-dosto-club-2.onrender.com/book/${book.bookId}`
          );
          if (response.ok) {
            const bookData = await response.json();
            console.log(`Book details for ${book.bookId}:`, bookData); // Log
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

    if (favoriteBooks.length > 0) {
      fetchBookDetails();
    }
  }, [favoriteBooks]);

  const handleDeleteFavorite = async (favoriteId) => {
    try {
      const response = await fetch(
        `https://api-dosto-club-2.onrender.com/favorites/${favoriteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Actualiza el estado o haz algo con la respuesta exitosa
        console.log("Favorite removed:", data);
        // Re-fetch favorite books to update the list
        const updatedFavorites = favoriteBooks.filter(
          (book) => book._id !== favoriteId
        );
        setFavoriteBooks(updatedFavorites);
      } else {
        console.error("Error removing favorite:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner color="default" className="m-4" />
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <div className="flex justify-center">
          <Spinner color="default" className="m-4" />
        </div>
      ) : favoriteBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
          {favoriteBooks.map((favoriteBook) => (
            <div key={favoriteBook.bookId} className="flex flex-col h-full">
              {bookDetails[favoriteBook.bookId] && (
                <div className="border-r border-b border-[#1F352C] bg-white hover:bg-[#1F352C] transition-colors duration-300 group p-2 flex flex-col h-full">
                  <div className="flex justify-end">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly className="bg-transparent p-2">
                          <i className="bx bx-dots-horizontal-rounded bx-sm group-hover:text-white"></i>
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          onClick={() => handleDeleteFavorite(favoriteBook._id)} // Llamar a la función de eliminar al hacer clic
                        >
                          <div className="flex items-center">
                            <DeleteIcon className="group-hover:text-white" />
                            <span className="mx-1 group-hover:text-white">
                              Remove from favorites
                            </span>
                          </div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <Link
                    to={`/book/${favoriteBook.bookId}`}
                    className=" flex-grow flex flex-col justify-between"
                  >
                    <img
                      alt={bookDetails[favoriteBook.bookId].titulo}
                      className="max-w-[200px] h-[300px] mx-auto object-cover mt-2"
                      src={
                        bookDetails[favoriteBook.bookId].imagePath
                          ? `https://api-dosto-club-2.onrender.com/${
                              bookDetails[favoriteBook.bookId].imagePath
                            }`
                          : "https://nextui.org/images/card-example-4.jpeg"
                      }
                    />
                    <div className="m-2 flex flex-col flex-grow">
                      <h2 className="font-cinzel text-customGreen text-sm group-hover:text-white">
                        {bookDetails[favoriteBook.bookId].titulo}
                      </h2>
                      <small className="my-2 text-customGreen text-xs group-hover:text-white">
                        {bookDetails[favoriteBook.bookId].autor}
                      </small>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="w-full text-customGreen text-center mt-4">
          Add a book to favorites.
        </p>
      )}
    </div>
  );
};

export default FavoriteTab;
