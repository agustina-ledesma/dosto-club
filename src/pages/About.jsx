import React from "react";
import { VelocityScroll } from "../components/magicui/VelocityScroll";

const About = () => {
  return (
    <>
      <div className="min-h-screen md:border-b border-[#1F352C]">
        <div className="flex flex-col items-center justify-center mx-4">
          <img
            src="/img/fp.png"
            alt="Logotype DOSTO'S CLUB"
            className="h-[300px]"
          />
          <h1 className="text-customGreen font-cinzel text-center font-medium text-4xl">
            DOSTO'S CLUB
          </h1>
        </div>
        <div className="my-20">
        <p className="text-gray-700 m-4 font-cinzel text-center">
          Dosto's Club is an online library dedicated to fans of the literature
          of Fyodor Dostoevsky. Our mission is to bring the profound concepts
          and emotional richness of Dostoevsky to a modern audience, offering a
          vast collection of ePubs of his most iconic works. From Crime and
          Punishment to The Brothers Karamazov, our library allows readers to
          explore Dostoevsky's complex literary universe in digital format.
        </p>
        <p className="my-3 text-gray-700 m-4 font-cinzel text-center ">
          Enjoy comfortable reading in any ePub compatible device, such as
          e-readers, tablets and smartphones.
        </p>
      </div>
      </div>
    </>
  );
};

export default About;
