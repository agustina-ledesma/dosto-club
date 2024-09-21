import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { DeleteIcon } from "../../components/DeleteIcon";
import { EditIcon } from "../../components/EditIcon";
import {
  Button,
  Tooltip,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const MyReviewsTab = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user] = useState(storedUser);
  const [token] = useState(storedToken);
  const [reviews, setReviews] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://api-dosto-club-2.onrender.com/reviews/user/${user._id}`,
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
        setReviews(data);

        for (const review of data) {
          const bookResponse = await fetch(
            `https://api-dosto-club-2.onrender.com/book/${review.bookId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (bookResponse.ok) {
            const bookData = await bookResponse.json();
            setBookDetails((prevDetails) => ({
              ...prevDetails,
              [review.bookId]: bookData,
            }));
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user reviews or book details:", error);
        setLoading(false);
      }
    };

    if (user) {
      fetchReviews();
    }
  }, [user, token]);

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(
        `https://api-dosto-club-2.onrender.com/reviews/user/${reviewId}`,
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

      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
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
    <>
      <div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border-b-1 border-[#1F352C]">
              {bookDetails[review.bookId] && (
                <div className="flex justify-start">
                  <div className="w-[200px]  border-r-1 border-[#1F352C]  bg-white hover:bg-[#1F352C] transition-colors duration-300 group p-2">
                    <Link
                      to={`/book/${review.bookId}`}
                      className="w-[100px] mx-auto py-3"
                    >
                      <img
                        src={
                          bookDetails[review.bookId]?.imagePath
                            ? `https://api-dosto-club-2.onrender.com/${
                                bookDetails[review.bookId].imagePath
                              }`
                            : "https://nextui.org/images/card-example-4.jpeg"
                        }
                        alt={bookDetails[review.bookId].titulo}
                        className="mt-2"
                      />

                      <h2 className="text-customGreen font-cinzel text-xs text-center my-3 group-hover:text-white">
                        {bookDetails[review.bookId].titulo}
                      </h2>
                    </Link>
                  </div>

                  <div className="w-full m-4 flex flex-col">
                    <div className="flex justify-between">
                      <Rating name="read-only" value={review.rating} readOnly />
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly className="bg-transparent p-2">
                            <i className="bx bx-dots-horizontal-rounded bx-sm "></i>
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem key="edit">
                            <Link
                              to={`/edit-review/${review._id}`}
                              className="flex items-center"
                            >
                              <EditIcon />
                              <span className="mx-1">Edit Review</span>
                            </Link>
                          </DropdownItem>
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            onClick={() => handleDelete(review._id)} 
                          >
                            <div className="flex items-center">
                              <DeleteIcon className="group-hover:text-white" />
                              <span className="mx-1">Delete Review</span>
                            </div>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    <p className="my-2">{review.review}</p>

                    <small className="mt-auto">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="w-full text-customGreen text-center mt-4">
            No reviews found.
          </p>
        )}
      </div>
    </>
  );
};

export default MyReviewsTab;
