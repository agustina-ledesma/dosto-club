import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useAuth } from "../auth/AuthContext.jsx";
import { useAdmin } from "../auth/AdminContext.jsx";

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [userData, setUserData] = useState(null);
  const { user, logout } = useAuth();
  const { isAdmin } = useAdmin();

  useEffect(() => {
    if (user) {
      fetch(`https://api-dosto-club-2.onrender.com/user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [user]);

  return (
    <>
      <Navbar
        className="border-b-1 border-[#1F352C] w-full"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            className="lg:hidden rounded-none border-[#1F352C]"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
          <div className="hidden lg:flex py-4 pe-11 ms-3 border-e-1 border-[#1F352C] lg:w-[476px] ">
            <NavbarItem>
              <Link
                color="foreground"
                href="/"
                className="text-customGreen font-cinzel text-2xl font-medium"
              >
                DOSTO'S CLUB
              </Link>
            </NavbarItem>
          </div>
        </NavbarContent>
        <NavbarContent className="lg:hidden px-5 mx-8" justify="center">
          <NavbarBrand>
            <NavbarItem>
              <Link
                href="/"
                className="text-customGreen text-center font-cinzel font-medium ms-5"
              >
                DOSTO'S CLUB
              </Link>
            </NavbarItem>
          </NavbarBrand>
        </NavbarContent>
        {user ? (
          <>
            <NavbarContent as="div" justify="end">
              <div>
                <NavbarItem className="hidden lg:flex ms-11">
                  <Link href="/books" className="mx-5 text-customGreen">
                    BOOKS
                  </Link>
                  <Link href="/about" className="mx-5 text-customGreen">
                    ABOUT
                  </Link>
                </NavbarItem>
              </div>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform me-1"
                    color="default"
                    name={userData?.nombre || user.email}
                    size="sm"
                    src={
                      userData?.image
                        ? `https://api-dosto-club-2.onrender.com/${userData.image}`
                        : "/img/fp.png"
                    }
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">
                      Hi,{" "}
                      <span className="text-customGreen font-cinzel">
                        {userData?.nombre || user.email}
                      </span>
                    </p>
                  </DropdownItem>
                  <DropdownItem key="settings">
                    <NavbarItem>
                      <Link href="/profile" className="text-dark">
                        Profile
                      </Link>
                    </NavbarItem>
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    <Link href="#" onClick={logout} className="text-dark">
                      Log out
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          </>
        ) : (
          <>
            <NavbarContent justify="end" className="ms-11">
              <NavbarItem className="hidden lg:flex ms-11">
              <Link href="/books" className="mx-5 text-customGreen">
                  EXPLORE
                </Link>
                <Link href="/login" className="mx-5 text-customGreen">
                  LOG IN
                </Link>
                <span className="mx-1 text-customGreen">/</span>
                <Link href="/register" className="mx-5 text-customGreen">
                  SIGN UP
                </Link>
              </NavbarItem>
            </NavbarContent>
          </>
        )}

        <NavbarMenu>
          {user === null && (
            <NavbarItem>
              <Button as={Link} color="primary" href="/login" variant="flat">
                LOG IN
              </Button>
            </NavbarItem>
          )}
          <NavbarItem>
            <Link href="/" className="text-customGreen my-3">
              HOME
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/books" className="text-customGreen my-3">
              BOOKS
            </Link>
          </NavbarItem>
          {isAdmin && (
            <>
              <NavbarItem>
                <Link color="foreground" href="/dashboard" className="my-2">
                  DASHBOARD
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="/reviews" className="my-2">
                  REVIEWS
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default Nav;
