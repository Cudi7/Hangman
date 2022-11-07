import React, { useEffect, useState } from "react";
import { useHangman } from "../contexts/hangman.context";

const Timer = ({ startGame }: { startGame: boolean }) => {
  const [timer, setTimer] = useState<number>(300);

  const { handleTimeout, restartHangman } = useHangman();

  useEffect(() => {
    if (startGame) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startGame]);

  useEffect(() => {
    if (timer === 0) {
      restartHangman();
    }
  }, [timer]);

  return (
    <p className="mt-3 text-2xl">
      <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
        {timer}
      </code>{" "}
    </p>
  );
};

export default Timer;
