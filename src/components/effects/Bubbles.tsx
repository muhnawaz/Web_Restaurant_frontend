import { useEffect, useRef } from "react";

type Bubble = { x:number; y:number; r:number; vx:number; vy:number; a:number };

export default function Bubbles({
  className = "",
  count = 18,
  maxR = 80,
}: { className?: string; count?: number; maxR?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const rafRef = useRef<number | null>(null);
  const dpiRef = useRef(1);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const parent = canvas.parentElement!;
    const dpr = window.devicePixelRatio || 1;
    dpiRef.current = dpr;

    function resize() {
      const { width, height } = parent.getBoundingClientRect();
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      init(width, height);
    }

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function init(w: number, h: number) {
      bubblesRef.current = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(12, maxR),
        vx: rand(-0.08, 0.08),
        vy: rand(-0.06, 0.06),
        a: rand(0.12, 0.28), // opacity
      }));
    }

    function step() {
      const { width, height } = canvas;
      // convert to CSS px for logic
      const w = width / dpr, h = height / dpr;

      ctx.clearRect(0, 0, width, height);
      for (const b of bubblesRef.current) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r) b.x = w + b.r;
        if (b.x > w + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = h + b.r;
        if (b.y > h + b.r) b.y = -b.r;

        // draw: soft radial orb with gold tint
        const cx = Math.round(b.x * dpr);
        const cy = Math.round(b.y * dpr);
        const r = Math.round(b.r * dpr);
        const grad = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
        grad.addColorStop(0, `hsla(42,78%,65%,${b.a})`);
        grad.addColorStop(1, `hsla(42,78%,65%,0)`);

        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(step);
    }

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count, maxR]);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    />
  );
}
