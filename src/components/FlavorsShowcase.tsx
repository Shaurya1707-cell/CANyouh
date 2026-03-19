import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FLAVORS } from "@/lib/flavors";

const flavorAccents: Record<string, string> = {
  "Oreo Chocolate": "bg-[#3D2B1F] hover:bg-[#4A3628]",
  "Lotus Biscoff": "bg-[#C68B59] hover:bg-[#D49A68]",
  "Strawberry Cheesecake": "bg-[#D4697A] hover:bg-[#E07888]",
  "Mango Cream": "bg-[#E5A832] hover:bg-[#EDB840]",
};

const FlavorCard = ({
  flavor,
  index,
  onSelect,
}: {
  flavor: (typeof FLAVORS)[number];
  index: number;
  onSelect: (flavorName: string) => void;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const accentClass = flavorAccents[flavor.name] || "bg-primary hover:bg-primary/90";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="group"
    >
      <div className="glass-card-hover overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-3xl">
          <img
            src={flavor.image}
            alt={flavor.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${flavor.color} to-transparent opacity-40`} />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block bg-card/80 backdrop-blur text-foreground font-display font-bold text-sm px-4 py-1.5 rounded-full">
              {flavor.price}
            </span>
          </div>
        </div>
        <div className="p-5 pb-6">
          <h3 className="font-display font-bold text-lg text-foreground mb-1">{flavor.name}</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{flavor.desc}</p>
          {/* Flavor-matched CTA */}
          <button
            onClick={() => onSelect(flavor.name)}
            className={`w-full ${accentClass} text-white font-display font-bold text-sm px-4 py-3 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
          >
            Order this flavor
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const FlavorsShowcase = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const onSelect = (flavorName: string) => {
    navigate(`/order?flavor=${encodeURIComponent(flavorName)}`);
  };

  return (
    <section id="flavors" className="section-padding bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-medium text-primary tracking-widest uppercase">The Collection</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Pick Your <span className="text-gradient">Flavor</span>
          </h2>
          {/* Accent underline */}
          <div className="flex justify-center">
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-brand-warm-gold" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLAVORS.map((flavor, i) => (
            <FlavorCard key={flavor.name} flavor={flavor} index={i} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlavorsShowcase;
