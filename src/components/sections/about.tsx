"use client";

import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Briefcase, Rocket } from "lucide-react";
import {
  AnimatedSection,
  AnimatedText,
  AnimatedStagger,
  AnimatedStaggerItem,
  GlowCard,
} from "@/components/animations/scroll-animations";
import TiltCard from "@/components/3d/tilt-card";

const AboutScene = dynamic(() => import("@/components/3d/about-scene"), {
  ssr: false,
  loading: () => <div className="w-full h-[300px] md:h-[350px]" />,
});

const aboutCards = [
  {
    icon: GraduationCap,
    title: "Education & Background",
    description:
      "B.Tech in AI & ML student from Hyderabad, continuously learning and building the future.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    glowColor: "rgba(59, 130, 246, 0.3)",
  },
  {
    icon: Rocket,
    title: "Generative AI",
    description:
      "Deeply passionate about Generative AI, exploring its potential to create innovative applications and solutions.",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    glowColor: "rgba(168, 85, 247, 0.3)",
  },
  {
    icon: Briefcase,
    title: "Filmmaking",
    description:
      "A creative soul with a passion for filmmaking, bringing stories to life through a minimalist approach.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.3)",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="space-y-12">
      <div className="text-center">
        <AnimatedText>
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            About{" "}
            <span className="text-gradient">
              Me
            </span>
          </h2>
        </AnimatedText>
        <AnimatedText delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A glimpse into my journey and aspirations.
          </p>
        </AnimatedText>
      </div>

      {/* 3D Neural Network Scene */}
      <AnimatedSection>
        <AboutScene />
      </AnimatedSection>

      <AnimatedStagger className="grid gap-8 md:grid-cols-3">
        {aboutCards.map((card, i) => (
          <AnimatedStaggerItem key={card.title}>
            <TiltCard glowColor={card.glowColor}>
              <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300">
                <CardContent className="flex flex-col items-center p-6 text-center relative">
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <div className="relative mb-4">
                      <card.icon className={`h-12 w-12 ${card.iconColor}`} />
                      <div
                        className={`absolute inset-0 ${card.iconColor} blur-xl opacity-30`}
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          </AnimatedStaggerItem>
        ))}
      </AnimatedStagger>
    </section>
  );
}
