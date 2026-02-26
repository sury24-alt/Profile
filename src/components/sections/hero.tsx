"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AnimatedText,
  FloatingElement,
} from "@/components/animations/scroll-animations";
import { motion } from "framer-motion";
import TypewriterText from "@/components/animations/typewriter-text";

const HeroScene = dynamic(() => import("@/components/3d/hero-scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10" />,
});

export default function HeroSection() {
  const profileImage = PlaceHolderImages.find(
    (p) => p.id === "profile-picture",
  );

  return (
    <section id="home" className="relative flex items-center min-h-[80vh]">
      {/* 3D Background */}
      <HeroScene />

      <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="flex flex-col items-start space-y-6">
          <AnimatedText>
            <motion.div
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="relative mr-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available for opportunities
            </motion.div>
          </AnimatedText>

          <AnimatedText delay={0.1}>
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="block mt-1 bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent">
                Surya Teja
              </span>
            </h1>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <div className="max-w-xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
              <span className="text-primary font-medium">
                AI & ML Enthusiast | Building Future with GenAI
              </span>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.3}>
            <div className="flex gap-4">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden bg-primary/20 border border-primary/50 hover:bg-primary/30 text-primary-foreground backdrop-blur-sm"
              >
                <Link href="#portfolio">
                  <span className="relative z-10">View My Projects</span>
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
            </div>
          </AnimatedText>

          {/* Floating tech badges */}
          <AnimatedText delay={0.4}>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Python", "React", "Next.js", "ML", "IoT"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="rounded-md border border-border/50 bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm hover:border-primary/40 hover:text-primary transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </AnimatedText>
        </div>

        <div className="flex justify-center">
          <FloatingElement duration={4} distance={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="relative"
            >
              {/* Glow ring behind profile */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/30 via-accent/30 to-purple-500/30 blur-xl animate-pulse" />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-purple-400/20 blur-md" />

              {profileImage && (
                <Image
                  src={profileImage.imageUrl}
                  alt={profileImage.description}
                  width={400}
                  height={400}
                  className="relative rounded-full border-2 border-primary/30 object-cover shadow-2xl shadow-primary/20"
                  data-ai-hint={profileImage.imageHint}
                  priority
                />
              )}

              {/* Orbiting dot */}
              <motion.div
                className="absolute top-4 right-4 h-3 w-3 rounded-full bg-accent shadow-lg shadow-accent/50"
                animate={{
                  rotate: 360,
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "200% 200%" }}
              />
            </motion.div>
          </FloatingElement>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <motion.div
          className="h-8 w-5 rounded-full border-2 border-muted-foreground/30 flex justify-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="h-1.5 w-1 rounded-full bg-primary mt-1.5"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
