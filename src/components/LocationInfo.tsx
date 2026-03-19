import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone } from "lucide-react";

const locations = [
  { name: "MMMUT", timing: "11 AM – 11 PM", phone: "+91 9260926571" },
  { name: "Nauka vihar", timing: "10 AM – 12 AM", phone: "+91 8707879374" },
  { name: "Gorakhpur", timing: "12 PM – 12 AM", phone: "+91 9335620810" },
];

const LocationInfo = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="find-us" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-cream via-background to-brand-cream" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-medium text-primary tracking-widest uppercase">Locations</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Find Us Near <span className="text-gradient">Your College</span>
          </h2>
          <div className="flex justify-center">
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-brand-warm-gold" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card-hover p-7 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground text-lg mb-3">{loc.name}</h3>
              <div className="flex items-center justify-center gap-2 text-muted-foreground font-body text-sm mb-2">
                <Clock className="w-4 h-4 text-primary/60" />
                {loc.timing}
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground font-body text-sm">
                <Phone className="w-4 h-4 text-primary/60" />
                {loc.phone}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationInfo;
