"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Hero } from "./components/hero";

export const runtime = "edge";
// Typewriter Effect Hook that triggers on view
function useTypewriter(text: string, speed = 50, trigger = false) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (trigger && !isComplete) {
      // Reset when triggered
      setDisplayText("");
      setCurrentIndex(0);
      setIsComplete(false);
    }
  }, [trigger, isComplete]);

  useEffect(() => {
    if (trigger && currentIndex < text.length && !isComplete) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex >= text.length && !isComplete) {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed, trigger, isComplete]);

  return displayText;
}

// Project Card Component
function ProjectCard({
  title,
  tagline,
  href,
  delay,
}: {
  title: string;
  tagline: string;
  href: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="relative group"
    >
      <div className="w-64 h-64 rounded-full bg-gradient-to-br from-green-400/20 to-blue-500/20 backdrop-blur-sm border border-green-400/30 flex flex-col items-center justify-center p-8 cursor-pointer transition-all duration-500 hover:border-green-400/60 hover:shadow-2xl hover:shadow-green-400/20">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h3 className="text-2xl font-bold text-green-400 mb-4 text-center">
          {title}
        </h3>
        <p className="text-sm text-gray-300 text-center leading-relaxed">
          {tagline}
        </p>
        <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-green-400/30 transition-all duration-500 animate-pulse" />
      </div>
    </motion.div>
  );
}

// Warped Grid Background
function WarpedGrid() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="#00ff88"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}

export default function BATEnterprisesPage() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [missionInView, setMissionInView] = useState(false);

  const aboutText =
    "We build tools that sharpen your edge: systems that find real estate deals, engines that spot AI content, platforms that unlock health insights. We turn raw data into unfair advantage.";
  const typedText = useTypewriter(aboutText, 30, missionInView);

  const projects = [
    {
      title: "Clarishot",
      tagline: "The edge in real estate, worldwide.",
      href: "#",
    },
    {
      title: "Analize.ai",
      tagline: "Decode yourself.",
      href: "#",
    },
    {
      title: "Detectoria",
      tagline: "AI spotting AI, ironically.",
      href: "#",
    },
    {
      title: "Claripen",
      tagline: "Small biz, big bang.",
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <WarpedGrid />

      {/* New Hero Section */}
      <Hero />

      {/* About Section - The Mission */}
      <section
        id="mission"
        className="min-h-screen flex items-center justify-center px-2 sm:px-4 py-10 sm:py-20"
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          onViewportEnter={() => setMissionInView(true)}
          transition={{ duration: 1 }}
          className="transform -rotate-2 w-full"
        >
          <h2 className="max-w-xs xs:max-w-md sm:max-w-3xl px-2 sm:px-8 mx-auto text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-12 text-green-400">
            The Mission
          </h2>
          <div className="max-w-xs xs:max-w-md sm:max-w-3xl mx-auto px-2 sm:px-8 text-base xs:text-lg sm:text-2xl md:text-3xl leading-relaxed text-gray-300 font-mono  break-words">
            {typedText}
            <span className="animate-pulse">|</span>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 py-10 sm:py-20 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold mb-10 sm:mb-20 text-center w-full"
        >
          {"📁 BAT Project Files"}
        </motion.h2>

        <div className="max-w-3xl mx-auto flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-6 sm:gap-12 w-full">
          {projects.map((project, index) => (
            <div
              key={project.title}
              onClick={() => window.open(project.href, "_blank")}
            >
              <ProjectCard
                title={project.title}
                tagline={project.tagline}
                href={project.href}
                delay={index * 0.2}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 py-10 sm:py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-xs xs:max-w-md sm:max-w-2xl mx-auto w-full"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-12">
            Want to reach out?{" "}
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-gray-400 mb-4 sm:mb-8 break-words">
            Email hello@bat.enterprises
          </p>

          <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-12">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-green-400"
            >
              <Github className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-green-400"
            >
              <Linkedin className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-green-400"
            >
              <Mail className="h-6 w-6" />
            </Button>
          </div>

          {/* Easter Egg */}
          <Button
            variant="ghost"
            className="text-xs text-gray-600 hover:text-red-400 transition-colors duration-300"
            onClick={() => setShowEasterEgg(true)}
          >
            do not click this
          </Button>
        </motion.div>
      </section>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4"
        >
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="bg-gradient-to-br from-red-900/50 to-purple-900/50 p-8 rounded-lg border border-red-400/30 max-w-md mx-auto text-center backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-red-400 mb-4">
              You clicked it anyway...
            </h3>
            <p className="text-gray-300 mb-6">
              Curiosity is the first step to innovation. Welcome to the real BAT
              lab.
            </p>
            <Button
              onClick={() => setShowEasterEgg(false)}
              variant="ghost"
              className="text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-400/60"
            >
              <X className="mr-2 h-4 w-4" />
              Close Portal
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
