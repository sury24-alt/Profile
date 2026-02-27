"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    category: string;
}

export function ProjectCarousel({ projects }: { projects: Project[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="relative w-full max-w-5xl mx-auto px-4 md:px-12 py-10">
            <div className="overflow-hidden no-scrollbar rounded-3xl" ref={emblaRef}>
                <div className="flex touch-pan-y -ml-4">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`flex-none w-full md:w-[85%] min-w-0 pl-4 transition-all duration-500 ${index === selectedIndex ? "scale-100 opacity-100" : "scale-[0.95] opacity-50"
                                }`}
                        >
                            <div className="group relative flex flex-col md:flex-row items-stretch bg-card border border-border/50 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-2xl h-full min-h-[400px]">
                                {/* Image Section */}
                                <div className="flex-[1.2] relative min-h-[250px] md:min-h-full overflow-hidden">
                                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative z-20">
                                    <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm -z-10" />
                                    <h3 className="text-xs font-bold tracking-[0.25rem] text-primary uppercase mb-4">
                                        {project.category}
                                    </h3>
                                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-gradient mb-6">
                                        {project.title}
                                    </h2>
                                    <p className="text-muted-foreground font-body leading-relaxed md:text-lg mb-8">
                                        {project.description}
                                    </p>

                                    <Link
                                        href={project.link}
                                        target={project.link.startsWith("http") ? "_blank" : "_self"}
                                        className="btn-3d w-fit inline-flex items-center gap-3 bg-primary/10 hover:bg-primary/20 text-foreground border border-primary/30 px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                                    >
                                        <span>View Details</span>
                                        <ChevronRightIcon size={18} className="text-primary" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-0">
                <button
                    onClick={scrollPrev}
                    disabled={!prevBtnEnabled}
                    className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-background/50 border border-border backdrop-blur-md flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed -translate-x-1/2 md:-translate-x-4"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={scrollNext}
                    disabled={!nextBtnEnabled}
                    className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-background/50 border border-border backdrop-blur-md flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed translate-x-1/2 md:translate-x-4"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-8">
                {projects.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => emblaApi?.scrollTo(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-500 ${idx === selectedIndex
                                ? "bg-primary w-8 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                                : "bg-border hover:bg-muted-foreground"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
