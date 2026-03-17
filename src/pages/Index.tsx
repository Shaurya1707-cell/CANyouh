import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FlavorsShowcase from "@/components/FlavorsShowcase";
import AboutUs from "@/components/AboutUs";
import WhyCANyouh from "@/components/WhyCANyouh";
import Experience from "@/components/Experience";
import LocationInfo from "@/components/LocationInfo";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 0);
  }, [location.hash]);

  return (
    <div className="bg-background">
      <Navbar />
      <Hero />
      <FlavorsShowcase />
      <AboutUs />
      <WhyCANyouh />
      <Experience />
      <LocationInfo />
      <SocialProof />
      <Footer />
    </div>
  );
};

export default Index;
