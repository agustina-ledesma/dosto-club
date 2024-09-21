import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <div>
          <img
            src="/img/fp.png"
            alt="Logotype DOSTO'S CLUB"
            className="h-[300px]"
          />
          <h1 className="text-customGreen font-cinzel text-center font-medium text-4xl">
            Page not found
          </h1>
        </div>
        <div className="m-4 text-center">
          <p className="text-gray-600 text-center my-5 ">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <a
            href="/"
            className="text-center text-customGreen mt-8 font-medium font-cinzel text-2xl"
          >
            BACK TO HOME
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
