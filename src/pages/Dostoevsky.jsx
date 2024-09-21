import React, { useState } from "react";

export const Dostoevsky = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] w-full h-screen">
        <div className="flex flex-col md:border-r border-[#1F352C] sm:border-0 p-4">
          <div className="max-w-[200px] mx-auto">
            <img alt="Last photo of Fyodor Dostoevsky 6 months before his death." className="w-full h-auto object-cover" src="/img/fyodor-ultima-foto.jpeg" />
          </div>
          <h2 className="text-customGreen font-medium text-center my-4">Фёдор Миха́йлович Достое́вский</h2>
          <p className="italic text-gray-600 m-2">Last photo of Dostoyevksy, shot 6 months before his death on 9 February 1881.</p>
        </div>

        <div className="m-5 flex flex-col my-2">
          <h1 className="text-2xl text-customGreen my-4 font-cinzel font-medium">
            Fyodor Dostoevsky
          </h1>
          <small className="text-customGreen font-semibold">1821 - 1881</small>
          <p className="my-4 text-gray-600 font-cinzel">
            Fyodor Dostoyevsky, born on November 11, 1821 in Moscow, is
            considered one of the greatest writers of world literature. His
            life, marked by personal tragedies, illnesses and economic
            difficulties, forged a profound insight into human nature and
            suffering. As a young man, Dostoyevsky was attracted to the radical
            political ideas of the time, which led to his arrest and death
            sentence. However, minutes before his execution, his sentence was
            commuted to hard labor in Siberia, an experience that transformed
            his life and work. That time in exile, along with his struggle with
            epilepsy and gambling addiction, fueled the psychological darkness
            that characterizes his novels.
          </p>
          <p className="my-4 text-gray-600 font-cinzel">
            Dostoyevsky is known for his philosophical and psychological
            explorations in works such as Crime and Punishment, The Idiot, The
            Brothers Karamazov, and Demons. Its characters, caught between moral
            and existential dilemmas, confront the depths of the human soul,
            touching on themes such as faith, guilt, free will and redemption.
          </p>
          <p className="my-4 text-gray-600 font-cinzel">
            Throughout his life, Dostoyevsky became an influential figure not
            only for his novels, but also for his ability to examine human
            complexity. His legacy lives on, being a source of inspiration for
            readers and thinkers around the world.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dostoevsky;
