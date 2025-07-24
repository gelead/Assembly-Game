import React, { useState, useEffect } from "react";
import { languages } from "./languages";
import winSoundFile from "../assets/win.wav";
import loseSoundFile from "../assets/lose.wav";

const getRandomWord = (difficulty) => {
  const filtered =
    difficulty === "easy"
      ? languages.filter((l) => l.name.length <= 5)
      : difficulty === "hard"
      ? languages.filter((l) => l.name.length > 8)
      : languages;
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index].name.toLowerCase();
};

const Assembly = () => {
  const [currentWord, setCurrentWord] = useState(getRandomWord("medium"));
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [difficulty, setDifficulty] = useState("medium");
  const [score, setScore] = useState(
    parseInt(localStorage.getItem("assemblyScore")) || 0
  );

  const winSound = new Audio(winSoundFile);
  const loseSound = new Audio(loseSoundFile);

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter.toLowerCase())
  ).length;

  const gameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter.toUpperCase()));
  const gameLost = wrongGuessCount === 8;
  const gameOver = gameWon || gameLost;

  useEffect(() => {
    if (gameWon) {
      winSound.play();
      const newScore = score + 10;
      setScore(newScore);
      localStorage.setItem("assemblyScore", newScore);
    }
    if (gameLost) {
      loseSound.play();
      const newScore = Math.max(0, score - 5);
      setScore(newScore);
      localStorage.setItem("assemblyScore", newScore);
    }
  }, [gameWon, gameLost]);

  const handleNewGame = () => {
    setGuessedLetters([]);
    const newWord = getRandomWord(difficulty);
    setCurrentWord(newWord);
  };

  const handleHint = () => {
    const unguessed = currentWord
      .split("")
      .filter((l) => !guessedLetters.includes(l.toUpperCase()));
    if (unguessed.length > 0) {
      const hintLetter = unguessed[Math.floor(Math.random() * unguessed.length)].toUpperCase();
      setGuessedLetters((prev) => [...prev, hintLetter]);
    }
  };

  const addGuessedLetters = (letter) => {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  };

  const fareWells = languages.slice(0, wrongGuessCount).map((l) => l.name);
  const fareWellDisplay = (
    <section className="flex justify-center items-center gap-2">
      <p className="text-white">Fare well:</p>
      <section className="flex gap-1 text-sm flex-wrap">
        {fareWells.map((fare, index) => (
          <span key={index} className="text-gray-300 italic">{fare}</span>
        ))}
      </section>
      <p>🫡</p>
    </section>
  );

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <main className="text-center w-md m-auto">
      <header>
        <h1 className="text-2xl p-2">Assembly: Endgame</h1>
        <p className="text-sm">
          Guess the dead language before it's too late.
        </p>
        <p className="text-sm text-yellow-300 mt-2">Score: {score}</p>
        <div className="my-2">
          <label className="mr-2 text-sm">Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="p-1 rounded bg-gray-700 text-white"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </header>

      {gameOver ? (
        <section
          className={`${
            gameWon ? "bg-green-500" : "bg-red-500"
          } text-black w-sm m-auto p-2 rounded-md my-2 border`}
        >
          <h2 className="text-xl">{gameWon ? "You win!" : "Game Over"}</h2>
          <p className="text-sm">
            {gameWon ? "Well done!" : "Try again!"}
          </p>
        </section>
      ) : (
        wrongGuessCount > 0 && (
          <section className="bg-blue-500 w-sm m-auto p-2 rounded-md my-2 border">
            {fareWellDisplay}
          </section>
        )
      )}

      <section className="flex flex-wrap justify-center gap-1 p-1 my-2">
        {languages.map((lan, index) => {
          const wrongItem = wrongGuessCount > index;
          return (
            <span
              style={{
                backgroundColor: lan.backgroundColor,
                color: lan.color,
                opacity: wrongItem ? 0.3 : 1,
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
            className="w-10 h-9 flex items-center justify-center text-md border-b-2 bg-gray-900 text-white"
            key={index}
          >
            {guessedLetters.includes(letter.toUpperCase()) ? letter.toUpperCase() : ""}
          </span>
        ))}
      </section>

      <section className="flex flex-wrap justify-center p-3 gap-1 my-2">
        {letters.map((letter) => {
          const isGuessed = guessedLetters.includes(letter);
          const isCorrect =
            isGuessed && currentWord.includes(letter.toLowerCase());

          return (
            <button
              onClick={() => addGuessedLetters(letter)}
              className="w-9 h-9 rounded-sm text-black"
              disabled={isGuessed || gameOver}
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

      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={handleNewGame}
          className="py-2 px-6 rounded-sm text-white bg-blue-600"
        >
          New Game
        </button>
        {!gameOver && (
          <button
            onClick={handleHint}
            className="py-2 px-6 rounded-sm text-white bg-purple-600"
          >
            Hint 🧠
          </button>
        )}
      </div>
    </main>
  );
};

export default Assembly;
