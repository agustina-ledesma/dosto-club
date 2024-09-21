import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useLocation, Link } from "react-router-dom";

// Mapeo de rutas estáticas a nombres amigables
const staticRouteNames = {
  "/": "Home",
  "/books": "Books",
  "/profile": "Profile",
  "/login": "Login",
  "/register": "Register",
  "/dostoevsky": "Dostoevsky",
};

// Mapeo de rutas base de rutas dinámicas a nombres amigables
const dynamicRouteBaseNames = {
  "/book/:id": "Book Details",
  "/review/:id": "Reviews",
  "/edit-review": "Edit Review",
  "/update-profile": "Update Profile",
};

const CustomBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Construir la ruta base sin parámetros para rutas dinámicas
  const getBasePath = (pathname) => {
    return pathname.split("/").slice(0, -1).join("/") || "/";
  };

  return (
    <Breadcrumbs>
      <BreadcrumbItem>
        <Link to="/">Home</Link>
      </BreadcrumbItem>

      {pathnames.map((value, index) => {
        // Construir la ruta hasta el índice actual
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const basePath = getBasePath(to);
        const isDynamicRoute = Object.keys(dynamicRouteBaseNames).includes(basePath);

        // Nombre amigable para rutas estáticas y dinámicas
        const displayName = staticRouteNames[to] || (isDynamicRoute ? dynamicRouteBaseNames[basePath] : value);

        return (
          <BreadcrumbItem key={to}>
            {index === pathnames.length - 1 ? (
              displayName // Nombre sin enlace para la última ruta
            ) : (
              <Link to={to}>{displayName}</Link> // Enlace para las rutas base y estáticas
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;


