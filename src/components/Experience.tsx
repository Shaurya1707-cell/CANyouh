import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [counting, setCounting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!counting || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [counting, timeLeft]);

  const reset = () => {
    setTimeLeft(60);
    setCounting(false);
  };

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(15 45% 12%), hsl(15 35% 8%))" }} />
      {/* Decorative warm blobs */}
      <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-primary/[0.08] blur-3xl" />
      <div className="absolute bottom-[10%] right-[10%] w-80 h-80 rounded-full bg-brand-warm-gold/[0.06] blur-3xl" />

      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-body text-sm font-medium text-primary tracking-widest uppercase">Challenge</span>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white mt-3 mb-4">
            <span className="text-gradient">CAN</span>youh finish this
            <br />in 60 seconds?
          </h2>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-brand-warm-gold" />
          </div>
          <p className="font-body text-white/60 text-lg mb-12 max-w-xl mx-auto">
            Take the challenge. Open a can, grab a spoon, and see if you can resist going slow.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative"
        >
          {/* Timer circle */}
          <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full border-4 border-primary/40 flex items-center justify-center relative animate-pulse-glow">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="hsl(8 70% 62%)"
                strokeWidth="2"
                strokeDasharray={`${(timeLeft / 60) * 289} 289`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div>
              <span className="font-display font-extrabold text-6xl md:text-8xl text-primary">
                {timeLeft}
              </span>
              <p className="font-body text-sm text-white/40">seconds</p>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            {!counting ? (
              <button onClick={() => setCounting(true)} className="glow-button">
                Start Challenge
              </button>
            ) : (
              <button onClick={reset} className="glow-button">
                Reset
              </button>
            )}
          </div>

          {timeLeft === 0 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 font-display font-bold text-2xl text-primary"
            >
              🎉 You did it! Now order another one.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
