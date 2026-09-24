"use client";

import type { RefObject } from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import "./dot-grid.css";

gsap.registerPlugin(InertiaPlugin);

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  inertiaApplied: boolean;
}

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  interactionTargetRef?: RefObject<HTMLElement | null>;
}

interface PointerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  lastTime: number;
  lastX: number;
  lastY: number;
}

const throttle = <Args extends unknown[]>(callback: (...args: Args) => void, limit: number) => {
  let lastCall = 0;

  return (...args: Args) => {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      callback(...args);
    }
  };
};

const hexToRgb = (hex: string) => {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return { r: 0, g: 0, b: 0 };

  return {
    r: Number.parseInt(match[1], 16),
    g: Number.parseInt(match[2], 16),
    b: Number.parseInt(match[3], 16),
  };
};

export default function DotGrid({
  dotSize = 3,
  gap = 6,
  baseColor = "#343434",
  activeColor = "#f8f7f2",
  proximity = 100,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 4,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 0.3,
  className = "",
  interactionTargetRef,
}: DotGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef<PointerState>({
    x: -Infinity,
    y: -Infinity,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);
  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) return null;
    const path = new Path2D();
    path.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return path;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const { width, height } = wrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");
    if (context) context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cell = dotSize + gap;
    const columns = Math.floor((width + gap) / cell);
    const rows = Math.floor((height + gap) / cell);
    const gridWidth = cell * columns - gap;
    const gridHeight = cell * rows - gap;
    const startX = (width - gridWidth) / 2 + dotSize / 2;
    const startY = (height - gridHeight) / 2 + dotSize / 2;

    dotsRef.current = Array.from({ length: rows * columns }, (_, index) => {
      const row = Math.floor(index / columns);
      const column = index % columns;
      return {
        cx: startX + column * cell,
        cy: startY + row * cell,
        xOffset: 0,
        yOffset: 0,
        inertiaApplied: false,
      };
    });
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return;
    let frameId = 0;
    const proximitySquared = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      const wrapper = wrapperRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !wrapper || !context) return;

      const { width, height } = wrapper.getBoundingClientRect();
      context.clearRect(0, 0, width, height);
      const { x: pointerX, y: pointerY } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const x = dot.cx + dot.xOffset;
        const y = dot.cy + dot.yOffset;
        const dx = dot.cx - pointerX;
        const dy = dot.cy - pointerY;
        const distanceSquared = dx * dx + dy * dy;

        let fill = baseColor;
        if (distanceSquared <= proximitySquared) {
          const ratio = 1 - Math.sqrt(distanceSquared) / proximity;
          const red = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * ratio);
          const green = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * ratio);
          const blue = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * ratio);
          fill = `rgb(${red}, ${green}, ${blue})`;
        }

        context.save();
        context.translate(x, y);
        context.fillStyle = fill;
        context.fill(circlePath);
        context.restore();
      }

      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, [activeRgb, baseColor, baseRgb, circlePath, proximity]);

  useEffect(() => {
    buildGrid();
    const resizeObserver = new ResizeObserver(buildGrid);
    const wrapper = wrapperRef.current;
    if (wrapper) resizeObserver.observe(wrapper);

    return () => resizeObserver.disconnect();
  }, [buildGrid]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const interactionTarget = interactionTargetRef?.current ?? wrapper;
    if (!wrapper || !interactionTarget || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const updatePointer = (event: MouseEvent) => {
      const now = performance.now();
      const pointer = pointerRef.current;
      const elapsed = pointer.lastTime ? now - pointer.lastTime : 16;
      let velocityX = ((event.clientX - pointer.lastX) / elapsed) * 1000;
      let velocityY = ((event.clientY - pointer.lastY) / elapsed) * 1000;
      let speed = Math.hypot(velocityX, velocityY);

      if (speed > maxSpeed) {
        const multiplier = maxSpeed / speed;
        velocityX *= multiplier;
        velocityY *= multiplier;
        speed = maxSpeed;
      }

      const bounds = wrapper.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.vx = velocityX;
      pointer.vy = velocityY;
      pointer.speed = speed;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
      pointer.lastTime = now;

      for (const dot of dotsRef.current) {
        const distance = Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y);
        if (speed <= speedTrigger || distance >= proximity || dot.inertiaApplied) continue;

        dot.inertiaApplied = true;
        gsap.killTweensOf(dot);
        gsap.to(dot, {
          inertia: {
            xOffset: dot.cx - pointer.x + velocityX * 0.005,
            yOffset: dot.cy - pointer.y + velocityY * 0.005,
            resistance,
          },
          onComplete: () => {
            gsap.to(dot, {
              xOffset: 0,
              yOffset: 0,
              duration: returnDuration,
              ease: "elastic.out(1, 0.75)",
              onComplete: () => { dot.inertiaApplied = false; },
            });
          },
        });
      }
    };

    const createShockwave = (event: MouseEvent) => {
      const bounds = wrapper.getBoundingClientRect();
      const centerX = event.clientX - bounds.left;
      const centerY = event.clientY - bounds.top;

      for (const dot of dotsRef.current) {
        const distance = Math.hypot(dot.cx - centerX, dot.cy - centerY);
        if (distance >= shockRadius || dot.inertiaApplied) continue;

        dot.inertiaApplied = true;
        const falloff = 1 - distance / shockRadius;
        gsap.killTweensOf(dot);
        gsap.to(dot, {
          inertia: {
            xOffset: (dot.cx - centerX) * shockStrength * falloff,
            yOffset: (dot.cy - centerY) * shockStrength * falloff,
            resistance,
          },
          onComplete: () => {
            gsap.to(dot, {
              xOffset: 0,
              yOffset: 0,
              duration: returnDuration,
              ease: "elastic.out(1, 0.75)",
              onComplete: () => { dot.inertiaApplied = false; },
            });
          },
        });
      }
    };

    const clearPointer = () => {
      pointerRef.current.x = -Infinity;
      pointerRef.current.y = -Infinity;
      pointerRef.current.lastTime = 0;
    };

    const throttledPointerUpdate = throttle(updatePointer, 50);
    interactionTarget.addEventListener("mousemove", throttledPointerUpdate, { passive: true });
    interactionTarget.addEventListener("mouseleave", clearPointer);
    interactionTarget.addEventListener("click", createShockwave);

    return () => {
      interactionTarget.removeEventListener("mousemove", throttledPointerUpdate);
      interactionTarget.removeEventListener("mouseleave", clearPointer);
      interactionTarget.removeEventListener("click", createShockwave);
    };
  }, [interactionTargetRef, maxSpeed, proximity, resistance, returnDuration, shockRadius, shockStrength, speedTrigger]);

  return (
    <div ref={wrapperRef} className={`dot-grid ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="dot-grid__canvas" />
    </div>
  );
}
