"use client";

import { GameProvider } from "@/context/game";
import Actions from "./actions";
import Word from "./word";
import Letters from "./letters";

export default function Game() {
  return (
    <div className="flex-1 gap-2 flex flex-col">
      <div className="mx-auto max-w-5xl px-4 mb-4 pt-8 flex gap-8 flex-col">
        <p>Crie palavras com as letrinhas e ganhe pontos</p>
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-8 flex gap-8 flex-col w-full">
        <GameProvider>
          <Word />
          <Letters />
          <Actions />
        </GameProvider>
      </div>
    </div>
  );
}
