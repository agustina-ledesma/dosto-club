import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Spinner } from "@nextui-org/react";
import { ZoomInRounded } from "@mui/icons-material";
import Footer from "../../components/Footer";

export const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [value, setValue] = useState(0);
  const [review, setReview] = useState("");
  const getToken = () => localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);

  useEffect(() => {
    // Obtener detalles del libro
    fetch(`https://api-dosto-club-2.onrender.com/book/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = getToken();

    try {
      const response = await fetch(
        `https://api-dosto-club-2.onrender.com/reviews/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            review: review,
            rating: value,
            userId: user._id,
            ZoomInRounded,
          }),
        }
      );

      if (response.ok) {
        setValue(0);
        setReview("");
        navigate(-1);
        console.log("Reseña enviada con éxito");
      } else {
        console.error("Error al enviar la reseña");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  if (!book) {
    return (
      <div className="flex justify-center items-center max-h-screen">
        <Spinner color="default" className="m-4" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] w-full    min-h-screen border-b border-[#1F352C]">
        <div className="flex flex-col md:border-r  border-[#1F352C] sm:border-0 p-4">
          <div className="max-w-[200px] mx-auto">
            <img
              alt={book.titulo}
              className="w-full h-auto object-cover"
              src={
                book.imagePath
                  ? `https://api-dosto-club-2.onrender.com/${book.imagePath}`
                  : "https://nextui.org/images/card-example-4.jpeg"
              }
            />
          </div>
          <div className="mt-4">
            <h2 className="text-2xl text-customGreen font-cinzel font-medium">
              {book.titulo}
            </h2>
            <p className="my-2 text-customGreen font-cinzel text-sm">
              {book.autor}
            </p>
            <p className="text-gray-600 my-2 text-sm">{book.descripcion}</p>
          </div>
        </div>

        <div className="m-4 flex flex-col my-2">
          <h1 className="text-2xl text-customGreen my-4 font-cinzel font-medium">
            What did you think?
          </h1>
          <form className="flex flex-col  my-2" onSubmit={handleSubmit}>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <textarea
              placeholder="Write something.."
              className="w-full my-4 h-[200px] sm:h-[370px] lg:h-[250px] lg:max-h-[300px] border border-[#1F352C] p-2"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>

            <button
              type="submit"
              className="w-[200px] h-[44px] self-end border border-[#1F352C] rounded-md text-[#1F352C] bg-transparent hover:bg-[#1F352C] hover:text-white font-semibold transition-colors duration-300"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Review;
