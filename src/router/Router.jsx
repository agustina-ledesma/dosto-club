import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import Profile from "../pages/Auth/Profile";
import Dashboard from "../pages/Admin/Dashboard";
import { AdminProvider } from "../auth/AdminContext";
import AdminRoute from "../PrivateRoutes/AdminRoute";
import NotAuthorized from "../pages/NoAuthorized";
import CreateBook from "../pages/Admin/CreateBook";
import EditBook from "../pages/Admin/EditBook";
import Books from "../pages/Books";
import BookDetail from "../pages/BookDetail";
import ReportReview from "../pages/Auth/ReportReview";
import Reviews from "../pages/Admin/Reviews";
import ReportDetails from "../pages/Admin/ReportDetails";
import Register from "../pages/Register";
import UploadEpub from "../pages/Admin/UploadEpub";
import Read from "../pages/Read";
import { Review } from "../pages/Auth/Review";
import EditMyReview from "../pages/Auth/EditMyReview";
import EditProfile from "../pages/Auth/EditProfile";
import Dostoevsky from "../pages/Dostoevsky";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Fragment>
            <Nav />
            
            <Outlet />
            <Footer />
          </React.Fragment>
        }
      > 
        
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dostoevsky" element={<Dostoevsky />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/report-review/:id"
          element={
            <PrivateRoute>
              <ReportReview />
            </PrivateRoute>
          }
        />
        <Route
          path="/read/:id"
          element={
            <PrivateRoute>
              <Read />
            </PrivateRoute>
          }
        />

        <Route
          path="/review/:id"
          element={
            <PrivateRoute>
              <Review />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-review/:id"
          element={
            <PrivateRoute>
              <EditMyReview />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-profile/:id"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        {/*  ADMIN  */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/create-book"
          element={
            <PrivateRoute>
              <AdminRoute>
                <CreateBook />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-book/:id"
          element={
            <PrivateRoute>
              <AdminRoute>
                <EditBook />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/upload-epub/:id"
          element={
            <PrivateRoute>
              <AdminRoute>
                <UploadEpub />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <PrivateRoute>
              <AdminRoute>
                <Reviews />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/report-details/:id"
          element={
            <PrivateRoute>
              <AdminRoute>
                <ReportDetails />
              </AdminRoute>
            </PrivateRoute>
          }
        />
      </Route>
      
    </Routes>
  );
};
