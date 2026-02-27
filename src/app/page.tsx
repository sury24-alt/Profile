import Image from "next/image";
import Link from "next/link";
import { Github, Mail, ExternalLink } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Header from "@/components/layout/header";

export default function Home() {
  const profileImage = PlaceHolderImages.find((p) => p.id === "profile-picture") || PlaceHolderImages[0];
  const internImage = PlaceHolderImages.find((p) => p.id === "web-intern-project") || PlaceHolderImages[1];
  const shortFilmImage = PlaceHolderImages.find((p) => p.id === "hero-placeholder") || PlaceHolderImages[2];

  const projects = [
    {
      id: "ai-food-1",
      title: "AI Food Project",
      description: "A Generative AI application to suggest and innovate food recipes.",
      imageUrl: internImage.imageUrl,
      link: "#",
      category: "Generative AI",
    },
    {
      id: "ai-food-2",
      title: "AI Food Web App",
      description: "A comprehensive AI-powered meal planning and nutrition assistant.",
      imageUrl: shortFilmImage.imageUrl,
      link: "https://v0-aifoood.vercel.app/",
      category: "Web App",
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 flex flex-col items-center">
      <Header />

      <main className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-24 md:gap-32">

        {/* Hero Section */}
        <section id="hero" className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-12 pt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex flex-col gap-6 flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight text-foreground">
              Pedapudi Surya Teja
            </h1>
            <div className="flex flex-col gap-4 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-body">
              <p>
                AI & ML Enthusiast. Building the future with Generative AI.
                I'm currently pursuing a B.Tech at <strong>Marri Laxman Reddy Institute of Technology and Management</strong>.
              </p>
              <div className="text-base text-muted-foreground flex flex-col gap-1 mt-2">
                <p>
                  <span className="font-medium text-foreground">Skills:</span> Java, Python, HTML5
                </p>
                <p>
                  <span className="font-medium text-foreground">Currently learning:</span> GenAI
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 mt-4">
              <Link
                href="https://github.com/sury24-alt"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
              >
                <Github size={20} className="group-hover:-translate-y-1 transition-transform" />
                <span className="font-medium text-sm">GitHub</span>
              </Link>
              <Link
                href="mailto:suryapedapudi2404@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
              >
                <Mail size={20} className="group-hover:-translate-y-1 transition-transform" />
                <span className="font-medium text-sm">Email</span>
              </Link>
            </div>
          </div>

          <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-full overflow-hidden border border-border bg-muted/30">
            <Image
              src={profileImage.imageUrl}
              alt="Pedapudi Surya Teja"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </section>

        {/* Selected Work */}
        <section id="work" className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-headline font-bold tracking-tight">Selected Work</h2>
            <div className="h-px w-full bg-border mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={project.link}
                target={project.link.startsWith("http") ? "_blank" : "_self"}
                className="group flex flex-col gap-5"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/30 rounded-xl border border-border">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  {project.link.startsWith("http") && (
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md p-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ExternalLink size={16} className="text-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-headline font-semibold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                    <span className="text-xs font-mono text-muted-foreground px-2 py-1 bg-muted rounded-md">{project.category}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm font-body">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Contact Strip */}
        <section id="contact" className="flex flex-col gap-8 pb-24">
          <div className="h-px w-full bg-border" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-headline font-bold tracking-tight">Let's connect</h2>
              <p className="text-muted-foreground text-sm max-w-sm">
                I'm always open to discussing new projects, creative ideas, or opportunities.
              </p>
            </div>
            <a
              href="mailto:suryapedapudi2404@gmail.com"
              className="inline-flex items-center justify-center bg-foreground text-background hover:bg-foreground/90 transition-colors px-6 py-3 rounded-lg font-medium text-sm"
            >
              Send me an email
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
