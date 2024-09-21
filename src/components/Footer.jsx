import React, { useEffect, useState } from "react";

export const Footer = () => {
  return (
    <>
       <div className="flex flex-col justify-center items-center bottom-0">
          <small className="text-center text-customGreen pt-4 justify-center items-center py-3">
            © 2024 Dosto's Club. All rights reserved.
          </small>
          <small className="text-customGreen text-xs m-1">Made by Archive Agustina</small>
        </div>
    </>
  );
};

export default Footer;
