import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import flavorOreo from "@/assets/flavor-oreo.jpg";
import flavorBiscoff from "@/assets/flavor-biscoff.jpg";
import flavorStrawberry from "@/assets/flavor-strawberry.jpg";
import flavorMango from "@/assets/flavor-mango.jpg";

const flavors = [
  {
    name: "Oreo Chocolate",
    desc: "Dark cocoa layers with crushed Oreo, smothered in Belgian chocolate ganache.",
    price: "₹199",
    image: flavorOreo,
    color: "from-[hsl(15,50%,16%)]",
  },
  {
    name: "Lotus Biscoff",
    desc: "Caramelised biscuit crumble layered with silky Biscoff cream.",
    price: "₹219",
    image: flavorBiscoff,
    color: "from-[hsl(25,60%,30%)]",
  },
  {
    name: "Strawberry Cheesecake",
    desc: "Tangy strawberry compote meets velvety cream cheese on a biscuit base.",
    price: "₹209",
    image: flavorStrawberry,
    color: "from-[hsl(350,60%,40%)]",
  },
  {
    name: "Mango Cream",
    desc: "Alphonso mango mousse with fresh mango chunks and a buttery sponge.",
    price: "₹199",
    image: flavorMango,
    color: "from-[hsl(40,90%,45%)]",
  },
];

const FlavorCard = ({ flavor, index }: { flavor: typeof flavors[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="group"
    >
      <div className="glass-card-hover overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={flavor.image}
            alt={flavor.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${flavor.color} to-transparent opacity-40`} />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block bg-primary text-primary-foreground font-display font-bold text-sm px-3 py-1 rounded-full">
              {flavor.price}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-display font-bold text-lg text-foreground mb-1">{flavor.name}</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{flavor.desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

const FlavorsShowcase = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mt-3">
            Pick Your <span className="text-gradient">Flavor</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flavors.map((flavor, i) => (
            <FlavorCard key={flavor.name} flavor={flavor} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlavorsShowcase;
