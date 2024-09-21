import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "./auth/AuthContext"; // Importa el AuthProvider
import { AdminProvider } from "./auth/AdminContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <AuthProvider>
          <AdminProvider>
          <App />
          </AdminProvider>
         
        </AuthProvider>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
