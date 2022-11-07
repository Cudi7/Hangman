import React from "react";
import { useHangman } from "../contexts/hangman.context";

const InputText = () => {
  const { currentWord, guessedLetters } = useHangman();

  const parsedCurrentWord: string | null = currentWord
    ? currentWord?.name.toUpperCase().split(" ").join("_")
    : null;

  return (
    <div className="flex flex-wrap justify-start gap-2">
      {parsedCurrentWord?.split("").map((el, index) => (
        <p
          key={index}
          className={`${
            el === "_" ? "bg-transparent" : " bg-slate-100"
          }  h-[2rem] w-10 p-1 text-lg font-bold md:h-[3rem] md:p-2 md:text-3xl`}
        >
          <span
            className={`${
              guessedLetters.indexOf(el.toLowerCase()) !== -1 ? "" : "hidden"
            }`}
          >
            {el}
          </span>
        </p>
      ))}
    </div>
  );
};

export default InputText;
