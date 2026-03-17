import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FlavorsShowcase from "@/components/FlavorsShowcase";
import WhyCANyouh from "@/components/WhyCANyouh";
import Experience from "@/components/Experience";
import LocationInfo from "@/components/LocationInfo";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="bg-background">
    <Navbar />
    <Hero />
    <FlavorsShowcase />
    <WhyCANyouh />
    <Experience />
    <LocationInfo />
    <SocialProof />
    <Footer />
  </div>
);

export default Index;
