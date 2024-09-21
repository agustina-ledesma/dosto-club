import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import AvatarCircles from "../components/magicui/AvatarCircles.tsx";
import Rating from "@mui/material/Rating";
import { HeartIcon } from "../components/HeartIcon";
import CustomBreadcrumbs from "../components/CustomBreadcrumbs";

import {
  Card,
  CardBody,
  Image,
  Button,
  Textarea,
  Chip,
  Tooltip,
  Avatar,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const BookDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]); // Nuevo estado para usuarios
  const getToken = () => localStorage.getItem("token");
  const [isFavorite, setIsFavorite] = useState(false);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(5);

  const avatarUrls = [
    "https://avatars.githubusercontent.com/u/16860528",
    "https://avatars.githubusercontent.com/u/20110627",
  ];

  useEffect(() => {
    // Obtener detalles del libro
    fetch(`https://api-dosto-club-2.onrender.com/book/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  useEffect(() => {
    // Obtener reseñas
    fetch(`https://api-dosto-club-2.onrender.com/reviews/book/${id}`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [id]);

  useEffect(() => {
    // Obtener todos los usuarios
    fetch("https://api-dosto-club-2.onrender.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const getUserDetails = (userId) => {
    const user = users.find((u) => u._id === userId);
    if (user) {
      return {
        name: user.nombre || user.email,
        image: user.image,
      };
    }
    return {
      name: "Loading...",
    };
  };

  useEffect(() => {
    // Verificar si el libro está en favoritos
    const checkIfFavorite = async () => {
      const token = getToken();
      if (!token || !user) return;

      try {
        const response = await fetch(
          `https://api-dosto-club-2.onrender.com/favorites-user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const favorites = await response.json();
          // Verificar si el bookId está en la lista de favoritos
          const isFav = favorites.some((fav) => fav.bookId === id);
          setIsFavorite(isFav);
        } else {
          console.error("Error al verificar favoritos");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    checkIfFavorite();
  }, [id, user]);

  const handleFavoriteClick = async () => {
    const token = getToken();
    console.log("Token:", token);
    console.log("User ID:", user._id);

    try {
      const response = await fetch(
        `https://api-dosto-club-2.onrender.com/favorites/${id}`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user._id, 
          }),
        }
      );

      if (response.ok) {
        console.log("agregado a fav");
        setIsFavorite(!isFavorite); 
      } else {
        const errorText = await response.text();
        console.error("Error al agregar a favoritos:", errorText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="default" className="m-4" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="flex flex-col md:border-r-1 border-b-1 md:border-b-0 border-[#1F352C] py-4">
          <div className="mx-auto max-w-[370px]">
            <img
              alt={book.titulo}
              className="w-full h-[470px] object-cover"
              src={
                book.imagePath
                  ? `https://api-dosto-club-2.onrender.com/${book.imagePath}`
                  : "https://nextui.org/images/card-example-4.jpeg"
              }
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="m-3">
            <div className="m-4">
              <div className="flex justify-between">
                <h1 className="text-2xl font-medium my-1 font-cinzel text-customGreen">
                  {book.titulo}
                </h1>
                <Button
                  isIconOnly
                  className={`text-white ${
                    isFavorite
                      ? "bg-customGreen"
                      : "bg-transparent border border-customGreen text-customGreen"
                  } hover:bg-customGreen hover:text-white`}
                  aria-label="Like"
                  onClick={handleFavoriteClick}
                >
                  <HeartIcon />
                </Button>
              </div>

              <small>{book.originalName}</small>
              <Link to={`/dostoevsky`} className="">
                <p className="text-lg my-2 font-cinzel text-customGreen">
                  {book.autor}
                </p>
              </Link>

              <small>{book.genero}</small>
              <p className="my-4 text-md text-customGreen">
                {book.descripcion}
              </p>
            </div>

            <div>
              <div className="flex flex-col lg:flex-row gap-2 mx-2 my-5">
                {/* columna 1 */}
                <div className="flex-grow lg:w-auto lg:mr-2">
                  {user ? (
                    <button className="w-full lg:w-[200px] h-[44px] border border-[#1F352C] rounded-md text-[#1F352C] bg-transparent hover:bg-[#1F352C] hover:text-white font-semibold transition-colors duration-300">
                      <Link to={`/read/${book._id}`} className="">
                        Read
                      </Link>
                    </button>
                  ) : (
                    <button className="w-full lg:w-[200px] h-[44px] border border-[#1F352C] rounded-md text-[#1F352C] bg-transparent hover:bg-[#1F352C] hover:text-white font-semibold transition-colors duration-300">
                      <Link to={"/login"} className="">
                        LOG IN
                      </Link>
                    </button>
                  )}
                </div>
                {/* columna 2 */}
                <div className="flex-grow lg:w-auto lg:ml-3">
                  <button className="w-full lg:w-[200px] h-[45px] border border-gray-50 bg-transparent rounded-lg text-[#1F352C] hover:bg-[#1F352C] hover:text-white font-medium transition-colors duration-300 flex items-center justify-center">
                    <Link to={"#"} className="flex items-center">
                      <AvatarCircles
                        size="sm"
                        className="mx-2"
                        numPeople={99}
                        avatarUrls={avatarUrls}
                      />
                      <span className="mx-2">Community</span>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-1 border-[#1F352C]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
          <div className="m-4">
            <p className="text-2xl font-cinzel text-customGreen py-3 font-medium">
              WHAT DO YOU THINK?
            </p>
            <div className="flex flex-col items-start justify-start">
              <Rating name="read-only" value={3} size="large" readOnly />
              <small className="my-2 text-customGreen font-cinzel">
                Rate this book
              </small>
            </div>
          </div>
          <div className="my-auto flex lg:justify-end">
            <button className="m-4 w-[200px] h-[44px] border border-[#1F352C] rounded-lg text-[#1F352C] bg-transparent hover:bg-[#1F352C] hover:text-white font-semibold transition-colors duration-300">
              <Link to={`/review/${book._id}`} className="">
                Write a Review
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <div className="bg-[#1F352C] w-full py-8">
          <h2 className="mx-4 text-white font-medium font-cinzel text-2xl">
            Community Reviews
          </h2>
        </div>
        {reviews && reviews.length > 0 ? (
          reviews.slice(0, visibleReviewsCount).map((review) => {
            const { name, image } = getUserDetails(review.userId);

            return (
              <div className="reviews" key={review._id}>
                <div className="py-2 border-b-1 border-[#1F352C]">
                  <div className="flex justify-start">
                    {/* columna 1 (más pequeña) */}
                    <div className="mx-4 flex flex-col items-center justify-center w-[100px] flex-shrink-0">
                      <Avatar
                        isBordered
                        as="button"
                        color="default"
                        className="transition-transform"
                        name={name}
                        size="md"
                        src={
                          image
                            ? `https://api-dosto-club-2.onrender.com/${image}`
                            : "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        }
                      />
                      <span className="text-gray-600 text-center mt-4">
                        {name}
                      </span>
                    </div>

                    {/* columna 2 (se expande para llenar el resto del espacio) */}
                    <div className="m-4 flex-grow">
                      <div className="flex justify-between">
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                        />
                        <Dropdown>
                          <DropdownTrigger>
                            <Button isIconOnly className="bg-transparent p-2">
                              <i className="bx bx-dots-horizontal-rounded bx-sm "></i>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem key="report">
                              {user ? (
                                <Link
                                  to={`/report-review/${review._id}`}
                                  className="text-danger-500 mx-3 my-1 flex items-center"
                                >
                                  Report
                                  <i class="bx bx-flag ms-1"></i>
                                </Link>
                              ) : (
                                <Tooltip content="Log in">
                                  <Link
                                    to={"/login"}
                                    className="text-danger-500 mx-3 my-1"
                                  >
                                    Report
                                  </Link>
                                </Tooltip>
                              )}
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>

                      <p className="my-2 text-sm">{review.review}</p>
                      <small className="mt-auto">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-3 border-b border-[#1F352C]">
            <p className="m-4 text-customGreen font-cinzel text-center">There are no reviews yet.</p>
          </div>
          
        )}

        {visibleReviewsCount < reviews.length && (
          <div className="text-center">
            <Button
              onClick={() => setVisibleReviewsCount(visibleReviewsCount + 5)}
              className="my-4 font-cinzel text-customGreen font-medium bg-transparent text-2xl"
            >
              Show more reviews
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default BookDetail;
