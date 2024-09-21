import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Spinner
} from "@nextui-org/react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Inicia la carga
      try {
        const [reviewsRes, usersRes, booksRes] = await Promise.all([
          fetch("https://api-dosto-club-2.onrender.com/reviews"),
          fetch("https://api-dosto-club-2.onrender.com/users"),
          fetch("https://api-dosto-club-2.onrender.com/books"),
        ]);

        if (reviewsRes.ok && usersRes.ok && booksRes.ok) {
          const [reviewsData, usersData, booksData] = await Promise.all([
            reviewsRes.json(),
            usersRes.json(),
            booksRes.json(),
          ]);

          setReviews(reviewsData);
          setUsers(usersData);
          setBooks(booksData);
        } else {
          console.error(
            "Error fetching data:",
            reviewsRes.statusText,
            usersRes.statusText,
            booksRes.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchData();
  }, []);

  // Función para obtener el email
  const getUserEmail = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.email : "Desconocido";
  };

  // Función para obtener el título del libro
  const getBookTitle = (bookId) => {
    const book = books.find((book) => book._id === bookId);
    return book ? book.titulo : "Desconocido";
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner color="primary" className="m-4" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen md:border-b border-[#1F352C]">
        <h1 className="m-3 text-2xl">Reviews</h1>
        <div className="m-3">
          <Table aria-label="Example table with custom cells">
            <TableHeader>
              <TableColumn>BOOK</TableColumn>
              <TableColumn>REVIEW</TableColumn>
              <TableColumn>REVIEW BY USER (EMAIL)</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review._id}>
                  <TableCell>{getBookTitle(review.bookId)}</TableCell>
                  <TableCell>{review.review}</TableCell>
                  <TableCell>{getUserEmail(review.userId)}</TableCell>
                  <TableCell>
                    {review.reported ? (
                      <Chip label="Reportada" color="danger">
                        Reported
                      </Chip>
                    ) : (
                      <Chip label="No reportada" color="default">
                        No reported
                      </Chip>
                    )}
                  </TableCell>
                  <TableCell>
                    {review.reported ? (
                      <Link to={`/report-details/${review._id}`}>
                        <Button color="danger">Details</Button>
                      </Link>
                    ) : null} {/* Solo muestra el botón si está reportada */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Reviews;
