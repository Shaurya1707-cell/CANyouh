import { Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground py-16 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <h3 className="font-display font-extrabold text-2xl mb-4">
            <span className="text-gradient">CAN</span>youh
          </h3>
          <p className="font-body text-sm text-secondary-foreground/60 leading-relaxed">
            Portable premium desserts in a can. Made with love, sealed for freshness, designed for your feed.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/80">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Flavors", "Why CANyouh", "Find Us"].map((l) => (
              <button
                key={l}
                onClick={() => document.getElementById(l.toLowerCase().replace(/ /g, "-"))?.scrollIntoView({ behavior: "smooth" })}
                className="text-left font-body text-sm text-secondary-foreground/60 hover:text-primary transition-colors"
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/80">Follow Us</h4>
          <div className="flex gap-4">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
              >
                <Icon className="w-4 h-4 text-secondary-foreground/60 hover:text-primary-foreground" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10 pt-8 text-center">
        <p className="font-body text-xs text-secondary-foreground/40">
          © 2026 CANyouh. All rights reserved. Made with 🧡
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
