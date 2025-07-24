import React, { useState } from "react";
import { languages } from "./languages";

const MAX_WRONG_GUESSES = 8;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Assembly = () => {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wrongGuessCount = guessedLetters.filter(
    (l) => !currentWord.includes(l.toLowerCase())
  ).length;

  const gameWon = currentWord
    .split("")
    .every((l) => guessedLetters.includes(l.toUpperCase()));
  const gameLost = wrongGuessCount >= MAX_WRONG_GUESSES;
  const gameOver = gameWon || gameLost;

  const handleLetterClick = (letter) => {
    if (!guessedLetters.includes(letter) && !gameOver) {
      setGuessedLetters((prev) => [...prev, letter]);
    }
  };

  const handleNewGame = () => {
    const random = Math.floor(Math.random() * languages.length);
    setCurrentWord(languages[random].name.toLowerCase());
    setGuessedLetters([]);
  };

  const farewellLanguages = languages.slice(0, wrongGuessCount);

  return (
    <main className="max-w-xl mx-auto text-center px-4 py-6 text-white">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Assembly: Endgame</h1>
        <p className="text-sm mt-1">
          Guess the word in under 8 attempts or witness fallen languages fade away...
        </p>
      </header>

      {/* Game Status Banner */}
      {gameOver && (
        <section
          className={`rounded-md border p-3 mb-4 ${
            gameWon
              ? "bg-green-600 border-green-800"
              : "bg-red-600 border-red-800"
          }`}
        >
          <h2 className="text-xl font-semibold">
            {gameWon ? "You win! 🎉" : "Game Over 💀"}
          </h2>
          <p className="text-sm">
            {gameWon ? "Well done, you preserved a legacy." : "The code is lost forever."}
          </p>
        </section>
      )}

      {/* Farewell Dead Languages */}
      {!gameOver && wrongGuessCount > 0 && (
        <section className="bg-blue-800 rounded-md border border-blue-400 p-2 mb-3">
          <p className="text-sm mb-1">Farewell, lost languages 🫡</p>
          <div className="flex flex-wrap gap-2 justify-center text-xs">
            {farewellLanguages.map((lang, index) => (
              <span key={index} className="bg-blue-950 px-2 py-1 rounded-md">
                {lang.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Word Display */}
      <section className="flex justify-center gap-2 mb-4">
        {currentWord.split("").map((letter, index) => (
          <span
            key={index}
            className="w-10 h-10 bg-gray-900 border-b-2 border-white flex items-center justify-center text-lg font-mono"
          >
            {guessedLetters.includes(letter.toUpperCase())
              ? letter.toUpperCase()
              : ""}
          </span>
        ))}
      </section>

      {/* Keyboard */}
      <section className="flex flex-wrap justify-center gap-1 mb-4">
        {LETTERS.map((letter) => {
          const isGuessed = guessedLetters.includes(letter);
          const isCorrect = currentWord.includes(letter.toLowerCase());
          const color = isGuessed
            ? isCorrect
              ? "bg-green-600"
              : "bg-red-600"
            : "bg-yellow-500";

          return (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              disabled={isGuessed || gameOver}
              className={`w-9 h-9 rounded text-black font-bold ${color} disabled:opacity-50`}
            >
              {letter}
            </button>
          );
        })}
      </section>

      {/* Language Visuals */}
      <section className="flex flex-wrap justify-center gap-2 mb-4">
        {languages.map((lang, idx) => {
          const isDead = idx < wrongGuessCount;
          return (
            <span
              key={lang.name}
              className="px-3 py-1 rounded-md text-sm"
              style={{
                backgroundColor: lang.backgroundColor,
                color: lang.color,
                opacity: isDead ? 0.4 : 1,
              }}
            >
              {isDead ? "💀" : lang.name}
            </span>
          );
        })}
      </section>

      {gameOver && (
        <button
          onClick={handleNewGame}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white mt-2"
        >
          🔁 New Game
        </button>
      )}
    </main>
  );
};

export default Assembly;
