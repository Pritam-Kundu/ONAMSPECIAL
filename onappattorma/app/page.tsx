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
        <TopBar />
        <PlayerSystem />
      </div>
    </main>
  );
}
