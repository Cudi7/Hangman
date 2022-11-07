import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import words from "../public/words.json";

interface currentWordProps {
  name: string;
  code: string;
}

const useHangmanController = () => {
  const [startGame, setStartGame] = useState<boolean>(false);
  const [currentWord, setCurrentWord] = useState<currentWordProps | null>(null);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [failedLetters, setFailedLetters] = useState<string[]>([]);

  const [timeout, setTimeout] = useState<boolean>(false);

  const [won, setWon] = useState<boolean>(false);
  const [lose, setLose] = useState<boolean>(false);

  useEffect(() => {
    if (!currentWord) {
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    }
  }, []);

  const getRandomWord = (): number => Math.floor(Math.random() * words.length);

  const handleFailedLetters = (letter: string): void => {
    setFailedLetters([...failedLetters, letter]);
  };

  const handleGuessedLetters = (letter: string): void => {
    setGuessedLetters([...guessedLetters, letter]);
  };

  const handleGameOver = (): void => setLose(true);

  const handleWon = (): void => setWon(true);

  const generateNewWord = (): void => {
    setWon(false);
    setLose(false);
    setFailedLetters([]);
    setGuessedLetters([]);
    setCurrentWord(words[getRandomWord()]);
  };

  const restartHangman = (): void => {
    setWon(false);
    setLose(false);
    setTimeout(false);
    setFailedLetters([]);
    setGuessedLetters([]);
    setCurrentWord(words[getRandomWord()]);
    setStartGame(false);
  };

  return {
    currentWord,
    handleFailedLetters,
    handleGuessedLetters,
    handleGameOver,
    handleWon,
    timeout,
    won,
    lose,
    guessedLetters,
    failedLetters,
    restartHangman,
    startGame,
    setStartGame,
    generateNewWord,
  };
};

const HangmanContext = createContext<ReturnType<typeof useHangmanController>>({
  currentWord: null,
  handleFailedLetters: () => {},
  handleGuessedLetters: () => {},
  handleGameOver: () => {},
  handleWon: () => {},
  timeout: false,
  won: false,
  lose: false,
  guessedLetters: [],
  failedLetters: [],
  restartHangman: () => {},
  startGame: false,
  setStartGame: () => {},
  generateNewWord: () => {},
});

export const HangmanProvider = ({ children }: { children: ReactNode }) => (
  <HangmanContext.Provider value={useHangmanController()}>
    {children}
  </HangmanContext.Provider>
);

export const useHangman = () => useContext(HangmanContext);
