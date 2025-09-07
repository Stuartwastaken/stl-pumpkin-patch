import { Helmet } from "react-helmet-async";
import { getHomeSeo } from "@/config/seo";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Packages from "@/components/Packages";
import ServiceArea from "@/components/ServiceArea";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const seo = getHomeSeo();
  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:url" content={seo.canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />
        <link rel="canonical" href={seo.canonical} />
        <script type="application/ld+json">
          {JSON.stringify(seo.structuredData)}
        </script>
      </Helmet>
      <div className="min-h-screen">
        <Hero />
        <Packages />
        <ServiceArea />
        <About />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
