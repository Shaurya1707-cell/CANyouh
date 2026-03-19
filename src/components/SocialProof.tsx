import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram } from "lucide-react";
import social1 from "@/assets/social-1.jpg";
import social2 from "@/assets/social-2.jpg";
import social3 from "@/assets/social-3.jpg";
import social4 from "@/assets/social-4.jpg";
import social5 from "@/assets/social-5.jpg";
import social6 from "@/assets/social-6.jpg";

const images = [social1, social2, social3, social4, social5, social6];

// Masonry-style varied sizing
const sizeClasses = [
  "col-span-1 row-span-1",
  "col-span-1 row-span-1 md:row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1 md:row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

const SocialProof = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-medium text-primary tracking-widest uppercase">Community</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mt-3 mb-4">
            The <span className="text-gradient">CAN</span>youh Fam
          </h2>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-brand-warm-gold" />
          </div>
          <p className="font-body text-muted-foreground text-lg">
            Tag <span className="text-primary font-semibold">@CANyouh</span> and get featured
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[220px] gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${sizeClasses[i]}`}
            >
              <img
                src={img}
                alt={`CANyouh community photo ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/25 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
