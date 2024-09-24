import React from "react";
import { Button, Link, Input } from "@nextui-org/react";
import { VelocityScroll } from "../components/magicui/VelocityScroll";
import CustomBreadcrumbs from "../components/CustomBreadcrumbs";
export const Home = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row ">
        <div className="lg:w-1/2 lg:border-r-1 border-[#1F352C] flex flex-col">
          <div className="flex flex-col flex-1 mt-3">
            <h1 className="font-medium mt-10 mx-5 text-customGreen text-4xl my-10">
              WELCOME, <span className="mx-2">мой друг</span>
            </h1>
            <p className="mx-5 my-2 text-gray-600 font-cinzel">
              Immerse yourself in the universe of Fyodor Dostoyevsky in a
              completely new way.
            </p>
            <p className="my-2 mx-5 text-gray-600 font-cinzel ">Discover his literary work in digital format,
              with an exclusive selection of his classics in EPUB. At Dosto's
              Club, we want to bring Dostoyevsky's concepts and legacy into a
              modern era, offering you a unique experience to explore his
              timeless writings.</p>
          </div>

          <a
            href="#your-link"
            className="block border-t-1 border-b-1 lg:border-b-0 border-[#1F352C]
            text-center p-4 mt-5 text-3xl font-cinzel 
            transition-colors duration-300
          bg-[#1F352C] text-white 
          md:bg-white md:text-[#1F352C] md:hover:bg-[#1F352C] md:hover:text-white"
          >
            FIND YOUR DISCUSSION GROUP
          </a>
        </div>
        <div className="lg:w-1/2 flex flex-col h-full">
          <div>
            <a
              href="/about"
              className="block py-6 bg-white text-[#1F352C] group hover:bg-[#1F352C] hover:text-white transition-colors duration-300"
            >
              <div className="flex items-center mx-2 my-6">
                <span className="w-3 h-3 bg-[#1F352C] inline-block mr-2 group-hover:bg-white transition-colors duration-300"></span>
                <small className="text-sm group-hover:text-white transition-colors duration-300">
                  ABOUT US
                </small>
              </div>
              <VelocityScroll
                text="DOSTO'S CLUB"
                default_velocity={5}
                className="text-center text-4xl font-cinzel font-medium tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem] group-hover:text-white transition-colors duration-300"
              />
            </a>
          </div>
          <div className="flex-grow bg-[#1F352C]">
            <div className="mx-5">
              <img
                src="/img/fyodor.png"
                alt="Last photo of Fyodor Dostoevsky 6 months before his death."
                className="max-w-full max-h-[620px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-1 border-b border-[#1F352C] grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-center md:justify-start">
          <p className="text-center md:text-left m-5 text-customGreen">
            GET THE LATEST NEWS FROM DOSTO'S CLUB
          </p>
        </div>
        <div className="flex border border-[#1F352C] overflow-hidden m-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 p-3 outline-none border-none"
          />
          <button
            type="submit"
            className="bg-[#1F352C] text-white p-3 border-none cursor-pointer"
          >
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
