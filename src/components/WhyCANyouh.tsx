import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Package, Camera, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Portable Desserts",
    desc: "Sealed cans that fit in your bag. Eat premium desserts anywhere, anytime.",
  },
  {
    icon: Camera,
    title: "Instagram-Worthy",
    desc: "Layered designs so beautiful, you'll want to post before you eat.",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic & Sealed",
    desc: "Factory-sealed packaging. No contamination, no worries.",
  },
  {
    icon: Sparkles,
    title: "Affordable Premium",
    desc: "Luxury dessert experience without the luxury price tag.",
  },
];

const WhyCANyouh = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-canyouh" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="font-body text-sm font-medium text-primary tracking-widest uppercase">Why Us</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mt-3">
            Why <span className="text-gradient">CAN</span>youh?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:shadow-lg group-hover:scale-110">
                  <Icon className="w-7 h-7 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyCANyouh;
