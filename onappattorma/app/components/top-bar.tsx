"use client";

import Clock from "./clock";

export default function TopBar() {
  return (
    <header className="flex w-full items-center justify-between px-4 py-2 sm:px-6">
      <div className="flex-1">
        <Clock />
      </div>
      
      <div className="flex flex-1 justify-center text-xs font-medium tracking-wide text-white/80 sm:text-sm drop-shadow-md">
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
          className="text-white/70 transition-colors hover:text-white drop-shadow-md"
          aria-label="Share"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </a>
      </div>
    </header>
  );
}
