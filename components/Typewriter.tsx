"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  text: string;
  speedMs?: number; 
  startDelayMs?: number; 
  cursor?: boolean;
  className?: string;
};

export default function Typewriter({
  text,
  speedMs = 50,
  startDelayMs = 250,
  cursor = true,
  className,
}: Props) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  // รีเซ็ตเมื่อ text เปลี่ยน
  useEffect(() => {
    setCount(0);
    setStarted(false);
  }, [text]);

  useEffect(() => {
    const t = window.setTimeout(() => setStarted(true), startDelayMs);
    return () => window.clearTimeout(t);
  }, [startDelayMs]);

  useEffect(() => {
    if (!started) return;
    if (count >= text.length) return;

    const id = window.setTimeout(() => setCount((c) => c + 1), speedMs);
    return () => window.clearTimeout(id);
  }, [started, count, text, speedMs]);

  const shown = useMemo(() => text.slice(0, count), [text, count]);

  return (
    <span className={className}>
      {shown}
      {cursor && <span className="inline-block w-[0.6ch] animate-pulse">|</span>}
    </span>
  );
}
