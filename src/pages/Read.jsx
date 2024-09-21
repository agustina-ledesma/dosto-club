import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ReactReader } from "react-reader";
import { Button, Tooltip, Spinner } from "@nextui-org/react";

export const Read = () => {
  const { id } = useParams();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const getToken = () => localStorage.getItem("token");
  const token = getToken();
  const [epubUrl, setEpubUrl] = useState("");
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [fontSize, setFontSize] = useState("150%");
  const [loading, setLoading] = useState(true);
  const rendition = useRef(null);

  useEffect(() => {
    const markBookAsReading = async () => {
      try {
        const userId = storedUser._id;
        const response = await fetch(
          `https://api-dosto-club-2.onrender.com/user/${userId}/book/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: "reading" }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error marking book as reading:", error);
      }
    };

    const fetchEpub = async () => {
      try {
        const response = await fetch(`https://api-dosto-club-2.onrender.com/epub-book/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEpubUrl(`https://api-dosto-club-2.onrender.com/${data.filePath}`);

        const savedLocation = localStorage.getItem(`epub-location-${id}`);
        if (savedLocation) {
          setLocation(savedLocation);
        }

        const savedFontSize = localStorage.getItem(`epub-font-size-${id}`);
        if (savedFontSize) {
          setFontSize(savedFontSize);
        }

        await markBookAsReading();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching EPUB data", error);
        setLoading(false);
      }
    };

    fetchEpub();
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`epub-font-size-${id}`, fontSize);

    if (rendition.current) {
      rendition.current.themes.fontSize(fontSize);
    }
  }, [fontSize, id]);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem(`epub-location-${id}`, newLocation);
  };

  const handleRendition = (r) => {
    rendition.current = r;
    if (rendition.current) {
      rendition.current.themes.fontSize(fontSize);
    }
  };

  return (
    <>
      <div className="relative w-full h-screen p-4">
        <div className="absolute top-4 right-4 flex space-x-1 z-10">
          <Tooltip content="Zoom out">
            <Button
              onClick={() => setFontSize("150%")}
              className="bg-transparent-200 text-gray-600"
              isIconOnly
            >
              <i className="bx bxs-zoom-out bx-sm"></i>
            </Button>
          </Tooltip>
          <Tooltip content="Zoom in">
            <Button
              onClick={() => setFontSize("200%")}
              className="bg-transparent-200 text-gray-600"
              isIconOnly
            >
              <i className="bx bxs-zoom-in bx-sm"></i>
            </Button>
          </Tooltip>
        </div>

        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner color="default" className="m-4" />
          </div>
        ) : (
          <ReactReader
            url={epubUrl}
            location={location}
            locationChanged={handleLocationChange}
            getRendition={handleRendition}
          />
        )}
      </div>
    </>
  );
};

export default Read;

