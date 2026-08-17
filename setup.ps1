$root = "c:\Users\PRITAM\Downloads\ONAMSPECIAL\onappattorma"
New-Item -ItemType Directory -Path "$root\app\components" -Force | Out-Null
New-Item -ItemType Directory -Path "$root\app\lib" -Force | Out-Null
New-Item -ItemType Directory -Path "$root\app\types" -Force | Out-Null
New-Item -ItemType Directory -Path "$root\public\bg" -Force | Out-Null

$pkgJson = @"
{
  "name": "onappattorma",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "@vercel/analytics": "latest",
    "@vercel/speed-insights": "latest"
  },
  "devDependencies": {
    "typescript": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "tailwindcss": "latest",
    "@tailwindcss/postcss": "latest",
    "postcss": "latest"
  }
}
"@
Set-Content -Path "$root\package.json" -Value $pkgJson -Encoding utf8

$tsconfig = @"
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
"@
Set-Content -Path "$root\tsconfig.json" -Value $tsconfig -Encoding utf8

$nextconfig = @"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
"@
Set-Content -Path "$root\next.config.ts" -Value $nextconfig -Encoding utf8

$postcss = @"
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
"@
Set-Content -Path "$root\postcss.config.mjs" -Value $postcss -Encoding utf8

$readme = @"
# Onappattorma

A nostalgic Onam music experience inspired by Kerala's cassette-era music culture and childhood memories.
"@
Set-Content -Path "$root\README.md" -Value $readme -Encoding utf8

$clock = @"
export default function Clock() {
  return null;
}
"@
Set-Content -Path "$root\app\components\clock.tsx" -Value $clock -Encoding utf8

$topbar = @"
export default function TopBar() {
  return null;
}
"@
Set-Content -Path "$root\app\components\top-bar.tsx" -Value $topbar -Encoding utf8

$desktopPlayer = @"
export default function DesktopPlayer() {
  return null;
}
"@
Set-Content -Path "$root\app\components\desktop-player.tsx" -Value $desktopPlayer -Encoding utf8

$mobilePlayer = @"
export default function MobilePlayer() {
  return null;
}
"@
Set-Content -Path "$root\app\components\mobile-player.tsx" -Value $mobilePlayer -Encoding utf8

$youtubePlayer = @"
export default function YoutubePlayer() {
  return null;
}
"@
Set-Content -Path "$root\app\components\youtube-player.tsx" -Value $youtubePlayer -Encoding utf8

$playerControls = @"
export default function PlayerControls() {
  return null;
}
"@
Set-Content -Path "$root\app\components\player-controls.tsx" -Value $playerControls -Encoding utf8

$tracks = @"
export const tracks = [];
"@
Set-Content -Path "$root\app\lib\tracks.ts" -Value $tracks -Encoding utf8

$youtube = @"
export const youtubeUtils = {};
"@
Set-Content -Path "$root\app\lib\youtube.ts" -Value $youtube -Encoding utf8

$musicType = @"
export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  duration: number;
  videoId: string;
};
"@
Set-Content -Path "$root\app\types\music.ts" -Value $musicType -Encoding utf8

$globalsCss = @"
@import "tailwindcss";

@theme {
}
"@
Set-Content -Path "$root\app\globals.css" -Value $globalsCss -Encoding utf8

$layout = @"
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
"@
Set-Content -Path "$root\app\layout.tsx" -Value $layout -Encoding utf8

$page = @"
export default function Home() {
  return <main>Onappattorma</main>;
}
"@
Set-Content -Path "$root\app\page.tsx" -Value $page -Encoding utf8

cd $root
npm install
npm run build
