import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import DessertCan from "./DessertCan";

/* ─── Floating sprinkle particle ─── */
const Sprinkle = ({ delay, color, size }: { delay: number; color: string; size: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      background: color,
      left: `${Math.random() * 100}%`,
      top: -20,
    }}
    initial={{ y: -20, opacity: 0, rotate: 0 }}
    animate={{
      y: ["-20px", "110vh"],
      opacity: [0, 1, 1, 0],
      rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
      x: [0, (Math.random() - 0.5) * 120],
    }}
    transition={{
      duration: 6 + Math.random() * 6,
      delay: delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

/* ─── Floating ingredient emoji ─── */
const FloatingIngredient = ({
  emoji,
  x,
  y,
  delay,
  scale,
}: {
  emoji: string;
  x: number;
  y: number;
  delay: number;
  scale: number;
}) => (
  <motion.div
    className="absolute text-3xl md:text-5xl pointer-events-none select-none"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.7, 0.7, 0],
      scale: [0, scale, scale, 0],
      y: [0, -30, -10, -40],
      x: [0, 15, -10, 5],
      rotate: [0, 15, -10, 20],
    }}
    transition={{
      duration: 8,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const floatingIngredients = [
  { emoji: "🍫", x: 8, y: 25, delay: 0, scale: 1.1 },
  { emoji: "🍓", x: 85, y: 30, delay: 1.5, scale: 1 },
  { emoji: "🍪", x: 12, y: 65, delay: 3, scale: 0.9 },
  { emoji: "🍰", x: 90, y: 60, delay: 2, scale: 1.2 },
  { emoji: "🧁", x: 5, y: 45, delay: 4, scale: 0.8 },
  { emoji: "🍦", x: 92, y: 15, delay: 0.8, scale: 1 },
  { emoji: "🥄", x: 80, y: 75, delay: 3.5, scale: 0.9 },
  { emoji: "✨", x: 15, y: 15, delay: 1, scale: 1.3 },
  { emoji: "💛", x: 88, y: 45, delay: 2.5, scale: 0.7 },
];

const sprinkleColors = [
  "hsl(8 70% 62%)",     // coral
  "hsl(32 80% 55%)",    // warm gold
  "hsl(350 55% 58%)",   // pink
  "hsl(40 90% 60%)",    // mango
  "hsl(25 60% 40%)",    // chocolate
  "hsl(36 33% 85%)",    // cream
];

/* ─── Bouncy letter animation ─── */
const BouncyLetter = ({ char, index }: { char: string; index: number }) => (
  <motion.span
    className="inline-block"
    initial={{ y: 60, opacity: 0, rotateX: -90 }}
    animate={{ y: 0, opacity: 1, rotateX: 0 }}
    transition={{
      type: "spring",
      stiffness: 200,
      damping: 12,
      delay: 0.5 + index * 0.06,
    }}
    whileHover={{
      scale: 1.2,
      color: "hsl(8 70% 62%)",
      transition: { type: "spring", stiffness: 400 },
    }}
    style={{ display: "inline-block" }}
  >
    {char === " " ? "\u00A0" : char}
  </motion.span>
);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = containerRef.current.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const titleText = "CANyouh";

  return (
    <div ref={containerRef} className="relative h-[350vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cream via-[hsl(30,25%,93%)] to-[hsl(15,20%,90%)]" />

        {/* Animated radial glow that follows scroll */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, hsl(8 70% 62% / 0.08), transparent)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sprinkle rain */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <Sprinkle
              key={`sprinkle-${i}`}
              delay={i * 0.7}
              color={sprinkleColors[i % sprinkleColors.length]}
              size={3 + Math.random() * 5}
            />
          ))}
        </div>

        {/* Floating ingredient emojis */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingIngredients.map((ing, i) => (
            <FloatingIngredient key={`ingredient-${i}`} {...ing} />
          ))}
        </div>

        {/* Floating decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[12%] left-[8%] w-72 h-72 rounded-full bg-primary/[0.06] blur-3xl animate-float-gentle" />
          <div className="absolute bottom-[15%] right-[5%] w-96 h-96 rounded-full bg-brand-warm-gold/[0.05] blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
        </div>

        {/* 3D Canvas with mouse-interactive can */}
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <DessertCan scrollProgress={scrollProgress} />
            </Suspense>
          </Canvas>
        </div>

        {/* Soft gradient overlays */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-brand-cream/40 via-transparent to-brand-cream/70" />

        {/* Text content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
          <div
            className="text-center max-w-3xl pointer-events-auto"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 4) }}
          >
            {/* Bouncy animated title */}
            <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
              {titleText.split("").map((char, i) => (
                <BouncyLetter
                  key={i}
                  char={char}
                  index={i}
                />
              ))}
            </h1>

            {/* Subtitle with slide-up animation */}
            <motion.p
              className="font-display font-bold text-xl md:text-2xl text-foreground/80 mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            >
              Desserts You Can Open Anywhere
            </motion.p>

            {/* Animated accent underline */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
            >
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-primary to-brand-warm-gold" />
            </motion.div>

            {/* Tagline with fade-in */}
            <motion.p
              className="font-body text-muted-foreground text-base md:text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              Portable. Premium. Irresistible.
            </motion.p>

            {/* CTA with playful bounce entrance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 2.1,
              }}
            >
              <button
                onClick={() =>
                  document
                    .getElementById("flavors")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="glow-button pointer-events-auto text-base group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Flavors
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="inline-block"
                  >
                    →
                  </motion.span>
                </span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator with playful bounce */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ opacity: 1 - scrollProgress * 4 }}
        >
          <div className="flex flex-col items-center gap-2">
            <motion.span
              className="text-xs font-body text-muted-foreground tracking-widest uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to explore
            </motion.span>
            <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
