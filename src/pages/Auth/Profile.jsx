import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab, Avatar } from "@nextui-org/react";
import ReadingTab from "./ReadingTab";
import FavoriteTab from "./FavoriteTab";
import MyReviewsTab from "./MyReviewsTab";
import { EditIcon } from "../../components/EditIcon";
import {
  Button,
  Chip,
  Tooltip,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("reading");
  const [userProfile, setUserProfile] = useState({
    nombre: "",
    biografia: "",
    image: "",
  });
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `https://api-dosto-club-2.onrender.com/user/${storedUser._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserProfile({
          nombre: data.nombre || "",
          biografia: data.biografia || "",
          image: data.image || "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserProfile();
  }, [storedUser._id]);

  const renderContent = () => {
    switch (activeTab) {
      case "reading":
        return <ReadingTab />;
      case "favorites":
        return <FavoriteTab />;
      case "reviews":
        return <MyReviewsTab />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="default" size="xl" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_4fr] w-full min-h-screen md:border-b border-[#1F352C]">
        <div className="flex flex-col lg:border-r-1 md:border-b-0 border-[#1F352C] py-4">
          <div className="flex justify-end my-2">
            <Link to={`/update-profile/${storedUser._id}`} className="mx-3">
              <EditIcon />
            </Link>
          </div>

          <div className="flex flex-col items-center mx-3">
            <Avatar
              isBordered
              color="default"
              src={
                userProfile.image
                  ? `https://api-dosto-club-2.onrender.com/${userProfile.image}`
                  : "/img/fp.png"
              }
              className="w-32 h-32 text-large"
            />
            <h1 className="my-2 text-center font-cinzel text-customGreen text-lg font-medium">
              {userProfile.nombre || storedUser.email}
            </h1>
            <p className="text-customGreen text-sm">
              {userProfile.biografia || "Biography not available."}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <Tabs
            aria-label="Options"
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              tab: "max-w-fit px-3 h-12",
              tabContent: "group-data-[selected=true]:text-[#1F352C]",
            }}
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
          >
            <Tab key="reading" title="Reading" />
            <Tab key="favorites" title="Favorites" />
            <Tab key="reviews" title="Reviews" />
          </Tabs>
          <div>{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

export default Profile;

