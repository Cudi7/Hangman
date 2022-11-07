import type { NextPage } from "next";
import Head from "next/head";
import { useRef } from "react";
import Draw from "../components/Draw";
import Footer from "../components/Footer";
import InputText from "../components/InputText";
import Keyboard from "../components/Keyboard";
import Timer from "../components/Timer";
import { useHangman } from "../contexts/hangman.context";

const displayMessage = (message: string) => (
  <h2 className="my-4 mt-10 max-w-2xl text-3xl font-bold md:text-4xl lg:text-5xl">
    {message}
  </h2>
);

const winGameUrl = "./sounds/win-game.wav";
const gameOverUrl = "./sounds/game-over.wav";

const Home: NextPage = () => {
  const {
    currentWord,
    timeout,
    won,
    lose,
    generateNewWord,
    startGame,
    setStartGame,
    restartHangman,
  } = useHangman();

  const winAudio: HTMLAudioElement | undefined =
    typeof Audio !== "undefined" ? new Audio(winGameUrl) : undefined;
  const gameOverAudio: HTMLAudioElement | undefined =
    typeof Audio !== "undefined" ? new Audio(gameOverUrl) : undefined;

  won && winAudio?.play();
  lose && gameOverAudio?.play();

  const canPlay = !timeout && !won && !lose && !startGame;

  const handleStartNewGame = (): void => setStartGame(true);

  const handleCancelGame = (): void => restartHangman();

  const handleNewWord = (): void => generateNewWord();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Hangman</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-5 text-center">
        {startGame ? <Timer startGame={startGame} /> : null}
        {won ? displayMessage("You Won!") : null}
        {lose ? displayMessage("You lose!") : null}
        {timeout ? displayMessage("Timeout!") : null}

        {canPlay ? (
          <>
            <h1 className="mb-4 max-w-2xl text-4xl font-bold md:text-5xl lg:text-6xl">
              Welcome to Hangman ⭐
              <a
                className="text-3xl text-blue-600 md:text-4xl lg:text-5xl"
                href="https://nextjs.org"
              >
                {" "}
                Guess the Flag Edition
              </a>
            </h1>

            <p className="mt-3 text-2xl">
              Who said{" "}
              <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
                Pomodoro Technique
              </code>{" "}
              sucks? enjoy your 5 minutes break.
            </p>
          </>
        ) : null}

        {startGame ? (
          <div className="flex  flex-col gap-1 md:flex-row md:gap-10">
            <div className="mx-auto flex flex-col items-center justify-center">
              <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
                <div className="mt-6 w-96 rounded-xl  p-6 text-left hover:text-blue-600 focus:text-blue-600">
                  {won ? null : <Draw />}
                </div>
              </div>
              <div className=" mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
                <div className="mt-6  rounded-xl  p-6  ">
                  {won || lose ? (
                    <>
                      <InputText />
                      <button
                        type="button"
                        className="mt-5 mr-2 mb-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800 "
                        onClick={handleNewWord}
                      >
                        Next Word
                      </button>
                      <button
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-red-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:shadow-lg dark:shadow-red-800/80 dark:focus:ring-red-800"
                        onClick={handleCancelGame}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <InputText />
                  )}
                </div>
              </div>
            </div>
            {won || lose ? null : (
              <div className="flex max-w-3xl flex-wrap items-center justify-center sm:w-full md:mt-6">
                <div className="rounded-xl  p-6  text-left md:mt-6 ">
                  <Keyboard />
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            className={`${
              currentWord
                ? "cursor-pointer bg-blue-500 hover:bg-blue-300"
                : "bg-slate-500"
            } mt-10 inline-flex  items-center justify-center whitespace-nowrap rounded-full bg-blue-500 py-7 px-11 text-center text-2xl font-bold !leading-none text-black outline-none transition-colors duration-200  md:mt-6 md:py-5 md:px-8 xl:mt-7 xl:py-[21px] xl:px-9 2xl:mt-8 2xl:py-[26px]`}
            onClick={handleStartNewGame}
            disabled={currentWord ? false : true}
          >
            Start
          </button>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
