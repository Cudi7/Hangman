import React, { ChangeEvent, useEffect, useState } from "react";
import { useHangman } from "../contexts/hangman.context";

const letters = "QWERTYUIOPASDFGHJKLZXCVBNM".toLowerCase().split("");

const rightAnswerUrl = "./sounds/right_answer.wav";
const wrongAnswerUrl = "./sounds/wrong_answer.wav";

interface currentWordStatus {
  letter: string;
  found: boolean;
}

const checkIfWordGuessed = (arr: currentWordStatus[]) => {
  return arr.length ? arr.every((el) => el.found) : false;
};

const Keyboard = () => {
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
  const [currentWordStatus, setCurrentWordStatus] = useState<
    currentWordStatus[]
  >([]);

  const { currentWord, handleFailedLetters, handleGuessedLetters, handleWon } =
    useHangman();

  useEffect(() => {
    if (currentWord) {
      const wordOptions = currentWord?.name
        .toLowerCase()
        .split(" ")
        .join("")
        .split("")
        .map((letter) => ({ letter, found: false }));

      setCurrentWordStatus(wordOptions);
    }
  }, []);

  const rightAnswerAudio: HTMLAudioElement = new Audio(rightAnswerUrl);
  const wrongAnswerAudio: HTMLAudioElement = new Audio(wrongAnswerUrl);

  const handleCurrentGuessedWordLetters = (letter: string): void => {
    const currentStatus = currentWordStatus.map((el) => {
      return el.letter === letter ? { ...el, found: !el.found } : { ...el };
    });
    setCurrentWordStatus(currentStatus);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const userInputLetter = e.currentTarget.value;

    if (currentWord?.name.toLowerCase().indexOf(userInputLetter) !== -1) {
      handleCurrentGuessedWordLetters(userInputLetter);
      rightAnswerAudio.play();
      handleGuessedLetters(userInputLetter);
    } else {
      wrongAnswerAudio.play();
      handleFailedLetters(userInputLetter);
    }

    disableLetter(userInputLetter);
  };

  const disableLetter = (letter: string): void => {
    setDisabledLetters([...disabledLetters, letter]);
  };

  const wordGuessed: boolean = checkIfWordGuessed(currentWordStatus);
  wordGuessed && handleWon();

  return (
    <div className=" flex flex-wrap gap-1  text-4xl">
      {letters.map((letter, index) => {
        if (disabledLetters.indexOf(letter.toLowerCase()) === -1) {
          return (
            <button
              key={letter + index}
              className=" cursor-pointer  rounded-xl border-black bg-slate-100 p-5 transition hover:text-blue-600 focus:-translate-y-1 active:translate-x-1"
              onClick={handleClick}
              value={letter}
            >
              {letter.toUpperCase()}
            </button>
          );
        } else {
          return (
            <button
              key={letter + index}
              className=" pointer-events-none rounded-xl border-black bg-slate-300 p-5 text-slate-400 opacity-60 "
            >
              {letter.toUpperCase()}
            </button>
          );
        }
      })}
    </div>
  );
};

export default Keyboard;
