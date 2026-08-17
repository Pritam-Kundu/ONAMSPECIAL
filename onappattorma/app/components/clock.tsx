"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const formatted = formatter.format(now);
      
      const match = formatted.match(/^(\d+):(\d+)\s*([a-zA-Z]+)$/);
      if (match) {
        setTime(`${match[1]}:${match[2]} ${match[3]}`);
      } else {
        setTime(formatted);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <div className="h-5 w-16" />;

  const [hours, rest] = time.split(":");
  
  return (
    <div className="text-sm font-medium tabular-nums tracking-wide text-white/90 drop-shadow-md">
      {hours}
      <span className="animate-[blink_1s_infinite]">:</span>
      {rest}
    </div>
  );
}
