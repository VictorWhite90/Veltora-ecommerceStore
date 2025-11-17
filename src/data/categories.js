export const mainCategories = [
  {
    id: 'appliances',
    name: 'Appliances',
    description: 'Refrigerators, washers, cooking ranges & smart climate control',
    icon: 'AirVent',
    banner: '/images/banners/appliances-hero.jpg',
    accent: '#d62828',
    subcategories: [
      {
        id: 'refrigerators',
        name: 'Refrigerators',
        items: ['French Door', 'Side by Side', 'Compact', 'Smart Cooling'],
      },
      {
        id: 'washing-machines',
        name: 'Washing Machines',
        items: ['Front Load', 'Top Load', 'Washer Dryer', 'Portable'],
      },
      {
        id: 'kitchen-appliances',
        name: 'Kitchen Appliances',
        items: ['Microwave Ovens', 'Air Fryers', 'Blenders', 'Cookers'],
      },
    ],
    featured: ['SmartThinQ Series', 'Inverter Technology', 'Energy Star'],
  },
  {
    id: 'phones-tablets',
    name: 'Phones & Tablets',
    description: 'Flagship smartphones, tablets, accessories & wearables',
    icon: 'Smartphone',
    banner: '/images/banners/phones-hero.jpg',
    accent: '#ff6f61',
    subcategories: [
      {
        id: 'smartphones',
        name: 'Smartphones',
        items: ['Android', 'iOS', '5G Phones', 'Budget Phones'],
      },
      {
        id: 'tablets',
        name: 'Tablets',
        items: ['iPad', 'Android Tablets', 'Drawing Tablets', 'Kids Tablets'],
      },
      {
        id: 'wearables',
        name: 'Accessories & Wearables',
        items: ['Smartwatches', 'Power Banks', 'Cables', 'Cases'],
      },
    ],
    featured: ['Jumia Prime Deals', 'Free Screen Guard', 'Certified Renewed'],
  },
  {
    id: 'health-beauty',
    name: 'Health & Beauty',
    description: 'Skincare routines, fragrances, grooming kits & spa essentials',
    icon: 'HeartPulse',
    banner: '/images/banners/beauty-hero.jpg',
    accent: '#f06292',
    subcategories: [
      {
        id: 'skincare',
        name: 'Skincare',
        items: ['Serums', 'Moisturizers', 'Sun Care', 'Masks'],
      },
      {
        id: 'makeup',
        name: 'Makeup',
        items: ['Face', 'Eyes', 'Lips', 'Tools'],
      },
      {
        id: 'personal-care',
        name: 'Personal Care',
        items: ['Fragrances', 'Hair Care', 'Grooming', 'Wellness'],
      },
    ],
    featured: ['Official Stores', 'Dermatologist Tested', 'Clean Beauty'],
  },
  {
    id: 'home-office',
    name: 'Home & Office',
    description: 'Furniture, décor accents, kitchenware & smart office setups',
    icon: 'Home',
    banner: '/images/banners/home-hero.jpg',
    accent: '#ffb703',
    subcategories: [
      {
        id: 'furniture',
        name: 'Furniture',
        items: ['Living Room', 'Bedroom', 'Workspace', 'Outdoor'],
      },
      {
        id: 'decor',
        name: 'Decor & Lighting',
        items: ['Wall Art', 'Mirrors', 'Lamps', 'Rugs'],
      },
      {
        id: 'kitchen-dining',
        name: 'Kitchen & Dining',
        items: ['Cookware', 'Serveware', 'Storage', 'Small Appliances'],
      },
    ],
    featured: ['Same-Day Delivery', 'Assembly Service', 'Bundle & Save'],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'TVs, audio systems, cameras, drones & smart entertainment',
    icon: 'Tv',
    banner: '/images/banners/electronics-hero.jpg',
    accent: '#ff8500',
    subcategories: [
      {
        id: 'televisions',
        name: 'Televisions',
        items: ['OLED', 'QLED', '4K UHD', 'Smart TVs'],
      },
      {
        id: 'audio',
        name: 'Audio & Hi-Fi',
        items: ['Soundbars', 'Speakers', 'Headphones', 'Studio Gear'],
      },
      {
        id: 'cameras',
        name: 'Cameras & Imaging',
        items: ['Mirrorless', 'DSLR', 'Action Cams', 'Lenses'],
      },
    ],
    featured: ['12 Months Warranty', 'Installment Plans', 'Top Rated'],
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Men, women & kids apparel, shoes, bags and accessories',
    icon: 'Shirt',
    banner: '/images/banners/fashion-hero.jpg',
    accent: '#ff4d6d',
    subcategories: [
      {
        id: 'mens-fashion',
        name: "Men's Fashion",
        items: ['Tops', 'Bottoms', 'Suits', 'Shoes'],
      },
      {
        id: 'womens-fashion',
        name: "Women’s Fashion",
        items: ['Dresses', 'Abayas', 'Handbags', 'Heels'],
      },
      {
        id: 'kids-fashion',
        name: "Kids & Baby",
        items: ['Clothing Sets', 'Shoes', 'Backpacks', 'Accessories'],
      },
    ],
    featured: ['Official Stores', '2-Hour Delivery', 'Try Before You Buy'],
  },
  {
    id: 'supermarket',
    name: 'Supermarket',
    description: 'Groceries, beverages, pantry staples & household cleaning',
    icon: 'ShoppingBasket',
    banner: '/images/banners/supermarket-hero.jpg',
    accent: '#ffa630',
    subcategories: [
      {
        id: 'groceries',
        name: 'Groceries',
        items: ['Fresh Produce', 'Canned Food', 'Breakfast', 'Snacks'],
      },
      {
        id: 'beverages',
        name: 'Beverages',
        items: ['Water', 'Juices', 'Coffee & Tea', 'Energy Drinks'],
      },
      {
        id: 'household',
        name: 'Household',
        items: ['Cleaning', 'Laundry', 'Paper Goods', 'Baby Care'],
      },
    ],
    featured: ['Same-Day Delivery', 'Bulk Savings', 'Subscribe & Save'],
  },
  {
    id: 'computing',
    name: 'Computing',
    description: 'Laptops, desktops, gaming rigs, printers and accessories',
    icon: 'Laptop',
    banner: '/images/banners/computing-hero.jpg',
    accent: '#ff595e',
    subcategories: [
      {
        id: 'laptops',
        name: 'Laptops',
        items: ['Ultrabooks', 'Gaming Laptops', 'Business', '2-in-1'],
      },
      {
        id: 'desktops',
        name: 'Desktops & Monitors',
        items: ['All-in-One', 'Towers', 'Monitors', 'Mini PCs'],
      },
      {
        id: 'accessories',
        name: 'Accessories',
        items: ['Keyboards', 'Mice', 'Docking', 'Storage'],
      },
    ],
    featured: ['Back to School', 'Creator Studio', 'Certified Refurb'],
  },
  {
    id: 'baby-products',
    name: 'Baby Products',
    description: 'Diapers, strollers, toys, feeding & nursery essentials',
    icon: 'Baby',
    banner: '/images/banners/baby-hero.jpg',
    accent: '#ff8fab',
    subcategories: [
      {
        id: 'diapers',
        name: 'Diapers & Wipes',
        items: ['Newborn', 'Sensitive', 'Swim', 'Bulk Packs'],
      },
      {
        id: 'gear',
        name: 'Gear & Travel',
        items: ['Strollers', 'Car Seats', 'Carriers', 'Monitors'],
      },
      {
        id: 'feeding',
        name: 'Feeding',
        items: ['Bottles', 'Breastfeeding', 'High Chairs', 'Sterilizers'],
      },
    ],
    featured: ['Pediatrician Picks', 'Bundle Offers', 'Gift Registry'],
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Consoles, gaming PCs, accessories, collectibles & merch',
    icon: 'Gamepad',
    banner: '/images/banners/gaming-hero.jpg',
    accent: '#ff006e',
    subcategories: [
      {
        id: 'consoles',
        name: 'Consoles',
        items: ['PlayStation', 'Xbox', 'Nintendo', 'Retro'],
      },
      {
        id: 'games',
        name: 'Games & Software',
        items: ['AAA Titles', 'Indie', 'Subscriptions', 'Gift Cards'],
      },
      {
        id: 'pc-gaming',
        name: 'PC Gaming',
        items: ['Components', 'Peripherals', 'Streaming Gear', 'Chairs'],
      },
    ],
    featured: ['Launch Preorders', 'Flash Drops', 'Esports Picks'],
  },
];

export const megaMenuColumns = mainCategories.map((category) => ({
  ...category,
  url: `/category/${category.id}`,
}));

