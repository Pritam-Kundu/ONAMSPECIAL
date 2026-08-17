import Image from "next/image";
import Background from "./components/background";
import TopBar from "./components/top-bar";
import PlayerSystem from "./components/player-system";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <Background />
      
      <div 
        className="z-10 flex w-full flex-1 flex-col justify-between"
        style={{
          paddingTop: "max(1rem, env(safe-area-inset-top))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
        }}
      >
        <div className="flex flex-col w-full items-center">
          <TopBar />
          
          <div className="flex w-full justify-center pt-2 sm:pt-4 px-4 pointer-events-none">
            <Image
              src="/branding/onappattorma-logo.png"
              alt="Onappattorma"
              width={1200}
              height={360}
              priority
              className="h-auto w-[240px] sm:w-[280px] md:w-[320px] drop-shadow-md pointer-events-auto opacity-95 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        <PlayerSystem />
      </div>
    </main>
  );
}
