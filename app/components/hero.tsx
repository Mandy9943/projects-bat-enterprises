"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Global HUD Canvas Component
function GlobalHUDCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  const pings = useRef([
    { x: 0.2, y: 0.3, color: "#00C596", offset: 0 }, // Clarishot
    { x: 0.7, y: 0.6, color: "#a0ffe6", offset: 1500 }, // Analize.ai
    { x: 0.4, y: 0.8, color: "#9B7DFF", offset: 3000 }, // Detectoria
    { x: 0.8, y: 0.2, color: "#FFC15A", offset: 4500 }, // Claripen
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Draw latitude/longitude mesh
      ctx.strokeStyle = "rgba(128, 128, 128, 0.15)";
      ctx.lineWidth = 1;

      // Mesh rotation
      const meshRotation = (elapsed / 30000) * 6 * (Math.PI / 180); // 6 degrees over 30s

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(meshRotation);

      // Draw grid lines
      const gridSize = 40;
      const gridCount = 20;

      for (let i = -gridCount; i <= gridCount; i++) {
        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(-gridCount * gridSize, i * gridSize);
        ctx.lineTo(gridCount * gridSize, i * gridSize);
        ctx.stroke();

        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(i * gridSize, -gridCount * gridSize);
        ctx.lineTo(i * gridSize, gridCount * gridSize);
        ctx.stroke();
      }

      ctx.restore();

      // Draw pings
      pings.current.forEach((ping) => {
        const pingTime = (elapsed + ping.offset) % 6000; // 6s cycle
        const progress = pingTime / 6000;
        const radius = progress * 24;
        const opacity = 1 - progress;

        if (opacity > 0) {
          const x = ping.x * rect.width;
          const y = ping.y * rect.height;

          ctx.save();
          ctx.globalAlpha = opacity * 0.6;
          ctx.fillStyle = ping.color;
          ctx.shadowColor = ping.color;
          ctx.shadowBlur = 10;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      animate();
    } else {
      // Static version for reduced motion
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      ctx.strokeStyle = "rgba(128, 128, 128, 0.15)";
      ctx.lineWidth = 1;

      const gridSize = 40;
      const gridCount = 20;

      ctx.save();
      ctx.translate(centerX, centerY);

      for (let i = -gridCount; i <= gridCount; i++) {
        ctx.beginPath();
        ctx.moveTo(-gridCount * gridSize, i * gridSize);
        ctx.lineTo(gridCount * gridSize, i * gridSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i * gridSize, -gridCount * gridSize);
        ctx.lineTo(i * gridSize, gridCount * gridSize);
        ctx.stroke();
      }

      ctx.restore();
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// TypewriterLoop Component
const LINES = [
  "HUNTING REAL-ESTATE DEALS WORLDWIDE.",
  "ANALYZING PERSONAL HEALTH DATA.",
  "DETECTING AI‑GENERATED CONTENT.",
  "SUPERCHARGING SMALL‑BUSINESS GROWTH.",
];

function TypewriterLoop({ className = "" }) {
  const [index, setIndex] = useState(0);

  // advance every 2 s (respect reduced-motion)
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return; // keep first line static

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % LINES.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={index} // triggers exit/enter
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className={`uppercase font-mono text-white text-base xs:text-lg sm:text-2xl lg:text-4xl tracking-[0.15em] text-center ${className} ${
          typeof window !== "undefined" && window.innerWidth < 640
            ? ""
            : "whitespace-nowrap"
        }`}
        style={{ textShadow: "0 0 20px rgba(0,255,173,.5)" }}
      >
        {LINES[index]}
      </motion.h1>
    </AnimatePresence>
  );
}

// Improved BAT Logo Component
function BATLogo() {
  return (
    <motion.div
      className="relative z-10 cursor-pointer select-none w-full max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-2xl mx-auto"
      initial={{
        opacity: 0,
        scale: 0.3,
        rotateY: 180,
        filter: "blur(20px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 1.5,
        ease: [0.23, 1, 0.32, 1],
        delay: 0.5,
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 },
      }}
    >
      <style jsx>{`
        .logo-stroke {
          opacity: 0.4;
          animation: neon-sign 8s ease-in-out;
          animation-fill-mode: forwards;
        }
        @keyframes neon-sign {
          0% {
            opacity: 0.4;
            filter: drop-shadow(0 0 5px #00ffad);
          }
          10% {
            opacity: 1;
            filter: drop-shadow(0 0 20px #00ffad) drop-shadow(0 0 40px #00ffad);
          }
          15% {
            opacity: 0.3;
            filter: drop-shadow(0 0 5px #00ffad);
          }
          25% {
            opacity: 1;
            filter: drop-shadow(0 0 25px #00ffad) drop-shadow(0 0 50px #00ffad);
          }
          30% {
            opacity: 0.4;
            filter: drop-shadow(0 0 5px #00ffad);
          }
          40% {
            opacity: 1;
            filter: drop-shadow(0 0 30px #00ffad) drop-shadow(0 0 60px #00ffad);
          }
          45% {
            opacity: 0.5;
            filter: drop-shadow(0 0 10px #00ffad);
          }
          100% {
            opacity: 0.6;
            filter: drop-shadow(0 0 15px #00ffad) drop-shadow(0 0 30px #00ffad);
          }
        }
        .logo-stroke:hover {
          opacity: 0.8;
          filter: drop-shadow(0 0 20px #00ffad) drop-shadow(0 0 40px #00ffad);
          transition: all 0.3s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-stroke {
            animation: none;
            opacity: 0.6;
            filter: drop-shadow(0 0 15px #00ffad);
          }
        }
        @media (max-width: 640px) {
          .logo-stroke.bat {
            font-size: 120px !important;
          }
          .logo-stroke.enterprises {
            font-size: 64px !important;
          }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          .logo-stroke.bat {
            font-size: 80px !important;
          }
          .logo-stroke.enterprises {
            font-size: 36px !important;
          }
        }
        @media (min-width: 1024px) {
          .logo-stroke.bat {
            font-size: 120px !important;
          }
          .logo-stroke.enterprises {
            font-size: 56px !important;
          }
        }
      `}</style>
      <svg
        width="100%"
        height="auto"
        viewBox="0 0 600 200"
        className="mx-auto block select-none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          x="50%"
          y="35%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="Geist, sans-serif"
          fontWeight="900"
          fontSize="120"
          fill="transparent"
          stroke="url(#grad)"
          strokeWidth="3"
          className="logo-stroke bat"
        >
          BAT
        </text>
        <text
          x="50%"
          y="75%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="Geist, sans-serif"
          fontWeight="900"
          fontSize="56"
          fill="transparent"
          stroke="url(#grad)"
          strokeWidth="2"
          className="logo-stroke enterprises"
        >
          ENTERPRISES
        </text>
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffad" />
            <stop offset="100%" stopColor="#0072ff" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

// Scroll Cue Component
function ScrollCue() {
  const handleScroll = () => {
    document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" });
  };

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return (
    <motion.div
      className="relative z-20 cursor-pointer"
      onClick={handleScroll}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [0, 8, 0],
            }
      }
      transition={
        prefersReducedMotion
          ? {}
          : {
              duration: 1.2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }
      }
    >
      <ChevronDown className="text-gray-500 hover:text-gray-300 transition-colors duration-200 w-[29px] h-[35px]" />
    </motion.div>
  );
}

// Futuristic Loading Screen Component
function FuturisticLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING...");

  useEffect(() => {
    const loadingSteps = [
      { text: "INITIALIZING...", duration: 800 },
      { text: "CONNECTING TO MATRIX...", duration: 1000 },
      { text: "LOADING NEURAL NETWORKS...", duration: 1200 },
      { text: "CALIBRATING SYSTEMS...", duration: 1000 },
      { text: "READY", duration: 800 },
    ];

    let currentStep = 0;
    let currentProgress = 0;

    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 8 + 3; // Slower progress increment

      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setTimeout(() => {
          onComplete();
        }, 1000); // Longer pause before completing
        clearInterval(progressInterval);
        return;
      }

      setProgress(currentProgress);

      // Update loading text based on progress
      const stepThreshold = (currentStep + 1) * (100 / loadingSteps.length);
      if (
        currentProgress >= stepThreshold &&
        currentStep < loadingSteps.length - 1
      ) {
        currentStep++;
        setLoadingText(loadingSteps[currentStep].text);
      }
    }, 150); // Slower update interval

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0 opacity-15">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="loaderGrid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="#00ff88"
                strokeWidth="0.8"
              />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#loaderGrid)"
            filter="url(#glow)"
          />
        </svg>

        {/* Animated grid overlay */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="animatedGrid"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 100 0 L 0 0 0 100"
                  fill="none"
                  stroke="#00ffad"
                  strokeWidth="0.3"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#animatedGrid)" />
          </svg>
        </motion.div>
      </div>

      {/* Main Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <svg width="200" height="80" viewBox="0 0 200 80">
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="Geist, sans-serif"
            fontWeight="900"
            fontSize="48"
            fill="transparent"
            stroke="#00ffad"
            strokeWidth="2"
            style={{
              filter: "drop-shadow(0 0 10px #00ffad)",
            }}
          >
            BAT
          </text>
        </svg>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
          style={{
            width: `${progress}%`,
            boxShadow: "0 0 20px rgba(0, 255, 173, 0.6)",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Progress Text */}
      <motion.div
        className="text-green-400 font-mono text-lg mb-4"
        key={progress}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
      >
        {Math.round(progress)}%
      </motion.div>

      {/* Loading Text */}
      <motion.div
        className="text-white font-mono text-sm tracking-wider"
        key={loadingText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {loadingText}
      </motion.div>

      {/* Scanning Lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30" />
      </motion.div>
    </motion.div>
  );
}

// Main Hero Component
export function Hero() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <FuturisticLoader onComplete={() => setShowLoader(false)} />
        )}
      </AnimatePresence>

      <motion.section
        className="min-h-[100vh] relative isolate flex flex-col items-center justify-center gap-8 w-full px-2 sm:px-0 max-w-full"
        style={{ opacity: heroOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showLoader ? 0 : 1 }}
        transition={{ duration: 0.8, delay: showLoader ? 0 : 0.5 }}
      >
        {/* Global HUD Background */}
        <div className="absolute inset-0 z-0">
          <GlobalHUDCanvas />
        </div>

        {/* Improved BAT Logo */}
        <BATLogo />

        {/* Typewriter Headlines */}
        <div className="relative z-20 text-center w-full mx-auto px-2">
          <TypewriterLoop />
        </div>

        {/* Scroll Cue */}
        <div className="mt-8">
          <ScrollCue />
        </div>
      </motion.section>
    </>
  );
}
