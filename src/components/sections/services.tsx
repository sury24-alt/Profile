"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutTemplate, FileCode, BookUser } from "lucide-react";
import {
  AnimatedText,
  AnimatedStagger,
  AnimatedStaggerItem,
  AnimatedSection,
} from "@/components/animations/scroll-animations";
import TiltCard from "@/components/3d/tilt-card";
import { motion } from "framer-motion";

const ServicesScene = dynamic(() => import("@/components/3d/services-scene"), {
  ssr: false,
  loading: () => <div className="w-full h-[300px] md:h-[350px]" />,
});

const services = [
  {
    title: "Web Design",
    description:
      "Crafting visually appealing and user-friendly websites with modern design principles.",
    icon: LayoutTemplate,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    glowColor: "rgba(59, 130, 246, 0.3)",
  },
  {
    title: "Python Project Development",
    description:
      "Building robust and efficient Python applications, from simple scripts to complex systems.",
    icon: FileCode,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    glowColor: "rgba(168, 85, 247, 0.3)",
  },
  {
    title: "Portfolio Creation",
    description:
      "Helping fellow students and professionals create stunning portfolios to showcase their skills.",
    icon: BookUser,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    glowColor: "rgba(16, 185, 129, 0.3)",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="space-y-12">
      <div className="text-center">
        <AnimatedText>
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Services I{" "}
            <span className="text-gradient">
              Offer
            </span>
          </h2>
        </AnimatedText>
        <AnimatedText delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            How I can help you bring your ideas to life.
          </p>
        </AnimatedText>
      </div>

      {/* 3D Wave Particles Scene */}
      <AnimatedSection>
        <ServicesScene />
      </AnimatedSection>

      <AnimatedStagger className="grid gap-8 md:grid-cols-3">
        {services.map((service) => (
          <AnimatedStaggerItem key={service.title}>
            <TiltCard glowColor={service.glowColor}>
              <Card className="group overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-500">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.bgGradient} transition-all duration-500 group-hover:scale-110`}
                      whileHover={{ rotate: 5 }}
                    >
                      <service.icon className="h-7 w-7 text-foreground" />
                    </motion.div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  {/* Animated underline */}
                  <motion.div
                    className={`mt-4 h-0.5 rounded-full bg-gradient-to-r ${service.gradient}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </CardContent>
              </Card>
            </TiltCard>
          </AnimatedStaggerItem>
        ))}
      </AnimatedStagger>
    </section>
  );
}
