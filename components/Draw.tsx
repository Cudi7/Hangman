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
        <div className="relative  h-1 w-[60px] bg-slate-900 md:h-2 md:w-[120px]">
          {failedLetters.length >= 4 ? (
            <div className="absolute right-0 h-[15px] w-1 bg-slate-900 md:h-[30px] md:w-2">
              {failedLetters.length >= 6 ? (
                <div className="absolute left-[-8px] top-3 h-5 w-5 rounded-full bg-slate-900 md:top-7 md:-left-4 md:h-10 md:w-10">
                  {failedLetters.length >= 7 ? (
                    <div className="absolute left-[0.6rem] top-3 h-[50px] w-[0.12rem] bg-slate-900 md:left-[1.15rem] md:top-7 md:h-[100px] md:w-1">
                      {failedLetters.length >= 8 ? (
                        <div className="absolute top-[50%] left-[-1.5rem] h-[0.12rem]  w-[50px] bg-slate-900 md:left-[-3rem] md:h-1 md:w-[100px]">
                          <>
                            {failedLetters.length >= 9 ? (
                              <div className="absolute  right-[-2px] bottom-[-2rem] h-[0.12rem] w-[30px] rotate-45 bg-slate-900 md:bottom-[-4.2rem] md:h-1 md:w-[60px]"></div>
                            ) : null}
                            {failedLetters.length >= 10 ? (
                              <div className="absolute right-[22px] bottom-[-2rem] h-[0.12rem] w-[30px] -rotate-45 bg-slate-900 md:right-[42px] md:bottom-[-4.2rem] md:h-1 md:w-[60px]"></div>
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
        <div className="relative h-[125px] w-1 bg-slate-900 md:h-[250px] md:w-2">
          {failedLetters.length >= 5 ? (
            <div className="absolute left-[0.5rem] top-[-0.3rem] h-[20px] w-1 rotate-[45deg]  bg-slate-900 md:top-[-0.6rem] md:left-[1rem] md:h-[45px] md:w-2"></div>
          ) : null}
        </div>
      ) : null}

      {failedLetters.length >= 1 ? (
        <div className=" h-1 w-[125px] bg-slate-900 md:h-2 md:w-[250px]"></div>
      ) : null}
    </div>
  );
};

export default Draw;
