import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Package, Camera } from "lucide-react";

const AboutUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about-us" className="section-padding overflow-hidden relative">
      {/* Warm background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-cream via-background to-brand-cream" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-body text-sm font-medium text-primary tracking-widest uppercase">About</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mt-3 mb-4">
            About <span className="text-gradient">CAN</span>youh
          </h2>
          {/* Accent underline */}
          <div className="flex justify-center">
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-brand-warm-gold" />
          </div>
          <p className="font-body text-muted-foreground text-lg mt-5 max-w-3xl mx-auto">
            CANyouh is built on a simple idea — dessert should be as exciting to experience as it is to eat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="lg:col-span-7 glass-card-hover p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-brand-warm-gold/8 blur-3xl" />

            <div className="relative">
              <p className="font-body text-muted-foreground leading-relaxed">
                We noticed that most desserts are either too traditional or not designed for today's fast, on-the-go
                lifestyle. So we reimagined dessert into something portable, visual, and fun — served inside a can.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mt-5">
                Every CANyouh dessert is carefully layered with rich flavors, smooth creams, and indulgent toppings to
                create a premium yet accessible treat. But it's not just about taste — it's about the moment. The sound
                of opening the can, the reveal of layers, and the experience of enjoying dessert in a completely new way.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mt-5">
                Starting from the streets and built for a new generation, CANyouh is more than just a dessert brand —
                it's an experience you can hold, open, and enjoy anywhere.
              </p>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-card/80 backdrop-blur border border-border/40 px-5 py-2.5">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-display font-bold text-sm text-foreground">
                  CANyouh – Desserts You Can Open Anywhere.
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="lg:col-span-5 grid grid-cols-1 gap-5"
          >
            <div className="glass-card-hover p-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground text-lg mb-2">Portable by design</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                A premium dessert experience that fits your day — and your bag.
              </p>
            </div>

            <div className="glass-card-hover p-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Camera className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground text-lg mb-2">Visual, layered, fun</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                From the reveal to the last bite — it's made to be shared and remembered.
              </p>
            </div>

            <div className="glass-card-hover p-6 bg-secondary/90 text-secondary-foreground border-secondary/20">
              <h3 className="font-display font-extrabold text-2xl">
                <span className="text-gradient">CAN</span>youh
              </h3>
              <p className="font-body text-sm text-secondary-foreground/70 mt-2 leading-relaxed">
                More than dessert — it's the can-opening experience.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
