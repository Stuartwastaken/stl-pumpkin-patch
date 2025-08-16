import { packages } from "@/data/packages";

interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonical: string;
  structuredData: object;
}

const BASE_URL = "https://stlpumpkins.com"; // Replace with your actual Vercel URL if different
const BASE_KEYWORDS = [
  "saint louis pumpkin delivery",
  "stl pumpkin packages",
  "fall porch decorations delivery",
  "local pumpkin delivery st louis",
  "diy pumpkin kits stl",
  "professional pumpkin setup saint louis",
  "autumn decor delivery mo",
  "halloween pumpkin arrangements st louis",
  "porch pumpkins st charles",
  "pumpkin delivery clayton mo"
].join(", ");

export const getHomeSeo = (): SeoConfig => ({
  title: "STL Pumpkins - Local Porch Pumpkin Delivery & Decoration | Saint Louis",
  description: "Fresh locally sourced pumpkins delivered to your door in Saint Louis. Beautiful fall decorations and hassle-free porch pumpkin packages including full setup and DIY options.",
  keywords: BASE_KEYWORDS,
  ogImage: `${BASE_URL}/favicon.png`,
  canonical: BASE_URL,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "STL Pumpkins",
    "description": "Local pumpkin delivery service in Saint Louis offering full setup and DIY packages with fresh, locally sourced pumpkins.",
    "url": BASE_URL,
    "logo": `${BASE_URL}/favicon.png`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Saint Louis",
      "addressRegion": "MO",
      "postalCode": "63130", // Based on service areas; adjust if needed
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": "+1-123-456-7890" // Add real phone if available
    },
    "areaServed": ["Saint Louis", "St Charles", "Clayton", "Kirkwood"] // From ServiceArea.tsx
  }
});

export const getPackageSeo = (pkgId: string): SeoConfig | null => {
  const pkg = packages.find(p => p.id === pkgId);
  if (!pkg) return null;

  const isFullSetup = pkg.includes_setup;
  const packageType = isFullSetup ? "full setup pumpkin package" : "DIY pumpkin kit";
  const tailoredKeywords = `${BASE_KEYWORDS}, ${pkg.name.toLowerCase()} saint louis, ${packageType} delivery stl, ${isFullSetup ? "professional porch pumpkin arrangement" : "do it yourself fall decor"} mo`;

  return {
    title: `${pkg.name} - ${isFullSetup ? "Full Setup" : "DIY"} Pumpkin Delivery Package in Saint Louis | STL Pumpkins`,
    description: `${pkg.longDescription} ${pkg.description} Includes ${pkg.features.slice(0, 3).join(", ")} and more. Fresh local pumpkins delivered to Saint Louis areas.`,
    keywords: tailoredKeywords,
    ogImage: pkg.images?.[0] || `${BASE_URL}/favicon.png`,
    canonical: `${BASE_URL}/packages/${pkgId}`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": pkg.name,
      "description": pkg.longDescription,
      "offers": {
        "@type": "Offer",
        "price": pkg.price.replace("$", ""),
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "image": pkg.images?.[0] || `${BASE_URL}/favicon.png`,
      "brand": {
        "@type": "Brand",
        "name": "STL Pumpkins"
      }
    }
  };
}; 