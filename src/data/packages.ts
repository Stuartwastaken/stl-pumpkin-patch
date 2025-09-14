// Full Set Up #1 images
import fullSetup1Img1 from "@/assets/full-1/full-1.webp";
import fullSetup1Img2 from "@/assets/full-1/full-2.webp";
import fullSetup1Img3 from "@/assets/full-1/full-3.webp";
import fullSetup1Img4 from "@/assets/full-1/full-4.webp";
import fullSetup1Img5 from "@/assets/full-1/full-5.webp";
import fullSetup1Img6 from "@/assets/full-1/full-6.webp";
import fullSetup1Img7 from "@/assets/full-1/full-7.webp";

// Full Set Up #2 images  
import fullSetup2Img1 from "@/assets/full-2/full-1.webp";
import fullSetup2Img2 from "@/assets/full-2/full-2.webp";
import fullSetup2Img3 from "@/assets/full-2/full-3.webp";
import fullSetup2Img4 from "@/assets/full-2/full-4.webp";
import fullSetup2Img5 from "@/assets/full-2/full-5.webp";


// Full Set Up #3 images
import fullSetup3Img1 from "@/assets/full-3/full-1.webp";
import fullSetup3Img2 from "@/assets/full-3/full-2.webp";
import fullSetup3Img3 from "@/assets/full-3/full-3.webp";
import fullSetup3Img4 from "@/assets/full-3/full-4.webp";

// DIY Package #1 images
import diyPackage1Img1 from "@/assets/diy-package-1/diy-1.webp";
import diyPackage1Img2 from "@/assets/diy-package-1/diy-2.webp";
import diyPackage1Img3 from "@/assets/diy-package-1/diy-3.webp";

// DIY Package #2 images
import diyPackage2Img1 from "@/assets/diy-package-2/diy-1.webp";
import diyPackage2Img2 from "@/assets/diy-package-2/diy-2.webp";
import diyPackage2Img3 from "@/assets/diy-package-2/diy-3.webp";

// DIY Package #3 images
import diyPackage3Img1 from "@/assets/diy-package-3/diy-1.webp";
import diyPackage3Img2 from "@/assets/diy-package-3/diy-2.webp";
import diyPackage3Img3 from "@/assets/diy-package-3/diy-3.webp";

export interface Package {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  description: string;
  longDescription: string;
  features: string[];
  popular?: boolean;
  color: string;
  includes_setup: boolean;
  includes_delivery: boolean;
  setup_time: string;
  images?: string[];
  is_collection?: boolean;
  collections?: Collection[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
}

export const packages: Package[] = [
  {
    id: "full-setup-1",
    name: "Full Set Up #1",
    price: "$699",
    priceValue: 699,
    description: "Our most abundant porch makeover—tons of pumpkins with delivery + pro styling included.",
    longDescription: "Go all‑in on fall. This is our largest, most impressive display, designed to create a layered, photo‑ready look from every angle. We curate a beautiful mix of sizes, shapes, and colors, then handle all the heavy lifting and styling for you—maximum wow with zero effort.",
    features: [
      "55+ Pumpkins, 2 Hay Bales",
      "10 Large Jack-O'-Lantern pumpkins",
      "10 Medium Jack-O'-Lantern pumpkins", 
      "10 White 'ghost' pumpkins",
      "14 Specialty pumpkins in unique shapes + colors",
      "Assortment of pie pumpkins + ornamental gourds",
      "2 Hay bales for that perfect layered look",
      "Full design + on-site setup included",
      "Pumpkins placed throughout porch and steps for layered look"
    ],
    popular: false,
    color: "border-purple-200",
    includes_setup: true,
    includes_delivery: true,
    setup_time: "2-3 hours",
    images: [fullSetup1Img1, fullSetup1Img2, fullSetup1Img3, fullSetup1Img4, fullSetup1Img5, fullSetup1Img6, fullSetup1Img7]
  },
  {
    id: "full-setup-2", 
    name: "Full Set Up #2",
    price: "$599",
    priceValue: 599,
    description: "Balanced, full fall look with generous variety—delivery + pro styling included.",
    longDescription: "The sweet spot for most homes. We bring a curated mix of sizes, colors, and specialty pumpkins and style them on‑site into a polished, layered display. It’s festive, substantial, and photo‑ready—without feeling over the top.",
    features: [
      "40+ Pumpkins, 2 Hay Bales",
      "8 Large Jack-O'-Lantern pumpkins",
      "8 Medium Jack-O'-Lantern pumpkins",
      "8 White 'ghost' pumpkins", 
      "10 Specialty pumpkins",
      "Assortment of pie pumpkins + ornamental gourds",
      "2 Hay bales",
      "Full design + on-site setup included",
      "Perfect 'just right' fall vibe",
      "Pumpkins placed throughout porch and steps for layered look"
    ],
    popular: true,
    color: "border-secondary",
    includes_setup: true,
    includes_delivery: true,
    setup_time: "1.5-2 hours",
    images: [fullSetup2Img1, fullSetup2Img2, fullSetup2Img3, fullSetup2Img4, fullSetup2Img5]
  },
  {
    id: "full-setup-3",
    name: "Full Set Up #3", 
    price: "$499",
    priceValue: 499,
    description: "Small‑space friendly but still feels full—delivery + pro styling included.",
    longDescription: "Designed for smaller porches or entries, this option delivers a plentiful, well‑balanced mix styled to make the most of your space. You get that layered, high‑end fall look—just scaled to fit perfectly.",
    features: [
      "30+ Pumpkins, 2 Hay Bales",
      "6 Large pumpkins",
      "6 Medium pumpkins",
      "6 White 'ghost' pumpkins",
      "8 Specialty pumpkins", 
      "Assortment of pie pumpkins + ornamental gourds",
      "2 Hay bales depending on layout",
      "Full design + porch setup included",
      "Big impact, small space",
      "Pumpkins placed throughout porch and steps for layered look"
    ],
    popular: false,
    color: "border-primary",
    includes_setup: true,
    includes_delivery: true,
    setup_time: "1-1.5 hours",
    images: [fullSetup3Img1, fullSetup3Img2, fullSetup3Img3, fullSetup3Img4]
  },
  {
    id: "diy-package-1",
    name: "DIY Package #1",
    price: "$449",
    priceValue: 449,
    description: "Big, bountiful mix you arrange yourself—delivery included.",
    longDescription: "A generous selection curated for impact. We handpick a beautiful variety of sizes, shapes, and colors so your porch looks full and layered. You handle the styling—everything else (including delivery) is done.",
    features: [
      "40+ pumpkins in a curated mix",
      "Large pumpkins",
      "Medium pumpkins", 
      "White pumpkins",
      "Specialty pumpkins",
      "Pie pumpkins",
      "Ornamental gourds",
      "Delivered to your doorstep",
      "No setup included",
      "Hay bales not included (can add in configuration)"
    ],
    popular: false,
    color: "border-secondary",
    includes_setup: false,
    includes_delivery: true,
    setup_time: "DIY - arrange as you like!",
    images: [diyPackage1Img1, diyPackage1Img2, diyPackage1Img3]
  },
  {
    id: "diy-package-2",
    name: "DIY Package #2",
    price: "$349",
    priceValue: 349,
    description: "Generous variety without overwhelm—delivery included.",
    longDescription: "Perfect for medium porches or anyone who wants an easy, plentiful mix. Expect a curated balance of sizes and colors that looks cohesive and substantial once styled.",
    features: [
      "30+ pumpkins including variety",
      "Large pumpkins",
      "Medium pumpkins",
      "White pumpkins", 
      "Specialty pumpkins",
      "Pie pumpkins",
      "Ornamental gourds",
      "Delivered to your doorstep",
      "No setup included",
      "Hay bales not included (can add in configuration)"
    ],
    popular: false,
    color: "border-secondary",
    includes_setup: false,
    includes_delivery: true,
    setup_time: "DIY - arrange as you like!",
    images: [diyPackage2Img1, diyPackage2Img2, diyPackage2Img3]
  },
  {
    id: "diy-package-3",
    name: "DIY Package #3",
    price: "$249",
    priceValue: 249,
    description: "Compact set that still looks plentiful—delivery included.",
    longDescription: "Ideal for steps, stoops, and smaller spaces. A thoughtfully chosen mix that feels complete and inviting once arranged—without a trip to the patch.",
    features: [
      "20+ pumpkins including variety",
      "Medium pumpkins",
      "White pumpkins",
      "Pie pumpkins",
      "Ornamental gourds",
      "Delivered to your door",
      "No setup included",
      "Hay bales not included (can add in configuration)"
    ],
    popular: false,
    color: "border-muted",
    includes_setup: false,
    includes_delivery: true,
    setup_time: "DIY - arrange as you like!",
    images: [diyPackage3Img1, diyPackage3Img2, diyPackage3Img3]
  }
];

export const getPackageById = (id: string): Package | undefined => {
  return packages.find(pkg => pkg.id === id);
}; 