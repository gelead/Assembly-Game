import React, { useState } from "react";
import { languages } from "./languages";

const Assembly = () => {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);
  function addGuessedLetters(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter.toLowerCase())
  ).length;
  const gameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter.toUpperCase()));
  const gameLost = wrongGuessCount == 8;
  const handleNewGame = () => {
    setGuessedLetters((prevLetters) =>
    []
    );
  };
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
        <h1 className="text-2xl p-1">Assembly: Endgame</h1>
        <p className="text-sm p-2">
          Guess the word in under 8 attempts to keep the programming world save
          from the Assembly
        </p>
      </header>

      {gameWon && (
        <section className="bg-green-500 w-sm m-auto p-1 rounded-md my-2 border">
          <h2 className="text-xl">You win!</h2>
          <p className="text-sm">well done</p>
        </section>
      )}
      {gameLost && (
        <section className="bg-red-500 text-black w-sm m-auto p-1 rounded-md my-2 border">
          <h2 className="text-xl">Game Over</h2>
          <p className="text-sm">try again!</p>
        </section>
      )}
      <section className="flex flex-wrap justify-center gap-1 p-1 my-2">
        {languages.map((lan, index) => {
          const wrongItem = wrongGuessCount > index;
          return (
            <span
              style={{
                backgroundColor: lan.backgroundColor,
                color: lan.color,
              }}
              className="px-3 py-1 rounded-sm"
              key={lan.name}
            >
              {wrongItem ? "💀" : lan.name}
            </span>
          );
        })}
      </section>
      <section className="p-2 flex gap-2 flex-wrap justify-center">
        {currentWord.split("").map((letter, index) => (
          <span
            className=" w-10 h-9 flex items-center justify-center text-md border-b-2"
            style={{
              backgroundColor: "#111",
            }}
            key={index}
          >
            {guessedLetters.includes(letter.toUpperCase())
              ? letter.toUpperCase()
              : ""}
          </span>
        ))}
      </section>
      <section className="flex flex-wrap justify-center p-3 w-md gap-1 my-2">
        {letters.map((letter) => {
          const isGuessed = guessedLetters.includes(letter);
          const isCorrect =
            isGuessed && currentWord.includes(letter.toLowerCase());

          return (
            <button
              onClick={() => addGuessedLetters(letter)}
              className="w-9 h-9 rounded-sm text-black"
              style={{
                backgroundColor: isGuessed
                  ? isCorrect
                    ? "green"
                    : "red"
                  : "#f59e0b",
              }}
              key={letter}
            >
              {letter}
            </button>
          );
        })}
      </section>
      <button
        onClick={() => handleNewGame}
        className="py-2 px-8 my-4 rounded-sm text-black bg-blue-600"
      >
        New Game
      </button>
    </main>
  );
};

export default Assembly;
