"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight, Github, Code, Mail } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import FloatingParticles from "@/components/3d/floating-particles";

function Divider() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      whileInView={{ opacity: 1, height: "5rem" }}
      viewport={{ once: true }}
      className="carrd-divider my-4 md:my-0"
    />
  );
}

function SectionWrapper({
  children,
  reverse = false,
  isLast = false,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  isLast?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-4xl mx-auto bg-card rounded-3xl p-6 md:p-12 mb-8 md:mb-0 shadow-xl"
    >
      <div
        className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-16`}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const profileImage =
    PlaceHolderImages.find((p) => p.id === "profile-picture") ||
    PlaceHolderImages[0];
  const internImage =
    PlaceHolderImages.find((p) => p.id === "web-intern-project") ||
    PlaceHolderImages[1];
  const shortFilmImage =
    PlaceHolderImages.find((p) => p.id === "hero-placeholder") ||
    PlaceHolderImages[2];

  return (
    <div className="relative flex min-h-screen flex-col items-center py-16 md:py-24 px-6 overflow-hidden">
      <FloatingParticles />
      {/* 1. Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-auto bg-card rounded-3xl p-8 md:p-12 text-center shadow-xl space-y-6 flex flex-col items-center"
      >
        <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full border-[6px] border-accent shadow-[0_0_0_12px_#3E4352]">
          <Image
            src={profileImage.imageUrl}
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="pt-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-gradient pb-2">
            Surya Teja
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mt-4 font-body">
            AI & ML Enthusiast. Building the future with Generative AI.
          </p>
        </div>

        <Link
          href="#about"
          className="inline-flex w-16 h-16 rounded-full bg-muted items-center justify-center text-accent hover:scale-110 hover:bg-[#4a5061] hover:text-white transition-all duration-300 mt-4"
        >
          <ChevronDown size={32} />
        </Link>
      </motion.div>

      <Divider />

      <div
        id="about"
        className="scroll-mt-12 w-full max-w-4xl mx-auto flex flex-col gap-4"
      >
        {/* 2. About Section */}
        <SectionWrapper>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h3 className="text-xs font-bold tracking-[0.25rem] text-[#9892E0] uppercase">
              Background
            </h3>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-gradient">
              A bit about me
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed md:text-lg">
              I am a B.Tech AI & ML student from Hyderabad with a passion for
              learning, creating, and experimenting.
            </p>
          </div>
          <div className="flex-1 w-full aspect-video md:aspect-square relative rounded-2xl border-[8px] border-accent shadow-[0_0_0_12px_#3E4352] overflow-hidden bg-muted">
            <div className="absolute inset-0 flex items-center justify-center text-accent/50 p-6 text-center">
              <span>Education & Future Interests</span>
            </div>
          </div>
        </SectionWrapper>
      </div>

      <Divider />

      {/* 3. Project 1: AI Food Project */}
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
        <SectionWrapper reverse>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h3 className="text-xs font-bold tracking-[0.25rem] text-[#9892E0] uppercase">
              Project 01
            </h3>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-gradient">
              AI Food Project
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed md:text-lg">
              A Generative AI application to suggest and innovate food recipes.
            </p>
            <div className="pt-4 flex justify-center md:justify-start">
              <span className="inline-flex items-center gap-2 bg-muted text-white px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase hover:scale-105 transition-transform duration-300">
                <span>View Details</span>
                <ChevronRight size={18} className="text-accent" />
              </span>
            </div>
          </div>
          <div className="flex-1 w-full aspect-video relative rounded-2xl border-[8px] border-accent shadow-[0_0_0_12px_#3E4352]">
            <Image
              src={internImage.imageUrl}
              alt="AI Food Project"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </SectionWrapper>
      </div>

      <Divider />

      {/* 4. Project 2: AI Food Web App */}
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
        <SectionWrapper>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h3 className="text-xs font-bold tracking-[0.25rem] text-[#9892E0] uppercase">
              Project 02
            </h3>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-gradient">
              AI Food
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed md:text-lg">
              A comprehensive AI-powered meal planning and nutrition assistant.
            </p>
            <div className="pt-4 flex justify-center md:justify-start">
              <Link
                href="https://v0-aifoood.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-muted text-white px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase hover:scale-105 transition-transform duration-300"
              >
                <span>View Live Site</span>
                <ChevronRight size={18} className="text-accent" />
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full aspect-video relative rounded-2xl border-[8px] border-accent shadow-[0_0_0_12px_#3E4352]">
            <Image
              src={shortFilmImage.imageUrl}
              alt="AI Food Project Site"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </SectionWrapper>
      </div>

      <Divider />

      {/* 5. Skills & Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-3xl mx-auto bg-card rounded-3xl p-8 md:p-12 text-center shadow-xl space-y-8 flex flex-col items-center"
      >
        <div className="space-y-4">
          <h3 className="text-xs font-bold tracking-[0.25rem] text-[#9892E0] uppercase">
            Get In Touch
          </h3>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient pb-2">
            Let&apos;s Connect
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-body">
            <strong>Skills:</strong> Python, Machine Learning, Git, Prompt
            Engineering, Filmmaking.
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <a
            href="https://github.com/sury24-alt"
            target="_blank"
            rel="noreferrer"
            className="w-16 h-16 rounded-full bg-muted flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
          >
            <Github
              size={28}
              className="text-accent group-hover:text-white transition-colors"
            />
          </a>
          <a
            href="#"
            className="w-16 h-16 rounded-full bg-muted flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
          >
            <Code
              size={28}
              className="text-accent group-hover:text-white transition-colors"
            />
          </a>
          <a
            href="mailto:suryapedapudi2404@gmail.com"
            className="w-16 h-16 rounded-full bg-muted flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
          >
            <Mail
              size={28}
              className="text-accent group-hover:text-white transition-colors"
            />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
