import React, { useState } from "react";
import { languages } from "./languages";

const Assembly = () => {
  const [words, setWords] = useState("react");
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  return (
    <main className="text-center w-md m-auto">
      <header className="w-md m-auto">
        <h1 className="text-3xl p-2">Assembly: Endgame</h1>
        <p className="text-sm p-2">
          Guess the word in under 8 attempts to keep the programming world save
          from the Assembly
        </p>
      </header>
      <section className="bg-green-500 w-sm m-auto p-1 rounded-md my-4 border">
        <h2 className="text-xl">You win!</h2>
        <p className="text-sm">well done</p>
      </section>
      <section className="flex flex-wrap justify-center gap-1 p-1 my-3">
        {languages.map((lan) => (
          <span
            style={{
              backgroundColor: lan.backgroundColor,
              color: lan.color,
            }}
            className="px-3 py-1 rounded-sm"
            key={lan.name}
          >
            {lan.name}
          </span>
        ))}
      </section>
      <section className="border p-2 flex gap-3 flex-wrap justify-center">
        {words.split("").map((word) => (
          <span
            className="p-2 text-md border-b-2"
            style={{
              backgroundColor: "#111",
            }}
            key={word}
          >
            {word.toUpperCase()}
          </span>
        ))}
      </section>
      <section className="flex flex-wrap justify-center p-3 w-md gap-1 my-2">
        {letters.map((letter) => (
          <button
            className="w-9 h-9 rounded-sm text-black bg-amber-600"
            key={letter}
          >
            {letter}
          </button>
        ))}
      </section>
      <button className="py-2 px-8 my-4 rounded-sm text-black bg-blue-600">New Game</button>
    </main>
  );
};

export default Assembly;
