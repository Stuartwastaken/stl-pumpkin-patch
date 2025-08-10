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
  space_required: string;
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
    id: "grand-display",
    name: "Grand Display",
    price: "$1,350",
    priceValue: 1350,
    description: "Our most luxurious pumpkin package with premium setup",
    longDescription: "Transform your space into a fall wonderland with our Grand Display package. This premium offering includes our largest and most beautiful pumpkins, professionally arranged to create maximum visual impact. Perfect for large porches, businesses, or special events.",
    features: [
      "2 Grand Prize Pumpkins",
      "10 Large Jack O'Lanterns",
      "8 Medium Jack O'Lanterns",
      "8 White Ghost Pumpkins",
      "Assortment of Pie Pumpkins",
      "16 Specialty Pumpkins",
      "Mini Orange Pumpkins",
      "Mini White Pumpkins",
      "3 Hay Bales",
      "Ornamental Gourds",
      "Professional design and setup included"
    ],
    popular: false,
    color: "border-purple-200",
    includes_setup: true,
    includes_delivery: true,
    setup_time: "2-3 hours",
    space_required: "Large porch or yard area (minimum 100 sq ft)"
  },
  {
    id: "premium-display",
    name: "Premium Display",
    price: "$800",
    priceValue: 800,
    description: "Perfect for creating an impressive fall display",
    longDescription: "Our most popular package strikes the perfect balance between impact and value. Ideal for medium to large porches, this display creates a stunning fall atmosphere that will wow your neighbors and guests.",
    features: [
      "8 Large Jack O'Lanterns",
      "8 Medium Jack O'Lanterns",
      "8 White Ghost Pumpkins",
      "Assortment of Pie Pumpkins",
      "14 Specialty Pumpkins",
      "2 Hay Bales",
      "Ornamental Gourds",
      "Professional design and setup included"
    ],
    popular: true,
    color: "border-primary",
    includes_setup: true,
    includes_delivery: true,
    setup_time: "1-2 hours",
    space_required: "Medium to large porch (minimum 60 sq ft)"
  },
  {
    id: "specialty-collections",
    name: "Specialty Collections",
    price: "$775",
    priceValue: 775,
    description: "Choose from curated themed collections",
    longDescription: "Create a sophisticated and unique fall display with our specially curated collections. Choose between an all-white fairytale theme or elegant neutral tones for a modern, upscale look.",
    features: [
      "Choose your collection style:",
      "• White Fairytale: 40 assorted all white pumpkins for magical front porch",
      "• Neutrals Collection: 40 assorted white ghost, white cinderella, pink porcelain doll, and gray jarradale pumpkins",
      "Soft, elegant pumpkin palette",
      "Perfect for sophisticated fall styling",
      "Professional arrangement included"
    ],
    popular: false,
    color: "border-secondary",
    includes_setup: true,
    includes_delivery: true,
    setup_time: "1-2 hours",
    space_required: "Medium porch (minimum 50 sq ft)",
    is_collection: true,
    collections: [
      {
        id: "white-fairytale",
        name: "White Fairytale",
        description: "40 assorted all white pumpkins creating a magical, dreamy display"
      },
      {
        id: "neutrals",
        name: "Neutrals Collection",
        description: "40 assorted neutral-toned pumpkins in white, pink, and gray for sophisticated styling"
      }
    ]
  },
  {
    id: "classic-harvest",
    name: "Classic Harvest",
    price: "$525",
    priceValue: 525,
    description: "Traditional fall display without setup service",
    longDescription: "Perfect for those who love to arrange their own display! This package includes all the beautiful pumpkins you need for a classic fall look, delivered fresh to your front porch.",
    features: [
      "6 Large Jack O'Lanterns",
      "6 Medium Jack O'Lanterns",
      "6 White Ghost Pumpkins",
      "Assortment of Pie Pumpkins",
      "8 Specialty Pumpkins",
      "2 Hay Bales",
      "Front porch drop off included",
      "Design and layout not included"
    ],
    popular: false,
    color: "border-muted",
    includes_setup: false,
    includes_delivery: true,
    setup_time: "DIY - arrange as you like!",
    space_required: "Medium porch (arrangement flexibility)"
  },
  {
    id: "starter-collection",
    name: "Starter Collection",
    price: "$325",
    priceValue: 325,
    description: "Perfect introduction to our pumpkin packages",
    longDescription: "New to pumpkin displays or have a smaller space? This starter collection provides everything you need for a beautiful, manageable fall display that's easy to arrange yourself.",
    features: [
      "4 Large Jack O'Lanterns",
      "4 Medium Jack O'Lanterns",
      "4 White Ghost Pumpkins",
      "Assortment of Pie Pumpkins",
      "6 Specialty Pumpkins",
      "Front porch drop off included",
      "Design and layout not included"
    ],
    popular: false,
    color: "border-muted",
    includes_setup: false,
    includes_delivery: true,
    setup_time: "DIY - quick and easy!",
    space_required: "Small to medium porch"
  }
];

export const getPackageById = (id: string): Package | undefined => {
  return packages.find(pkg => pkg.id === id);
}; 