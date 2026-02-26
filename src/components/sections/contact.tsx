"use client";

import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Github, Send, Sparkles } from "lucide-react";
import { sendContactMessage } from "@/app/actions";
import {
  AnimatedText,
  AnimatedSection,
} from "@/components/animations/scroll-animations";
import TiltCard from "@/components/3d/tilt-card";
import { motion } from "framer-motion";

const ContactScene = dynamic(() => import("@/components/3d/contact-scene"), {
  ssr: false,
  loading: () => <div className="w-full h-[300px] md:h-[350px]" />,
});

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await sendContactMessage(values);
    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.message || "There was a problem with your request.",
      });
    }
  }

  return (
    <section id="contact" className="space-y-12">
      <div className="text-center">
        <AnimatedText>
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Get in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
        </AnimatedText>
        <AnimatedText delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Have a question or want to work together? Send me a message!
          </p>
        </AnimatedText>
      </div>

      {/* 3D Morphing Sphere Scene */}
      <AnimatedSection>
        <ContactScene />
      </AnimatedSection>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <AnimatedSection direction="left">
          <TiltCard glowColor="rgba(59, 130, 246, 0.3)">
            <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  You can reach me via email or find me on GitHub.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.a
                  href="mailto:suryapedapudi2404@gmail.com"
                  className="flex items-center gap-3 rounded-xl p-3 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <span className="text-sm font-medium">
                      suryapedapudi2404@gmail.com
                    </span>
                  </div>
                </motion.a>
                <motion.a
                  href="https://github.com/sury24-alt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl p-3 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                    <Github className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GitHub</p>
                    <span className="text-sm font-medium">sury24-alt</span>
                  </div>
                </motion.a>
                <motion.a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl p-3 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <Sparkles className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    <span className="text-sm font-medium">
                      linkedin.com/in/surya-teja
                    </span>
                  </div>
                </motion.a>

                {/* Decorative element */}
                <div className="pt-6">
                  <div className="relative rounded-xl border border-border/30 bg-gradient-to-br from-primary/5 to-accent/5 p-4">
                    <p className="text-sm text-muted-foreground italic">
                      &quot;The best way to predict the future is to create
                      it.&quot;
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/70">
                      — Abraham Lincoln
                    </p>
                    {/* Floating sparkle */}
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Sparkles className="h-4 w-4 text-accent" />
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </AnimatedSection>

        <AnimatedSection direction="right">
          <TiltCard glowColor="rgba(168, 85, 247, 0.3)">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-accent" />
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Name"
                              {...field}
                              className="border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary/50"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              {...field}
                              className="border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary/50"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message here..."
                              {...field}
                              className="min-h-[120px] border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary/50"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {form.formState.isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <Send className="h-4 w-4" />
                            </motion.div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            Send Message
                          </>
                        )}
                      </span>
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TiltCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
