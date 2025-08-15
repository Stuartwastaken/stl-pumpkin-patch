// Full Set Up #1 images
import fullSetup1Img1 from "@/assets/full-1/full-1.webp";
import fullSetup1Img2 from "@/assets/full-1/full-2.webp";
import fullSetup1Img3 from "@/assets/full-1/full-3.webp";

// Full Set Up #2 images  
import fullSetup2Img1 from "@/assets/full-2/full-1.webp";
import fullSetup2Img2 from "@/assets/full-2/full-2.webp";
import fullSetup2Img3 from "@/assets/full-2/full-3.webp";

// Full Set Up #3 images
import fullSetup3Img1 from "@/assets/full-3/full-1.webp";
import fullSetup3Img2 from "@/assets/full-3/full-2.webp";
import fullSetup3Img3 from "@/assets/full-3/full-3.webp";

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
    price: "$715",
    priceValue: 715,
    description: "Perfect for fall lovers who want their porch to turn heads!",
    longDescription: "All treats, no tricks—this is the ultimate fall porch transformation. Great for businesses, big porches, or even backyard setups.",
    features: [
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
    images: [fullSetup1Img1, fullSetup1Img2, fullSetup1Img3]
  },
  {
    id: "full-setup-2", 
    name: "Full Set Up #2",
    price: "$595",
    priceValue: 595,
    description: "Great for standard-sized porches",
    longDescription: "This package brings all the fall charm in a polished, photo-ready design. Styled right on your porch, using a curated mix of pumpkins and hay bales, it's festive without going over the top.",
    features: [
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
    popular: false,
    color: "border-secondary",
    includes_setup: true,
    includes_delivery: true,
    setup_time: "1.5-2 hours",
    images: [fullSetup2Img1, fullSetup2Img2, fullSetup2Img3]
  },
  {
    id: "full-setup-3",
    name: "Full Set Up #3", 
    price: "$475",
    priceValue: 475,
    description: "Perfect for smaller porches or apartment entries",
    longDescription: "Designed for smaller porches, apartment entries, or anyone who wants fall flair without the full commitment. Styled on-site with care using a mix of pumpkins and hay bales to bring seasonal charm in a smaller footprint.",
    features: [
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
    popular: true,
    color: "border-primary",
    includes_setup: true,
    includes_delivery: true,
    setup_time: "1-1.5 hours",
    images: [fullSetup3Img1, fullSetup3Img2, fullSetup3Img3]
  },
  {
    id: "diy-package-1",
    name: "DIY Package #1",
    price: "$445",
    priceValue: 445,
    description: "Everything you need to create your own dreamy fall porch",
    longDescription: "This generous bundle gives you everything you need to create your own dreamy fall porch. I handpick a full variety of pumpkins for color, shape, and aesthetic—delivered right to your door.",
    features: [
      "~40 pumpkins in a curated mix",
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
    price: "$375",
    priceValue: 375,
    description: "Curated for medium-sized porches or anyone who loves to decorate themselves",
    longDescription: "Curated for medium-sized porches or anyone who loves to decorate themselves. This set gives you variety and visual appeal without being overwhelming.",
    features: [
      "~30 pumpkins including variety",
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
    price: "$275",
    priceValue: 275,
    description: "Perfect for steps, stoops, or smaller porches",
    longDescription: "Perfect for steps, stoops, or smaller porches. You'll get a sweet selection of pumpkins ready to be styled your way—no muddy patch trip required.",
    features: [
      "~20 pumpkins including variety",
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