"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

function isLikelyImageUrl(url: string) {
  const s = url.trim();
  if (!s) return false;
  if (!/^https?:\/\/.+/i.test(s)) return false;
  // ปล่อยให้ยืดหยุ่น: อาจเป็นลิงก์ที่ไม่มี .jpg ก็ได้
  return true;
}

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 0 &&
      message.trim().length > 0 &&
      isLikelyImageUrl(imageUrl)
    );
  }, [name, message, imageUrl]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError("กรอกชื่อ + ข้อความ + ลิงก์รูปให้ครบก่อนนะ");
      return;
    }

    const qs = new URLSearchParams({
      name: name.trim(),
      message: message.trim(),
      image: imageUrl.trim(),
    });

    router.push(`/card?${qs.toString()}`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-sky-100 px-4 py-10">
      <div className="mx-auto max-w-xl">
        <div className="rounded-3xl bg-white/75 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            🎂 Happy Birthday Creator
          </h1>
          <p className="mt-2 text-slate-600">
            ใส่ชื่อ + ข้อความอวยพร + ลิงก์รูป แล้วสร้างลิงก์การ์ดอวยพรวันเกิดได้เลย
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                ชื่อคนที่อยากอวยพร
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น ต้นข้าว"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
                maxLength={40}
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">ข้อความอวยพร</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="เช่น ขอให้มีความสุขมากๆ สุขภาพแข็งแรง สมหวังทุกอย่าง 🎉"
                className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
                rows={5}
                maxLength={250}
                required
              />
              <div className="mt-1 text-right text-xs text-slate-500">
                {message.length}/250
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">ลิงก์รูปภาพ</span>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="แนะนำ .jpg/.png"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
                required
              />
            
            
            </label>

            {imageUrl.trim() && (
              <div className="rounded-2xl border border-slate-200 bg-white p-3">
                <div className="text-xs font-medium text-slate-600">พรีวิวรูป</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="preview"
                  className="mt-2 h-48 w-full rounded-xl object-cover"
                  onError={() => setError("พรีวิวรูปไม่ขึ้น ลองเปลี่ยนเป็นลิงก์รูปแบบ direct ดูนะ")}
                />
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-2xl bg-pink-600 px-5 py-3 font-bold text-white shadow-lg transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              สร้างการ์ดอวยพรวันเกิด 🎇
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
