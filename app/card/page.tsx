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

export default function CardPage() {
  const sp = useSearchParams();
  const name = safeText(sp.get("name") ?? "", 60);
  const message = safeText(sp.get("message") ?? "", 600);
  const image = sp.get("image") ?? "";

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

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-800 via-fuchsia-600 to-amber-400">
      {/* ดาววิ้ง ๆ แบบง่าย */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="twinkle absolute left-[10%] top-[15%] h-2 w-2 rounded-full bg-white blur-[1px]" />
        <div className="twinkle absolute left-[35%] top-[25%] h-2 w-2 rounded-full bg-white blur-[1px]" />
        <div className="twinkle absolute left-[70%] top-[18%] h-2 w-2 rounded-full bg-white blur-[1px]" />
        <div className="twinkle absolute left-[80%] top-[40%] h-2 w-2 rounded-full bg-white blur-[1px]" />
        <div className="twinkle absolute left-[22%] top-[55%] h-2 w-2 rounded-full bg-white blur-[1px]" />
        <div className="twinkle absolute left-[55%] top-[62%] h-2 w-2 rounded-full bg-white blur-[1px]" />
        <div className="twinkle absolute left-[90%] top-[70%] h-2 w-2 rounded-full bg-white blur-[1px]" />
      </div>

      {/* เอฟเฟกต์ */}
      <Fireworks />
      <Sound />

      {/* กลอว์พื้นหลัง */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-pink-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-24 h-96 w-96 rounded-full bg-yellow-200/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-200/25 blur-3xl" />

      {/* ตัวการ์ด */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white/15 shadow-2xl ring-1 ring-white/25 backdrop-blur-xl">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt="birthday"
              className="h-84 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur">
                <span>🎆</span>
                <span className="font-semibold">คลิ้กที่พื้นหลังเพื่อจุดพลุ</span>
              </div>
            </div>
          </div>

          <div className="p-6 text-center">
            <h1 className="glow-text text-4xl font-extrabold tracking-tight text-white drop-shadow">
            <Typewriter text="🎉 HAPPY BIRTHDAY 🎉" speedMs={55} startDelayMs={200} />
            </h1>

           <div className="mt-5 rounded-3xl bg-white/80 p-5 text-left shadow-lg ring-1 ring-black/5">
  <Typewriter
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
                Replay
              </Link>

              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="flex-1 rounded-2xl bg-slate-900 px-5 py-3 text-center font-bold text-white shadow hover:bg-slate-800"
              >
                COPY URL 🔗
              </button>
            </div>

            <p className="mt-4 text-xs text-white/80">
              กดปุ่ม “เปิดเพลง” มุมขวาบนเพื่อให้เสียงทำงาน 🎵
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
