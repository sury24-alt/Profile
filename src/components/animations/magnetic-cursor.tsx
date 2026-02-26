"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

export default function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const trailId = useRef(0);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  const outerX = useSpring(cursorX, { stiffness: 80, damping: 25 });
  const outerY = useSpring(cursorY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    // Only show on desktop with pointer device
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    let lastTrailTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const now = Date.now();
      if (now - lastTrailTime > 40) {
        lastTrailTime = now;
        trailId.current += 1;
        setTrail((prev) => [
          ...prev.slice(-12),
          { id: trailId.current, x: e.clientX, y: e.clientY },
        ]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (trail.length === 0) return;
    const timeout = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, 300);
    return () => clearTimeout(timeout);
  }, [trail]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      {/* Trail dots */}
      <AnimatePresence>
        {trail.map((dot, i) => (
          <motion.div
            key={dot.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              left: dot.x - 3,
              top: dot.y - 3,
              width: 6,
              height: 6,
              background: `radial-gradient(circle, hsl(248 53% 68% / 0.6), transparent)`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Inner cursor dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          background:
            "linear-gradient(135deg, hsl(248 53% 68%), hsl(207 44% 49%))",
          boxShadow:
            "0 0 15px hsl(248 53% 68% / 0.5), 0 0 30px hsl(248 53% 68% / 0.2)",
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border border-primary/30"
        style={{
          x: outerX,
          y: outerY,
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          background:
            "radial-gradient(circle, hsl(248 53% 68% / 0.05), transparent)",
        }}
      />
    </div>
  );
}
