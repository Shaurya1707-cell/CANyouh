import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone } from "lucide-react";

const locations = [
  { name: "IIT Delhi Campus", timing: "11 AM – 11 PM", phone: "+91 98765 43210" },
  { name: "Connaught Place Hub", timing: "10 AM – 12 AM", phone: "+91 98765 43211" },
  { name: "Hauz Khas Village", timing: "12 PM – 12 AM", phone: "+91 98765 43212" },
];

const LocationInfo = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="find-us" className="section-padding bg-brand-cream">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-medium text-primary tracking-widest uppercase">Locations</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mt-3">
            Find Us Near <span className="text-gradient">Your College</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card-hover p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-3">{loc.name}</h3>
              <div className="flex items-center justify-center gap-2 text-muted-foreground font-body text-sm mb-2">
                <Clock className="w-4 h-4" />
                {loc.timing}
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground font-body text-sm">
                <Phone className="w-4 h-4" />
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
