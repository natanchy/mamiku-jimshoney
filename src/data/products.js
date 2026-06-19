// Data produk Mamiku JimsHoney
export const categories = [
  { id: 'all', label: 'Semua Produk', icon: 'Grid' },
  { id: 'tas', label: 'Tas', icon: 'ShoppingBag' },
  { id: 'dompet', label: 'Dompet', icon: 'Wallet' },
  { id: 'jam', label: 'Jam Tangan', icon: 'Watch' },
];

export const products = [
  // === TAS ===
  {
    id: 1,
    name: 'Carla Bag',
    category: 'tas',
    price: 295000,
    originalPrice: 370000,
    rating: 4.9,
    reviews: 214,
    badge: 'Best Seller',
    description: 'Tas tote elegan dengan bahan canvas premium, cocok untuk aktivitas sehari-hari maupun acara santai.',
    colors: [
      { name: 'Camel', hex: '#c8a06e' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Khaki', hex: '#8b6f4e' }
    ],
    emoji: '👜',
    bg: 'from-rose-100 to-pink-50',
    status: 'ready',
    tags: ['Tote', 'Canvas', 'Premium'],
    stock: 15,
  },
  {
    id: 2,
    name: 'JimsHoney Nova Sling',
    category: 'tas',
    price: 245000,
    originalPrice: 310000,
    rating: 4.8,
    reviews: 187,
    badge: 'New Arrival',
    description: 'Sling bag minimalis dengan tali yang bisa disesuaikan, desain modern untuk tampilan kasual.',
    colors: [
      { name: 'Beige', hex: '#f5e6d3' },
      { name: 'Charcoal', hex: '#2c2c2c' },
      { name: 'Brown', hex: '#7a5c4a' }
    ],
    emoji: '🎒',
    bg: 'from-fuchsia-100 to-rose-50',
    status: 'po',
    tags: ['Sling', 'Minimalis', 'Kasual'],
    stock: 22,
  },
  {
    id: 3,
    name: 'JimsHoney Aurora Tote',
    category: 'tas',
    price: 320000,
    originalPrice: 395000,
    rating: 4.7,
    reviews: 163,
    badge: 'Promo',
    description: 'Tas tote besar dengan kompartemen terorganisir, ideal untuk kerja dan belanja.',
    colors: [
      { name: 'Honey', hex: '#d4a96a' },
      { name: 'Dark Cocoa', hex: '#3d2b1f' },
      { name: 'Tan', hex: '#c4956a' }
    ],
    emoji: '🛍️',
    bg: 'from-orange-100 to-rose-50',
    status: 'ready',
    tags: ['Tote', 'Large', 'Office'],
    stock: 8,
  },
  {
    id: 4,
    name: 'JimsHoney Celeste Bucket',
    category: 'tas',
    price: 275000,
    originalPrice: 340000,
    rating: 4.8,
    reviews: 201,
    badge: 'Best Seller',
    description: 'Bucket bag stylish dengan drawstring closure, tampil trendi dan fungsional.',
    colors: [
      { name: 'Cream', hex: '#e8d5c0' },
      { name: 'Black', hex: '#1c1c1c' },
      { name: 'Taupe', hex: '#9b7e6a' }
    ],
    emoji: '👜',
    bg: 'from-purple-100 to-pink-50',
    status: 'po',
    tags: ['Bucket', 'Trendy', 'Drawstring'],
    stock: 19,
  },

  // === DOMPET ===
  {
    id: 5,
    name: 'JimsHoney Cara Wallet',
    category: 'dompet',
    price: 145000,
    originalPrice: 185000,
    rating: 4.9,
    reviews: 342,
    badge: 'Best Seller',
    description: 'Dompet panjang wanita dengan banyak slot kartu, terbuat dari bahan sintetis berkualitas tinggi.',
    colors: [
      { name: 'Gold', hex: '#c8a06e' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Beige', hex: '#f5e6d3' }
    ],
    emoji: '👛',
    bg: 'from-amber-100 to-rose-50',
    status: 'ready',
    tags: ['Long Wallet', 'Multi-slot', 'Premium'],
    stock: 45,
  },
  {
    id: 6,
    name: 'JimsHoney Mini Zipper',
    category: 'dompet',
    price: 115000,
    originalPrice: 150000,
    rating: 4.7,
    reviews: 198,
    badge: 'New Arrival',
    description: 'Dompet mini dengan resleting yang praktis, muat kartu dan uang kertas.',
    colors: [
      { name: 'Khaki', hex: '#8b6f4e' },
      { name: 'Cream', hex: '#e8d5c0' },
      { name: 'Chocolate', hex: '#4a3728' }
    ],
    emoji: '💰',
    bg: 'from-pink-100 to-fuchsia-50',
    status: 'po',
    tags: ['Mini', 'Zipper', 'Praktis'],
    stock: 38,
  },
  {
    id: 7,
    name: 'JimsHoney Bifold Classic',
    category: 'dompet',
    price: 135000,
    originalPrice: 170000,
    rating: 4.8,
    reviews: 156,
    badge: 'Promo',
    description: 'Dompet bifold klasik dengan desain timeless, cocok untuk pria maupun wanita.',
    colors: [
      { name: 'Dark Brown', hex: '#3d2b1f' },
      { name: 'Camel', hex: '#c8a06e' },
      { name: 'Brown', hex: '#6b4f3a' }
    ],
    emoji: '💳',
    bg: 'from-slate-100 to-pink-50',
    status: 'ready',
    tags: ['Bifold', 'Classic', 'Unisex'],
    stock: 27,
  },
  {
    id: 8,
    name: 'JimsHoney Card Holder',
    category: 'dompet',
    price: 95000,
    originalPrice: 125000,
    rating: 4.6,
    reviews: 89,
    badge: null,
    description: 'Card holder slim dengan 6 slot kartu, desain minimalis untuk professional.',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Gold', hex: '#c8a06e' },
      { name: 'White', hex: '#f5f5f5' }
    ],
    emoji: '🪙',
    bg: 'from-violet-100 to-pink-50',
    status: 'po',
    tags: ['Card Holder', 'Slim', 'Minimalis'],
    stock: 52,
  },

  // === JAM TANGAN ===
  {
    id: 9,
    name: 'JimsHoney Luna Watch',
    category: 'jam',
    price: 425000,
    originalPrice: 520000,
    rating: 4.9,
    reviews: 127,
    badge: 'Best Seller',
    description: 'Jam tangan analog elegan dengan dial gold dan tali mesh stainless steel.',
    colors: [
      { name: 'Gold Mesh', hex: '#d4a96a' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Silver', hex: '#c0c0c0' }
    ],
    emoji: '⌚',
    bg: 'from-yellow-100 to-rose-50',
    status: 'ready',
    tags: ['Analog', 'Gold', 'Mesh Strap'],
    stock: 12,
  },
  {
    id: 10,
    name: 'JimsHoney Stella Timepiece',
    category: 'jam',
    price: 385000,
    originalPrice: 475000,
    rating: 4.8,
    reviews: 98,
    badge: 'New Arrival',
    description: 'Jam tangan fashion dengan tali kulit premium, tampil mewah untuk berbagai acara.',
    colors: [
      { name: 'Brown Leather', hex: '#8b6f4e' },
      { name: 'Beige', hex: '#f5e6d3' },
      { name: 'Dark Brown', hex: '#3d2b1f' }
    ],
    emoji: '✨',
    bg: 'from-rose-100 to-fuchsia-50',
    status: 'po',
    tags: ['Fashion', 'Leather', 'Premium'],
    stock: 9,
  },
  {
    id: 11,
    name: 'JimsHoney Noir Chrono',
    category: 'jam',
    price: 465000,
    originalPrice: 565000,
    rating: 4.7,
    reviews: 73,
    badge: 'Promo',
    description: 'Chronograph watch dengan desain sporty-elegant, water resistant 30M.',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Gold', hex: '#c8a06e' },
      { name: 'Charcoal', hex: '#2c2c2c' }
    ],
    emoji: '🌙',
    bg: 'from-gray-100 to-pink-50',
    status: 'ready',
    tags: ['Chrono', 'Sporty', 'Water Resistant'],
    stock: 6,
  },
  {
    id: 12,
    name: 'JimsHoney Rose Gold Edition',
    category: 'jam',
    price: 445000,
    originalPrice: 545000,
    rating: 4.9,
    reviews: 115,
    badge: 'Limited',
    description: 'Jam tangan rose gold limited edition dengan kristal Swarovski pada bezel.',
    colors: [
      { name: 'Rose Gold', hex: '#e8c5b0' },
      { name: 'Bronze', hex: '#a67c52' },
      { name: 'Ivory', hex: '#f0d5c5' }
    ],
    emoji: '🌸',
    bg: 'from-pink-100 to-rose-50',
    status: 'po',
    tags: ['Rose Gold', 'Limited', 'Swarovski'],
    stock: 4,
  },
];

export const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const getDiscount = (price, originalPrice) => {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export const testimonials = [
  {
    id: 1,
    name: 'Sari Dewi',
    location: 'Jakarta',
    rating: 5,
    comment: 'Produknya original banget! Kualitas JimsHoney memang nggak perlu diragukan. Pengiriman juga super cepat. Recommended!',
    product: 'JimsHoney Lily Bag',
    avatar: 'SD',
  },
  {
    id: 2,
    name: 'Putri Rahayu',
    location: 'Surabaya',
    rating: 5,
    comment: 'Sudah beli 3x di sini. Barang selalu sesuai deskripsi, packing rapi dan ada sertifikat reseller. Terpercaya!',
    product: 'JimsHoney Cara Wallet',
    avatar: 'PR',
  },
  {
    id: 3,
    name: 'Anisa Maharani',
    location: 'Bandung',
    rating: 5,
    comment: 'Luna Watch-nya cantik banget! Persis seperti di foto. Harga juga lebih murah dari toko lain. Worth it!',
    product: 'JimsHoney Luna Watch',
    avatar: 'AM',
  },
];
