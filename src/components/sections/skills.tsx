"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code2, Palette, Cpu, BrainCircuit } from "lucide-react";
import {
  AnimatedSection,
  AnimatedText,
  AnimatedStagger,
  AnimatedStaggerItem,
} from "@/components/animations/scroll-animations";
import TiltCard from "@/components/3d/tilt-card";
import { motion } from "framer-motion";

const SkillsGlobe = dynamic(() => import("@/components/3d/skills-globe"), {
  ssr: false,
  loading: () => <div className="w-full h-[350px] md:h-[400px]" />,
});

const skills = [
  {
    name: "Python",
    icon: Code2,
    level: 90,
    color: "#3b82f6",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    name: "Machine Learning",
    icon: BrainCircuit,
    level: 85,
    color: "#f97316",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    name: "Git",
    icon: Code2,
    level: 80,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-cyan-600",
  },
  {
    name: "Prompt Engineering",
    icon: BrainCircuit,
    level: 90,
    color: "#ef4444",
    gradient: "from-red-500 to-red-600",
  },
  {
    name: "Filmmaking",
    icon: Palette,
    level: 85,
    color: "#10b981",
    gradient: "from-emerald-500 to-emerald-600",
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="space-y-12">
      <div className="text-center">
        <AnimatedText>
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            My{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
        </AnimatedText>
        <AnimatedText delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A showcase of my technical abilities and expertise.
          </p>
        </AnimatedText>
      </div>

      {/* 3D Skills Globe */}
      <AnimatedSection>
        <SkillsGlobe />
      </AnimatedSection>

      <AnimatedStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <AnimatedStaggerItem key={skill.name}>
            <TiltCard glowColor={`${skill.color}40`}>
              <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {skill.name}
                  </CardTitle>
                  <skill.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: skill.color }}
                  >
                    {skill.level}%
                  </div>
                  <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${skill.gradient}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 1.2,
                        delay: 0.3,
                        ease: [0.25, 0.4, 0.25, 1],
                      }}
                      viewport={{ once: true }}
                    />
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
