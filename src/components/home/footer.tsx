import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-5xl w-full px-4 py-4 flex">
        <div className="flex flex-col gap-1">
          <span className="text-xs">Patrocinio:</span>
          <a href="https://bixo.cafe" target="_blank">
            <img
              src="https://acdn.mitiendanube.com/stores/004/016/990/themes/common/logo-1639541188-1707995809-4c2a8344f0eff589ba47b9f1c6e131ef1707995809-320-0.webp"
              width={90}
              height={40}
              alt="Bixo Café"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
