export default function TopBar() {
  const arr: string[] = ["L", "E", "T", "R", "I", "N", "H", "A", "S"];
  return (
    <div className="mx-auto max-w-5xl px-4 py-2 w-full flex items-center">
      <div className="flex gap-1">
        {arr.map((letter, index) => (
          <div
            key={index}
            className="border size-6 rounded text-sm flex items-center justify-center shadow bg-white"
          >
            {letter}
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}
