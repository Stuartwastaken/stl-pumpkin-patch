import Hero from "@/components/Hero";
import About from "@/components/About";
import Packages from "@/components/Packages";
import ServiceArea from "@/components/ServiceArea";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Packages />
      <ServiceArea />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
