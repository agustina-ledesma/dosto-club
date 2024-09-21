import React from "react";

const NotAuthorized = () => {
  return (
    <>
      <div className="m-2 text-center min-h-screen">
        <h1 className="text-danger-500 text-2xl my-4">Access denied</h1>
        <p className="text-gray-600 my-8">You do not have permission to access this page.</p>
      </div>
    </>
  );
};

export default NotAuthorized;
