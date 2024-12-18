"use client";

import { GameContext, Letter } from "@/context/game";
import { useContext } from "react";

export default function Letters() {
  const { letters, toggleSelected } = useContext(GameContext);

  const selectLetter = (letter: Letter) => {
    toggleSelected(letter);
  };

  return (
    <div>
      <div className="flex gap-3 justify-center items-center">
        {letters.map((letter, index) => (
          <button
            key={index}
            onClick={() => selectLetter(letter)}
            className="rounded size-10 flex items-center justify-center shadow bg-white"
          >
            {letter.letra}
          </button>
        ))}
      </div>
    </div>
  );
}
