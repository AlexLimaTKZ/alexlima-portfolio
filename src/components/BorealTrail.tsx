"use client";

import { useEffect, useRef } from "react";

// ============================================================
// BOREAL — Premium Light Trail
// Fita de luz azul com delay suave que segue o cursor
// ============================================================

interface Point {
  x: number;
  y: number;
  time: number;
}

export default function BorealTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);
  const timeRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurações
    const MAX_POINTS = 80;
    const FADE_ALPHA = 0.15;
    const BASE_COLOR = { r: 96, g: 165, b: 250 }; // #60a5fa

    // Resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    document.addEventListener("mousemove", onMouseMove);

    // Animação
    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const mouse = mouseRef.current;
      const points = pointsRef.current;

      // Fade suave do canvas
      ctx.fillStyle = `rgba(15, 23, 42, ${FADE_ALPHA})`;
      ctx.fillRect(0, 0, w, h);

      timeRef.current += 0.02;

      // Adiciona ponto atual
      points.push({ x: mouse.x, y: mouse.y, time: timeRef.current });
      if (points.length > MAX_POINTS) {
        points.shift();
      }

      // Desenha fita suave com curvas bezier
      if (points.length > 3) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        // Desenha a fita principal
        for (let i = points.length - 1; i > 0; i--) {
          const prog = i / points.length;

          ctx.beginPath();

          if (i > 1 && i < points.length - 1) {
            const p0 = points[i - 1];
            const p1 = points[i];
            const p2 = points[i + 1];
            const cpX = (p0.x + p1.x) / 2;
            const cpY = (p0.y + p1.y) / 2;
            const cpX2 = (p1.x + p2.x) / 2;
            const cpY2 = (p1.y + p2.y) / 2;

            ctx.moveTo(points[0].x, points[0].y);
            for (let j = 1; j < i - 1; j++) {
              const prev = points[j - 1];
              const curr = points[j];
              const next = points[j + 1];
              const midX = (curr.x + next.x) / 2;
              const midY = (curr.y + next.y) / 2;
              ctx.quadraticCurveTo(curr.x, curr.y, midX, midY);
            }
          } else {
            ctx.moveTo(points[0].x, points[0].y);
            for (let j = 1; j < i; j++) {
              ctx.lineTo(points[j].x, points[j].y);
            }
          }

          ctx.strokeStyle = `rgba(${BASE_COLOR.r}, ${BASE_COLOR.g}, ${BASE_COLOR.b}, ${prog * 0.4})`;
          ctx.lineWidth = prog * 5;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Cursor customizado */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "5px",
          height: "5px",
          background: "#60a5fa",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10001,
          boxShadow: "0 0 12px #60a5fa, 0 0 35px rgba(96,165,250,0.3)",
          willChange: "transform",
        }}
      />

      {/* Canvas do efeito */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
