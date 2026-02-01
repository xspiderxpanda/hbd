"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
};

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const colors = ["#ff4d6d", "#ffd93d", "#4dff88", "#4dd2ff", "#c77dff", "#ffffff"];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);

    function burst(x: number, y: number) {
      const count = 60;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 4 + 2.2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: Math.floor(Math.random() * 25) + 55,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 2 + 1.2,
        });
      }
    }

    function randomFirework() {
      const x = Math.random() * w;
      const y = Math.random() * h * 0.55 + h * 0.05;
      burst(x, y);
    }

    // คลิกแล้วแตกพลุเพิ่ม
    function onClick(e: MouseEvent) {
      burst(e.clientX, e.clientY);
    }
    window.addEventListener("click", onClick);

    let raf = 0;
    function animate() {
      // ลบแบบมี trail
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // gravity เบาๆ
        p.vy += 0.035;

        // ชะลอความเร็ว
        p.vx *= 0.985;
        p.vy *= 0.985;

        p.life -= 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
      }

      raf = requestAnimationFrame(animate);
    }

    // เริ่มด้วยการยิงชุดแรก
    burst(w * 0.3, h * 0.25);
    burst(w * 0.7, h * 0.32);

    animate();
    const interval = setInterval(randomFirework, 900);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-10" />;
}
