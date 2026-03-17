import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import DessertCan from "./DessertCan";

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

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D Canvas */}
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

        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/40 via-transparent to-background/60" />

        {/* Text content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-center max-w-3xl"
            style={{ opacity: 1 - scrollProgress * 2 }}
          >
            <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
              <span className="text-gradient">CAN</span>
              <span className="text-foreground">youh</span>
            </h1>
            <p className="font-display font-bold text-xl md:text-2xl text-foreground/80 mb-3">
              Desserts You Can Open Anywhere
            </p>
            <p className="font-body text-muted-foreground text-base md:text-lg mb-8">
              Portable. Premium. Irresistible.
            </p>
            <button
              onClick={() => document.getElementById("flavors")?.scrollIntoView({ behavior: "smooth" })}
              className="glow-button pointer-events-auto text-base"
            >
              Explore Flavors
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ opacity: 1 - scrollProgress * 4 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-body text-muted-foreground tracking-widest uppercase">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
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
