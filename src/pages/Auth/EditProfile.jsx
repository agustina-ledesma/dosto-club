import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input, Textarea, Button } from "@nextui-org/react";

const EditProfile = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [biografia, setBiografia] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const getToken = () => localStorage.getItem("token");
  const navigate = useNavigate();

  // Obtener la información del usuario
  const fetchUserData = async () => {
    const token = getToken();
    try {
      const response = await fetch(`https://api-dosto-club-2.onrender.com/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userData = await response.json();
      setNombre(userData.nombre || "");
      setBiografia(userData.biografia || "");
      if (userData.image) {
        setCurrentImage(`https://api-dosto-club-2.onrender.com/${userData.image}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const handleFileChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleRemoveImage = async () => {
    const token = getToken();
    try {
      const response = await fetch(`https://api-dosto-club-2.onrender.com/update-profile-image/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCurrentImage("");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = getToken();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("biografia", biografia);
    if (avatar) {
      formData.append("image", avatar);
    }

    try {
      const response = await fetch(
        `https://api-dosto-club-2.onrender.com/update-profile/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Profile updated");
        navigate("/profile");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <div className="m-3 flex justify-center">
        <div className="w-full max-w-2xl">
          <h1 className="font-cinzel text-2xl m-4 text-customGreen font-medium">Edit Profile</h1>
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              {currentImage && (
                <div className="w-full my-3 text-center">
                  <img
                    src={currentImage}
                    alt="Current profile"
                    className="w-32 h-32 object-cover rounded-full border-2 border-[#1F352C] mx-auto"
                  />
                  <div className="flex justify-center items-center mt-4">
                    <Button size="sm" color="danger" onClick={handleRemoveImage}>
                      Remove image
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full my-3">
              <input
                type="file"
                name="image"
                className="w-full border p-3 rounded-lg"
                onChange={handleFileChange}
              />
            </div>
            <Input
              type="text"
              label="Name"
              variant="bordered"
              name="nombre"
              id="nombre"
              className="w-full"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <div className="w-full my-3">
              <Textarea
                label="Biography"
                variant="bordered"
                className="w-full"
                name="biografia"
                value={biografia}
                onChange={(e) => setBiografia(e.target.value)}
              />
            </div>
            <div className="w-full my-3">
              <button
                type="submit"
                className="w-[200px] h-[44px] border border-[#1F352C] rounded-md text-[#1F352C] bg-transparent hover:bg-[#1F352C] hover:text-white font-semibold transition-colors duration-300"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
