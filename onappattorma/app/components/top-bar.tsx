"use client";

import Clock from "./clock";

export default function TopBar() {
  return (
    <header className="flex w-full items-center justify-between px-4 py-3 sm:px-6 z-10 relative">
      <div className="flex flex-1 items-center justify-start">
        <Clock />
      </div>
      
      <div className="flex flex-2 justify-center text-xs font-semibold tracking-wide text-white/95 sm:text-sm [text-shadow:0_1px_8px_rgba(0,0,0,0.65)] whitespace-nowrap px-2">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          1,284 listeners remembering
        </span>
      </div>
      
      <div className="flex flex-1 justify-end">
        <a 
          href="#" 
          className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full text-white/90 transition-all hover:text-white hover:bg-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [filter:drop-shadow(0_1px_8px_rgba(0,0,0,0.65))]"
          aria-label="Share Onappattorma"
        >
          <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </a>
      </div>
    </header>
  );
}
