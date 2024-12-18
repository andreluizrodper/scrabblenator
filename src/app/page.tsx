import BottomBar from "@/components/home/bottom-bar";
import Footer from "@/components/home/footer";
import Game from "@/components/home/game";
import TopBar from "@/components/home/top-bar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <TopBar />
      <div className="flex-1 flex items-center">
        <Game />
      </div>
      <Footer />
      <BottomBar />
    </div>
  );
}
