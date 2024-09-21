import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardBody, Textarea, Button , Spinner} from "@nextui-org/react";

const ReportReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [comment, setComment] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);

  useEffect(() => {
    fetch(`https://api-dosto-club-2.onrender.com/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => setReview(data))
      .catch((error) => console.error("Error fetching review:", error));
  }, [id]);

  const handleReport = async () => {
    if (!token) {
      alert("Debes estar autenticado para reportar una reseña.");
      return;
    }

    try {
      const response = await fetch(
        `https://api-dosto-club-2.onrender.com/reviews/report/${review._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment,
            userId: user._id,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false); 
          navigate(-1); 
        }, 2000);
      } else {
        alert("Error al reportar la reseña: " + data.message);
      }
    } catch (error) {
      console.error("Error al reportar la reseña:", error);
      alert("Error al reportar la reseña.");
    }
  };

  if (!review) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="default" className="m-4" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center px-4 gap-4 min-h-screen ">
        {showSuccessMessage && (
          <div className="bg-green-100 w-full my-2 rounded-lg text-center">
            <p className="py-2 font-medium text-customGreen">Your report has been sent</p>
          </div>
        )}
        <div className="flex flex-col gap-4 max-w-3xl w-full">
          <h1 className="text-2xl font-medium text-customGreen font-cinzel ">Report review</h1>
          <Card>
            <CardBody>
              <p className="italic">
                <strong className="text-customGreen">Review:</strong> "{review.review}"
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="flex flex-col gap-4 max-w-3xl w-full">
          <h2 className="text-customGreen my-1 text-large">Why do you want to report this review?</h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe el motivo del reporte"
            className="w-full my-4 h-[200px] sm:h-[370px] lg:h-[250px] lg:max-h-[270px] border border-[#1F352C] p-2 resize-none"
          />
          <div className="flex justify-start">
            <button
              type="submit"
              className="w-[200px] h-[44px] self-end border border-[#1F352C] rounded-md text-[#1F352C] bg-transparent hover:bg-[#1F352C] hover:text-white font-semibold transition-colors duration-300"
              onClick={handleReport}
            >
              Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportReview;

