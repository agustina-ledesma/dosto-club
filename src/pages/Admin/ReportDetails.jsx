import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardBody, Button, Spinner } from "@nextui-org/react";

const ReportDetails = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [users, setUsers] = useState([]);
  const [book, setBook] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const getToken = () => localStorage.getItem("token");
  const token = getToken();

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await fetch(
          `https://api-dosto-club-2.onrender.com/reviews/${id}`
        );
        const responseData = await response.text();

        try {
          const data = JSON.parse(responseData);
          setReview(data);

          const bookResponse = await fetch(
            `https://api-dosto-club-2.onrender.com/book/${data.bookId}`
          );
          const bookResponseData = await bookResponse.text();
          const bookData = JSON.parse(bookResponseData);
          setBook(bookData);
        } catch (parseError) {
          console.error(
            "Error parsing JSON:",
            parseError,
            "Response data:",
            responseData
          );
        }
      } catch (error) {
        console.error("Error fetching review details or book details:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://api-dosto-club-2.onrender.com/users"
        );
        const responseData = await response.text();

        try {
          const data = JSON.parse(responseData);
          setUsers(data);
        } catch (parseError) {
          console.error(
            "Error parsing JSON:",
            parseError,
            "Response data:",
            responseData
          );
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchReviewDetails();
    fetchUsers();
  }, [id]);

  const getUserEmail = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.email : "Desconocido";
  };

  if (!review) {
    return (
      <div className="flex justify-center">
        <Spinner color="primary" className="m-4" />
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://api-dosto-club-2.onrender.com/reviews/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate("/reviews");
        }, 3000);
      } else {
        console.error("Error al eliminar la reseña:", data.message);
      }
    } catch (error) {
      console.error("Error al eliminar la reseña:", error);
    }
  };

  return (
    <>
      <div className="mx-auto p-4">
        {showSuccessMessage && (
          <div className="text-center bg-green-100 my-3 py-2 rounded-lg">
            <p className="font-medium">Reseña eliminada con éxito</p>
          </div>
        )}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <Card>
              <CardBody>
                <div className="flex flex-col md:flex-row">
                  <div className="flex-shrink-0 mx-4">
                    {book && book.imagePath && (
                      <div className="m-2">
                        <img
                          src={`https://api-dosto-club-2.onrender.com/${book.imagePath}`}
                          alt={book.titulo}
                          style={{ width: "150px", height: "auto" }}
                        />
                      </div>
                    )}
                    <p className="text-sm text-customGreen font-cinzel">
                      {book ? book.titulo : "Loading..."}
                    </p>
                    <small>{book ? book.autor : "Loading.."}</small>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4 ms-4">
                    <h1 className="my-3 text-2xl">
                      Detalles de la reseña reportada
                    </h1>
                    <p>"{review.review}"</p>
                    <p className="my-3">
                      Escrito por: {getUserEmail(review.userId)}{" "}
                    </p>
                    <p>
                      <strong>Reportado:</strong>{" "}
                      {review.reported ? "Sí" : "No"}
                    </p>
                    <div className="my-4">
                      <Button color="danger" onClick={handleDelete}>
                        Eliminar reseña
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <div>
          {review.reports && review.reports.length > 0 && (
            <div className="m-4">
              <h2 className="my-3 text-2xl">Reportes:</h2>
              {review.reports.map((report, index) => (
                <div key={index} className="my-4 bg-danger-50 rounded-lg">
                  <div className="p-2 m-1">
                    <p>
                      <strong>{getUserEmail(report.userId)}</strong>
                    </p>
                    <p>
                      <strong>Comentario:</strong> "
                      {report.comment || "Sin comentario."}"
                    </p>
                    <p>{new Date(report.date).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReportDetails;
