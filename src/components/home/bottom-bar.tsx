import Link from "next/link";

export default function BottomBar() {
  const year = new Date().getFullYear();
  return (
    <div className="bg-blue-veaconta">
      <div className="mx-auto max-w-5xl px-4 py-2 flex items-center justify-between text-xs text-white">
        <div>{year} &copy; Letrinhas</div>
        <div className="flex gap-4 text-white ">
          <a
            href="https://nearfuturelab.com.br"
            target="_blank"
            className="hover:underline"
          >
            Near future lab
          </a>
        </div>
      </div>
    </div>
  );
}
