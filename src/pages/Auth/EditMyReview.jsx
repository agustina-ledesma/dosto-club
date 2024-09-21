import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Spinner } from "@nextui-org/react";

export const EditMyReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [review, setReview] = useState(null);
  const [value, setValue] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewAndBook = async () => {
      try {
        // Fetch de la reseña
        const reviewResponse = await fetch(
          `https://api-dosto-club-2.onrender.com/reviews/${id}`
        );
        if (!reviewResponse.ok)
          throw new Error(`Error: ${reviewResponse.status}`);
        const reviewData = await reviewResponse.json();
        setReview(reviewData);
        setValue(reviewData.rating);
        setText(reviewData.review);

        // Fetch del libro
        const bookResponse = await fetch(
          `https://api-dosto-club-2.onrender.com/book/${reviewData.bookId}`
        );
        if (!bookResponse.ok) throw new Error(`Error: ${bookResponse.status}`);
        const bookData = await bookResponse.json();
        setBook(bookData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching review or book:", error);
        setLoading(false);
      }
    };

    fetchReviewAndBook();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api-dosto-club-2.onrender.com/reviews/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating: value,
            review: text,
          }),
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      navigate("/profile"); 
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner color="default" className="m-4" />
      </div>
    );
  }

  if (!book || !review) {
    return <p>Review or book not found</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] w-full min-h-screen md:border-b border-[#1F352C]">
        <div className="flex flex-col md:border-r border-[#1F352C] sm:border-0 p-4">
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
            Edit Review
          </h1>
          <form className="flex flex-col h-full my-2" onSubmit={handleSubmit}>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <textarea
              placeholder="Write something.."
              className="w-full my-4 h-[200px] sm:h-[370px] lg:h-[250px] lg:max-h-[300px] border border-[#1F352C] p-2 resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>

            <button
              type="submit"
              className="w-[200px] h-[44px] self-end border border-[#1F352C] rounded-md text-[#1F352C] bg-transparent hover:bg-[#1F352C] hover:text-white font-semibold transition-colors duration-300"
            >
              Update Review
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMyReview;
