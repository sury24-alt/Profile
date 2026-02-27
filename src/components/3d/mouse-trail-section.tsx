"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export function MouseTrailSection({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative overflow-hidden ${className}`}
        >
            <motion.div
                animate={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
                className="absolute inset-0 pointer-events-none z-0"
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
