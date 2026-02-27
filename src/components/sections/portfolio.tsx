"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowUpRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  AnimatedText,
  AnimatedStagger,
  AnimatedStaggerItem,
} from "@/components/animations/scroll-animations";
import TiltCard from "@/components/3d/tilt-card";
import { motion } from "framer-motion";

const projects = [
  {
    id: "ai-food-project",
    title: "AI Food Project",
    description:
      "A Generative AI application to suggest and innovate food recipes.",
    tags: ["Generative AI", "Python", "Web"],
    image: PlaceHolderImages.find((p) => p.id === "web-intern-project"),
    gradient: "from-emerald-500 to-cyan-500",
    glowColor: "rgba(16, 185, 129, 0.3)",
  },
  {
    id: "short-film-project",
    title: "Short Film Project",
    description: "Creative filmmaking with a minimalist approach (2k budget).",
    tags: ["Filmmaking", "Directing", "Editing"],
    image: PlaceHolderImages.find((p) => p.id === "hero-placeholder"),
    gradient: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.3)",
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="space-y-12">
      <div className="text-center">
        <AnimatedText>
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            My{" "}
            <span className="text-gradient">
              Portfolio
            </span>
          </h2>
        </AnimatedText>
        <AnimatedText delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A selection of projects I&apos;m proud of.
          </p>
        </AnimatedText>
      </div>

      <AnimatedStagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <AnimatedStaggerItem key={project.title}>
            <TiltCard glowColor={project.glowColor}>
              <Card className="group overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-500">
                {project.image && (
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image.imageUrl}
                      alt={project.image.description}
                      width={600}
                      height={400}
                      className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint={project.image.imageHint}
                    />
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                    {/* View icon */}
                    <motion.div
                      className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={tag === "Ongoing" ? "secondary" : "outline"}
                        className="border-border/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          </AnimatedStaggerItem>
        ))}

        {/* Coming Soon Card */}
        <AnimatedStaggerItem>
          <TiltCard glowColor="rgba(168, 85, 247, 0.2)">
            <Card className="flex flex-col items-center justify-center p-6 min-h-[300px] border-dashed border-2 border-border/30 bg-card/50 backdrop-blur-sm">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Clock className="h-12 w-12 text-muted-foreground" />
              </motion.div>
              <h3 className="mt-4 text-xl font-semibold">More Projects</h3>
              <p className="mt-2 text-center text-muted-foreground">
                Coming Soon...
              </p>
              <motion.div
                className="mt-4 flex gap-1"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.div>
            </Card>
          </TiltCard>
        </AnimatedStaggerItem>
      </AnimatedStagger>
    </section>
  );
}
