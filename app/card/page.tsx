import { Suspense } from "react";
import CardClient from "@/components/CardClient";

export default function CardPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="rounded-2xl bg-white px-5 py-3 shadow">กำลังโหลดการ์ด…</div>
        </main>
      }
    >
      <CardClient />
    </Suspense>
  );
}
