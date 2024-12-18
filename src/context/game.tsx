"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getLetters } from "@/pages/api/game";

export type Letter = {
  letra: string;
  pontos: number;
};

type gameType = {
  points: number;
  letters: Letter[];
  words: string[];
  fullLetters: Letter[];
  selectedLetters: Letter[];
  toggleSelected: (letter: Letter) => void;
  validateWord: () => void;
  clearSelection: () => void;
  replaceLetters: () => void;
};

const gameData: gameType = {
  points: 0,
  letters: [],
  fullLetters: [],
  words: [],
  selectedLetters: [],
  toggleSelected: (letter: Letter) => null,
  validateWord: () => null,
  clearSelection: () => null,
  replaceLetters: () => null,
};

export const GameContext = createContext(gameData);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [words, setWords] = useState<string[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [fullLetters, setFullLetters] = useState<Letter[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<Letter[]>([]);
  const [isDone, setIsDone] = useState<boolean>(false);

  const pickHand = useCallback(
    (fullLetters: Letter[]) => {
      const shuffledLetters = [...fullLetters]
        .map((value: Letter) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      const pickedLetters = shuffledLetters.splice(0, 7 - letters.length);
      setLetters((letters) => [...letters, ...pickedLetters]);
      setFullLetters(shuffledLetters);
    },
    [letters]
  );

  useEffect(() => {
    if (fullLetters.length === 0) {
      const allLetters = getLetters();
      setFullLetters(allLetters);
      pickHand(allLetters);
    }
  }, [fullLetters]);

  const toggleSelected = useCallback(
    (letter: Letter) => {
      if (selectedLetters.includes(letter)) {
        setSelectedLetters((selectedList) =>
          selectedList.filter((selected) => selected !== letter)
        );
        setLetters((letters) => [...letters, letter]);
        return;
      }
      if (selectedLetters.length === 7) return;
      setSelectedLetters((letters) => [...letters, letter]);
      setLetters((handLetters) =>
        handLetters.filter((hand) => hand !== letter)
      );
      return;
    },
    [selectedLetters]
  );

  const validateWord = useCallback(async () => {
    const word = selectedLetters.map((letter: Letter) => letter.letra).join("");
    const isValid = await fetch(`https://dicio.com.br/${word}`)
      .then((res) => res.status === 200)
      .catch(() => false);
    if (isValid) {
      const score = selectedLetters
        .map((letter: Letter) => letter.pontos)
        .reduce((partial, value) => partial + value, 0);
      setPoints((points) => points + score);
      setWords((words) => [...words, word]);
      setSelectedLetters([]);
      pickHand(fullLetters);
    }
  }, [selectedLetters, fullLetters, points, words]);

  const clearSelection = useCallback(() => {
    setLetters((letters) => [...letters, ...selectedLetters]);
    setSelectedLetters([]);
  }, [selectedLetters, letters]);

  const replaceLetters = useCallback(() => {
    const allLetters = [...fullLetters, ...selectedLetters];
    setFullLetters(allLetters);
    setSelectedLetters([]);
    pickHand(allLetters);
  }, [selectedLetters, fullLetters]);

  return (
    <GameContext.Provider
      value={{
        letters,
        selectedLetters,
        toggleSelected,
        validateWord,
        clearSelection,
        replaceLetters,
        points,
        words,
        fullLetters,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
