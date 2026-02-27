"use client";

import { useEffect, useRef } from "react";

export function Lightspeed() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const numStars = 600;
        const speed = 25; // Set a high speed for the "lightspeed" effect

        const colors = ["#06b6d4", "#8b5cf6", "#10b981", "#6366f1"];

        const stars: { x: number; y: number; z: number; pz: number; color: string }[] = [];

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * width,
                pz: 0,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
            stars[i].pz = stars[i].z;
        }

        let animationFrameId: number;

        const draw = () => {
            // Create a slight motion blur effect by drawing a semi-transparent background
            ctx.fillStyle = "rgba(3, 7, 18, 0.4)"; // Matching tailwind background #030712
            ctx.fillRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            for (let i = 0; i < numStars; i++) {
                const star = stars[i];

                star.z -= speed;

                if (star.z < 1) {
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                    star.z = width;
                    star.pz = width; // Reset previous z correctly to prevent jumping lines
                }

                const sx = (star.x / star.z) * (width / 1.5) + cx;
                const sy = (star.y / star.z) * (height / 1.5) + cy;

                const px = (star.x / star.pz) * (width / 1.5) + cx;
                const py = (star.y / star.pz) * (height / 1.5) + cy;

                star.pz = star.z;

                // Draw the light line
                ctx.beginPath();
                const ratio = 1 - star.z / width;
                ctx.strokeStyle = star.color;
                ctx.globalAlpha = Math.max(0, ratio); // fade out stars further away
                ctx.lineWidth = ratio * 3;
                ctx.lineCap = "round";
                ctx.moveTo(px, py);
                ctx.lineTo(sx, sy);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none -z-20"
            style={{ opacity: 0.8 }}
        />
    );
}
