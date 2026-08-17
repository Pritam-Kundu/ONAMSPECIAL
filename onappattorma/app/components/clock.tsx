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
    <div className="text-[15px] font-semibold tabular-nums tracking-wide text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]">
      {hours}
      <span className="animate-[blink_1s_infinite]">:</span>
      {rest}
    </div>
  );
}
