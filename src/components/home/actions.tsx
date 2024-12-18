"use client";

import { GameContext } from "@/context/game";
import { useContext } from "react";

export default function Actions() {
  const { selectedLetters, validateWord, clearSelection, replaceLetters } =
    useContext(GameContext);
  const isValidateActive = selectedLetters.length > 2;
  const isClearActive = selectedLetters.length > 0;
  return (
    <div className="flex justify-between gap-4">
      <div className="flex gap-4">
        <button
          disabled={!isClearActive}
          className="border px-4 py-2 rounded disabled:opacity-40"
          onClick={clearSelection}
        >
          Limpar
        </button>
        <button
          disabled={!isClearActive}
          className="border px-4 py-2 rounded disabled:opacity-40"
          onClick={replaceLetters}
        >
          Trocar letras
        </button>
      </div>
      <button
        disabled={!isValidateActive}
        onClick={validateWord}
        className="bg-green-600 rounded px-4 text-white py-2 disabled:opacity-40"
      >
        Validar palavra
      </button>
    </div>
  );
}
