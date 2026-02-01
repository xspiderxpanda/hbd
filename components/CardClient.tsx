"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Fireworks from "@/components/Fireworks";
import Sound from "@/components/Sound";
import Typewriter from "@/components/Typewriter";

function safeText(s: string, max = 300) {
  const t = (s ?? "").toString();
  return t.length > max ? t.slice(0, max) + "…" : t;
}

export default function CardClient() {
  const sp = useSearchParams();

  const name = safeText(sp.get("name") ?? "", 60);
  const message = safeText(sp.get("message") ?? "", 600);
  const image = sp.get("image") ?? "";
  const fromImage = sp.get("fromImage") ?? "";

  if (!name || !message || !image) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow ring-1 ring-black/5">
          <h1 className="text-xl font-bold text-slate-900">ลิงก์ไม่ครบ</h1>
          <p className="mt-2 text-slate-600">กลับไปหน้าแรกแล้วสร้างลิงก์ใหม่อีกครั้งนะ</p>
          <Link
            className="mt-4 inline-block rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            href="/"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </main>
    );
  }

  const key = `${name}|${message}|${image}|${fromImage}`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-800 via-fuchsia-600 to-amber-400">
      <Fireworks />
      <Sound />

      {/* กลอว์พื้นหลัง */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-pink-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-24 h-96 w-96 rounded-full bg-yellow-200/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-200/25 blur-3xl" />

      {/* การ์ด */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white/15 shadow-2xl ring-1 ring-white/25 backdrop-blur-xl">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="birthday" className="h-84 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur">
                <span>🎆</span>
                <span className="font-semibold">แตะพื้นหลังเพื่อจุดหลุ</span>
              </div>
            </div>
          </div>

          <div className="p-6 text-center">
            <h1 className="glow-text text-4xl font-extrabold tracking-tight text-white drop-shadow">
              <Typewriter key={key + "|h"} text="🎉 HAPPY BIRTHDAY 🎉" speedMs={55} startDelayMs={200} />
            </h1>

            <p className="mt-2 text-2xl font-bold text-white/95">
              <Typewriter key={key + "|n"} text={`${name} 💖`} speedMs={45} startDelayMs={1200} />
            </p>

            <div className="mt-5 rounded-3xl bg-white/80 p-5 text-left shadow-lg ring-1 ring-black/5">
              <Typewriter
                key={key + "|m"}
                text={message}
                speedMs={18}
                startDelayMs={1800}
                cursor={false}
                className="whitespace-pre-wrap text-slate-800"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="flex-1 rounded-2xl bg-white/85 px-5 py-3 text-center font-bold text-slate-900 shadow hover:bg-white"
              >
                REPLAY
              </Link>

              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="flex-1 rounded-2xl bg-slate-900 px-5 py-3 text-center font-bold text-white shadow hover:bg-slate-800"
              >
                COPY URL 🔗
              </button>
            </div>

            <p className="mt-4 text-xs text-white/80">
              กด “เปิดเพลง” มุมขวาบนเพื่อให้เสียงทำงาน 🎵
            </p>
          </div>
        </div>
      </div>

      {/* รูปคนอวยพร มุมขวาล่าง */}
      {fromImage && (
        <div className="fixed bottom-4 right-4 z-40 group">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-pink-400/60 blur-md" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fromImage}
              alt="from"
              className="relative h-16 w-16 rounded-full border-2 border-white object-cover shadow-xl"
            />
          </div>
          <div className="pointer-events-none absolute bottom-20 right-0 scale-95 rounded-xl bg-black/70 px-3 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
            จากคนอวยพร 💌
          </div>
        </div>
      )}
    </main>
  );
}
