import React from "react";
import { useHangman } from "../contexts/hangman.context";

const Draw = () => {
  const { failedLetters, handleGameOver } = useHangman();

  if (failedLetters.length === 11) {
    handleGameOver();
  }

  return (
    <div className="relative">
      {failedLetters.length >= 3 ? (
        <div className="relative h-2 w-[120px] bg-slate-900">
          {failedLetters.length >= 4 ? (
            <div className="absolute right-0 h-[30px] w-2 bg-slate-900">
              {failedLetters.length >= 6 ? (
                <div className="absolute -left-4 top-7 h-10 w-10 rounded-full bg-slate-900">
                  {failedLetters.length >= 7 ? (
                    <div className="absolute left-[1.15rem] top-7 h-[100px] w-1 bg-slate-900">
                      {failedLetters.length >= 8 ? (
                        <div className="absolute top-[50%] left-[-3rem] h-1 w-[100px] bg-slate-900">
                          <>
                            {failedLetters.length >= 9 ? (
                              <div className="absolute  right-[-2px] bottom-[-4.2rem] h-1 w-[60px] rotate-45 bg-slate-900"></div>
                            ) : null}
                            {failedLetters.length >= 10 ? (
                              <div className="absolute right-[42px] bottom-[-4.2rem] h-1 w-[60px] -rotate-45 bg-slate-900"></div>
                            ) : null}
                          </>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {failedLetters.length >= 2 ? (
        <div className="relative h-[250px] w-2 bg-slate-900">
          {failedLetters.length >= 5 ? (
            <div className="absolute left-[1rem] top-[-0.6rem] h-[45px] w-2 rotate-[45deg] bg-slate-900"></div>
          ) : null}
        </div>
      ) : null}

      {failedLetters.length >= 1 ? (
        <div className="h-2 w-[250px] bg-slate-900"></div>
      ) : null}
    </div>
  );
};

export default Draw;
