"use client";

import { GameContext, Letter } from "@/context/game";
import { useContext } from "react";

export default function Word() {
  const {
    selectedLetters,
    letters,
    points,
    fullLetters,
    words,
    toggleSelected,
  } = useContext(GameContext);

  const selectLetter = (letter: Letter) => {
    toggleSelected(letter);
  };

  const emptyLetters = Array(7 - selectedLetters.length).keys();
  const lettersCount =
    fullLetters.length + selectedLetters.length + letters.length;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full justify-between px-4">
        <div className="flex gap-2">
          <div>Letras: {lettersCount}</div>
        </div>
        <div className="text-right">
          <div>Palavras achadas: {words.length}</div>
          <div>Pontos: {points}</div>
        </div>
      </div>
      <div className="flex gap-3 justify-center">
        {selectedLetters.map((letter, index) => (
          <button
            key={index}
            onClick={() => selectLetter(letter)}
            className="rounded size-10 flex items-center justify-center shadow bg-white"
          >
            {letter.letra}
          </button>
        ))}
        {emptyLetters.map((item) => (
          <div key={item} className="size-10 bg-gray-100 rounded" />
        ))}
      </div>
    </div>
  );
}
