import "../styles/globals.css";
import type { AppProps } from "next/app";
import { HangmanProvider } from "../contexts/hangman.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HangmanProvider>
      <Component {...pageProps} />
    </HangmanProvider>
  );
}

export default MyApp;
