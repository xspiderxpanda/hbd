"use client";

import { useEffect, useRef, useState } from "react";

export default function Sound() {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const popRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    bgmRef.current = new Audio("/bgm.mp3");
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.5;

    popRef.current = new Audio("/pop.mp3");
    popRef.current.volume = 0.8;
  }, []);

  async function toggle() {
    const bgm = bgmRef.current;
    if (!bgm) return;

    try {
      if (on) {
        bgm.pause();
        setOn(false);
      } else {
        // ต้องเกิดจาก user gesture (การกดปุ่ม) ถึงจะเล่นได้
        await bgm.play();
        popRef.current?.play().catch(() => {});
        setOn(true);
      }
    } catch {
      // บางเครื่องอาจบล็อก ถ้ารูปแบบเสียงไม่รองรับ
      setOn(false);
    }
  }

  return (
    <button
      onClick={toggle}
      className="fixed right-4 top-4 z-50 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur hover:bg-white"
      aria-label="Toggle sound"
    >
      {on ? "🔊 เสียงเปิด" : "🔇 เปิดเพลง"}
    </button>
  );
}
